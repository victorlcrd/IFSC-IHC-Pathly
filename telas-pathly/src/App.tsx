import { useState } from 'react'
import './index.css'
import { EditorPage } from './pages/EditorPage'
import { LoginPage } from './pages/LoginPage'

type Page = 'login' | 'editor'

function App() {
  const [page, setPage] = useState<Page>('editor')

  if (page === 'login') {
    return <LoginPage onOpenEditor={() => setPage('editor')} />
  }

  return <EditorPage onBackToLogin={() => setPage('login')} />
}

export default App
