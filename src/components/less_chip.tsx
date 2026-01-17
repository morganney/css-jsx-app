import './less_chip.less'

export type LessChipProps = {
  detail?: string
}

export function LessChip({ detail = 'Less support' }: LessChipProps) {
  return (
    <div className="less-chip" data-kind="less">
      <span className="less-chip__label">less</span>
      <span className="less-chip__detail">{detail}</span>
    </div>
  )
}
