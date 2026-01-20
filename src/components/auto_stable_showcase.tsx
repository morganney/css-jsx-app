import type { FC } from 'react'

import { mergeStableClass } from '@knighted/css/stableSelectors'
import stableSelectors from './auto_stable_showcase.module.scss.knighted-css.js'
import * as styles from './auto_stable_showcase.module.scss'

export type AutoStableShowcaseProps = {
  location?: 'light' | 'shadow'
  stableToken: typeof stableSelectors.panel
}

export const AutoStableShowcase: FC<AutoStableShowcaseProps> = ({
  location = 'light',
  stableToken,
}) => {
  const locationLabel = location === 'shadow' ? 'Shadow DOM' : 'Light DOM'
  const merged = mergeStableClass({ hashed: styles, selectors: stableSelectors })

  return (
    <article
      className={merged.panel}
      data-kind="auto-stable"
      data-location={location}
      data-hash={styles.panel}
    >
      <span className={merged.kicker}>auto-stable</span>
      <h3 className={merged.title}>Auto-stable selectors</h3>
      <p className={merged.copy}>
        This component merges hashed and stable selectors so one stylesheet works in both
        light DOM and shadow DOM.
      </p>
      <div className={merged.actions}>
        <button className={merged.button} type="button">
          {locationLabel}
        </button>
        <span className={merged.meta}>{stableToken}</span>
      </div>
    </article>
  )
}
