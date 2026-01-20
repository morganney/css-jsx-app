import * as styles from './shared_bridge_panel.module.css'

type SharedBridgePanelProps = {
  location: 'light' | 'shadow'
}

export function SharedBridgePanel({ location }: SharedBridgePanelProps) {
  return (
    <section className={styles.panel} aria-label="Shared stylesheet panel">
      <span className={styles.badge}>{location} DOM</span>
      <h3 className={styles.title}>Shared CSS module styles</h3>
      <p className={styles.copy}>
        The light and shadow DOMs reuse the same hashed class names produced by the CSS
        module pipeline.
      </p>
    </section>
  )
}
