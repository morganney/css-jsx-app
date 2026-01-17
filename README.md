# @knighted/jsx + @knighted/css Demo

A small demo app showing how [`@knighted/jsx`](https://github.com/knightedcodemonkey/jsx) and [`@knighted/css`](https://github.com/knightedcodemonkey/css) let a Lit custom element host a React subtree while keeping styles scoped inside the shadow DOM, plus a light-DOM surface that reuses the same styles. Bundled with Rspack.

> [!TIP]
> Check out the [Node.js SSR + Hydration](https://github.com/morganney/jsx-node-playground) and [@knighted/jsx/loader](https://github.com/morganney/jsx-loader-demo) demos too.

## What it does

- Registers a Lit element that mounts a React tree via `reactJsx` inside its shadow root.
- Demonstrates native CSS, CSS Modules, Sass/SCSS, Less, and vanilla-extract inside the shadow DOM using `@knighted/css`.
- Renders a light-DOM section that reuses the same auto-stable stylesheet via `mergeStableClass`.
- Uses the unified `.knighted-css` proxy imports for a cleaner DX (with one `?knighted-css&combined` example kept for comparison).

## Getting started

```sh
npm install
npm run dev  # serves on http://localhost:4173
npm run build
```

> [!NOTE]
> `npm install` automatically runs `npm run types:css` to generate the `@knighted/css` stable selector types via `postinstall`.

## Key scripts

- `npm run dev` – Rspack dev server
- `npm run build` – production build (copies `public` to `dist`)
- `npm run check-types` – TypeScript type check
- `npm run lint` – oxlint over `src`
- `npm run format` / `format:check` – Prettier
- `npm run types:css` – regenerates `.knighted-css` selector modules (also runs on `postinstall`)

## Stable selector demo

[`src/components/auto_stable_showcase.tsx`](src/components/auto_stable_showcase.tsx) and [`src/components/auto_stable_showcase.module.scss`](src/components/auto_stable_showcase.module.scss) show the auto-stable workflow. The double-extension import (`.module.scss.knighted-css.ts`) supplies stable selector tokens that TypeScript understands, and `mergeStableClass({ hashed: styles, selectors })` keeps the runtime class names in sync so the same stylesheet works in light and shadow DOM. Running `npm run types:css` produces the selector manifest.

## Structure

- `src/lit_host.ts` – Lit custom element that mounts the shadow DOM React tree
- `src/index.tsx` – Light DOM entry and mounts
- `src/components/` – React components (native CSS, CSS Modules, Sass/SCSS, Less, vanilla-extract, auto-stable)
- `public/` – HTML entry
- `rspack.config.js` – Build configuration with `@knighted/css` loader and SWC
