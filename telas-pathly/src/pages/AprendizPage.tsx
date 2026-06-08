import { AprendizSidebar } from '../components/AprendizSidebar'
import { IconCheckCircle, IconCircle, IconCrown, IconFlame, IconPlay, IconStar, IconUser } from '../components/common/Icons'
import { ProgressBar } from '../components/common/ProgressBar'
import { StatCard } from '../components/common/StatCard'
import { DashboardShell } from '../components/layout/DashboardShell'
import { PageHeader } from '../components/layout/PageHeader'

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
      <PageHeader onLogoClick={() => undefined} onOpenPerfil={onOpenPerfil} onLogout={onBackToLogin} />

      <DashboardShell
        sidebar={
          <AprendizSidebar
            active="dashboard"
            onOpenDashboard={() => undefined}
            onOpenMinhasTrilhas={onOpenMinhasTrilhas}
            onOpenConquistas={onOpenConquistas}
            onOpenDesafios={onOpenDesafios}
            onOpenPerfil={onOpenPerfil}
          />
        }
      >
          <div className="dashboard-greeting-wrap aprendiz-dashboard-heading">
            <div>
              <span className="dashboard-area-eyebrow">Área do Aluno</span>
              <h1 className="dashboard-greeting">Olá!</h1>
              <p className="dashboard-greeting-sub">
                Continue suas trilhas, acompanhe seu progresso e veja seus próximos desafios.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="stats-grid">
            <StatCard compact value={12} label="Trilhas" icon={<IconStar />} />
            <StatCard compact value={7} label="Streak" icon={<IconFlame style={{ color: '#f97316' }} />} />
            <StatCard compact value={320} label="Pontos" icon={<IconCrown style={{ color: '#eab308' }} />} />
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
<IconPlay />
                </button>
                <div className="continuar-info">
                  <p className="continuar-nome">Introdução ao React</p>
                  <p className="continuar-aula">Aula 6 — Hooks e Estado</p>
<ProgressBar value={75} className="continuar-progress" />
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
<IconUser />
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
<IconFlame size={28} strokeWidth={1.8} />
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
                          ? <IconCheckCircle style={{ color: '#1385EA' }} strokeWidth={2.5} />
                          : <IconCircle style={{ color: '#d1d5db' }} />
                        }
                      </span>
                      <span className="progress-nome" style={{flex: 1}}>{p.nome}</span>
                      <span className="progress-pct">{p.pct}%</span>
                    </div>
<ProgressBar value={p.pct} />
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
      </DashboardShell>
    </div>
  )
}
