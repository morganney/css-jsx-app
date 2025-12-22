/**
 * Local ambient declarations for knighted-css loader queries.
 * Stable selector typings come exclusively from generated declarations to keep them strict.
 */
declare module '*?knighted-css' {
  export const knightedCss: string
}

/**
 * Generated declaration files supply the `stableSelectors` export for specific modules.
 * The wildcard declaration only exposes the CSS payload so TypeScript flags missing selectors.
 */
declare module '*?knighted-css&types' {
  export const knightedCss: string
  export const stableSelectors: unknown
}

type KnightedCssCombinedModule<TModule> = TModule & { knightedCss: string }

declare module '*?knighted-css&combined' {
  const combined: KnightedCssCombinedModule<Record<string, unknown>>
  export default combined
  export const knightedCss: string
}

declare module '*?knighted-css&combined&named-only' {
  const combined: KnightedCssCombinedModule<Record<string, unknown>>
  export default combined
  export const knightedCss: string
}

declare module '*?knighted-css&combined&no-default' {
  const combined: KnightedCssCombinedModule<Record<string, unknown>>
  export default combined
  export const knightedCss: string
}

declare module '*?knighted-css&combined&types' {
  const combined: KnightedCssCombinedModule<Record<string, unknown>>
  export default combined
  export const knightedCss: string
  export const stableSelectors: unknown
}

declare module '*?knighted-css&combined&named-only&types' {
  const combined: KnightedCssCombinedModule<Record<string, unknown>>
  export default combined
  export const knightedCss: string
  export const stableSelectors: unknown
}

declare module '*?knighted-css&combined&no-default&types' {
  const combined: KnightedCssCombinedModule<Record<string, unknown>>
  export default combined
  export const knightedCss: string
  export const stableSelectors: unknown
}
