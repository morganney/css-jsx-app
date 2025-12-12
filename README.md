# CSS + JSX Lit Host Demo

A small demo app showing how [`@knighted/jsx`](https://github.com/knightedcodemonkey/jsx) and [`@knighted/css`](https://github.com/knightedcodemonkey/css) let a Lit custom element host a React subtree while keeping styles scoped inside the shadow DOM. Bundled with Rspack.

## What it does

- Registers a Lit element that mounts a React tree via `reactJsx` inside its shadow root.
- Demonstrates three styling approaches for the React children: CSS modules (native CSS), Sass, and vanilla-extract (via `@knighted/css` loader).
- Includes an extra React component rendered outside the Lit host to show vanilla-extract in a plain React context.

## Getting started

```sh
npm install
npm run dev  # serves on http://localhost:4173
npm run build
```

## Notes on bundle size

`@knighted/jsx` ships a WASM parser to enable JSX-like tagged template syntax at runtime. This adds ~1.6 MB of WASM (plus a small chunk) to the bundle; Rspack will warn about asset size. The warnings are expected for this demo.

## Key scripts

- `npm run dev` – Rspack dev server
- `npm run build` – production build (copies `public` to `dist`)
- `npm run check-types` – TypeScript type check
- `npm run lint` – oxlint over `src`
- `npm run format` / `format:check` – Prettier

## Structure

- `src/lit_host.ts` – Lit custom element that mounts the React tree via `reactJsx`
- `src/components/` – React components (CSS modules, Sass, vanilla-extract)
- `public/` – HTML entry
- `rspack.config.js` – Build configuration with `@knighted/css` loader and SWC
