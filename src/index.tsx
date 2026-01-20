import './lit_host.js'

import { createRoot } from 'react-dom/client'
import { asKnightedCssCombinedModule } from '@knighted/css/loader-helpers'
import { AutoStableShowcase } from './components/auto_stable_showcase.js'
import stableSelectors from './components/auto_stable_showcase.module.scss.knighted-css.js'
import * as sharedBridgeModule from './components/shared_bridge_panel.js?knighted-css&combined&named-only'
import { VeBanner } from './components/ve_banner.js'

const { SharedBridgePanel, knightedCss: sharedBridgeCss } =
  asKnightedCssCombinedModule<typeof import('./components/shared_bridge_panel.js')>(
    sharedBridgeModule,
  )
const mountHost = () => {
  const app = document.getElementById('app')
  if (!app) return
  if (!app.querySelector('css-react-host')) {
    const host = document.createElement('css-react-host')
    host.setAttribute('headline', 'CSS Modules badge (hashed class names)')
    app.appendChild(host)
  }
}

const mountExtraReact = () => {
  const extraRoot = document.getElementById('extra-react-root')
  if (!extraRoot) return
  if (!extraRoot.dataset.mounted) {
    extraRoot.dataset.mounted = 'true'
    const styleId = 'shared-bridge-css'
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style')
      style.id = styleId
      style.textContent = sharedBridgeCss
      document.head.appendChild(style)
    }
    const root = createRoot(extraRoot)
    root.render(
      <section className="light-shell" aria-label="Light DOM examples">
        <header>
          <h2>Light DOM components</h2>
          <p>
            Auto-stable selectors and vanilla-extract styles render in the document root
            without a shadow boundary.
          </p>
        </header>
        <div className="light-grid">
          <AutoStableShowcase location="light" stableToken={stableSelectors.panel} />
          <VeBanner
            title="Vanilla-extract outside the shadow DOM"
            blurb="This React component proves the vanilla-extract build works without Lit, too."
          />
          <SharedBridgePanel location="light" />
        </div>
      </section>,
    )
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    mountHost()
    mountExtraReact()
  })
} else {
  mountHost()
  mountExtraReact()
}
