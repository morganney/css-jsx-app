import { reactJsx } from '@knighted/jsx/react'
import { createRoot, type Root } from 'react-dom/client'
import { LitElement, css, html, unsafeCSS, type PropertyValues } from 'lit'
import { customElement } from 'lit/decorators.js'

import { NativeBadge } from './components/native_badge.js'
import { SassRibbon } from './components/sass_ribbon.js'
import { VePill } from './components/ve_pill.js'
import { knightedCss as nativeCss } from './components/native_badge.js?knighted-css'
import { knightedCss as sassCss } from './components/sass_ribbon.js?knighted-css'
import { knightedCss as veCss } from './components/ve_pill.js?knighted-css'

const hostChrome = css`
  :host {
    display: block;
    color: #e2e8f0;
    font-family:
      'Inter',
      system-ui,
      -apple-system,
      'Segoe UI',
      sans-serif;
  }

  .shell {
    border-radius: 18px;
    padding: 1.5rem;
    background: #0b1220;
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
    border: 1px solid #1f2937;
  }

  .shell header {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    margin-bottom: 1rem;
  }

  .shell h1 {
    margin: 0;
    font-size: 1.25rem;
    letter-spacing: 0.02em;
  }

  .shell p {
    margin: 0;
    color: #94a3b8;
    line-height: 1.6;
  }

  .react-area {
    display: grid;
    gap: 1rem;
    margin-top: 1.25rem;
  }
`

@customElement('css-react-host')
export class CssReactHost extends LitElement {
  static styles = [unsafeCSS(nativeCss), unsafeCSS(sassCss), unsafeCSS(veCss), hostChrome]

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
