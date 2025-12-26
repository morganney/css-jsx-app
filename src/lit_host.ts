import { reactJsx } from '@knighted/jsx/react'
import { asKnightedCssCombinedModule } from '@knighted/css/loader-helpers'
import { createRoot, type Root } from 'react-dom/client'
import { LitElement, html, unsafeCSS, type PropertyValues } from 'lit'
import { customElement } from 'lit/decorators.js'

import * as nativeBadgeModule from './components/native_badge.js?knighted-css&combined&named-only'
import * as sassRibbonModule from './components/sass_ribbon.js?knighted-css&combined&named-only'
import * as stableShowcaseModule from './components/stable_showcase.js?knighted-css&combined&named-only'
import * as vePillModule from './components/ve_pill.js?knighted-css&combined&named-only'

import { hostChrome } from './host_chrome.js'

const { NativeBadge, knightedCss: nativeCss } =
  asKnightedCssCombinedModule<typeof import('./components/native_badge.js')>(
    nativeBadgeModule,
  )
const { SassRibbon, knightedCss: sassCss } =
  asKnightedCssCombinedModule<typeof import('./components/sass_ribbon.js')>(
    sassRibbonModule,
  )
const { StableShowcase, knightedCss: stableCss } =
  asKnightedCssCombinedModule<typeof import('./components/stable_showcase.js')>(
    stableShowcaseModule,
  )
const { VePill, knightedCss: veCss } =
  asKnightedCssCombinedModule<typeof import('./components/ve_pill.js')>(vePillModule)

@customElement('css-react-host')
export class CssReactHost extends LitElement {
  static styles = [
    unsafeCSS(nativeCss),
    unsafeCSS(sassCss),
    unsafeCSS(stableCss),
    unsafeCSS(veCss),
    hostChrome,
  ]

  static properties = {
    headline: { type: String },
  }

  declare headline: string
  #reactRoot?: Root

  firstUpdated(): void {
    this.#mountReact()
  }

  disconnectedCallback(): void {
    this.#reactRoot?.unmount()
    super.disconnectedCallback()
  }

  #mountReact(): void {
    if (!this.#reactRoot) {
      const outlet = this.renderRoot.querySelector(
        '[data-react-root]',
      ) as HTMLDivElement | null
      if (!outlet) return
      this.#reactRoot = createRoot(outlet)
    }
    this.#renderReactTree()
  }

  #renderReactTree(): void {
    if (!this.#reactRoot) return
    const title = this.headline ?? 'Lit hosts a React tree styled three ways'
    /**
     * This build is not using @knighted/jsx/loader, so the reactJsx() call
     * is parsed at runtime and produces the React element tree on the fly.
     * In a real app, you could precompile this with the loader.
     */
    this.#reactRoot.render(reactJsx`
      <div className="react-area" role="list">
        <${NativeBadge} label={${title}} />
        <${SassRibbon} />
        <${StableShowcase} />
        <${VePill} />
      </div>
    `)
  }

  protected updated(changed: PropertyValues<this>): void {
    super.updated(changed)
    if (changed.has('headline')) {
      this.#renderReactTree()
    }
  }

  render() {
    return html`
      <section class="shell">
        <header>
          <h1>Lit host + React children</h1>
          <p>
            React is rendered inside the shadow DOM via reactJsx, while each child
            component's CSS is surfaced through @knighted/css for true shadow scoping.
          </p>
        </header>
        <div data-react-root></div>
      </section>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'css-react-host': CssReactHost
  }
}
