import type { FC } from 'react'

import { badge, copy, pill } from './ve_pill.css.js'

export type VePillProps = {
  message?: string
}

export const VePill: FC<VePillProps> = ({
  message = 'vanilla-extract for typed styles',
}) => (
  <div className={pill} data-kind="vanilla-extract">
    <span className={badge}>vanilla-extract</span>
    <span className={copy}>{message}</span>
  </div>
)
