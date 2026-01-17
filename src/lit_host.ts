import { reactJsx } from '@knighted/jsx/react'
import { asKnightedCssCombinedModule } from '@knighted/css/loader-helpers'
import { createRoot, type Root } from 'react-dom/client'
import { LitElement, html, unsafeCSS, type PropertyValues } from 'lit'
import { customElement } from 'lit/decorators.js'

import {
  AutoStableShowcase,
  knightedCss as autoStableCss,
} from './components/auto_stable_showcase.knighted-css.js'
import * as lessChipModule from './components/less_chip.js?knighted-css&combined&named-only'
import * as nativeBadgeModule from './components/native_badge.js?knighted-css&combined&named-only'
import * as sassRibbonModule from './components/sass_ribbon.js?knighted-css&combined&named-only'
import * as veBannerModule from './components/ve_banner.js?knighted-css&combined&named-only'

import { hostChrome } from './host_chrome.js'

const { NativeBadge, knightedCss: nativeCss } =
  asKnightedCssCombinedModule<typeof import('./components/native_badge.js')>(
    nativeBadgeModule,
  )
const { LessChip, knightedCss: lessCss } =
  asKnightedCssCombinedModule<typeof import('./components/less_chip.js')>(lessChipModule)
const { SassRibbon, knightedCss: sassCss } =
  asKnightedCssCombinedModule<typeof import('./components/sass_ribbon.js')>(
    sassRibbonModule,
  )
const { VeBanner, knightedCss: veBannerCss } =
  asKnightedCssCombinedModule<typeof import('./components/ve_banner.js')>(veBannerModule)

@customElement('css-react-host')
export class CssReactHost extends LitElement {
  static styles = [
    unsafeCSS(nativeCss),
    unsafeCSS(lessCss),
    unsafeCSS(sassCss),
    unsafeCSS(autoStableCss),
    unsafeCSS(veBannerCss),
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

    this.#reactRoot.render(reactJsx`
      <div className="react-area" role="list">
        <${NativeBadge} label={${title}} />
        <${SassRibbon} />
        <${LessChip} />
        <${VeBanner}
          title="Vanilla-extract inside the shadow DOM"
          blurb="The same component can render inside the shadow root with scoped styles."
        />
        <${AutoStableShowcase} location="shadow" />
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
          <h1>Shadow DOM components</h1>
          <p>
            These React components render inside the shadow root and pull CSS from
            @knighted/css so the styles stay scoped.
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
