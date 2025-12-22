import { mergeStableClass } from '@knighted/css/stableSelectors'
import { reactJsx } from '@knighted/jsx/react'
import type { FC } from 'react'

import selectors from './stable_showcase.module.scss.knighted-css.js'
import styles from './stable_showcase.module.scss'

export const StableShowcase: FC = () => {
  const merged = mergeStableClass({ hashed: styles, selectors })

  return reactJsx`
    <article className={${merged.card}} data-kind="stable-selectors">
      <p className={${merged.tag}}>Double-extension</p>
      <h3 className={${merged.title}}>
        Stable selectors without query suffixes
      </h3>
      <p className={${merged.copy}}>
        Importing <code>.module.scss.knighted-css</code> keeps TypeScript aware of the literal
        selector tokens while <code>?knighted-css</code> continues to deliver the runtime stylesheet
        for the shadow host.
      </p>
      <button className={${merged.cta}} type="button">
        Inspect selectors
      </button>
    </article>
  `
}
