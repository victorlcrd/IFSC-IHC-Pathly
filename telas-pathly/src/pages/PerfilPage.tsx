import { useState, type ChangeEvent, type ReactNode } from 'react'
import { AprendizSidebar } from '../components/AprendizSidebar'
import { CriadorSidebar } from '../components/CriadorSidebar'
import { HeaderProfileMenu } from '../components/HeaderProfileMenu'
import { PathlyLogo } from '../components/PathlyLogo'

type ProfileData = {
  nome: string
  email: string
  tipo: string
  dataCadastro: string
  telefone: string
  localizacao: string
  bio: string
  areaInteresse: string
  instituicao: string
  portfolio: string
}

type PerfilAprendizPageProps = {
  onBackToLogin: () => void
  onOpenDashboard: () => void
  onOpenMinhasTrilhas: () => void
  onOpenConquistas: () => void
}

type PerfilCriadorPageProps = {
  onBackToLogin: () => void
  onOpenDashboard: () => void
  onOpenMinhasTrilhas: () => void
  onOpenAlunos: () => void
}

const APRENDIZ_INITIAL_DATA: ProfileData = {
  nome: 'Victor Blum',
  email: 'victor.blum@email.com',
  tipo: 'Aprendiz',
  dataCadastro: '15/05/2026',
  telefone: '(48) 99999-0000',
  localizacao: 'São José, SC',
  bio: 'Aprendiz focado em desenvolver habilidades técnicas por trilhas práticas, conteúdos curtos e acompanhamento de progresso.',
  areaInteresse: 'React, UX e desenvolvimento web',
  instituicao: 'IFSC — Campus São José',
  portfolio: 'linkedin.com/in/victorblum',
}

const CRIADOR_INITIAL_DATA: ProfileData = {
  nome: 'Victor Blum',
  email: 'victor.criador@pathly.com',
  tipo: 'Criador',
  dataCadastro: '12/05/2026',
  telefone: '(48) 98888-0000',
  localizacao: 'Florianópolis, SC',
  bio: 'Criador de trilhas voltadas para aprendizagem prática, com foco em clareza, progressão visual e acompanhamento de alunos.',
  areaInteresse: 'Desenvolvimento front-end e educação digital',
  instituicao: 'Pathly Creator Program',
  portfolio: 'portfolio.pathly.com/victor-blum',
}

export function PerfilAprendizPage({
  onBackToLogin,
  onOpenDashboard,
  onOpenMinhasTrilhas,
  onOpenConquistas,
}: PerfilAprendizPageProps) {
  return (
    <ProfileLayout
      initialData={APRENDIZ_INITIAL_DATA}
      variant="aprendiz"
      onBackToLogin={onBackToLogin}
      onOpenDashboard={onOpenDashboard}
      onOpenMinhasTrilhas={onOpenMinhasTrilhas}
      onOpenConquistas={onOpenConquistas}
    />
  )
}

export function PerfilCriadorPage({
  onBackToLogin,
  onOpenDashboard,
  onOpenMinhasTrilhas,
  onOpenAlunos,
}: PerfilCriadorPageProps) {
  return (
    <ProfileLayout
      initialData={CRIADOR_INITIAL_DATA}
      variant="criador"
      onBackToLogin={onBackToLogin}
      onOpenDashboard={onOpenDashboard}
      onOpenMinhasTrilhas={onOpenMinhasTrilhas}
      onOpenAlunos={onOpenAlunos}
    />
  )
}

type ProfileLayoutProps = {
  initialData: ProfileData
  variant: 'aprendiz' | 'criador'
  onBackToLogin: () => void
  onOpenDashboard: () => void
  onOpenMinhasTrilhas: () => void
  onOpenAlunos?: () => void
  onOpenConquistas?: () => void
}

