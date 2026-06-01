import { CriadorSidebar } from '../components/CriadorSidebar'
import { PathlyLogo } from '../components/PathlyLogo'

type AlunosCriadorPageProps = {
  onOpenDashboard: () => void
  onOpenMinhasTrilhas: () => void
  onBackToLogin: () => void
  onOpenPerfil: () => void
}

const ALUNOS = [
  {
    nome: 'João Silva',
    email: 'joao.silva@email.com',
    trilha: 'Introdução ao React',
    progresso: 82,
    status: 'Ativo',
    ultimoAcesso: 'Hoje',
  },
  {
    nome: 'Ana Souza',
    email: 'ana.souza@email.com',
    trilha: 'Fundamentos de UX',
    progresso: 64,
    status: 'Ativo',
    ultimoAcesso: 'Ontem',
  },
  {
    nome: 'Pedro Lima',
    email: 'pedro.lima@email.com',
    trilha: 'Introdução ao React',
    progresso: 100,
    status: 'Concluiu',
    ultimoAcesso: '2 dias atrás',
  },
  {
    nome: 'Marina Costa',
    email: 'marina.costa@email.com',
    trilha: 'Fundamentos de UX',
    progresso: 28,
    status: 'Em risco',
    ultimoAcesso: '8 dias atrás',
  },
  {
    nome: 'Lucas Pereira',
    email: 'lucas.pereira@email.com',
    trilha: 'TypeScript Essencial',
    progresso: 12,
    status: 'Ativo',
    ultimoAcesso: 'Hoje',
  },
]

export function AlunosCriadorPage({
  onOpenDashboard,
  onOpenMinhasTrilhas,
  onBackToLogin,
  onOpenPerfil,
}: AlunosCriadorPageProps) {
  const alunosAtivos = ALUNOS.filter((aluno) => aluno.status === 'Ativo').length
  const concluidos = ALUNOS.filter((aluno) => aluno.status === 'Concluiu').length
  const mediaProgresso = Math.round(
    ALUNOS.reduce((total, aluno) => total + aluno.progresso, 0) / ALUNOS.length
  )

  return (
    <div className="editor-page">
      <header className="editor-header dashboard-header">
        <PathlyLogo onClick={onBackToLogin} variant="branco" size="md" />

        <nav className="editor-nav">
          <button className="editor-nav-button" type="button" onClick={onOpenDashboard}>
            Dashboard
          </button>
          <button className="editor-nav-button editor-nav-button-active" type="button">
            Alunos
          </button>
          <button className="profile-button" type="button" aria-label="Perfil" onClick={onOpenPerfil}>
            <IconUser />
          </button>
        </nav>
      </header>

      <div className="dashboard-shell">
        <CriadorSidebar
          active="alunos"
          onOpenDashboard={onOpenDashboard}
          onOpenMinhasTrilhas={onOpenMinhasTrilhas}
          onOpenAlunos={() => undefined}
          onOpenPerfil={onOpenPerfil}
        />

        <main className="dashboard-content creator-students-page">
          <section className="creator-students-hero">
            <div>
              <span className="creator-students-eyebrow">Acompanhamento</span>
              <h1>Alunos</h1>
              <p>Veja quem está aprendendo, acompanhe o progresso e identifique alunos que precisam de atenção.</p>
            </div>
          </section>

          <div className="creator-students-summary">
            <SummaryCard value={ALUNOS.length} label="Alunos cadastrados" />
            <SummaryCard value={alunosAtivos} label="Ativos" />
            <SummaryCard value={concluidos} label="Concluíram trilhas" />
            <SummaryCard value={`${mediaProgresso}%`} label="Progresso médio" />
          </div>

          <section className="creator-students-section">
            <div className="creator-students-section-header">
              <div>
                <h2 className="section-title">Lista de alunos</h2>
                <p>Dados gerais dos aprendizes inscritos nas suas trilhas.</p>
              </div>

              <div className="creator-students-search">
                <IconSearch />
                <input type="text" placeholder="Buscar aluno" aria-label="Buscar aluno" />
              </div>
            </div>

            <div className="creator-students-table-wrapper">
              <table className="creator-students-table">
                <thead>
                  <tr>
                    <th>Aluno</th>
                    <th>Trilha atual</th>
                    <th>Progresso</th>
                    <th>Status</th>
                    <th>Último acesso</th>
                    <th>Ação</th>
                  </tr>
                </thead>

                <tbody>
                  {ALUNOS.map((aluno) => (
                    <tr key={aluno.email}>
                      <td>
                        <div className="student-profile">
                          <span className="student-avatar">{aluno.nome.charAt(0)}</span>
                          <div>
                            <strong>{aluno.nome}</strong>
                            <small>{aluno.email}</small>
                          </div>
                        </div>
                      </td>

                      <td>{aluno.trilha}</td>

                      <td>
                        <div className="student-progress-cell">
                          <div className="progress-bar-bg">
                            <div className="progress-bar-fill" style={{ width: `${aluno.progresso}%` }} />
                          </div>
                          <strong>{aluno.progresso}%</strong>
                        </div>
                      </td>

                      <td>
                        <span className={`student-status ${getStatusClass(aluno.status)}`}>
                          {aluno.status}
                        </span>
                      </td>

                      <td>{aluno.ultimoAcesso}</td>

                      <td>
                        <button className="student-action-button" type="button">
                          Ver perfil
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

function SummaryCard({ value, label }: { value: number | string; label: string }) {
  return (
    <article className="creator-student-summary-card">
      <strong>{value}</strong>
      <span>{label}</span>
    </article>
  )
}

function getStatusClass(status: string) {
  if (status === 'Concluiu') return 'student-status-complete'
  if (status === 'Em risco') return 'student-status-risk'
  return 'student-status-active'
}

function IconUser() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

function IconSearch() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
