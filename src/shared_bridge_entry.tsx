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

const shadow = host.attachShadow({ mode: 'open' })
const style = document.createElement('style')
style.textContent = knightedCss
shadow.appendChild(style)

const mount = document.createElement('div')
shadow.appendChild(mount)

createRoot(mount).render(<SharedBridgePanel location="shadow" />)
