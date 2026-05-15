import { useState } from 'react'
import './index.css'
import { LoginPage } from './pages/LoginPage'
import { DashboardPage } from './pages/DashboardPage'
import { AprendizPage } from './pages/AprendizPage'
import { EditorPage } from './pages/EditorPage'

type Page = 'login' | 'dashboard' | 'aprendiz' | 'editor'

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
        onBackToLogin={() => setPage('login')}
      />
    )
  }

  if (page === 'aprendiz') {
    return <AprendizPage onBackToLogin={() => setPage('login')} />
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