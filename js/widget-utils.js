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
  const payload = {
    widgetId,
    courseId: courseConfig.courseId,
    term: courseConfig.term,
    answers,
    createdAt: serverTimestamp()
  };

  await addDoc(collection(db, "responses"), payload);

  const aggRef = doc(db, "aggregates", widgetId);

  await runTransaction(db, async (tx) => {
    const snap = await tx.get(aggRef);
    if (!snap.exists()) {
      tx.set(aggRef, {
        widgetId,
        courseId: courseConfig.courseId,
        term: courseConfig.term,
        totalResponses: 0,
        year: {},
        japaneseProgram: {},
        motivation: {},
        majors: {},
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    }

    const majorKey = slugifyKey(answers.major);
    tx.set(
      aggRef,
      {
        totalResponses: increment(1),
        [`year.${answers.year}`]: increment(1),
        [`japaneseProgram.${answers.japaneseProgram}`]: increment(1),
        [`motivation.${answers.motivation}`]: increment(1),
        [`majors.${majorKey}`]: increment(1),
        [`majorLabels.${majorKey}`]: answers.major,
        updatedAt: serverTimestamp()
      },
      { merge: true }
    );
  });
}
