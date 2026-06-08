type ProgressBarProps = {
  value: number
  max?: number
  className?: string
  fillClassName?: string
  label?: string
}

export function ProgressBar({ value, max = 100, className = '', fillClassName = '', label }: ProgressBarProps) {
  const percent = max === 0 ? 0 : Math.max(0, Math.min(100, Math.round((value / max) * 100)))

  return (
    <div
      className={`progress-bar-bg${className ? ` ${className}` : ''}`}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={label}
    >
      <div className={`progress-bar-fill${fillClassName ? ` ${fillClassName}` : ''}`} style={{ width: `${percent}%` }} />
    </div>
  )
}
