import { reactJsx } from '@knighted/jsx/react'
import { createRoot, type Root } from 'react-dom/client'
import { LitElement, html, unsafeCSS, type PropertyValues } from 'lit'
import { customElement } from 'lit/decorators.js'

import { NativeBadge } from './components/native_badge.js'
import { SassRibbon } from './components/sass_ribbon.js'
import { StableShowcase } from './components/stable_showcase.js'
import { VePill } from './components/ve_pill.js'
import { knightedCss as nativeCss } from './components/native_badge.js?knighted-css'
import { knightedCss as sassCss } from './components/sass_ribbon.js?knighted-css'
import { knightedCss as stableShowcaseCss } from './components/stable_showcase.scss?knighted-css'
import { knightedCss as veCss } from './components/ve_pill.js?knighted-css'

import { hostChrome } from './host_chrome.js'

@customElement('css-react-host')
export class CssReactHost extends LitElement {
  static styles = [
    unsafeCSS(nativeCss),
    unsafeCSS(sassCss),
    unsafeCSS(stableShowcaseCss),
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
