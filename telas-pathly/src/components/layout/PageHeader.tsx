import type { ReactNode } from 'react'
import { HeaderProfileMenu } from '../HeaderProfileMenu'
import { PathlyLogo } from '../PathlyLogo'

type PageHeaderProps = {
  onLogoClick: () => void
  onOpenPerfil?: () => void
  onLogout?: () => void
  linkLabel?: string
  linkHref?: string
  children?: ReactNode
}

export function PageHeader({
  onLogoClick,
  onOpenPerfil,
  onLogout,
  linkLabel = 'Explorar',
  linkHref = '#explorar',
  children,
}: PageHeaderProps) {
  return (
    <header className="editor-header dashboard-header">
      <PathlyLogo onClick={onLogoClick} variant="branco" size="md" />

      <nav className="editor-nav">
        <a href={linkHref}>{linkLabel}</a>
        {children ?? (
          <HeaderProfileMenu
            onOpenPerfil={onOpenPerfil ?? (() => undefined)}
            onLogout={onLogout ?? onLogoClick}
          />
        )}
      </nav>
    </header>
  )
}
