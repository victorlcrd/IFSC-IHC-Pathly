import { AprendizSidebar } from '../components/AprendizSidebar'
import { ConquistaCard } from '../components/ConquistaCard'
import { PathlyLogo } from '../components/PathlyLogo'
import { CONQUISTAS_MOCK } from '../data/conquistasMock'

type ConquistasPageProps = {
  onBackToLogin: () => void
  onOpenDashboard: () => void
  onOpenMinhasTrilhas: () => void
}

export function ConquistasPage({ onBackToLogin, onOpenDashboard, onOpenMinhasTrilhas }: ConquistasPageProps) {
  const total = CONQUISTAS_MOCK.length
  const desbloqueadas = CONQUISTAS_MOCK.filter((c) => c.status === 'desbloqueada').length
  const emProgresso = CONQUISTAS_MOCK.filter(
    (c) => c.status === 'bloqueada' && c.progresso !== null && c.progresso.atual > 0,
  ).length

  return (
    <div className="editor-page aprendiz-page">
      <header className="editor-header dashboard-header">
        <PathlyLogo onClick={onBackToLogin} variant="branco" size="md" />

        <nav className="editor-nav">
          <button type="button" className="nav-text-button" onClick={onOpenDashboard}>
            Dashboard
          </button>
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
          active="conquistas"
          onOpenDashboard={onOpenDashboard}
          onOpenMinhasTrilhas={onOpenMinhasTrilhas}
          onOpenConquistas={() => undefined}
        />

        <main className="dashboard-content conquistas-content">
          <div className="dashboard-greeting-wrap conquistas-heading">
            <div>
              <h1 className="dashboard-greeting">Conquistas</h1>
              <p className="dashboard-greeting-sub">
                Acompanhe seus badges e veja o progresso para desbloquear novas conquistas.
              </p>
            </div>
          </div>

          <section className="conquistas-summary" aria-label="Resumo de conquistas">
            <article className="stat-card">
              <span className="stat-value">{total}</span>
              <span className="stat-label">Total de badges</span>
            </article>
            <article className="stat-card">
              <span className="stat-value">{desbloqueadas}</span>
              <span className="stat-label">Desbloqueadas</span>
            </article>
            <article className="stat-card">
              <span className="stat-value">{emProgresso}</span>
              <span className="stat-label">Em progresso</span>
            </article>
          </section>

          <section className="dashboard-section" aria-label="Lista de conquistas">
            <div className="conquistas-grid">
              {CONQUISTAS_MOCK.map((conquista) => (
                <ConquistaCard key={conquista.id} conquista={conquista} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
