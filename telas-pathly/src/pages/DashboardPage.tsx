import type { CSSProperties } from 'react'

type DashboardPageProps = {
  onOpenEditor: () => void
  onBackToLogin: () => void
}

const TRILHAS = [
  { nome: 'Introdução ao React', status: 'Ativa', alunos: 42, conclusoes: 18 },
  { nome: 'Fundamentos de UX', status: 'Ativa', alunos: 35, conclusoes: 12 },
  { nome: 'TypeScript Essencial', status: 'Rascunho', alunos: 0, conclusoes: 0 },
]

const ATIVIDADES = [
  { texto: 'João Silva concluiu "Introdução ao React"', tempo: '2h atrás', cor: 'blue' },
  { texto: 'Ana Souza se inscreveu em "Fundamentos de UX"', tempo: '4h atrás', cor: 'green' },
  { texto: 'Você editou "TypeScript Essencial"', tempo: 'Ontem', cor: 'yellow' },
  { texto: 'Pedro Lima concluiu "TypeScript Essencial"', tempo: 'Ontem', cor: 'blue' },
]

const dotColors: Record<string, CSSProperties> = {
  blue: { background: '#E8F3FD', color: '#1385EA' },
  green: { background: '#E6FAF0', color: '#22C55E' },
  yellow: { background: '#FEF7E0', color: '#b45309' },
}

export function DashboardPage({ onOpenEditor, onBackToLogin }: DashboardPageProps) {
  const trilhasAtivas = TRILHAS.filter((t) => t.status === 'Ativa').length
  const totalAlunos = TRILHAS.reduce((s, t) => s + t.alunos, 0)
  const totalConclusoes = TRILHAS.reduce((s, t) => s + t.conclusoes, 0)

  return (
    <div className="editor-page">
      <header className="editor-header dashboard-header">
        <button className="editor-logo" type="button" onClick={onBackToLogin}>
          PATHLY
        </button>

        <nav className="editor-nav">
          <a href="#documentacao">Documentação</a>
          <a href="#trilhas">Minhas Trilhas</a>
          <button className="profile-button" type="button" aria-label="Perfil">
            <IconUser />
          </button>
        </nav>
      </header>

      <div className="dashboard-shell">
        <aside className="dashboard-sidebar">
          <span className="sidebar-logo-accent" />
          <p className="sidebar-label">Menu</p>

          <nav className="sidebar-nav">
            {[
              { label: 'Dashboard', icon: <IconGrid /> },
              { label: 'Minhas Trilhas', icon: <IconBook /> },
              { label: 'Alunos', icon: <IconUsers /> },
              { label: 'Configurações', icon: <IconSettings /> },
            ].map((item, i) => (
              <a key={item.label} href="#" className={`sidebar-item${i === 0 ? ' sidebar-item-active' : ''}`}>
                {item.icon}
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        <main className="dashboard-content">
          <div className="dashboard-greeting-wrap">
            <div>
              <h1 className="dashboard-greeting">Olá, Criador! 👋</h1>
              <p className="dashboard-greeting-sub">
                Você tem {trilhasAtivas} trilhas ativas e {totalAlunos} alunos aprendendo agora.
              </p>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-card-inner">
                <div className="stat-icon stat-icon-blue">
                  <IconList />
                </div>
                <span className="stat-value">{trilhasAtivas}</span>
                <span className="stat-label">Trilhas Ativas</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-card-inner">
                <div className="stat-icon stat-icon-green">
                  <IconUsers />
                </div>
                <span className="stat-value">{totalAlunos}</span>
                <span className="stat-label">Alunos</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-card-inner">
                <div className="stat-icon stat-icon-yellow">
                  <IconCheck />
                </div>
                <span className="stat-value">{totalConclusoes}</span>
                <span className="stat-label">Total de conclusões</span>
              </div>
            </div>
          </div>

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
                  {TRILHAS.map((t) => (
                    <tr key={t.nome}>
                      <td className="trilha-nome">{t.nome}</td>
                      <td>
                        <span className={`status-badge ${t.status === 'Ativa' ? 'status-ativa' : 'status-rascunho'}`}>
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

          <div className="bottom-grid">
            <section className="info-card">
              <h3 className="info-card-title">Atividades recentes</h3>

              <ul className="activity-list">
                {ATIVIDADES.map((a, i) => (
                  <li key={i} className="activity-item">
                    <span className="activity-dot" aria-hidden="true" style={dotColors[a.cor]}>
                      <IconUserSmall />
                    </span>
                    <span className="activity-text">{a.texto}</span>
                    <span className="activity-time">{a.tempo}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="info-card">
              <h3 className="info-card-title">Progresso por trilha</h3>

              <ul className="progress-list">
                {TRILHAS.filter((t) => t.alunos > 0).map((t) => {
                  const pct = Math.round((t.conclusoes / t.alunos) * 100)

                  return (
                    <li key={t.nome} className="progress-item">
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

function IconGrid() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  )
}

function IconBook() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  )
}

function IconUsers() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function IconSettings() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      <path d="M4.93 4.93a10 10 0 0 0 0 14.14" />
    </svg>
  )
}

function IconUser() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

function IconUserSmall() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

function IconList() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3h18v4H3z" />
      <path d="M3 10h18v4H3z" />
      <path d="M3 17h18v4H3z" />
    </svg>
  )
}

function IconCheck() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}
