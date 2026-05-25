type CriadorSidebarProps = {
  active: 'dashboard' | 'trilhas' | 'alunos' | 'configuracoes'
  onOpenDashboard: () => void
  onOpenMinhasTrilhas: () => void
}

export function CriadorSidebar({ active, onOpenDashboard, onOpenMinhasTrilhas }: CriadorSidebarProps) {
  return (
    <aside className="dashboard-sidebar">
      <span className="sidebar-logo-accent" />
      <p className="sidebar-label">Menu</p>

      <nav className="sidebar-nav" aria-label="Menu do criador">
        <button
          type="button"
          className={`sidebar-item sidebar-button sidebar-nav-button${active === 'dashboard' ? ' sidebar-item-active' : ''}`}
          onClick={onOpenDashboard}
        >
          <IconGrid />
          Dashboard
        </button>
        <button
          type="button"
          className={`sidebar-item sidebar-button sidebar-nav-button${active === 'trilhas' ? ' sidebar-item-active' : ''}`}
          onClick={onOpenMinhasTrilhas}
        >
          <IconBook />
          Minhas Trilhas
        </button>
        <button type="button" className={`sidebar-item sidebar-button sidebar-nav-button${active === 'alunos' ? ' sidebar-item-active' : ''}`}>
          <IconUsers />
          Alunos
        </button>
        <button type="button" className={`sidebar-item sidebar-button sidebar-nav-button${active === 'configuracoes' ? ' sidebar-item-active' : ''}`}>
          <IconSettings />
          Configurações
        </button>
      </nav>
    </aside>
  )
}

function IconGrid() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  )
}

function IconBook() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  )
}

function IconUsers() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function IconSettings() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.65 1.65 0 0 0 15 19.4a1.65 1.65 0 0 0-1 .6 1.65 1.65 0 0 0-.38 1.07V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1.08-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-.6-1 1.65 1.65 0 0 0-1.07-.38H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1.08 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-.6 1.65 1.65 0 0 0 .38-1.07V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1.08 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.14.31.35.59.6.82.25.23.59.36.93.38H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1.08Z" />
    </svg>
  )
}
