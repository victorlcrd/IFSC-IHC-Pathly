import { HeaderProfileMenu } from '../components/HeaderProfileMenu'
import { AprendizSidebar } from '../components/AprendizSidebar'
import { PathlyLogo } from '../components/PathlyLogo'
import './DesafiosPage.css'

type DesafiosPageProps = {
  onBackToLogin: () => void
  onOpenDashboard: () => void
  onOpenMinhasTrilhas: () => void
  onOpenConquistas: () => void
  onOpenPerfil: () => void
}

type DesafioStatus = 'nao-iniciado' | 'pendente' | 'em-andamento' | 'concluido'

type Desafio = {
  titulo: string
  descricao: string
  trilha: string
  dificuldade: string
  recompensa: string
  prazo: string
  status: DesafioStatus
  progresso: number
}

const DESAFIOS: Desafio[] = [
  {
    titulo: 'Complete 3 aulas de React',
    descricao: 'Avance na trilha Introdução ao React concluindo três aulas sequenciais.',
    trilha: 'Introdução ao React',
    dificuldade: 'Fácil',
    recompensa: '120 pts',
    prazo: 'Hoje',
    status: 'em-andamento',
    progresso: 66,
  },
  {
    titulo: 'Resolva o quiz de UX',
    descricao: 'Finalize o quiz de fixação sobre heurísticas e princípios de usabilidade.',
    trilha: 'Fundamentos de UX',
    dificuldade: 'Médio',
    recompensa: '180 pts',
    prazo: '2 dias',
    status: 'pendente',
    progresso: 0,
  },
  {
    titulo: 'Primeiro desafio de código',
    descricao: 'Implemente um componente com estado e valide seu resultado na plataforma.',
    trilha: 'React na prática',
    dificuldade: 'Médio',
    recompensa: '250 pts',
    prazo: '5 dias',
    status: 'nao-iniciado',
    progresso: 0,
  },
  {
    titulo: 'Mantenha o streak semanal',
    descricao: 'Acesse a plataforma por 7 dias seguidos para liberar uma conquista especial.',
    trilha: 'Rotina de estudos',
    dificuldade: 'Fácil',
    recompensa: 'Badge especial',
    prazo: 'Concluído',
    status: 'concluido',
    progresso: 100,
  },
]

const statusLabel: Record<DesafioStatus, string> = {
  'nao-iniciado': 'Não iniciado',
  pendente: 'Pendente',
  'em-andamento': 'Em andamento',
  concluido: 'Concluído',
}

export function DesafiosPage({
  onBackToLogin,
  onOpenDashboard,
  onOpenMinhasTrilhas,
  onOpenConquistas,
  onOpenPerfil,
}: DesafiosPageProps) {
  const concluidos = DESAFIOS.filter((desafio) => desafio.status === 'concluido').length
  const emAndamento = DESAFIOS.filter((desafio) => desafio.status === 'em-andamento').length
  const pendentes = DESAFIOS.filter((desafio) => desafio.status === 'pendente' || desafio.status === 'nao-iniciado').length

  return (
    <div className="editor-page aprendiz-page desafios-page">
      <header className="editor-header dashboard-header">
        <PathlyLogo onClick={onOpenDashboard} variant="branco" size="md" />

        <nav className="editor-nav">
          <button type="button" className="nav-text-button" onClick={onOpenDashboard}>
            Dashboard
          </button>
          <a href="#explorar">Explorar</a>
          <HeaderProfileMenu onOpenPerfil={onOpenPerfil} onLogout={onBackToLogin} />
        </nav>
      </header>

      <div className="dashboard-shell">
        <AprendizSidebar
          active="desafios"
          onOpenDashboard={onOpenDashboard}
          onOpenMinhasTrilhas={onOpenMinhasTrilhas}
          onOpenConquistas={onOpenConquistas}
          onOpenDesafios={() => undefined}
          onOpenPerfil={onOpenPerfil}
        />

        <main className="dashboard-content desafios-content">
          <section className="desafios-hero">
            <div>
              <span className="desafios-eyebrow">Área do aprendiz</span>
              <h1>Desafios</h1>
              <p>Veja desafios disponíveis, acompanhe o status e conclua tarefas para ganhar pontos e badges.</p>
            </div>
          </section>

          <section className="desafios-summary" aria-label="Resumo dos desafios">
            <SummaryCard value={DESAFIOS.length} label="Disponíveis" />
            <SummaryCard value={emAndamento} label="Em andamento" />
            <SummaryCard value={pendentes} label="Pendentes" />
            <SummaryCard value={concluidos} label="Concluídos" />
          </section>

          <section className="desafios-list-section">
            <div className="desafios-section-header">
              <div>
                <h2 className="section-title">Lista de desafios</h2>
                <p>Escolha um desafio para iniciar ou continue os que já estão em andamento.</p>
              </div>
            </div>

            <div className="desafios-grid">
              {DESAFIOS.map((desafio) => (
                <article className="desafio-card" key={desafio.titulo}>
                  <div className="desafio-card-header">
                    <span className={`desafio-status desafio-status-${desafio.status}`}>
                      {statusLabel[desafio.status]}
                    </span>
                    <span className="desafio-reward">{desafio.recompensa}</span>
                  </div>

                  <h3>{desafio.titulo}</h3>
                  <p>{desafio.descricao}</p>

                  <div className="desafio-meta">
                    <span>{desafio.trilha}</span>
                    <span>{desafio.dificuldade}</span>
                    <span>{desafio.prazo}</span>
                  </div>

                  <div className="desafio-progress-row">
                    <div className="progress-bar-bg" role="progressbar" aria-valuenow={desafio.progresso} aria-valuemin={0} aria-valuemax={100}>
                      <div className="progress-bar-fill" style={{ width: `${desafio.progresso}%` }} />
                    </div>
                    <strong>{desafio.progresso}%</strong>
                  </div>

                  <button className="trilha-primary-action desafio-action" type="button">
                    {getActionLabel(desafio.status)}
                  </button>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

function SummaryCard({ value, label }: { value: number; label: string }) {
  return (
    <article className="desafio-summary-card">
      <strong>{value}</strong>
      <span>{label}</span>
    </article>
  )
}

function getActionLabel(status: DesafioStatus) {
  if (status === 'concluido') return 'Ver conclusão'
  if (status === 'em-andamento') return 'Continuar desafio'
  return 'Iniciar desafio'
}
