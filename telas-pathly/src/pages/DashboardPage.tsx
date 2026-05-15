type DashboardPageProps = {
  onOpenEditor: () => void
  onBackToLogin: () => void
}

const TRILHAS = [
  { nome: 'Introdução ao React', status: 'Ativa', alunos: 34, conclusoes: 21 },
  { nome: 'Fundamentos de UX', status: 'Ativa', alunos: 18, conclusoes: 9 },
  { nome: 'Git na Prática', status: 'Rascunho', alunos: 0, conclusoes: 0 },
  { nome: 'TypeScript Essencial', status: 'Ativa', alunos: 27, conclusoes: 14 },
]

const ATIVIDADES = [
  { texto: 'João Silva concluiu "Introdução ao React"', tempo: '2h atrás' },
  { texto: 'Ana Souza se inscreveu em "Fundamentos de UX"', tempo: '4h atrás' },
  { texto: 'Você editou "TypeScript Essencial"', tempo: 'Ontem' },
  { texto: 'Pedro Lima concluiu "TypeScript Essencial"', tempo: 'Ontem' },
]

export function DashboardPage({ onOpenEditor, onBackToLogin }: DashboardPageProps) {
  const trilhasAtivas = TRILHAS.filter(t => t.status === 'Ativa').length
  const totalAlunos = TRILHAS.reduce((s, t) => s + t.alunos, 0)
  const totalConclusoes = TRILHAS.reduce((s, t) => s + t.conclusoes, 0)

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
          <a href="#documentacao">Documentação</a>
          <a href="#trilhas">Minhas Trilhas</a>
          <button className="profile-button" type="button" aria-label="Perfil">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
            </svg>
          </button>
        </nav>
      </header>

      {/* Main content */}
      <div className="dashboard-shell">
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <p className="sidebar-label">Menu</p>
          <nav className="sidebar-nav">
            <a href="#" className="sidebar-item sidebar-item-active">Dashboard</a>
            <a href="#" className="sidebar-item">Minhas Trilhas</a>
            <a href="#" className="sidebar-item">Alunos</a>
            <a href="#" className="sidebar-item">Configurações</a>
          </nav>
        </aside>

        {/* Content */}
        <main className="dashboard-content">
          <h1 className="dashboard-greeting">Olá!</h1>

          {/* Stats */}
          <div className="stats-grid">
            <div className="stat-card">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 3h18v4H3z" /><path d="M3 10h18v4H3z" /><path d="M3 17h18v4H3z" />
              </svg>
              <span className="stat-value">{trilhasAtivas}</span>
              <span className="stat-label">Trilhas Ativas</span>
            </div>
            <div className="stat-card">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <span className="stat-value">{totalAlunos}</span>
              <span className="stat-label">Alunos</span>
            </div>
            <div className="stat-card">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span className="stat-value">{totalConclusoes}</span>
              <span className="stat-label">Total de conclusões</span>
            </div>
          </div>

          {/* Trilhas table */}
          <section className="dashboard-section" id="trilhas">
            <h2 className="section-title">Minhas Trilhas</h2>
            <div className="table-wrapper">
              <table className="trilhas-table">
                <thead>
                  <tr>
                    <th>Trilha</th>
                    <th>Status</th>
                    <th>Alunos</th>
                    <th>Conclusões</th>
                  </tr>
                </thead>
                <tbody>
                  {TRILHAS.map((t, i) => (
                    <tr key={i}>
                      <td className="trilha-nome">{t.nome}</td>
                      <td>
                        <span className={`status-badge status-${t.status === 'Ativa' ? 'ativa' : 'rascunho'}`}>
                          {t.status}
                        </span>
                      </td>
                      <td>{t.alunos}</td>
                      <td>{t.conclusoes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button className="create-trilha-button" type="button" onClick={onOpenEditor}>
              + Criar nova trilha
            </button>
          </section>

          {/* Bottom cards */}
          <div className="bottom-grid">
            <section className="info-card">
              <h3 className="info-card-title">Atividades recentes</h3>
              <ul className="activity-list">
                {ATIVIDADES.map((a, i) => (
                  <li key={i} className="activity-item">
                    <span className="activity-dot" aria-hidden="true" />
                    <span className="activity-text">{a.texto}</span>
                    <span className="activity-time">{a.tempo}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="info-card">
              <h3 className="info-card-title">Progresso por trilha</h3>
              <ul className="progress-list">
                {TRILHAS.filter(t => t.alunos > 0).map((t, i) => {
                  const pct = t.alunos > 0 ? Math.round((t.conclusoes / t.alunos) * 100) : 0
                  return (
                    <li key={i} className="progress-item">
                      <div className="progress-header">
                        <span className="progress-nome">{t.nome}</span>
                        <span className="progress-pct">{pct}%</span>
                      </div>
                      <div className="progress-bar-bg" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
                        <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
                      </div>
                    </li>
                  )
                })}
              </ul>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
