import './lit_host.js'

import { createRoot } from 'react-dom/client'
import { AutoStableShowcase } from './components/auto_stable_showcase.js'
import { VeBanner } from './components/ve_banner.js'

const mountHost = () => {
  const app = document.getElementById('app')
  if (!app) return
  if (!app.querySelector('css-react-host')) {
    const host = document.createElement('css-react-host')
    host.setAttribute('headline', 'CSS Modules badge (native CSS syntax)')
    app.appendChild(host)
  }
}

const mountExtraReact = () => {
  const extraRoot = document.getElementById('extra-react-root')
  if (!extraRoot) return
  if (!extraRoot.dataset.mounted) {
    extraRoot.dataset.mounted = 'true'
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
          <AutoStableShowcase location="light" />
          <VeBanner
            title="Vanilla-extract outside the shadow DOM"
            blurb="This React component proves the vanilla-extract build works without Lit, too."
          />
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
