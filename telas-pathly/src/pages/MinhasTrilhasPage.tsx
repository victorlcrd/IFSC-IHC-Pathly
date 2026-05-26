import { AprendizSidebar } from '../components/AprendizSidebar'
import { PathlyLogo } from '../components/PathlyLogo'

type MinhasTrilhasPageProps = {
  onBackToLogin: () => void
  onOpenDashboard: () => void
  onOpenTrilha: () => void
  onOpenAula: () => void
}

const MINHAS_TRILHAS = [
  {
    titulo: 'Introdução ao React',
    aulaAtual: 'Aula 6 — Hooks e Estado',
    progresso: 75,
    nivel: 'Iniciante',
    tempoRestante: '48 min restantes',
    status: 'Em andamento',
    destaque: true,
  },
  {
    titulo: 'Fundamentos de UX',
    aulaAtual: 'Aula 9 — Heurísticas de Nielsen',
    progresso: 90,
    nivel: 'Iniciante',
    tempoRestante: '18 min restantes',
    status: 'Em andamento',
  },
  {
    titulo: 'Git na Prática',
    aulaAtual: 'Aula 2 — Commits e histórico',
    progresso: 20,
    nivel: 'Básico',
    tempoRestante: '1h 20min restantes',
    status: 'Em andamento',
  },
  {
    titulo: 'TypeScript Essencial',
    aulaAtual: 'Aula 1 — Tipos primitivos',
    progresso: 0,
    nivel: 'Intermediário',
    tempoRestante: '2h 10min restantes',
    status: 'Não iniciada',
  },
]

export function MinhasTrilhasPage({ onBackToLogin, onOpenDashboard, onOpenTrilha, onOpenAula }: MinhasTrilhasPageProps) {
  return (
    <div className="editor-page aprendiz-page">
      <header className="editor-header dashboard-header">
        <PathlyLogo onClick={onBackToLogin} variant="branco" size="md" />

        <nav className="editor-nav">
          <button type="button" className="nav-text-button" onClick={onOpenDashboard}>Dashboard</button>
          <a href="#explorar">Explorar</a>
          <button className="profile-button" type="button" aria-label="Perfil">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>
        </nav>
      </header>

      <div className="dashboard-shell">
        <AprendizSidebar
          active="trilhas"
          onOpenDashboard={onOpenDashboard}
          onOpenMinhasTrilhas={() => undefined}
        />

        <main className="dashboard-content minhas-trilhas-content">
          <div className="dashboard-greeting-wrap minhas-trilhas-heading">
            <div>
              <h1 className="dashboard-greeting">Minhas trilhas</h1>
              <p className="dashboard-greeting-sub">
                Trilhas em que você está cadastrado. Continue de onde parou ou revise o progresso de cada uma.
              </p>
            </div>
            <button type="button" className="create-trilha-button minhas-trilhas-explore explore-trails-button">
              Explorar novas trilhas
            </button>
          </div>

          <section className="minhas-trilhas-summary" aria-label="Resumo das trilhas cadastradas">
            <article className="stat-card">
              <span className="stat-value">4</span>
              <span className="stat-label">Trilhas cadastradas</span>
            </article>
            <article className="stat-card">
              <span className="stat-value">3</span>
              <span className="stat-label">Em andamento</span>
            </article>
            <article className="stat-card">
              <span className="stat-value">75%</span>
              <span className="stat-label">Trilha atual</span>
            </article>
          </section>

          <section className="dashboard-section">
            <div className="trilhas-enrolled-list">
              {MINHAS_TRILHAS.map((trilha) => (
                <article key={trilha.titulo} className={`trilha-enrolled-card${trilha.destaque ? ' trilha-enrolled-card-active' : ''}`}>
                  <div className="trilha-enrolled-main">
                    <div className="trilha-enrolled-title-row">
                      <h2>{trilha.titulo}</h2>
                      <span className={`status-badge ${trilha.status === 'Não iniciada' ? 'status-rascunho' : 'status-ativa'}`}>
                        {trilha.status}
                      </span>
                    </div>
                    <p>{trilha.aulaAtual}</p>

                    <div className="trilha-enrolled-meta">
                      <span>{trilha.nivel}</span>
                      <span>{trilha.tempoRestante}</span>
                      <span>{trilha.progresso}% concluído</span>
                    </div>

                    <div className="progress-bar-bg" role="progressbar" aria-valuenow={trilha.progresso} aria-valuemin={0} aria-valuemax={100}>
                      <div className="progress-bar-fill" style={{ width: `${trilha.progresso}%` }} />
                    </div>
                  </div>

                  <div className="trilha-enrolled-actions">
                    <button type="button" className="small-link-button" onClick={onOpenTrilha}>
                      Ver trilha
                    </button>
                    <button type="button" className="trilha-primary-action" onClick={trilha.destaque ? onOpenAula : onOpenTrilha}>
                      {trilha.progresso === 0 ? 'Começar' : 'Continuar'}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
