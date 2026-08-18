# Course Widgets (Firebase + Canvas embed)

This repo supports a multi-widget pattern:

- `widgets/` student-facing embeddable widgets (Canvas iframes)
- `dashboard/` instructor-facing aggregated results
- `js/` shared Firebase/client helpers
- `widgets.json` widget registry for dashboard

## Live URLs (after GitHub Pages is enabled)

- Poll widget: `https://quinna-create.github.io/110splashpage/widgets/poll-01.html`
- Instructor dashboard: `https://quinna-create.github.io/110splashpage/dashboard/index.html`
- Canvas snippet file: `https://quinna-create.github.io/110splashpage/canvas-embed-snippet.html`

## 1) Firebase setup (step-by-step)

### A. Create project + Firestore

1. Go to: https://console.firebase.google.com/
2. Create/open your Firebase project
3. In the left sidebar, click **Firestore Database**
4. Click **Create database** (if not already created)
5. Choose a region and create it

### B. Get config values and fill `js/firebase-config.js`

1. In Firebase, click the **gear icon** → **Project settings**
2. Scroll to **Your apps**
   - If you do not yet have a web app, click **</> Add app** and register one.
3. In the app section, find **SDK setup and configuration** and choose **Config**
4. Copy the values shown in the object:
   - `apiKey`
   - `authDomain`
   - `projectId`
   - `storageBucket`
   - `messagingSenderId`
   - `appId`
5. Open `js/firebase-config.js` in this repo and replace:
   - `PASTE_API_KEY_HERE`
   - `PASTE_PROJECT_ID`
   - `PASTE_MESSAGING_SENDER_ID`
   - `PASTE_APP_ID`

### C. Apply Firestore rules

1. In Firebase sidebar: **Firestore Database** → **Rules**
2. Open `firestore.rules.example` in this repo
3. Copy all text
4. Paste into Firebase Rules editor
5. Click **Publish**

## 2) GitHub Pages setup

1. GitHub repo → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: `main` and folder `/ (root)`
4. Save

## 3) Embed in Canvas

Use this iframe in a Canvas announcement/page HTML editor:

```html
<iframe
  src="https://quinna-create.github.io/110splashpage/widgets/poll-01.html"
  width="100%"
  height="900"
  style="border:0;"
  loading="lazy"
  referrerpolicy="no-referrer">
</iframe>
```

## 4) View results

Open:

- `https://quinna-create.github.io/110splashpage/dashboard/index.html`

## 5) Privacy notes

- Responses are anonymous by default
- No names/emails collected
- Aggregates stored separately for fast dashboard loading
