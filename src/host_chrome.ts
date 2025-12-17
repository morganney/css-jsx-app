import { css } from 'lit'

export const hostChrome = css`
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
