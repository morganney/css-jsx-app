import { style } from '@vanilla-extract/css'

export const banner = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.6rem',
  padding: '0.55rem 0.9rem',
  borderRadius: '999px',
  background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.85), #0b1220)',
  border: '1px solid rgba(16, 185, 129, 0.35)',
  boxShadow: '0 12px 24px rgba(5, 10, 20, 0.4)',
})

export const badge = style({
  padding: '0.35rem 0.7rem',
  borderRadius: '999px',
  background: '#10b981',
  color: '#022c22',
  fontWeight: 700,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  fontSize: '0.75rem',
})

export const detail = style({
  color: '#cbd5e1',
  fontSize: '0.85rem',
})
