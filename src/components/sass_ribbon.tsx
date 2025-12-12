import './sass_ribbon.sass'

export type SassRibbonProps = {
  text?: string
}

export function SassRibbon({ text = 'Sass (indented) brings sugar' }: SassRibbonProps) {
  return (
    <div className="sass-ribbon" data-kind="sass">
      <span className="sass-ribbon__token">sass</span>
      <span className="sass-ribbon__text">{text}</span>
    </div>
  )
}
