type AprendizPageProps = {
  onBackToLogin: () => void
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

export function AprendizPage({ onBackToLogin }: AprendizPageProps) {
  return (
    <div className="editor-page">
      {/* Header */}
      <header className="editor-header">
        <button className="editor-logo" type="button" onClick={onBackToLogin}>
          PATHLY
        </button>

        <div className="editor-search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input type="text" placeholder="Buscar..." aria-label="Buscar trilhas" />
        </div>

        <nav className="editor-nav">
          <a href="#trilhas">Minhas Trilhas</a>
          <a href="#explorar">Explorar</a>
          <button className="profile-button" type="button" aria-label="Perfil">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
            </svg>
          </button>
        </nav>
      </header>

      {/* Shell */}
      <div className="dashboard-shell">
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <p className="sidebar-label">Menu</p>
          <nav className="sidebar-nav">
            <a href="#" className="sidebar-item sidebar-item-active">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{marginRight: 8, verticalAlign: 'middle'}}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
              Dashboard
            </a>
            <a href="#" className="sidebar-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{marginRight: 8, verticalAlign: 'middle'}}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              Trilhas
            </a>
            <a href="#" className="sidebar-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{marginRight: 8, verticalAlign: 'middle'}}><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
              Conquistas
            </a>
            <a href="#" className="sidebar-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{marginRight: 8, verticalAlign: 'middle'}}><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/></svg>
              Desafios
            </a>
            <a href="#" className="sidebar-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{marginRight: 8, verticalAlign: 'middle'}}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              Perfil
            </a>
          </nav>
        </aside>

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
              <h3 className="info-card-title">Continuar</h3>
              <div className="continuar-inner">
                <div className="continuar-thumb" aria-label="Prévia da aula">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/>
                  </svg>
                </div>
                <div className="continuar-info">
                  <p className="continuar-nome">Introdução ao React</p>
                  <p className="continuar-aula">Aula 6 — Hooks e Estado</p>
                  <div className="progress-bar-bg" style={{marginTop: 10}} role="progressbar" aria-valuenow={75} aria-valuemin={0} aria-valuemax={100}>
                    <div className="progress-bar-fill" style={{width: '75%'}} />
                  </div>
                  <p className="continuar-pct">75% concluído</p>
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
          <div className="bottom-grid">
            <section className="info-card streak-card">
              <h3 className="info-card-title">Streak</h3>
              <div className="streak-inner">
                <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
                </svg>
                <div>
                  <span className="streak-num">7</span>
                  <span className="streak-label">dias</span>
                </div>
              </div>
              <p className="streak-msg">Continue assim! 🔥</p>
            </section>

            <section className="info-card">
              <h3 className="info-card-title">Progresso</h3>
              <ul className="progress-list">
                {PROGRESSO.map((p, i) => (
                  <li key={i} className="progress-item">
                    <div className="progress-header">
                      <span className="progress-check" aria-hidden="true">
                        {p.concluida
                          ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
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
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
