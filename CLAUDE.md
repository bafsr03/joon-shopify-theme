# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A Shopify **Trade theme (v15.4.1)** export for the Joon Distribution store — a B2B wholesale/distribution shop (vape/cannabis products). This is a pure Shopify Liquid theme with no build system; files are deployed directly to Shopify via the Shopify CLI or Admin.

## Development Commands

There is no `package.json` or local build step. Development is done through the Shopify CLI:

```bash
# Push theme to Shopify (requires Shopify CLI + authenticated store)
shopify theme push

# Pull latest theme from Shopify
shopify theme pull

# Serve theme locally with live preview
shopify theme dev

# Validate theme with Theme Check linter
shopify theme check
```

## Architecture

### Directory Structure

- **`layout/`** — Master HTML shells. `theme.liquid` is the root layout wrapping all pages; `password.liquid` is the storefront password page.
- **`templates/`** — One per page type (product, collection, index, cart, etc.). Most are JSON files that declare which sections appear on the page. A few are Liquid (gift card, robots.txt).
- **`sections/`** — Page-building blocks. Each section has a `{% schema %}` tag defining its settings and can be added/reordered via the theme editor. `header-group.json` and `footer-group.json` declare header/footer section groups.
- **`snippets/`** — Reusable Liquid partials rendered via `{% render 'snippet-name' %}`. No schema; logic only.
- **`assets/`** — All CSS, JS, and SVG files served as-is. No bundling or transpilation.
- **`config/`** — `settings_schema.json` defines all theme customizer options; `settings_data.json` holds the live saved values.
- **`locales/`** — Translation files for 26 languages. Settings translations use `.schema.json` suffix.
- **`.shopify/metafields.json`** — Defines product metafield definitions used for filtering (vaping style, flavor, allergen info, etc.).

### JavaScript Pattern

All JavaScript uses **vanilla JS Web Components** — no framework. Components are defined with `customElements.define()` and live in `assets/*.js`. The pub/sub event system in `assets/pubsub.js` is used for cross-component communication (e.g., variant selection updates product price, media gallery, add-to-cart button state simultaneously).

Key components:
- `product-info.js` — Variant selection, price updates, pickup availability
- `cart-drawer.js` — Slide-out cart
- `facets.js` — Collection filtering/sorting
- `quick-add-bulk.js` — B2B bulk add-to-cart

### CSS Pattern

Component-scoped CSS files (`component-*.css`) are loaded per-section via `{{ 'component-card.css' | asset_url | stylesheet_tag }}` inside the section Liquid file — only loaded when the section is present. Base styles live in `base.css`.

Sections inject scoped padding styles using:
```liquid
{% style %}
  .section-{{ section.id }}-padding { padding-top: {{ section.settings.padding_top }}px; }
{% endstyle %}
```

### Color Schemes

Five color schemes (`scheme-1` through `scheme-5`) are defined in `config/settings_data.json` and referenced as CSS variables (`--color-background`, `--color-foreground`, etc.). Sections and blocks accept a `color_scheme` setting to switch between them.

### Localization

All user-facing strings use `{{ 'key.path' | t }}` translation filters referencing `locales/en.default.json`. When adding new strings, add them to all locale files or at minimum `en.default.json`.
