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

type Page = 'login' | 'dashboard' | 'criadorTrilhas' | 'criadorAlunos' | 'aprendiz' | 'minhasTrilhas' | 'editor' | 'trilha' | 'aula'

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
      />
    )
  }

  if (page === 'aula') {
    return (
      <AulaPage
        onBackToTrilha={() => setPage('minhasTrilhas')}
        onBackToLogin={() => setPage('login')}
        onOpenDashboard={() => setPage('aprendiz')}
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
