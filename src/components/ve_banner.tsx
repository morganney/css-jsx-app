import type { FC } from 'react'

import { badge, banner, detail, heading } from './ve_banner.css.js'

export type VeBannerProps = {
  title?: string
  blurb?: string
}

export const VeBanner: FC<VeBannerProps> = ({
  title = 'Vanilla-extract rendered outside the Lit host',
  blurb = 'This component mounts on the page root to show the build also works in plain React land.',
}) => (
  <section className={banner} data-kind="vanilla-extract-outer">
    <div>
      <p className={badge}>extra react</p>
      <h2 className={heading}>{title}</h2>
      <p className={detail}>{blurb}</p>
    </div>
  </section>
)
