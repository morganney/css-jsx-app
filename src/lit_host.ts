import { reactJsx } from '@knighted/jsx/react'
import { asKnightedCssCombinedModule } from '@knighted/css/loader-helpers'
import { createRoot, type Root } from 'react-dom/client'
import { LitElement, html, unsafeCSS, type PropertyValues } from 'lit'
import { customElement } from 'lit/decorators.js'

import {
  AutoStableShowcase,
  knightedCss as autoStableCss,
  stableSelectors,
} from './components/auto_stable_showcase.knighted-css.js'
import { LessChip, knightedCss as lessCss } from './components/less_chip.knighted-css.js'
import {
  NativeBadge,
  knightedCss as nativeCss,
} from './components/native_badge.knighted-css.js'
import {
  NativeCssBadge,
  knightedCss as nativeCssBadgeCss,
} from './components/native_css_badge.knighted-css.js'
import {
  SassRibbon,
  knightedCss as sassCss,
} from './components/sass_ribbon.knighted-css.js'
import {
  VeBanner,
  knightedCss as veBannerCss,
} from './components/ve_banner.knighted-css.js'
import * as sharedBridgeModule from './components/shared_bridge_panel.js?knighted-css&combined&named-only'
import { hostChrome } from './host_chrome.js'

/**
 * Example of using a `&combined` query parameter to load a CSS module with combined and named-only exports.
 * The `asKnightedCssCombinedModule` helper is used to extract the React component and the CSS from the combined module.
 * This is useful when you don't want to run the knighted-css-generate-types command for every CSS module.
 */
const { SharedBridgePanel, knightedCss: sharedBridgeCss } =
  asKnightedCssCombinedModule<typeof import('./components/shared_bridge_panel.js')>(
    sharedBridgeModule,
  )

@customElement('css-react-host')
export class CssReactHost extends LitElement {
  static styles = [
    unsafeCSS(nativeCss),
    unsafeCSS(nativeCssBadgeCss),
    unsafeCSS(lessCss),
    unsafeCSS(sassCss),
    unsafeCSS(autoStableCss),
    unsafeCSS(veBannerCss),
    unsafeCSS(sharedBridgeCss),
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
        <${NativeCssBadge} />
        <${SassRibbon} />
        <${LessChip} />
        <${VeBanner}
          title="Vanilla-extract inside the shadow DOM"
          blurb="The same component can render inside the shadow root with scoped styles."
        />
        <${AutoStableShowcase}
          location="shadow"
          stableToken={${stableSelectors.panel}}
        />
        <${SharedBridgePanel} location="shadow" />
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
