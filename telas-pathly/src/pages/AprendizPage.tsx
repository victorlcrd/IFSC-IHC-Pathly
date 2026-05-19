type AprendizPageProps = {
  onBackToLogin: () => void
}

const RANKING = [
  { nome: 'Ana Souza',      pontos: 1240 },
  { nome: 'Pedro Lima',     pontos: 1180 },
  { nome: 'Você',           pontos: 320, destaque: true },
  { nome: 'Maria Oliveira', pontos: 290 },
  { nome: 'Carlos Mendes',  pontos: 210 },
]

const PROGRESSO = [
  { nome: 'Introdução ao React', pct: 75, concluida: true },
  { nome: 'Fundamentos de UX',   pct: 90, concluida: false },
  { nome: 'Git na Prática',      pct: 20, concluida: false },
]

const rankingPosClass = (i: number, destaque?: boolean) => {
  if (destaque) return 'ranking-pos'
  if (i === 0) return 'ranking-pos ranking-pos-1'
  if (i === 1) return 'ranking-pos ranking-pos-2'
  if (i === 2) return 'ranking-pos ranking-pos-3'
  return 'ranking-pos'
}

const rankingPosLabel = (i: number) => {
  if (i === 0) return '🥇'
  if (i === 1) return '🥈'
  if (i === 2) return '🥉'
  return `${i + 1}`
}

