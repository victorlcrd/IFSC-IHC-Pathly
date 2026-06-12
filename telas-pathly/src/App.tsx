import { useState } from 'react'
import './index.css'
import { LoginPage } from './pages/LoginPage'
import { DashboardPage } from './pages/DashboardPage'
import { AprendizPage } from './pages/AprendizPage'
import { EditorPage } from './pages/EditorPage'
import { TrilhaDetailPage } from './pages/TrilhaDetailPage'
import { AulaPage } from './pages/AulaPage'
import { MinhasTrilhasPage } from './pages/MinhasTrilhasPage'
import { MinhasTrilhasCriadorPage } from './pages/MinhasTrilhasCriadorPage'
import { AlunosCriadorPage } from './pages/AlunosCriadorPage'
import { ConquistasPage } from './pages/ConquistasPage'
import { DesafiosPage } from './pages/DesafiosPage'
import { PerfilAprendizPage, PerfilCriadorPage } from './pages/PerfilPage'
import { CadastroCriadorPage } from './pages/CadastroCriadorPage'
import { CadastroAprendizPage } from './pages/CadastroAprendizPage'
import type { CanvasBlock, CreatorTrail, CreatorTrailStatus, PublishData } from './components/editor/editorTypes'
import { INITIAL_CANVAS_BLOCKS } from './components/editor/editorData'

type Page = 'login' | 'cadastroCriador' | 'cadastroAprendiz' | 'dashboard' | 'criadorTrilhas' | 'criadorAlunos' | 'perfilCriador' | 'aprendiz' | 'minhasTrilhas' | 'conquistas' | 'desafios' | 'perfilAprendiz' | 'editor' | 'trilha' | 'aula'

function cloneBlocks(blocks: CanvasBlock[]) {
  return blocks.map((block) => ({
    ...block,
    options: block.options ? [...block.options] : undefined,
  }))
}

const INITIAL_CREATOR_TRAILS: CreatorTrail[] = [
  {
    id: 1,
    coverDataUrl: '',
    title: 'Introdução ao React',
    description: 'Fundamentos de componentes, props, estados e criação de interfaces modernas.',
    category: 'Frontend',
    level: 'Iniciante',
    tags: 'react, componentes',
    visibility: 'public',
    status: 'published',
    blocks: cloneBlocks(INITIAL_CANVAS_BLOCKS),
    aulas: 8,
    alunos: 42,
    conclusoes: 18,
    updatedAtLabel: 'Atualizada há 2 dias',
  },
  {
    id: 2,
    coverDataUrl: '',
    title: 'Fundamentos de UX',
    description: 'Pesquisa com usuários, prototipação e validação de fluxos de aprendizagem.',
    category: 'Design',
    level: 'Intermediário',
    tags: 'ux, pesquisa',
    visibility: 'public',
    status: 'published',
    blocks: cloneBlocks(INITIAL_CANVAS_BLOCKS),
    aulas: 6,
    alunos: 35,
    conclusoes: 12,
    updatedAtLabel: 'Atualizada há 5 dias',
  },
  {
    id: 3,
    coverDataUrl: '',
    title: 'TypeScript Essencial',
    description: 'Tipagem, interfaces e boas práticas para evoluir projetos React com segurança.',
    category: 'Frontend',
    level: 'Intermediário',
    tags: 'typescript, react',
    visibility: 'private',
    status: 'draft',
    blocks: cloneBlocks(INITIAL_CANVAS_BLOCKS),
    aulas: 4,
    alunos: 0,
    conclusoes: 0,
    updatedAtLabel: 'Editada ontem',
  },
]

