import { HeaderProfileMenu } from '../components/HeaderProfileMenu'
import { AprendizSidebar } from '../components/AprendizSidebar'
import { PathlyLogo } from '../components/PathlyLogo'

type AprendizPageProps = {
  onBackToLogin: () => void
  onOpenTrilha: () => void
  onOpenAula: () => void
  onOpenMinhasTrilhas: () => void
  onOpenConquistas: () => void
  onOpenDesafios: () => void
  onOpenPerfil: () => void
}

const RANKING = [
  { nome: 'Ana Souza', pontos: 1240 },
  { nome: 'Pedro Lima', pontos: 1180 },
  { nome: 'Você', pontos: 320, destaque: true },
  { nome: 'Maria Oliveira', pontos: 290 },
  { nome: 'Carlos Mendes', pontos: 210 },
]

const PROGRESSO = [
  { nome: 'Introdução ao React', pct: 75, concluida: true },
  { nome: 'Fundamentos de UX', pct: 90, concluida: false },
  { nome: 'Git na Prática', pct: 20, concluida: false },
]

export function AprendizPage({
  onBackToLogin,
  onOpenTrilha,
  onOpenAula,
  onOpenMinhasTrilhas,
  onOpenConquistas,
  onOpenDesafios,
  onOpenPerfil,
}: AprendizPageProps) {
  return (
    <div className="editor-page aprendiz-page">
      {/* Header */}
      <header className="editor-header dashboard-header">
        <PathlyLogo onClick={onBackToLogin} variant="branco" size="md" />

        <nav className="editor-nav">
          <a href="#explorar">Explorar</a>
          <HeaderProfileMenu onOpenPerfil={onOpenPerfil} onLogout={onBackToLogin} />
        </nav>
      </header>

      {/* Shell */}
      <div className="dashboard-shell">
        <AprendizSidebar
          active="dashboard"
          onOpenDashboard={() => undefined}
          onOpenMinhasTrilhas={onOpenMinhasTrilhas}
          onOpenConquistas={onOpenConquistas}
          onOpenDesafios={onOpenDesafios}
          onOpenPerfil={onOpenPerfil}
        />

        {/* Content */}
        <main className="dashboard-content">
          <h1 className="dashboard-greeting">Olá!</h1>

          {/* Stats */}
          <div className="stats-grid">
            <div className="stat-card">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              <span className="stat-value">12</span>
              <span className="stat-label">Trilhas</span>
            </div>
            <div className="stat-card">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
              </svg>
              <span className="stat-value">7</span>
              <span className="stat-label">Streak</span>
            </div>
            <div className="stat-card">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z"/>
              </svg>
              <span className="stat-value">320</span>
              <span className="stat-label">Pontos</span>
            </div>
          </div>

          {/* Middle row: Continuar + Ranking */}
          <div className="aprendiz-mid-grid">
            {/* Continuar */}
            <section className="info-card">
              <div className="info-card-heading-row">
                <h3 className="info-card-title">Continuar</h3>
                <button type="button" className="small-link-button" onClick={onOpenTrilha}>Ver trilha</button>
              </div>
              <div className="continuar-inner">
                <button className="continuar-thumb continuar-thumb-button" type="button" aria-label="Abrir aula atual" onClick={onOpenAula}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/>
                  </svg>
                </button>
                <div className="continuar-info">
                  <p className="continuar-nome">Introdução ao React</p>
                  <p className="continuar-aula">Aula 6 — Hooks e Estado</p>
                  <div className="progress-bar-bg" style={{marginTop: 10}} role="progressbar" aria-valuenow={75} aria-valuemin={0} aria-valuemax={100}>
                    <div className="progress-bar-fill" style={{width: '75%'}} />
                  </div>
                  <p className="continuar-pct">75% concluído</p>
                  <button type="button" className="continue-action-button" onClick={onOpenAula}>Continuar aula</button>
                </div>
              </div>
            </section>

            {/* Ranking */}
            <section className="info-card">
              <h3 className="info-card-title">Ranking</h3>
              <ol className="ranking-list">
                {RANKING.map((r, i) => (
                  <li key={i} className={`ranking-item${r.destaque ? ' ranking-destaque' : ''}`}>
                    <span className="ranking-pos">{i + 1}</span>
                    <span className="ranking-avatar" aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                      </svg>
                    </span>
                    <span className="ranking-nome">{r.nome}</span>
                    <span className="ranking-pts">{r.pontos} pts</span>
                  </li>
                ))}
              </ol>
            </section>
          </div>

          {/* Bottom row: Streak + Progresso */}
          <div className="bottom-grid aprendizagem-bottom-grid">
            <section className="info-card streak-card streak-highlight-card">
              <h3 className="info-card-title streak-title">Streak</h3>

              <div className="streak-summary">
                <span className="streak-icon-box" aria-hidden="true">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
                  </svg>
                </span>
                <div>
                  <span className="streak-num">7</span>
                  <span className="streak-label">dias seguidos</span>
                </div>
              </div>

              <p className="streak-msg">Continue assim! Faltam 3 dias para o recorde.</p>

              <div className="streak-week" aria-label="Progresso semanal do streak">
                {['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].map((dia, i) => (
                  <span key={`${dia}-${i}`} className="streak-day-wrap">
                    <span className={`streak-day${i < 5 ? ' streak-day-complete' : ''}`}>
                      {i < 5 ? '✓' : '-'}
                    </span>
                    <span className="streak-day-label">{dia}</span>
                  </span>
                ))}
              </div>
            </section>

            <section className="info-card progress-highlight-card">
              <h3 className="info-card-title progress-card-title">Progresso nas trilhas</h3>

              <ul className="progress-list">
                {PROGRESSO.map((p, i) => (
                  <li key={i} className="progress-item progress-highlight-item">
                    <div className="progress-header">
                      <span className="progress-check" aria-hidden="true">
                        {p.concluida
                          ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1385EA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                          : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/></svg>
                        }
                      </span>
                      <span className="progress-nome" style={{flex: 1}}>{p.nome}</span>
                      <span className="progress-pct">{p.pct}%</span>
                    </div>
                    <div className="progress-bar-bg" role="progressbar" aria-valuenow={p.pct} aria-valuemin={0} aria-valuemax={100}>
                      <div className="progress-bar-fill" style={{width: `${p.pct}%`}} />
                    </div>
                  </li>
                ))}
              </ul>

              <div className="recent-achievements">
                <h4 className="recent-achievements-title">Conquistas recentes</h4>
                <div className="achievement-badges">
                  <span className="achievement-badge achievement-gold">Primeira trilha</span>
                  <span className="achievement-badge achievement-blue">7 dias streak</span>
                  <span className="achievement-badge achievement-green">React master</span>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
