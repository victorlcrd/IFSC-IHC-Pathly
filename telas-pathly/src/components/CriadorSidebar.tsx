type CriadorSidebarProps = {
  active: 'dashboard' | 'trilhas' | 'alunos' | 'perfil' | 'configuracoes'
  onOpenDashboard: () => void
  onOpenMinhasTrilhas: () => void
  onOpenAlunos: () => void
  onOpenPerfil?: () => void
}

export function CriadorSidebar({
  active,
  onOpenDashboard,
  onOpenMinhasTrilhas,
  onOpenAlunos,
  onOpenPerfil = () => undefined,
}: CriadorSidebarProps) {
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

        <button
          type="button"
          className={`sidebar-item sidebar-button sidebar-nav-button${active === 'alunos' ? ' sidebar-item-active' : ''}`}
          onClick={onOpenAlunos}
        >
          <IconUsers />
          Alunos
        </button>

        <button
          type="button"
          className={`sidebar-item sidebar-button sidebar-nav-button${active === 'perfil' ? ' sidebar-item-active' : ''}`}
          onClick={onOpenPerfil}
        >
          <IconUser />
          Perfil
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

function IconUser() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}