# @knighted/jsx + @knighted/css Demo

A small demo app showing how [`@knighted/jsx`](https://github.com/knightedcodemonkey/jsx) and [`@knighted/css`](https://github.com/knightedcodemonkey/css) let a Lit custom element host a React subtree while keeping styles scoped inside the shadow DOM. Bundled with Rspack.

## What it does

- Registers a Lit element that mounts a React tree via `reactJsx` inside its shadow root.
- Demonstrates three styling approaches for the React children: CSS modules (native CSS), Sass, and vanilla-extract (via `@knighted/css` loader).
- Includes an extra React component rendered outside the Lit host to show vanilla-extract in a plain React context.
- Highlights the stable selector workflow from `@knighted/css` through the `StableShowcase` component.

## Getting started

```sh
npm install
npm run dev  # serves on http://localhost:4173
npm run build
```

> [!NOTE]
> `npm install` automatically runs `npx @knighted/jsx init` to install the WASM parser and `npm run types:css` to generate the `@knighted/css` stable selector types via `postinstall`.

## Notes on bundle size

`@knighted/jsx` ships a WASM parser to enable JSX-like tagged template syntax at runtime. This adds ~1.6 MB of WASM (plus a small chunk) to the bundle; Rspack will warn about asset size. The warnings are expected for this demo.

## Key scripts

- `npm run dev` – Rspack dev server
- `npm run build` – production build (copies `public` to `dist`)
- `npm run check-types` – TypeScript type check
- `npm run lint` – oxlint over `src`
- `npm run format` / `format:check` – Prettier
- `npm run types:css` – regenerates `.knighted-css` selector modules (also runs on `postinstall`)

## Stable selector demo

[`src/components/stable_showcase.tsx`](src/components/stable_showcase.tsx) and [`src/components/stable_showcase.module.scss`](src/components/stable_showcase.module.scss) pair a CSS Module with the generated selector metadata from [`@knighted/css/generate-types`](https://github.com/knightedcodemonkey/css). The double-extension import (`.module.scss.knighted-css.ts`) supplies the stable selector tokens that TypeScript understands, and `mergeStableClass({ hashed: styles, selectors })` keeps the runtime class names in sync. Running `npm run types:css` produces the selector manifest so the Lit host can continue importing `?knighted-css` for shadow DOM styling while React enjoys typed class names.

## Structure

- `src/lit_host.ts` – Lit custom element that mounts the React tree via `reactJsx`
- `src/components/` – React components (CSS modules, Sass, vanilla-extract)
- `public/` – HTML entry
- `rspack.config.js` – Build configuration with `@knighted/css` loader and SWC
