type AprendizSidebarProps = {
  active: 'dashboard' | 'trilhas' | 'conquistas' | 'desafios' | 'perfil'
  onOpenDashboard: () => void
  onOpenMinhasTrilhas: () => void
  onOpenConquistas: () => void
  onOpenDesafios: () => void
  onOpenPerfil?: () => void
}

type IconProps = {
  className?: string
}

export function AprendizSidebar({
  active,
  onOpenDashboard,
  onOpenMinhasTrilhas,
  onOpenConquistas,
  onOpenDesafios,
  onOpenPerfil = () => undefined,
}: AprendizSidebarProps) {
  return (
    <aside className="dashboard-sidebar">
      <p className="sidebar-label">Menu</p>
      <nav className="sidebar-nav" aria-label="Menu do aprendiz">
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
          Minhas trilhas
        </button>
        <button
          type="button"
          className={`sidebar-item sidebar-button sidebar-nav-button${active === 'conquistas' ? ' sidebar-item-active' : ''}`}
          onClick={onOpenConquistas}
        >
          <IconTrophy />
          Conquistas
        </button>
        <button
          type="button"
          className={`sidebar-item sidebar-button sidebar-nav-button${active === 'desafios' ? ' sidebar-item-active' : ''}`}
          onClick={onOpenDesafios}
        >
          <IconFlag />
          Desafios
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

function IconGrid({ className }: IconProps) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  )
}

function IconBook({ className }: IconProps) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  )
}

function IconTrophy({ className }: IconProps) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  )
}

function IconFlag({ className }: IconProps) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" x2="4" y1="22" y2="15" />
    </svg>
  )
}

function IconUser({ className }: IconProps) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}
