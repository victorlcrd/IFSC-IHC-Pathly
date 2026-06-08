import { IconBook, IconFlag, IconGrid, IconTrophy, IconUser } from './common/Icons'
import { SidebarNav, type SidebarItem } from './navigation/SidebarNav'

type AprendizSidebarActive = 'dashboard' | 'trilhas' | 'conquistas' | 'desafios' | 'perfil'

type AprendizSidebarProps = {
  active: AprendizSidebarActive
  onOpenDashboard: () => void
  onOpenMinhasTrilhas: () => void
  onOpenConquistas: () => void
  onOpenDesafios?: () => void
  onOpenPerfil?: () => void
}

export function AprendizSidebar({
  active,
  onOpenDashboard,
  onOpenMinhasTrilhas,
  onOpenConquistas,
  onOpenDesafios = () => undefined,
  onOpenPerfil = () => undefined,
}: AprendizSidebarProps) {
  const items: SidebarItem<AprendizSidebarActive>[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <IconGrid />, onClick: onOpenDashboard },
    { id: 'trilhas', label: 'Minhas trilhas', icon: <IconBook />, onClick: onOpenMinhasTrilhas },
    { id: 'conquistas', label: 'Conquistas', icon: <IconTrophy />, onClick: onOpenConquistas },
    { id: 'desafios', label: 'Desafios', icon: <IconFlag />, onClick: onOpenDesafios },
    { id: 'perfil', label: 'Perfil', icon: <IconUser />, onClick: onOpenPerfil },
  ]

  return <SidebarNav ariaLabel="Menu do aprendiz" active={active} items={items} />
}