function App() {
  const [page, setPage] = useState<Page>('login')
  const [creatorTrails, setCreatorTrails] = useState<CreatorTrail[]>(INITIAL_CREATOR_TRAILS)
  const [editingTrailId, setEditingTrailId] = useState<number | null>(null)

  function openEditor(trailId?: number) {
    setEditingTrailId(trailId ?? null)
    setPage('editor')
  }

  function handleSaveCreatorTrail(data: PublishData, status: CreatorTrailStatus, blocks: CanvasBlock[]) {
    const aulas = Math.max(1, blocks.filter((block) => block.type !== 'Início' && block.type !== 'Fim').length)
    const savedBlocks = cloneBlocks(blocks)

    setCreatorTrails((current) => {
      if (editingTrailId !== null) {
        return current.map((trail) =>
          trail.id === editingTrailId
            ? {
              ...trail,
              ...data,
              status,
              blocks: savedBlocks,
              aulas,
              updatedAtLabel: status === 'published' ? 'Publicada agora' : 'Salva agora',
            }
            : trail
        )
      }

      const newTrail: CreatorTrail = {
        ...data,
        id: Date.now(),
        status,
        blocks: savedBlocks,
        aulas,
        alunos: 0,
        conclusoes: 0,
        updatedAtLabel: status === 'published' ? 'Publicada agora' : 'Salva agora',
      }

      return [newTrail, ...current]
    })
    setEditingTrailId(null)
    setPage('criadorTrilhas')
  }

  if (page === 'login') {
    return (
      <LoginPage
        onLoginCriador={() => setPage('dashboard')}
        onLoginAprendiz={() => setPage('aprendiz')}
        onOpenCadastroCriador={() => setPage('cadastroCriador')}
        onOpenCadastroAprendiz={() => setPage('cadastroAprendiz')}
      />
    )
  }

  if (page === 'cadastroCriador') {
    return (
      <CadastroCriadorPage
        onBackToLogin={() => setPage('login')}
        onCadastroConcluido={() => setPage('dashboard')}
      />
    )
  }

  if (page === 'cadastroAprendiz') {
    return (
      <CadastroAprendizPage
        onBackToLogin={() => setPage('login')}
        onCadastroConcluido={() => setPage('aprendiz')}
      />
    )
  }

  if (page === 'dashboard') {
    return (
      <DashboardPage
        trails={creatorTrails}
        onOpenEditor={() => openEditor()}
        onOpenMinhasTrilhas={() => setPage('criadorTrilhas')}
        onOpenAlunos={() => setPage('criadorAlunos')}
        onBackToLogin={() => setPage('login')}
        onOpenPerfil={() => setPage('perfilCriador')}
      />
    )
  }

  if (page === 'criadorTrilhas') {
    return (
      <MinhasTrilhasCriadorPage
        trails={creatorTrails}
        onOpenDashboard={() => setPage('dashboard')}
        onOpenEditor={openEditor}
        onOpenAlunos={() => setPage('criadorAlunos')}
        onBackToLogin={() => setPage('login')}
        onOpenPerfil={() => setPage('perfilCriador')}
      />
    )
  }

  if (page === 'criadorAlunos') {
    return (
      <AlunosCriadorPage
        onOpenDashboard={() => setPage('dashboard')}
        onOpenMinhasTrilhas={() => setPage('criadorTrilhas')}
        onBackToLogin={() => setPage('login')}
        onOpenPerfil={() => setPage('perfilCriador')}
      />
    )
  }

  if (page === 'perfilCriador') {
    return (
      <PerfilCriadorPage
        onBackToLogin={() => setPage('login')}
        onOpenDashboard={() => setPage('dashboard')}
        onOpenMinhasTrilhas={() => setPage('criadorTrilhas')}
        onOpenAlunos={() => setPage('criadorAlunos')}
      />
    )
  }

  if (page === 'aprendiz') {
    return (
      <AprendizPage
        onBackToLogin={() => setPage('login')}
        onOpenTrilha={() => setPage('trilha')}
        onOpenAula={() => setPage('aula')}
        onOpenMinhasTrilhas={() => setPage('minhasTrilhas')}
        onOpenConquistas={() => setPage('conquistas')}
        onOpenDesafios={() => setPage('desafios')}
        onOpenPerfil={() => setPage('perfilAprendiz')}
      />
    )
  }

  if (page === 'perfilAprendiz') {
    return (
      <PerfilAprendizPage
        onBackToLogin={() => setPage('login')}
        onOpenDashboard={() => setPage('aprendiz')}
        onOpenMinhasTrilhas={() => setPage('minhasTrilhas')}
        onOpenConquistas={() => setPage('conquistas')}
      />
    )
  }

  if (page === 'minhasTrilhas') {
    return (
      <MinhasTrilhasPage
        onBackToLogin={() => setPage('login')}
        onOpenDashboard={() => setPage('aprendiz')}
        onOpenTrilha={() => setPage('trilha')}
        onOpenAula={() => setPage('aula')}
        onOpenConquistas={() => setPage('conquistas')}
        onOpenPerfil={() => setPage('perfilAprendiz')}
      />
    )
  }

  if (page === 'conquistas') {
    return (
      <ConquistasPage
        onBackToLogin={() => setPage('login')}
        onOpenDashboard={() => setPage('aprendiz')}
        onOpenMinhasTrilhas={() => setPage('minhasTrilhas')}
        onOpenPerfil={() => setPage('perfilAprendiz')}
      />
    )
  }

  if (page === 'desafios') {
    return (
      <DesafiosPage
        onBackToLogin={() => setPage('login')}
        onOpenDashboard={() => setPage('aprendiz')}
        onOpenMinhasTrilhas={() => setPage('minhasTrilhas')}
        onOpenConquistas={() => setPage('conquistas')}
        onOpenPerfil={() => setPage('perfilAprendiz')}
      />
    )
  }

  if (page === 'trilha') {
    return (
      <TrilhaDetailPage
        onBackToMinhasTrilhas={() => setPage('minhasTrilhas')}
        onOpenDashboard={() => setPage('aprendiz')}
        onOpenAula={() => setPage('aula')}
        onBackToLogin={() => setPage('login')}
        onOpenConquistas={() => setPage('conquistas')}
        onOpenPerfil={() => setPage('perfilAprendiz')}
      />
    )
  }

  if (page === 'aula') {
    return (
      <AulaPage
        onBackToTrilha={() => setPage('minhasTrilhas')}
        onBackToLogin={() => setPage('login')}
        onOpenDashboard={() => setPage('aprendiz')}
        onOpenConquistas={() => setPage('conquistas')}
        onOpenPerfil={() => setPage('perfilAprendiz')}
      />
    )
  }

  return (
    <EditorPage
      initialTrail={creatorTrails.find((trail) => trail.id === editingTrailId)}
      onBackToLogin={() => setPage('dashboard')}
      onSaveTrail={handleSaveCreatorTrail}
      onOpenPerfil={() => setPage('perfilCriador')}
    />
  )
}

export default App
