import { reactJsx } from '@knighted/jsx/react'

import { stableSelectors as rawStableSelectors } from './stable_showcase.scss?knighted-css&types'
import { getStableSelectors } from '../utils/knightedCss.js'

const moduleId = '../src/components/stable_showcase.scss?knighted-css&types' as const

export function StableShowcase() {
  // ❌ This is the scenario we want TypeScript to support without extra tooling.
  const {
    card: rawCard,
    tag: rawTag,
    title: rawTitle,
    copy: rawCopy,
    cta: rawCta,
  } = rawStableSelectors ?? {}
  void rawCard
  void rawTag
  void rawTitle
  void rawCopy
  void rawCta

  // ✅ Helper + registry workaround to regain literal selector types.
  const selectors = getStableSelectors(moduleId, rawStableSelectors ?? {})
  const { card, tag, title, copy, cta } = selectors

  // ❌ Even with the workaround, invalid selectors still error (as expected).
  const impossibleSelector = selectors.foo
  void impossibleSelector

  return reactJsx`
    <article className="${card} stable-showcase" data-kind="stable">
      <span className="${tag} stable-showcase__tag">stable selectors</span>
      <h2 className="${title} stable-showcase__title">Typed styles from Sass</h2>
      <p className="${copy} stable-showcase__copy">
        The @knighted/css stable mixins emit named selectors that stay predictable at runtime,
        and this component consumes the generated TypeScript map to stay in sync with the CSS.
      </p>
      <button className="${cta} stable-showcase__cta" type="button">
        Inspect selectors
      </button>
    </article>
  `
}
