import { CriadorSidebar } from '../components/CriadorSidebar'
import { PathlyLogo } from '../components/PathlyLogo'

type MinhasTrilhasCriadorPageProps = {
  onOpenDashboard: () => void
  onOpenEditor: () => void
  onOpenAlunos: () => void
  onBackToLogin: () => void
}

const TRILHAS_PUBLICADAS = [
  {
    nome: 'Introdução ao React',
    descricao: 'Fundamentos de componentes, props, estados e criação de interfaces modernas.',
    aulas: 8,
    alunos: 42,
    atualizacao: 'Atualizada há 2 dias',
  },
  {
    nome: 'Fundamentos de UX',
    descricao: 'Pesquisa com usuários, prototipação e validação de fluxos de aprendizagem.',
    aulas: 6,
    alunos: 35,
    atualizacao: 'Atualizada há 5 dias',
  },
]

const TRILHAS_RASCUNHO = [
  {
    nome: 'TypeScript Essencial',
    descricao: 'Tipagem, interfaces e boas práticas para evoluir projetos React com segurança.',
    aulas: 4,
    alunos: 0,
    atualizacao: 'Editada ontem',
  },
  {
    nome: 'Acessibilidade para produtos digitais',
    descricao: 'Contraste, navegação por teclado e escrita inclusiva para interfaces.',
    aulas: 3,
    alunos: 0,
    atualizacao: 'Editada hoje',
  },
]

export function MinhasTrilhasCriadorPage({
  onOpenDashboard,
  onOpenEditor,
  onOpenAlunos,
  onBackToLogin,
}: MinhasTrilhasCriadorPageProps) {
  const totalAlunos = TRILHAS_PUBLICADAS.reduce((total, trilha) => total + trilha.alunos, 0)

  return (
    <div className="editor-page">
      <header className="editor-header dashboard-header">
        <PathlyLogo onClick={onBackToLogin} variant="branco" size="md" />

        <nav className="editor-nav">
          <button className="editor-nav-button" type="button" onClick={onOpenDashboard}>
            Dashboard
          </button>
          <button className="profile-button" type="button" aria-label="Perfil">
            <IconUser />
          </button>
        </nav>
      </header>

      <div className="dashboard-shell">
        <CriadorSidebar
          active="trilhas"
          onOpenDashboard={onOpenDashboard}
          onOpenMinhasTrilhas={() => undefined}
          onOpenAlunos={onOpenAlunos}
        />

        <main className="dashboard-content creator-trails-page">
          <section className="creator-trails-hero">
            <div>
              <span className="creator-trails-eyebrow">Área do criador</span>
              <h1>Minhas Trilhas</h1>
              <p>Gerencie trilhas publicadas e continue editando seus rascunhos.</p>
            </div>

            <button
              className="workspace-action-btn workspace-action-btn-primary"
              type="button"
              onClick={onOpenEditor}
            >
              + Criar nova trilha
            </button>
          </section>

          <div className="creator-trails-summary">
            <SummaryCard value={TRILHAS_PUBLICADAS.length} label="Publicadas" />
            <SummaryCard value={TRILHAS_RASCUNHO.length} label="Rascunhos" />
            <SummaryCard value={totalAlunos} label="Alunos inscritos" />
          </div>

          <TrailSection
            title="Trilhas publicadas"
            description="Disponíveis para os aprendizes acessarem agora."
            trails={TRILHAS_PUBLICADAS}
            status="Publicada"
            actionLabel="Ver detalhes"
            onAction={onOpenEditor}
          />

          <TrailSection
            title="Rascunhos"
            description="Trilhas em construção que ainda não foram publicadas."
            trails={TRILHAS_RASCUNHO}
            status="Rascunho"
            actionLabel="Continuar edição"
            onAction={onOpenEditor}
          />
        </main>
      </div>
    </div>
  )
}

function SummaryCard({ value, label }: { value: number; label: string }) {
  return (
    <article className="creator-summary-card">
      <strong>{value}</strong>
      <span>{label}</span>
    </article>
  )
}

function TrailSection({
  title,
  description,
  trails,
  status,
  actionLabel,
  onAction,
}: {
  title: string
  description: string
  trails: typeof TRILHAS_PUBLICADAS
  status: 'Publicada' | 'Rascunho'
  actionLabel: string
  onAction: () => void
}) {
  return (
    <section className="creator-trails-section">
      <div className="creator-trails-section-header">
        <div>
          <h2 className="section-title">{title}</h2>
          <p>{description}</p>
        </div>
      </div>

      <div className="creator-trails-grid">
        {trails.map((trilha) => (
          <article className="creator-trail-card" key={trilha.nome}>
            <div className="creator-trail-card-header">
              <span className={`status-badge ${status === 'Publicada' ? 'status-ativa' : 'status-rascunho'}`}>
                {status}
              </span>
              <span className="creator-trail-updated">{trilha.atualizacao}</span>
            </div>

            <h3>{trilha.nome}</h3>
            <p>{trilha.descricao}</p>

            <div className="creator-trail-meta">
              <span>{trilha.aulas} aulas</span>
              <span>{trilha.alunos} alunos</span>
            </div>

            <button className="creator-trail-action" type="button" onClick={onAction}>
              {actionLabel}
            </button>
          </article>
        ))}
      </div>
    </section>
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
