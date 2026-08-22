# Canvas Announcement Widgets

This directory includes two self-contained iframe widgets designed for Canvas announcements:

- `canvas-widget.html` - Standard card layout for weekly updates and a clear call to action.
- `canvas-widget-compact.html` - Condensed version for tighter announcement spaces.

Both widgets include:

- A welcome headline for 110
- Brief supporting text for weekly updates
- A CTA button linking to the repository
- A JavaScript-populated `Updated:` timestamp using local datetime

## Standard widget embed (recommended height ~240)

```html
<iframe
  src="https://quinna-create.github.io/110splashpage/widgets/canvas-widget.html"
  width="100%"
  height="240"
  style="border:0; overflow:hidden;"
  loading="lazy"
  title="110 weekly updates widget">
</iframe>
```

## Compact widget embed (recommended height ~120)

```html
<iframe
  src="https://quinna-create.github.io/110splashpage/widgets/canvas-widget-compact.html"
  width="100%"
  height="120"
  style="border:0; overflow:hidden;"
  loading="lazy"
  title="110 weekly updates widget compact">
</iframe>
```

## GitHub Pages requirement

To embed these files in Canvas, enable GitHub Pages for this repository. The URL format is typically:

`https://quinna-create.github.io/110splashpage/widgets/<file-name>.html`

## Troubleshooting

Some Canvas instances restrict iframe sources by domain policy. If the widget does not render, verify whether your Canvas environment allows content from `github.io` domains.
