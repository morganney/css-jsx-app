import { mergeStableClass } from '@knighted/css/stableSelectors'
import { reactJsx } from '@knighted/jsx/react'
import type { FC } from 'react'

import { stableSelectors } from './stable_showcase.scss.knighted-css.js'

import './stable_showcase.scss'

const baseClasses: Record<keyof typeof stableSelectors, string> = {
  card: 'stable-card',
  tag: 'stable-card__tag',
  title: 'stable-card__title',
  copy: 'stable-card__copy',
  cta: 'stable-card__cta',
}

export const StableShowcase: FC = () => {
  const merged = mergeStableClass({ hashed: baseClasses, selectors: stableSelectors })

  return reactJsx`
    <article className=${merged.card} data-kind="stable-selectors">
      <p className=${merged.tag}>Double-extension</p>
      <h3 className=${merged.title}>
        Stable selectors without query suffixes
      </h3>
      <p className=${merged.copy}>
        Importing <code>.scss.knighted-css</code> modules keeps TypeScript aware of the literal
        class names while <code>?knighted-css</code> continues to deliver the runtime stylesheet
        for the shadow host.
      </p>
      <button className=${merged.cta} type="button">
        Inspect selectors
      </button>
    </article>
  `
}
