import type { ReactNode } from 'react'

export type SidebarItem<TActive extends string> = {
  id: TActive
  label: string
  icon: ReactNode
  onClick: () => void
}

type SidebarNavProps<TActive extends string> = {
  ariaLabel: string
  active: TActive
  items: SidebarItem<TActive>[]
  showAccent?: boolean
}

export function SidebarNav<TActive extends string>({ ariaLabel, active, items, showAccent = false }: SidebarNavProps<TActive>) {
  return (
    <aside className="dashboard-sidebar">
      {showAccent && <span className="sidebar-logo-accent" />}
      <p className="sidebar-label">Menu</p>

      <nav className="sidebar-nav" aria-label={ariaLabel}>
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`sidebar-item sidebar-button sidebar-nav-button${active === item.id ? ' sidebar-item-active' : ''}`}
            onClick={item.onClick}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  )
}
