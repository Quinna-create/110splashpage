import {
  addDoc,
  collection,
  doc,
  increment,
  runTransaction,
  serverTimestamp,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { db, courseConfig } from "./firebase-init.js";

function slugifyKey(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 120) || "unknown";
}

export async function ensureWidgetRegistry(widgetMeta) {
  const ref = doc(db, "widgets", widgetMeta.widgetId);
  const existing = await getDoc(ref);
  if (!existing.exists()) {
    await setDoc(ref, {
      ...widgetMeta,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  } else {
    await setDoc(ref, { ...widgetMeta, updatedAt: serverTimestamp() }, { merge: true });
  }
}

export async function submitPollResponse({ widgetId, answers }) {
  console.log(`[submitPollResponse] widgetId: ${widgetId}, answers:`, answers);
  
  const payload = {
    widgetId,
    courseId: courseConfig.courseId,
    term: courseConfig.term,
    answers,
    createdAt: serverTimestamp()
  };

  await addDoc(collection(db, "responses"), payload);
  console.log(`[submitPollResponse] Response saved to /responses`);

  const aggRef = doc(db, "aggregates", widgetId);

  await runTransaction(db, async (tx) => {
    const snap = await tx.get(aggRef);
    console.log(`[submitPollResponse] Existing aggregate:`, snap.exists() ? snap.data() : "NONE");
    
    if (!snap.exists()) {
      console.log(`[submitPollResponse] Creating new aggregate document`);
      tx.set(aggRef, {
        widgetId,
        courseId: courseConfig.courseId,
        term: courseConfig.term,
        totalResponses: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    }

    // Build the update object dynamically based on all answer fields
    const updateObj = {
      totalResponses: increment(1),
      updatedAt: serverTimestamp()
    };

    // For each answer field, increment the count for that value
    for (const [fieldName, fieldValue] of Object.entries(answers || {})) {
      console.log(`[submitPollResponse] Processing field: ${fieldName}, value:`, fieldValue);
      
      if (fieldValue == null) continue;
      
      // If it's an object with value and label (e.g., { value: "immoral", label: "Immoral" })
      if (typeof fieldValue === 'object' && fieldValue.value && fieldValue.label) {
        const key = slugifyKey(fieldValue.value);
        console.log(`[submitPollResponse] Object field: ${fieldName} -> key: ${key}, label: ${fieldValue.label}`);
        updateObj[`${fieldName}.${key}`] = increment(1);
        updateObj[`${fieldName}Labels.${key}`] = fieldValue.label;
      } else {
        // Simple string/number value (e.g., "immoral" or just a string)
        const key = slugifyKey(fieldValue);
        console.log(`[submitPollResponse] Simple field: ${fieldName} -> key: ${key}`);
        updateObj[`${fieldName}.${key}`] = increment(1);
      }
    }

    console.log(`[submitPollResponse] Final update object:`, updateObj);
    tx.set(aggRef, updateObj, { merge: true });
    console.log(`[submitPollResponse] Aggregate updated`);
  });
}
