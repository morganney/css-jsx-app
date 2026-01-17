import type { FC } from 'react'

import * as styles from './native_badge.module.css'

export type NativeBadgeProps = {
  label?: string
}
export const NativeBadge: FC<NativeBadgeProps> = ({ label = 'CSS Modules badge' }) => (
  <div className={`${styles.badge} badge`} data-kind="css-modules">
    <span className={`${styles.token} token`}>css modules</span>
    <span className={`${styles.label} label`}>{label}</span>
  </div>
)
