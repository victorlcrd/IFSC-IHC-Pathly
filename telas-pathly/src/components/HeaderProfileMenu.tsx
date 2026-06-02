import { useState } from 'react'
import './HeaderProfileMenu.css'

type HeaderProfileMenuProps = {
  onOpenPerfil: () => void
  onLogout: () => void
  active?: boolean
}

export function HeaderProfileMenu({ onOpenPerfil, onLogout, active = false }: HeaderProfileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  function handleOpenPerfil() {
    setIsOpen(false)
    onOpenPerfil()
  }

  function handleLogout() {
    setIsOpen(false)
    onLogout()
  }

  return (
    <div className="header-profile-menu">
      <button
        className={`profile-button${active ? ' profile-button-active' : ''}`}
        type="button"
        aria-label="Abrir opções do perfil"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        <IconUser />
      </button>

      {isOpen && (
        <div className="profile-menu-popover" role="menu">
          <button type="button" role="menuitem" onClick={handleOpenPerfil}>
            Ver perfil
          </button>
          <button type="button" role="menuitem" onClick={handleLogout}>
            Sair
          </button>
        </div>
      )}
    </div>
  )
}

function IconUser() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}
