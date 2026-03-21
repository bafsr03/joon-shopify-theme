---
name: front-style
description: Enforce Joon Distribution's design system — colors, typography, spacing, border radii, and component patterns — whenever creating or editing any frontend code (Liquid, HTML, CSS, JS).
---

Whenever you create or modify any frontend code (Liquid sections/snippets, HTML, CSS, JavaScript components), you MUST apply the Joon Distribution design system below. Do not use generic defaults or framework defaults — always match the tokens defined here.

---

## Color Palette

All colors come from the five theme color schemes. Use CSS variables when writing Liquid/theme files; use the hex values as reference when writing standalone CSS or HTML.

| Scheme | Role | Background | Text | Button fill | Button label |
|--------|------|-----------|------|-------------|--------------|
| scheme-1 | Primary / page bg | `#f4f4f4` | `#2b2c2d` | `#f5cf8a` | `#2b2c2d` |
| scheme-2 | White / card bg | `#ffffff` | `#262626` | `#f5cf8a` | `#2b2c2d` |
| scheme-3 | Orange accent | `#f2994b` | `#262626` | `#f5cf8a` | `#2b2c2d` |
| scheme-4 | Dark navy | `#1c2228` | `#ffffff` | `#f5cf8a` | `#2b2c2d` |
| scheme-5 | Dark slate | `#323841` | `#ffffff` | `#f5cf8a` | `#2b2c2d` |

**Key accent:** Gold/amber `#f5cf8a` — used for all primary button fills, highlights, and interactive accents.
**Shadow/deep tone:** `#001128` (dark navy) — used for shadows and secondary button labels on light schemes.
**Secondary muted text on light:** `#797572`.

In Liquid/theme CSS, always reference via CSS custom properties:
```css
color: rgb(var(--color-foreground));
background: rgb(var(--color-background));
background: rgb(var(--color-button));
color: rgb(var(--color-button-text));
```

---

## Typography

| Role | Font | Weight | Style |
|------|------|--------|-------|
| Headings | DM Sans | 500 (Medium) | Normal |
| Body | Jost | 400 (Regular) | Normal |

```css
/* In theme Liquid, always use the CSS vars: */
font-family: var(--font-heading-family); /* headings */
font-family: var(--font-body-family);    /* body */

/* Standalone CSS — use these stacks: */
font-family: 'DM Sans', sans-serif;   /* headings */
font-family: 'Jost', sans-serif;      /* body */
```

### Type Scale

| Class | Size (mobile) | Size (≥750px) |
|-------|-------------|--------------|
| `.hxxl` | clamp(5.6rem, 14vw, 7.2rem) | — |
| `.hxl` | 5rem | 6.2rem |
| `.h0` | 4rem | 5.2rem |
| `h1 / .h1` | 3rem | — |
| `h2 / .h2` | 2.4rem | — |
| `h3 / .h3` | 1.7rem | — |
| `h4 / .h4` | 1.5rem | — |
| body | 1.5rem | — |

- **Letter spacing (headings):** `calc(var(--font-heading-scale) * 0.06rem)`
- **Letter spacing (body):** `0.06rem`
- **Line height (headings):** `calc(1 + 0.3 / max(1, var(--font-heading-scale)))`
- **Line height (body):** `calc(1 + 0.8 / var(--font-body-scale))`
- **Heading color:** always `rgb(var(--color-foreground))`

---

## Spacing & Layout

- **Max page width:** `1200px` — use `max-width: var(--page-width); margin: 0 auto;`
- **Page padding:** `1.5rem` (mobile) → `5rem` (≥750px) → `5rem` (≥990px)
- **Grid gap:** `12px` horizontal, `12px` vertical (`--grid-desktop-horizontal-spacing`, `--grid-desktop-vertical-spacing`)
- **Section spacing:** `0` between sections (no extra margin between page sections)

```css
/* Standard container */
.page-width {
  max-width: var(--page-width);
  margin: 0 auto;
  padding: 0 1.5rem;
}
@media screen and (min-width: 750px) {
  .page-width { padding: 0 5rem; }
}
```

---

## Border Radii

| Element | Radius |
|---------|--------|
| Buttons | `6px` |
| Cards (product, collection, blog) | `8px` |
| Inputs / form fields | `6px` |
| Variant pills | `40px` (full pill) |
| Badges | `40px` (full pill) |
| Media / images | `8px` |
| Popups / modals | `8px` |
| Text boxes | `8px` |

---

## Buttons

- **Primary button:** bg `#f5cf8a` (gold), text `#2b2c2d`, radius `6px`, no border, no shadow.
- **Secondary button:** transparent / outline style, label `#001128` on light or `#ffffff` on dark.
- **No shadow** on buttons (`box-shadow: none`).
- **Border thickness:** `0` on primary buttons.

```css
/* Primary */
.button, button[type="submit"] {
  background-color: #f5cf8a;
  color: #2b2c2d;
  border-radius: 6px;
  border: none;
  font-family: 'DM Sans', sans-serif;
  font-weight: 500;
}
/* Secondary */
.button--secondary {
  background: transparent;
  color: #2b2c2d;
  border: 1px solid currentColor;
  border-radius: 6px;
}
```

---

## Cards

- **Style:** `card` type (elevated card look, not standard border).
- **Image padding:** `12px` inside the card frame.
- **Corner radius:** `8px`.
- **No drop shadow** (`shadow_opacity: 0`).
- **Text alignment:** left.
- **Background:** scheme-2 (`#ffffff`).
- **Border:** none (thickness 0).

---

## Inputs & Forms

- Border: `1px solid` at 55% opacity of foreground color.
- Radius: `6px`.
- No shadow.

```css
input, select, textarea {
  border: 1px solid rgba(var(--color-foreground), 0.55);
  border-radius: 6px;
  font-family: 'Jost', sans-serif;
  font-size: 1.5rem;
}
```

---

## Animations & Interactions

- **Scroll reveal:** enabled — use `data-animate` / CSS `@keyframes` reveal-on-scroll patterns already in the theme.
- **Hover:** use `default` hover behavior (scale or brightness change, not custom).
- Keep transitions subtle: `transition: opacity 0.3s ease, transform 0.3s ease`.

---

## CSS Conventions (Shopify Liquid pattern)

When writing section CSS in Liquid files:
1. Load component CSS via `{{ 'component-name.css' | asset_url | stylesheet_tag }}` at the top of the section.
2. Use scoped padding via the `{% style %}` block:
   ```liquid
   {% style %}
     .section-{{ section.id }}-padding {
       padding-top: {{ section.settings.padding_top }}px;
       padding-bottom: {{ section.settings.padding_bottom }}px;
     }
   {% endstyle %}
   ```
3. Never use inline styles for colors — always use CSS custom properties.
4. All color scheme classes: `color-scheme-1` through `color-scheme-5` — add to the section wrapper element.

---

## Overall Aesthetic

The Joon Distribution store is a **B2B wholesale** shop with a **clean, modern, dark-accented** look:
- Light neutral backgrounds (`#f4f4f4`, `#ffffff`) for most content areas.
- Dark panels (`#1c2228`, `#323841`) for hero sections, footers, featured areas.
- Gold/amber accent (`#f5cf8a`) sparingly for CTAs and highlights — never overuse it.
- Minimal use of orange (`#f2994b`) as a bold accent only (badges, special callouts).
- No gradients on backgrounds unless explicitly present.
- Clean grid layouts, generous whitespace, left-aligned text.
- Professional, not playful — avoid rounded illustrative elements, prefer sharp photography and clean type.
