import type { CSSProperties } from 'react'
import { CriadorSidebar } from '../components/CriadorSidebar'
import { PathlyLogo } from '../components/PathlyLogo'

type DashboardPageProps = {
  onOpenEditor: () => void
  onOpenMinhasTrilhas: () => void
  onOpenAlunos: () => void
  onBackToLogin: () => void
  onOpenPerfil: () => void
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

export function DashboardPage({
  onOpenEditor,
  onOpenMinhasTrilhas,
  onOpenAlunos,
  onBackToLogin,
  onOpenPerfil,
}: DashboardPageProps) {
  const trilhasAtivas = TRILHAS.filter((t) => t.status === 'Ativa').length
  const totalAlunos = TRILHAS.reduce((s, t) => s + t.alunos, 0)
  const totalConclusoes = TRILHAS.reduce((s, t) => s + t.conclusoes, 0)

  return (
    <div className="editor-page">
      <header className="editor-header dashboard-header">
        <PathlyLogo onClick={onBackToLogin} variant="branco" size="md" />

        <nav className="editor-nav">
          <a href="#documentacao">Documentação</a>
          <button className="profile-button" type="button" aria-label="Perfil" onClick={onOpenPerfil}>
            <IconUser />
          </button>
        </nav>
      </header>

      <div className="dashboard-shell">
        <CriadorSidebar
          active="dashboard"
          onOpenDashboard={() => undefined}
          onOpenMinhasTrilhas={onOpenMinhasTrilhas}
          onOpenAlunos={onOpenAlunos}
          onOpenPerfil={onOpenPerfil}
        />

        <main className="dashboard-content">
          <div className="dashboard-greeting-wrap">
            <div>
              <h1 className="dashboard-greeting">Olá, Criador!</h1>
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