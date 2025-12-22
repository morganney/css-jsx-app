# TypeScript Issue: Query-Based Module Augmentations Are Ignored

## TL;DR

- Loader/bundler pipelines often rely on wildcard declarations (`declare module '*?query'`) so TypeScript accepts query-based imports, but those declarations can only expose very loose types.
- When a library later generates exact `declare module "./file.ext?query"` declarations with precise exports, TypeScript does not merge them with the wildcard definition, so the specific literal types never flow to users.

## Overview

- Project: [`css-jsx-app`](../)
- TypeScript: `5.9.3`
- Loader: `@knighted/css@1.0.0-rc.11`
- Compiler options: `"module": "NodeNext"`, `"moduleResolution": "NodeNext"`, `"jsx": "react-jsx"`

`@knighted/css` emits declaration files for every `?knighted-css&types` import (example: [.knighted-css/knt-0f09d8dac3f9.d.ts](../.knighted-css/knt-0f09d8dac3f9.d.ts)):

```ts
declare module '../src/components/stable_showcase.scss?knighted-css&types' {
  export const knightedCss: string
  export const stableSelectors: Readonly<{
    readonly card: 'knighted-card'
    readonly copy: 'knighted-copy'
    readonly cta: 'knighted-cta'
    readonly tag: 'knighted-tag'
    readonly title: 'knighted-title'
  }>
}
```

At the same time the package ships ambient wildcard declarations ([src/types/knighted-css-loader-queries.d.ts](../src/types/knighted-css-loader-queries.d.ts)) so TypeScript understands loader query imports in general:

```ts
declare module '*?knighted-css&types' {
  export const knightedCss: string
  export const stableSelectors: unknown
}
```

## Reproduction Steps

1. Clone this repository, check out the `wildcard-module-merging` branch, and run `npm install` in `css-jsx-app`.
2. Execute `npm run types:css` to regenerate the loader declarations (.knighted-css + src/types/index.d.ts).
3. Run `npm run check-types`.
4. Observe errors in [src/components/stable_showcase.tsx](../src/components/stable_showcase.tsx) when destructuring `stableSelectors` directly from `./stable_showcase.scss?knighted-css&types` (see the first block inside the component):
   ```
   error TS2339: Property 'card' does not exist on type 'unknown'.
   ```

## Expected Behavior

TypeScript should merge the specific `declare module "../src/components/stable_showcase.scss?knighted-css&types"` definition with the wildcard ambient declaration so that `stableSelectors` is inferred as the literal map emitted by the generator. No helper modules, casts, or registries should be required.

## Actual Behavior

The wildcard module definition takes precedence and `stableSelectors` remains `unknown`, even though a matching module declaration with the exact specifier is part of the program (see `npx tsc --noEmit --listFiles`). The first destructuring block inside [src/components/stable_showcase.tsx](../src/components/stable_showcase.tsx) keeps this broken state visible. That same file also includes the helper-based workaround so you can contrast the two behaviors.

## Workaround (What It Takes Today)

To get the "expected" behavior (i.e., `card`, `tag`, etc. type-check while `stableSelectors.foo` errors), we have to add custom plumbing on top of the generated declarations:

- A script parses every `.knighted-css/knt-*.d.ts` file and writes a registry type map (`scripts/sync-knighted-css-types.mjs` → [src/types/knighted-css-registry.d.ts](../src/types/knighted-css-registry.d.ts)).
- A helper `getStableSelectors(moduleId, selectors)` reads from that registry and casts the loader output to the literal map for that module ([src/utils/knightedCss.ts](../src/utils/knightedCss.ts)).

With those pieces in place, the second block inside `stable_showcase.tsx` looks like this:

```ts
const moduleId = '../src/components/stable_showcase.scss?knighted-css&types' as const
const selectors = getStableSelectors(moduleId, rawStableSelectors ?? {})
const { card, tag, title, copy, cta } = selectors // ✅ no errors
const foo = selectors.foo // ❌ TS2339: Property 'foo' does not exist
```

In other words, TypeScript can only report the useful diagnostic (`foo` missing) once we build and maintain a registry that mirrors the generator output—something the compiler could infer automatically if it merged the specific module declaration with the wildcard one.

## Why This Matters

- Loader-style specifiers (`./foo.scss?knighted-css&types`) are common in bundler ecosystems (webpack, Vite, Rspack, etc.).
- Libraries that generate declaration files for those imports cannot rely on TypeScript to use them, forcing each downstream app to layer bespoke tooling on top.
- The current workaround (registry + helper) undermines the DX benefits of the generated literals and adds maintenance overhead.

## Architectural Limitation (Current Understanding)

This behavior matches the "pattern ambient module" limitation described in long-running TypeScript issues such as [#38638](https://github.com/microsoft/TypeScript/issues/38638) and [#28097](https://github.com/microsoft/TypeScript/issues/28097):

1. **First-match wins:** once a wildcard declaration like `declare module '*?knighted-css&types'` is seen, TypeScript resolves matching imports to that declaration and never revisits literal declarations emitted later, so our generated `.d.ts` files are ignored.
2. **No merging between wildcard and literal modules:** TypeScript treats the wildcard declaration and the specific `declare module "../src/components/stable_showcase.scss?knighted-css&types"` as disjoint modules, so their exports are never combined even though they describe the same specifier.
3. **Silent fallback to loose types:** because the wildcard declaration compiles fine, TypeScript never emits an error—it just resolves `stableSelectors` as `unknown` (similar to the `*?raw` example in #38638), so consumers think they have types when they actually lost them.

Known workarounds in 2025 include:

- **Virtual file redirection:** rewrite imports to generated barrel files (e.g., `import selectors from './.generated/stable_showcase.scss'`) so the wildcard is never consulted.
- **Constrain the wildcard:** scope the ambient declaration to narrower patterns, though this breaks down for general-purpose loaders.
- **Double-extension trick:** use filenames such as `stable_showcase.scss.knighted-css.ts` instead of query strings so TypeScript treats them as ordinary modules, sacrificing the existing bundler conventions.

None of these approaches allow `@knighted/css` (or any other loader-driven tool) to deliver literal selector types while preserving the natural `?knighted-css&types` import syntax.

## Minimal Package Changes Already Attempted

- Canonical module specifiers: the generator emits declarations using the exact specifier TypeScript resolves for the import (relative path from the declaration directory plus the normalized query string).
- Deleting the wildcard declaration is not an option because TypeScript would no longer recognize any `?knighted-css` import at all.

## Request

Enhance TypeScript’s module resolution / declaration merging so that a specific `declare module "./foo.css?query"` overrides (or augments) the wildcard `declare module '*?query'` entries when both are present. That would allow libraries to ship precise typings for loader query imports without depending on custom registries or runtime casts.
