import type { FC } from 'react'

import { badge, banner, detail } from './ve_banner.css.js'

export type VeBannerProps = {
  title?: string
  blurb?: string
}

export const VeBanner: FC<VeBannerProps> = ({
  title = 'vanilla-extract',
  blurb = 'styles in light and shadow DOM',
}) => (
  <div className={banner} data-kind="vanilla-extract">
    <span className={badge}>{title}</span>
    <span className={detail}>{blurb}</span>
  </div>
)
