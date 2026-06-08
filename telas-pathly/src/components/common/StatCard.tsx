import type { ReactNode } from 'react'

type StatCardProps = {
  value: string | number
  label: string
  icon?: ReactNode
  iconClassName?: string
  compact?: boolean
}

export function StatCard({ value, label, icon, iconClassName, compact = false }: StatCardProps) {
  const content = (
    <>
      {icon && <div className={iconClassName}>{icon}</div>}
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </>
  )

  return (
    <article className="stat-card">
      {compact ? content : <div className="stat-card-inner">{content}</div>}
    </article>
  )
}
