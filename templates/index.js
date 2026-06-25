/**
 * CV template registry.
 *
 * Templates are plain ES module exports so a template can be added by creating
 * another module and importing it here. Each template receives a rendering
 * context from index.html instead of reaching into application state directly.
 */

const baseColorFields = [
  ['page', 'Page background'],
  ['header', 'Header background'],
  ['accent', 'Accent / rules'],
  ['name', 'Name'],
  ['headline', 'Headline'],
  ['contact', 'Contact'],
  ['sectionHeading', 'Section headings'],
  ['label', 'Labels'],
  ['body', 'Body text'],
];

const baseFontFields = [
  ['headers', 'Headers'],
  ['paragraphs', 'Paragraphs'],
  ['labels', 'Labels'],
];

const baseStyleFields = {
  colors: baseColorFields,
  fonts: baseFontFields,
};

export const modern = {
  name: 'Modern',
  cssClass: 'template-modern',
  styleFields: baseStyleFields,
  render: ({ page, headerHtml, sectionsHtml }) => page('template-modern', headerHtml() + sectionsHtml()),
};

export const classic = {
  name: 'Classic',
  cssClass: 'template-classic',
  styleFields: baseStyleFields,
  render: ({ page, headerHtml, sectionsHtml }) => page('template-classic', headerHtml() + sectionsHtml()),
};

export const minimal = {
  name: 'Minimal',
  cssClass: 'template-minimal',
  styleFields: baseStyleFields,
  render: ({ page, headerHtml, sectionsHtml }) => page('template-minimal', headerHtml() + sectionsHtml()),
};

export const sidebar = {
  name: 'Sidebar',
  cssClass: 'template-sidebar',
  styleFields: {
    colors: [
      ...baseColorFields.slice(0, 2),
      ['sidebar', 'Sidebar background'],
      ...baseColorFields.slice(2),
    ],
    fonts: baseFontFields,
  },
  render: ({ headerHtml, sectionsHtml, styleVars, escapeHtml }) => (
    `<article class="cv-page template-sidebar" style="${escapeHtml(styleVars())}">` +
    `<div class="cv-inner"><aside class="side">${headerHtml()}</aside>` +
    `<main class="main">${sectionsHtml()}</main></div></article>`
  ),
};

export const templates = {
  modern,
  classic,
  minimal,
  sidebar,
};
