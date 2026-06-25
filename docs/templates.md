# CV Template Definition Guide

Templates live in `templates/index.js` as importable and exportable ES module
objects. The app imports the `templates` registry from that file and uses it to
populate the template picker, render the preview, and build the template style
controls in the editor sidebar.

## Template object shape

Each template must export an object with these fields:

```js
export const compact = {
  name: 'Compact',
  cssClass: 'template-compact',
  styleFields: {
    colors: [
      ['page', 'Page background'],
      ['accent', 'Accent / rules'],
      ['body', 'Body text'],
    ],
    fonts: [
      ['headers', 'Headers'],
      ['paragraphs', 'Paragraphs'],
    ],
  },
  render: ({ page, headerHtml, sectionsHtml }) => (
    page('template-compact', headerHtml() + sectionsHtml())
  ),
};
```

| Field | Required | Purpose |
| --- | --- | --- |
| `name` | Yes | Human-readable label shown in the template selector and style card title. |
| `cssClass` | Yes | CSS class used by the template and useful for documentation/testing. |
| `styleFields` | Recommended | Lists the color and font controls that appear in the editor sidebar for this template. |
| `render(context)` | Yes | Function that returns the HTML string for the CV preview. |

## Editor sidebar style fields

The editor sidebar reads the selected template's `styleFields` so each template
only exposes controls it actually uses. `styleFields.colors` and
`styleFields.fonts` are arrays of `[key, label]` pairs.

Supported color keys are defined by `defaultStyles()` in `index.html`:

- `page`
- `header`
- `sidebar`
- `accent`
- `name`
- `headline`
- `contact`
- `sectionHeading`
- `label`
- `body`

Supported font keys are:

- `headers`
- `paragraphs`
- `labels`

If a template uses a sidebar-specific color, include `['sidebar', 'Sidebar
background']` in its `styleFields.colors`. Templates that do not render a
sidebar should omit that control to keep the editor straightforward.

## Render context helpers

The app passes a context object to `render()` so templates do not need global
state:

| Helper | Use |
| --- | --- |
| `cvData` | Full normalized CV data object for advanced layouts. |
| `page(cssClass, body)` | Wraps template body HTML in the standard CV page structure. |
| `headerHtml()` | Renders the profile header. |
| `sectionsHtml()` | Renders all configured CV sections and entries. |
| `styleVars()` | Returns CSS custom properties for the selected colors and fonts. |
| `escapeHtml(value)` | Escapes custom text before inserting it into template HTML. |

Use `page()` when possible because it applies the shared `.cv-page` and
`.cv-inner` structure. Use `styleVars()` and `escapeHtml()` directly only when a
layout needs custom wrappers, such as the sidebar template.

## Adding a new template

1. Open `templates/index.js`.
2. Export a new template object with `name`, `cssClass`, `styleFields`, and
   `render(context)`.
3. Add that object to the exported `templates` registry.
4. Add CSS for its `cssClass` in `index.html` alongside the existing template
   styles.
5. Refresh the app; the template picker and editor sidebar style controls are
   populated from the registry.

Example:

```js
export const compact = {
  name: 'Compact',
  cssClass: 'template-compact',
  styleFields: {
    colors: [
      ['page', 'Page background'],
      ['accent', 'Accent / rules'],
      ['body', 'Body text'],
    ],
    fonts: [
      ['headers', 'Headers'],
      ['paragraphs', 'Paragraphs'],
    ],
  },
  render: ({ page, headerHtml, sectionsHtml }) => (
    page('template-compact', headerHtml() + sectionsHtml())
  ),
};

export const templates = {
  modern,
  classic,
  minimal,
  sidebar,
  compact,
};
```

Then add styles like:

```css
.template-compact .cv-inner { padding: 14mm; }
.template-compact .cv-name { font-size: 28px; }
```

## Template safety rules

- Always escape custom user text with `escapeHtml()` if you manually read from
  `cvData` and build HTML.
- Prefer the shared helpers (`headerHtml`, `sectionsHtml`, `page`) for normal CV
  sections so import/export JSON behavior stays consistent.
- Keep template modules free of editor or storage code; templates should only
  describe preview rendering and declare their editor sidebar style fields.
