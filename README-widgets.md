# Course Widgets (Firebase + Canvas embed)

This repo now supports a multi-widget pattern:

- `widgets/` student-facing embeddable widgets (Canvas iframes)
- `dashboard/` instructor-facing aggregated results
- `js/` shared Firebase/client helpers
- `widgets.json` widget registry for dashboard

## 1) Firebase setup

1. Create a Firebase project
2. Enable **Firestore Database** (Production or Test mode)
3. In Firebase console, add a Web App and copy config values
4. Copy `js/firebase-config.example.js` to `js/firebase-config.js`
5. Paste your real Firebase config in `js/firebase-config.js`
6. In Firestore Rules, start from `firestore.rules.example`

## 2) Current widgets

- `widgets/poll-01.html` — beginning-of-class anonymous poll

## 3) Instructor dashboard

- Open `dashboard/index.html`
- It loads widget list from `widgets.json`
- It reads aggregate docs from `aggregates/{widgetId}`

## 4) Embed in Canvas

Embed the widget page URL (for example, via GitHub Pages):

- `.../widgets/poll-01.html`

## 5) Privacy notes

- Responses are anonymous by default
- No names/emails collected
- Aggregates stored separately for fast dashboard loading
