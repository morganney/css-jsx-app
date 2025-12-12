import { style } from '@vanilla-extract/css'

export const banner = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '1rem',
  padding: '1rem 1.5rem',
  borderRadius: '16px',
  background: 'linear-gradient(135deg, #111827, #0b1220)',
  border: '1px solid #1f2937',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.35)',
})

export const badge = style({
  padding: '0.4rem 0.8rem',
  borderRadius: '12px',
  background: '#10b981',
  color: '#022c22',
  fontWeight: 700,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
})

export const heading = style({
  margin: 0,
  color: '#ecfeff',
  fontSize: '1.05rem',
})

export const detail = style({
  margin: 0,
  color: '#cbd5e1',
  fontSize: '0.95rem',
})
