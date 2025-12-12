import './lit_host.js'

import { createRoot } from 'react-dom/client'
import { VeBanner } from './components/ve_banner.js'

const mountHost = () => {
  const app = document.getElementById('app')
  if (!app) return
  if (!app.querySelector('css-react-host')) {
    const host = document.createElement('css-react-host')
    host.setAttribute('headline', 'CSS Modules, Sass, and vanilla-extract together')
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
      <VeBanner
        title="Vanilla-extract outside the shadow DOM"
        blurb="This React component proves the vanilla-extract build works without Lit, too."
      />,
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
