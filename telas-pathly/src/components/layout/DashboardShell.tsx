import type { ReactNode } from 'react'

type DashboardShellProps = {
  sidebar: ReactNode
  children: ReactNode
}

export function DashboardShell({ sidebar, children }: DashboardShellProps) {
  return (
    <div className="dashboard-shell">
      {sidebar}
      <main className="dashboard-content">{children}</main>
    </div>
  )
}
