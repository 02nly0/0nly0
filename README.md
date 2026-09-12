# 0nly0

Personal link-in-bio / profile page.

## Structure

```
0nly0/
├── index.html              Main profile page (Home / Projects tabs)
├── 403.html                Access denied error page
├── 404.html                Not found error page
├── 500.html                Server error page
├── src/
│   ├── script.ts            TypeScript source — edit this, not the .js
│   └── types/
│       └── lucide.d.ts      Ambient type for the global `window.lucide`
├── tsconfig.json            TS compiler config (compiles src/ → assets/js/)
├── package.json             `npm run build` / `npm run watch`
├── assets/
│   ├── css/
│   │   └── style.css       All site styles (shared by every page)
│   ├── js/
│   │   ├── script.js       Compiled output — do not edit directly
│   │   └── script.js.map   Source map, for debugging in devtools
│   └── img/
│       └── avatar.jpg      Profile picture
└── legal/
    ├── privacy.html        Generic Privacy Policy template
    └── terms.html          Generic Terms of Service template
```

## TypeScript workflow

The site's behavior is written in TypeScript (`src/script.ts`) and compiled
to plain JS (`assets/js/script.js`), which is what every HTML page actually
loads — there's no bundler or dev server, so the compiled output is checked
into the repo and GitHub Pages keeps working with zero build step.

```bash
npm install       # one-time, installs the TypeScript compiler
npm run build     # compiles src/script.ts → assets/js/script.js
npm run watch     # recompiles automatically on save while you work
```

Always edit `src/script.ts`, run `npm run build`, then commit both the
`.ts` source and the regenerated `assets/js/script.js` (+ `.map`).

## Notes for future edits

- **Links / projects**: edit the marked blocks directly inside `index.html`
  (`#linksList` for social links, `#projectsGrid` for project cards).
- **Styling**: everything lives in `assets/css/style.css`, organized by
  section (tab nav, avatar, bio, links, projects, error pages, legal pages).
- **Font**: the site uses `JetBrains Mono`, loaded via Google Fonts in the
  `<head>` of every page.
- **Legal pages** (`legal/privacy.html`, `legal/terms.html`): generic
  templates meant to be reused across all my projects. Fill in
  `[PROJECT NAME]`, `[CONTACT EMAIL]`, and `[YEAR]` per project before
  publishing. They are **not** linked from the site nav on purpose — link to
  them directly from wherever they're needed (e.g. a Discord bot's ToS/
  Privacy fields, an app listing, etc.).
- **Adding a new page**: copy an existing page's `<head>` block (icon,
  font, `assets/css/style.css` link) so styling stays consistent, and use
  relative paths to `assets/` based on the new page's folder depth.
