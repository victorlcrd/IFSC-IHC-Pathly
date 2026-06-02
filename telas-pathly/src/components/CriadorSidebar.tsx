import { IconBook, IconGrid, IconUser, IconUsers } from './common/Icons'
import { SidebarNav, type SidebarItem } from './navigation/SidebarNav'

type CriadorSidebarActive = 'dashboard' | 'trilhas' | 'alunos' | 'perfil' | 'configuracoes'

type CriadorSidebarProps = {
  active: CriadorSidebarActive
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
  const items: SidebarItem<CriadorSidebarActive>[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <IconGrid size={15} />, onClick: onOpenDashboard },
    { id: 'trilhas', label: 'Minhas Trilhas', icon: <IconBook size={15} />, onClick: onOpenMinhasTrilhas },
    { id: 'alunos', label: 'Alunos', icon: <IconUsers size={15} />, onClick: onOpenAlunos },
    { id: 'perfil', label: 'Perfil', icon: <IconUser size={15} />, onClick: onOpenPerfil },
  ]

  return <SidebarNav ariaLabel="Menu do criador" active={active} items={items} showAccent />
}
