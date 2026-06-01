import { useState } from 'react'
import './index.css'
import './pathly-theme.css'
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

type Page = 'login' | 'dashboard' | 'criadorTrilhas' | 'criadorAlunos' | 'aprendiz' | 'minhasTrilhas' | 'conquistas' | 'editor' | 'trilha' | 'aula'

function App() {
  const [page, setPage] = useState<Page>('login')

  if (page === 'login') {
    return (
      <LoginPage
        onLoginCriador={() => setPage('dashboard')}
        onLoginAprendiz={() => setPage('aprendiz')}
      />
    )
  }

  if (page === 'dashboard') {
    return (
      <DashboardPage
        onOpenEditor={() => setPage('editor')}
        onOpenMinhasTrilhas={() => setPage('criadorTrilhas')}
        onOpenAlunos={() => setPage('criadorAlunos')}
        onBackToLogin={() => setPage('login')}
      />
    )
  }

  if (page === 'criadorTrilhas') {
    return (
      <MinhasTrilhasCriadorPage
        onOpenDashboard={() => setPage('dashboard')}
        onOpenEditor={() => setPage('editor')}
        onOpenAlunos={() => setPage('criadorAlunos')}
        onBackToLogin={() => setPage('login')}
      />
    )
  }

  if (page === 'criadorAlunos') {
    return (
      <AlunosCriadorPage
        onOpenDashboard={() => setPage('dashboard')}
        onOpenMinhasTrilhas={() => setPage('criadorTrilhas')}
        onBackToLogin={() => setPage('login')}
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
      />
    )
  }

  if (page === 'conquistas') {
    return (
      <ConquistasPage
        onBackToLogin={() => setPage('login')}
        onOpenDashboard={() => setPage('aprendiz')}
        onOpenMinhasTrilhas={() => setPage('minhasTrilhas')}
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
      />
    )
  }

  // EditorPage agora recebe onPublish que retorna ao dashboard (task 4.4)
  return (
    <EditorPage
      onBackToLogin={() => setPage('dashboard')}
      onPublish={() => setPage('dashboard')}
    />
  )
}

export default App
