import type { FC } from 'react'

import * as styles from './native_badge.module.css'

export type NativeBadgeProps = {
  label?: string
}
/**
 * NOTE: Using stable selectors for CSS Modules.
 * This is necessary for CSS Modules because @knighted/css loader
 * compiles the raw CSS before the bundler transforms the class names.
 *
 * Another option would have been to configure the bundler to not
 * transform the class names.
 */
export const NativeBadge: FC<NativeBadgeProps> = ({
  label = 'CSS Modules (native css)',
}) => (
  <div className={`${styles.badge} badge`} data-kind="css-modules">
    <span className={`${styles.token} token`}>native css</span>
    <span className={`${styles.label} label`}>{label}</span>
  </div>
)
