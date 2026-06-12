import type { CSSProperties } from 'react'
import { CriadorSidebar } from '../components/CriadorSidebar'
import { IconCheckCircle, IconList, IconUser, IconUsers } from '../components/common/Icons'
import { ProgressBar } from '../components/common/ProgressBar'
import { StatCard } from '../components/common/StatCard'
import { DashboardShell } from '../components/layout/DashboardShell'
import { PageHeader } from '../components/layout/PageHeader'
import type { CreatorTrail } from '../components/editor/editorTypes'

type DashboardPageProps = {
  trails: CreatorTrail[]
  onOpenEditor: () => void
  onOpenMinhasTrilhas: () => void
  onOpenAlunos: () => void
  onBackToLogin: () => void
  onOpenPerfil: () => void
}

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
  trails,
  onOpenEditor,
  onOpenMinhasTrilhas,
  onOpenAlunos,
  onBackToLogin,
  onOpenPerfil,
}: DashboardPageProps) {
  const trilhasAtivas = trails.filter((t) => t.status === 'published').length
  const totalAlunos = trails.reduce((s, t) => s + t.alunos, 0)
  const totalConclusoes = trails.reduce((s, t) => s + t.conclusoes, 0)

  return (
    <div className="editor-page">
      <PageHeader
        onLogoClick={() => undefined}
        onOpenPerfil={onOpenPerfil}
        onLogout={onBackToLogin}
        linkLabel="Documentação"
        linkHref="#documentacao"
      />

      <DashboardShell
        sidebar={
          <CriadorSidebar
            active="dashboard"
            onOpenDashboard={() => undefined}
            onOpenMinhasTrilhas={onOpenMinhasTrilhas}
            onOpenAlunos={onOpenAlunos}
            onOpenPerfil={onOpenPerfil}
          />
        }
      >
        <div className="dashboard-greeting-wrap">
          <div>
            <span className="dashboard-area-eyebrow">Área do criador</span>
            <h1 className="dashboard-greeting">Olá, Criador!</h1>
            <p className="dashboard-greeting-sub">
              Você tem {trilhasAtivas} trilhas ativas e {totalAlunos} alunos aprendendo agora.
            </p>
          </div>
        </div>

        <div className="stats-grid">
          <StatCard value={trilhasAtivas} label="Trilhas Ativas" icon={<IconList size={20} />} iconClassName="stat-icon stat-icon-blue" />
          <StatCard value={totalAlunos} label="Alunos" icon={<IconUsers size={20} />} iconClassName="stat-icon stat-icon-green" />
          <StatCard value={totalConclusoes} label="Total de conclusões" icon={<IconCheckCircle size={20} />} iconClassName="stat-icon stat-icon-yellow" />
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
                {trails.map((t) => {
                  const statusLabel = t.status === 'published' ? 'Ativa' : 'Rascunho'

                  return (
                    <tr key={t.id}>
                      <td className="trilha-nome">{t.title}</td>
                      <td>
                        <span className={`status-badge ${t.status === 'published' ? 'status-ativa' : 'status-rascunho'}`}>
                          {statusLabel}
                        </span>
                      </td>
                      <td>{t.alunos}</td>
                      <td>{t.conclusoes}</td>
                    </tr>
                  )
                })}
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
                    <IconUser size={12} strokeWidth={2.5} />
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
              {trails.filter((t) => t.alunos > 0).map((t) => {
                const pct = Math.round((t.conclusoes / t.alunos) * 100)

                return (
                  <li key={t.id} className="progress-item">
                    <div className="progress-header">
                      <span className="progress-nome">{t.title}</span>
                      <span className="progress-pct">{pct}%</span>
                    </div>
                    <ProgressBar value={pct} />
                  </li>
                )
              })}
            </ul>
          </section>
        </div>
      </DashboardShell>
    </div>
  )
}
