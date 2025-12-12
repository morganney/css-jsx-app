import { style } from '@vanilla-extract/css'

export const pill = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.75rem 1.1rem',
  borderRadius: '14px',
  background: 'linear-gradient(120deg, #22d3ee, #38bdf8)',
  color: '#0f172a',
  fontWeight: 700,
  letterSpacing: '0.04em',
  boxShadow: '0 18px 36px rgba(34, 211, 238, 0.35)',
})

export const badge = style({
  padding: '0.3rem 0.8rem',
  borderRadius: '12px',
  background: '#0f172a',
  color: '#cffafe',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  fontSize: '0.85rem',
})

export const copy = style({
  fontSize: '1rem',
})