function ProfileLayout({
  initialData,
  variant,
  onBackToLogin,
  onOpenDashboard,
  onOpenMinhasTrilhas,
  onOpenAlunos,
  onOpenConquistas = () => undefined,
}: ProfileLayoutProps) {
  const [savedData, setSavedData] = useState(initialData)
  const [formData, setFormData] = useState(initialData)
  const [isEditing, setIsEditing] = useState(false)

  const isAprendiz = variant === 'aprendiz'
  const initials = savedData.nome
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  function handleChange(field: keyof ProfileData) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((current) => ({
        ...current,
        [field]: event.target.value,
      }))
    }
  }

  function handleCancel() {
    setFormData(savedData)
    setIsEditing(false)
  }

  function handleSave() {
    setSavedData(formData)
    setIsEditing(false)
  }

  return (
    <div className={`editor-page profile-page ${isAprendiz ? 'aprendiz-page' : 'creator-profile-page'}`}>
      <header className="editor-header dashboard-header">
        <PathlyLogo onClick={onBackToLogin} variant="branco" size="md" />

        <nav className="editor-nav">
          <button className="editor-nav-button" type="button" onClick={onOpenDashboard}>
            Dashboard
          </button>
          <HeaderProfileMenu onOpenPerfil={() => undefined} onLogout={onBackToLogin} active />
        </nav>
      </header>

      <div className="dashboard-shell">
        {isAprendiz ? (
          <AprendizSidebar
            active="perfil"
            onOpenDashboard={onOpenDashboard}
            onOpenMinhasTrilhas={onOpenMinhasTrilhas}
            onOpenConquistas={onOpenConquistas}
            onOpenPerfil={() => undefined}
          />
        ) : (
          <CriadorSidebar
            active="perfil"
            onOpenDashboard={onOpenDashboard}
            onOpenMinhasTrilhas={onOpenMinhasTrilhas}
            onOpenAlunos={onOpenAlunos ?? (() => undefined)}
            onOpenPerfil={() => undefined}
          />
        )}

        <main className="dashboard-content profile-content">
          <section className="profile-hero-card">
            <div className="profile-avatar" aria-hidden="true">
              {initials}
            </div>

            <div className="profile-hero-info">
              <span className="profile-eyebrow">Perfil {savedData.tipo}</span>
              <h1>{savedData.nome}</h1>
              <p>{savedData.bio}</p>
            </div>

            <button
              className="workspace-action-btn workspace-action-btn-primary profile-edit-button"
              type="button"
              onClick={() => setIsEditing(true)}
              disabled={isEditing}
            >
              Editar perfil
            </button>
          </section>

          <section className="profile-summary-grid" aria-label="Resumo do perfil">
            <ProfileSummaryCard icon={<IconMail />} label="E-mail" value={savedData.email} />
            <ProfileSummaryCard icon={<IconBadge />} label="Tipo de usuário" value={savedData.tipo} />
            <ProfileSummaryCard icon={<IconCalendar />} label="Cadastro" value={savedData.dataCadastro} />
          </section>

          <section className="profile-main-grid">
            <article className="profile-panel">
              <div className="profile-section-heading">
                <div>
                  <h2 className="section-title">Informações básicas</h2>
                  <p>Dados principais do usuário. Estes campos ficam fixos no protótipo.</p>
                </div>
                <span className="profile-lock-badge">Não editável</span>
              </div>

              <div className="profile-readonly-grid">
                <ReadonlyField label="Nome" value={savedData.nome} />
                <ReadonlyField label="E-mail" value={savedData.email} />
                <ReadonlyField label="Tipo" value={savedData.tipo} />
                <ReadonlyField label="Data de cadastro" value={savedData.dataCadastro} />
              </div>
            </article>

            <article className="profile-panel">
              <div className="profile-section-heading">
                <div>
                  <h2 className="section-title">Informações editáveis</h2>
                  <p>Atualize os dados complementares do perfil.</p>
                </div>
                <span className={`profile-state-badge${isEditing ? ' profile-state-editing' : ''}`}>
                  {isEditing ? 'Editando' : 'Visualização'}
                </span>
              </div>

              <div className="profile-form-grid">
                <EditableField
                  label="Telefone"
                  value={formData.telefone}
                  disabled={!isEditing}
                  onChange={handleChange('telefone')}
                />
                <EditableField
                  label="Localização"
                  value={formData.localizacao}
                  disabled={!isEditing}
                  onChange={handleChange('localizacao')}
                />
                <EditableField
                  label="Área de interesse"
                  value={formData.areaInteresse}
                  disabled={!isEditing}
                  onChange={handleChange('areaInteresse')}
                />
                <EditableField
                  label="Instituição"
                  value={formData.instituicao}
                  disabled={!isEditing}
                  onChange={handleChange('instituicao')}
                />
                <EditableField
                  label="LinkedIn ou portfólio"
                  value={formData.portfolio}
                  disabled={!isEditing}
                  onChange={handleChange('portfolio')}
                  fullWidth
                />
                <EditableField
                  label="Bio"
                  value={formData.bio}
                  disabled={!isEditing}
                  onChange={handleChange('bio')}
                  textarea
                  fullWidth
                />
              </div>

              {isEditing && (
                <div className="profile-actions-row">
                  <button className="workspace-action-btn" type="button" onClick={handleCancel}>
                    Cancelar
                  </button>
                  <button className="workspace-action-btn workspace-action-btn-primary" type="button" onClick={handleSave}>
                    Salvar alterações
                  </button>
                </div>
              )}
            </article>
          </section>
        </main>
      </div>
    </div>
  )
}

function ProfileSummaryCard({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <article className="profile-summary-card">
      <span className="profile-summary-icon" aria-hidden="true">{icon}</span>
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </article>
  )
}

function ReadonlyField({ label, value }: { label: string; value: string }) {
  return (
    <div className="profile-readonly-field">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

function EditableField({
  label,
  value,
  disabled,
  onChange,
  textarea = false,
  fullWidth = false,
}: {
  label: string
  value: string
  disabled: boolean
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  textarea?: boolean
  fullWidth?: boolean
}) {
  return (
    <label className={`field-label profile-field${fullWidth ? ' profile-field-full' : ''}`}>
      {label}
      {textarea ? (
        <textarea value={value} disabled={disabled} onChange={onChange} />
      ) : (
        <input type="text" value={value} disabled={disabled} onChange={onChange} />
      )}
    </label>
  )
}

function IconMail() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  )
}

function IconBadge() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2 4 6v6c0 5 3.4 8.6 8 10 4.6-1.4 8-5 8-10V6l-8-4Z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  )
}

function IconCalendar() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  )
}
