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
import { DesafiosPage } from './pages/DesafiosPage'
import { PerfilAprendizPage, PerfilCriadorPage } from './pages/PerfilPage'
import { CadastroCriadorPage } from './pages/CadastroCriadorPage'
import { CadastroAprendizPage } from './pages/CadastroAprendizPage'

type Page = 'login' | 'cadastroCriador' | 'cadastroAprendiz' | 'dashboard' | 'criadorTrilhas' | 'criadorAlunos' | 'perfilCriador' | 'aprendiz' | 'minhasTrilhas' | 'conquistas' | 'desafios' | 'perfilAprendiz' | 'editor' | 'trilha' | 'aula'

function App() {
  const [page, setPage] = useState<Page>('login')

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
        onOpenEditor={() => setPage('editor')}
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
        onOpenDashboard={() => setPage('dashboard')}
        onOpenEditor={() => setPage('editor')}
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
      onBackToLogin={() => setPage('dashboard')}
      onPublish={() => setPage('dashboard')}
      onOpenPerfil={() => setPage('perfilCriador')}
    />
  )
}

export default App