export function AprendizPage({ onBackToLogin }: AprendizPageProps) {
  return (
    <div className="editor-page">
      {/* Header */}
      <header className="editor-header">
        <button className="editor-logo" type="button" onClick={onBackToLogin}>PATHLY</button>



        <nav className="editor-nav">
          <a href="#trilhas">Minhas Trilhas</a>
          <a href="#explorar">Explorar</a>
          <button className="profile-button" type="button" aria-label="Perfil">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
          </button>
        </nav>
      </header>

      <div className="dashboard-shell">
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <span className="sidebar-logo-accent" />
          <p className="sidebar-label">Menu</p>
          <nav className="sidebar-nav">
            {[
              { label: 'Dashboard',   icon: <IconGrid />,     active: true  },
              { label: 'Trilhas',     icon: <IconBook />,     active: false },
              { label: 'Conquistas',  icon: <IconTrophy />,   active: false },
              { label: 'Desafios',    icon: <IconFlag />,     active: false },
              { label: 'Perfil',      icon: <IconUser />,     active: false },
            ].map((item, i) => (
              <a key={i} href="#" className={`sidebar-item${item.active ? ' sidebar-item-active' : ''}`}>
                {item.icon}
                {item.label}
              </a>
            ))}
          </nav>

          {/* XP card in sidebar */}
          <div style={{
            marginTop: 28, padding: '16px 14px', borderRadius: 12,
            background: 'linear-gradient(135deg, #1385EA22 0%, #22C55E18 100%)',
            border: '1px solid rgba(19,133,234,0.20)',
          }}>
            <p style={{ margin: '0 0 6px', color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Seu XP</p>
            <p style={{ margin: '0 0 10px', color: '#F4BD48', fontSize: '1.5rem', fontWeight: 900, lineHeight: 1 }}>320 <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>pts</span></p>
            <div style={{ height: 6, borderRadius: 999, background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '32%', borderRadius: 999, background: 'linear-gradient(90deg, #1385EA, #22C55E)' }} />
            </div>
            <p style={{ margin: '6px 0 0', color: 'rgba(255,255,255,0.35)', fontSize: '0.72rem', fontWeight: 600 }}>32% para o próximo nível</p>
          </div>
        </aside>

        {/* Content */}
        <main className="dashboard-content">
          {/* Greeting banner */}
          <div className="dashboard-greeting-wrap" style={{ background: 'linear-gradient(120deg, #0B1D29 0%, #0F4C5C 50%, #1385EA44 100%)' }}>
            <div>
              <h1 className="dashboard-greeting">Olá, Aprendiz! 🎓</h1>
              <p className="dashboard-greeting-sub">Continue sua jornada — você está indo muito bem!</p>
            </div>
            <div className="badges-row" style={{ justifyContent: 'flex-end' }}>
              <span className="badge-chip badge-chip-blue">Nível 3</span>
              <span className="badge-chip badge-chip-yellow">⭐ Top 3</span>
              <span className="badge-chip badge-chip-green">7 dias streak</span>
            </div>
          </div>

          {/* Stats */}
          <div className="stats-grid">
            <div className="stat-card aprendiz-stat">
              <div className="stat-card-inner">
                <div className="stat-icon stat-icon-blue">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                </div>
                <span className="stat-value">12</span>
                <span className="stat-label">Trilhas</span>
              </div>
            </div>
            <div className="stat-card aprendiz-stat">
              <div className="stat-card-inner">
                <div className="stat-icon stat-icon-yellow">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
                  </svg>
                </div>
                <span className="stat-value">7</span>
                <span className="stat-label">Streak</span>
              </div>
            </div>
            <div className="stat-card aprendiz-stat">
              <div className="stat-card-inner">
                <div className="stat-icon stat-icon-green">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z"/>
                  </svg>
                </div>
                <span className="stat-value">320</span>
                <span className="stat-label">Pontos</span>
              </div>
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
                  <div className="progress-bar-bg" style={{ marginTop: 10 }} role="progressbar" aria-valuenow={75} aria-valuemin={0} aria-valuemax={100}>
                    <div className="progress-bar-fill" style={{ width: '75%' }}/>
                  </div>
                  <p className="continuar-pct">75% concluído</p>
                </div>
              </div>
              <button className="continuar-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
                Continuar aula
              </button>
            </section>

            {/* Ranking */}
            <section className="info-card">
              <h3 className="info-card-title">Ranking Semanal</h3>
              <ol className="ranking-list">
                {RANKING.map((r, i) => (
                  <li key={i} className={`ranking-item${r.destaque ? ' ranking-destaque' : ''}`}>
                    <span className={rankingPosClass(i, r.destaque)}>{rankingPosLabel(i)}</span>
                    <span className="ranking-avatar" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
              <h3 className="info-card-title" style={{ borderBottomColor: '#fed7aa' }}>🔥 Streak</h3>
              <div className="streak-inner">
                <div className="streak-flame">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
                  </svg>
                </div>
                <div>
                  <span className="streak-num">7</span>
                  <span className="streak-label">dias seguidos</span>
                </div>
              </div>
              <p className="streak-msg">Continue assim! Faltam 3 dias para o recorde. 🏆</p>

              {/* Week dots */}
              <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
                {['S','T','Q','Q','S','S','D'].map((d, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%',
                      background: i < 5 ? 'linear-gradient(135deg, #fb923c, #f59e0b)' : '#f3f4f6',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.7rem', color: i < 5 ? '#ffffff' : '#9ca3af', fontWeight: 800,
                    }}>
                      {i < 5 ? '✓' : '·'}
                    </div>
                    <span style={{ fontSize: '0.65rem', color: '#9a3412', fontWeight: 700 }}>{d}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="info-card">
              <h3 className="info-card-title">Progresso nas Trilhas</h3>
              <ul className="progress-list">
                {PROGRESSO.map((p, i) => (
                  <li key={i} className="progress-item">
                    <div className="progress-header">
                      <span className="progress-check" aria-hidden="true">
                        {p.concluida
                          ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1385EA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                          : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/></svg>
                        }
                      </span>
                      <span className="progress-nome" style={{ flex: 1 }}>{p.nome}</span>
                      <span className="progress-pct">{p.pct}%</span>
                    </div>
                    <div className="progress-bar-bg" role="progressbar" aria-valuenow={p.pct} aria-valuemin={0} aria-valuemax={100}>
                      <div className="progress-bar-fill" style={{ width: `${p.pct}%` }}/>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Conquistas chips */}
              <div style={{ marginTop: 20 }}>
                <p style={{ margin: '0 0 10px', fontSize: '0.75rem', fontWeight: 800, color: '#6B7A90', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Conquistas recentes</p>
                <div className="badges-row">
                  <span className="badge-chip badge-chip-yellow">🏅 Primeira trilha</span>
                  <span className="badge-chip badge-chip-blue">⚡ 7 dias streak</span>
                  <span className="badge-chip badge-chip-green">✅ React master</span>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}

function IconGrid() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
}
function IconBook() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
}
function IconTrophy() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
}
function IconFlag() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/></svg>
}
function IconUser() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
}
