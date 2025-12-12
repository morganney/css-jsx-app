import type { FC } from 'react'

import * as styles from './native_badge.module.css'

export type NativeBadgeProps = {
  label?: string
}
export const NativeBadge: FC<NativeBadgeProps> = ({
  label = 'CSS Modules (native css)',
}) => (
  <div className={styles.badge} data-kind="css-modules">
    <span className={styles.token}>native css</span>
    <span className={styles.label}>{label}</span>
  </div>
)
