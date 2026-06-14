# Sticky Block for Gutenberg

[![WordPress](https://img.shields.io/badge/WordPress-5.8%2B-21759B.svg)](https://wordpress.org/)
[![PHP](https://img.shields.io/badge/PHP-7.4%2B-777BB4.svg)](https://www.php.net/)
[![License](https://img.shields.io/badge/License-GPL--3.0--or--later-blue.svg)](https://www.gnu.org/licenses/gpl-3.0.html)

A Gutenberg container block that sticks to the top or bottom of the viewport as visitors scroll. Drop any blocks inside and they follow the reader down the page - no coding required.

---

## Requirements

- PHP 7.4 or higher
- WordPress 5.8 or higher
- Node.js + npm

---

## Local development setup

### 1. Install dependencies

```bash
npm install
```

### 2. Start the dev build watcher

```bash
npm run start
```

The block is compiled to `build/` and recompiled on every file change. Activate the plugin in WordPress and the changes are live immediately.

---

## npm scripts

| Command | Description |
|---|---|
| `npm run start` | Start the dev build watcher |
| `npm run build` | Production build |
| `npm run dist` | Production build + plugin zip into `dist/` |
| `npm run lint:js` | Lint JavaScript with ESLint |
| `npm run lint:css` | Lint SCSS with Stylelint |
| `npm run format` | Auto-format files |
| `npm run packages-update` | Update `@wordpress/scripts` and block dependencies |

---

## Project structure

```
├── src/                    - block source
│   ├── block.json          - block metadata and attributes
│   ├── index.js            - block registration
│   ├── edit.js             - editor UI and sidebar controls
│   ├── save.js             - saved markup
│   ├── frontend.js         - sticky logic (plain JS, no jQuery)
│   ├── editor.scss         - editor-only styles
│   └── style.scss          - frontend styles
├── build/                  - compiled output (committed)
├── docs/                   - in-plugin documentation page
├── dist/                   - release zip (git-ignored)
└── wpwing-sticky-block.php - plugin entry point
```

---

## Building a release zip

```bash
npm run dist
```

The zip is written to `dist/wpwing-sticky-block.zip`. It contains only distributable files - no `src/`, `node_modules/`, or dev config.
