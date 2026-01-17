import type { FC } from 'react'

import './native_css_badge.css'

export type NativeCssBadgeProps = {
  label?: string
}

export const NativeCssBadge: FC<NativeCssBadgeProps> = ({
  label = 'Native CSS (global)',
}) => (
  <div className="native-css-badge" data-kind="native-css">
    <span className="native-css-badge__tag">native css</span>
    <p className="native-css-badge__label">{label}</p>
  </div>
)
