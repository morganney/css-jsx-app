import { createRoot } from 'react-dom/client'
import { asKnightedCssCombinedModule } from '@knighted/css/loader-helpers'
import * as sharedBridgeModule from './components/shared_bridge_panel.js?knighted-css&combined&named-only'

const { SharedBridgePanel, knightedCss } =
  asKnightedCssCombinedModule<typeof import('./components/shared_bridge_panel.js')>(
    sharedBridgeModule,
  )
const host = getOrCreateBridgeRoot()

function getOrCreateBridgeRoot(): HTMLElement {
  const existing = document.getElementById('bridge-root')
  if (existing) {
    return existing
  }
  const element = document.createElement('div')
  element.id = 'bridge-root'
  document.body.appendChild(element)
  return element
}

const shadow = host.shadowRoot ?? host.attachShadow({ mode: 'open' })
const styleId = 'bridge-styles'
const existingStyle = shadow.getElementById(styleId)
if (!existingStyle) {
  const style = document.createElement('style')
  style.id = styleId
  style.textContent = knightedCss
  shadow.appendChild(style)
} else {
  existingStyle.textContent = knightedCss
}

const mountId = 'bridge-mount'
let mount = shadow.getElementById(mountId)
if (!mount) {
  mount = document.createElement('div')
  mount.id = mountId
  shadow.appendChild(mount)
}

createRoot(mount).render(<SharedBridgePanel location="shadow" />)
