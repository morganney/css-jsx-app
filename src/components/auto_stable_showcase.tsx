import type { FC } from 'react'

import { mergeStableClass } from '@knighted/css/stableSelectors'
import stableSelectors from './auto_stable_showcase.module.scss.knighted-css.js'
import styles from './auto_stable_showcase.module.scss'

export type AutoStableShowcaseProps = {
  location?: 'light' | 'shadow'
}

export const AutoStableShowcase: FC<AutoStableShowcaseProps> = ({
  location = 'light',
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
        This component uses only stable selector tokens and relies on the loader to mirror
        them into the compiled CSS.
      </p>
      <div className={merged.actions}>
        <button className={merged.button} type="button">
          {locationLabel}
        </button>
        <span className={merged.meta}>{stableSelectors.panel}</span>
      </div>
    </article>
  )
}
