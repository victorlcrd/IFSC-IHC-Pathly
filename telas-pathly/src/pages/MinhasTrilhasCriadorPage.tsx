import { HeaderProfileMenu } from '../components/HeaderProfileMenu'
import { CriadorSidebar } from '../components/CriadorSidebar'
import { PathlyLogo } from '../components/PathlyLogo'
import type { CreatorTrail } from '../components/editor/editorTypes'

type MinhasTrilhasCriadorPageProps = {
  trails: CreatorTrail[]
  onOpenDashboard: () => void
  onOpenEditor: (trailId?: number) => void
  onOpenAlunos: () => void
  onBackToLogin: () => void
  onOpenPerfil: () => void
}

export function MinhasTrilhasCriadorPage({
  trails,
  onOpenDashboard,
  onOpenEditor,
  onOpenAlunos,
  onBackToLogin,
  onOpenPerfil,
}: MinhasTrilhasCriadorPageProps) {
  const publishedTrails = trails.filter((trilha) => trilha.status === 'published')
  const draftTrails = trails.filter((trilha) => trilha.status === 'draft')
  const totalAlunos = publishedTrails.reduce((total, trilha) => total + trilha.alunos, 0)

  return (
    <div className="editor-page">
      <header className="editor-header dashboard-header">
        <PathlyLogo onClick={onOpenDashboard} variant="branco" size="md" />

        <nav className="editor-nav">
          <button className="editor-nav-button" type="button" onClick={onOpenDashboard}>
            Dashboard
          </button>
          <HeaderProfileMenu onOpenPerfil={onOpenPerfil} onLogout={onBackToLogin} />
        </nav>
      </header>

      <div className="dashboard-shell">
        <CriadorSidebar
          active="trilhas"
          onOpenDashboard={onOpenDashboard}
          onOpenMinhasTrilhas={() => undefined}
          onOpenAlunos={onOpenAlunos}
          onOpenPerfil={onOpenPerfil}
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
              onClick={() => onOpenEditor()}
            >
              + Criar nova trilha
            </button>
          </section>

          <div className="creator-trails-summary">
            <SummaryCard value={publishedTrails.length} label="Publicadas" />
            <SummaryCard value={draftTrails.length} label="Rascunhos" />
            <SummaryCard value={totalAlunos} label="Alunos inscritos" />
          </div>

          <TrailSection
            title="Trilhas publicadas"
            description="Disponíveis para os aprendizes acessarem agora."
            trails={publishedTrails}
            status="Publicada"
            actionLabel="Ver detalhes"
            onAction={onOpenEditor}
          />

          <TrailSection
            title="Rascunhos"
            description="Trilhas em construção que ainda não foram publicadas."
            trails={draftTrails}
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
  trails: CreatorTrail[]
  status: 'Publicada' | 'Rascunho'
  actionLabel: string
  onAction: (trailId: number) => void
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
          <article className="creator-trail-card" key={trilha.id}>
            <div className={`creator-trail-cover${trilha.coverDataUrl ? ' creator-trail-cover-filled' : ''}`}>
              {trilha.coverDataUrl ? (
                <img src={trilha.coverDataUrl} alt="" />
              ) : (
                <span>{trilha.category || 'Trilha'}</span>
              )}
            </div>

            <div className="creator-trail-card-header">
              <span className={`status-badge ${status === 'Publicada' ? 'status-ativa' : 'status-rascunho'}`}>
                {status}
              </span>
              <span className="creator-trail-updated">{trilha.updatedAtLabel}</span>
            </div>

            <h3>{trilha.title}</h3>
            <p>{trilha.description}</p>

            <div className="creator-trail-meta">
              <span>{trilha.aulas} aulas</span>
              <span>{trilha.alunos} alunos</span>
            </div>

            <button className="creator-trail-action" type="button" onClick={() => onAction(trilha.id)}>
              {actionLabel}
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}
