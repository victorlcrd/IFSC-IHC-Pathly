import { AprendizSidebar } from '../components/AprendizSidebar'

type TrilhaDetailPageProps = {
  onBackToMinhasTrilhas: () => void
  onOpenDashboard: () => void
  onOpenAula: () => void
  onBackToLogin: () => void
}

const PASSOS = [
  {
    numero: '01',
    titulo: 'O que é React?',
    descricao: 'Entenda a ideia de componentes e por que React é usado para criar interfaces.',
    tempo: '6 min',
    status: 'concluida',
    plano: 'Gratuito',
    tipo: 'Conteúdo',
  },
  {
    numero: '02',
    titulo: 'Componentes e props',
    descricao: 'Monte blocos reutilizáveis e passe dados entre partes da interface.',
    tempo: '9 min',
    status: 'concluida',
    plano: 'Gratuito',
    tipo: 'Conteúdo',
  },
  {
    numero: '03',
    titulo: 'Hooks e Estado',
    descricao: 'Aula atual. Aprenda como uma tela reage às ações do usuário usando useState.',
    tempo: '8 min',
    status: 'andamento',
    plano: 'Gratuito',
    tipo: 'Aula atual',
  },
  {
    numero: '04',
    titulo: 'Quiz de fixação',
    descricao: 'Responda perguntas rápidas para validar se o conteúdo foi entendido.',
    tempo: '4 min',
    status: 'disponivel',
    plano: 'Gratuito',
    tipo: 'Exercício',
  },
  {
    numero: '05',
    titulo: 'Eventos no JSX',
    descricao: 'Use cliques, mudanças de campo e ações do usuário para controlar a interface.',
    tempo: '7 min',
    status: 'bloqueada',
    plano: 'Gratuito',
    tipo: 'Conteúdo',
  },
  {
    numero: '06',
    titulo: 'Renderização condicional',
    descricao: 'Mostre ou esconda partes da tela conforme regras simples do componente.',
    tempo: '10 min',
    status: 'bloqueada',
    plano: 'Pro',
    tipo: 'Conteúdo',
  },
  {
    numero: '07',
    titulo: 'Desafio de código',
    descricao: 'Complete um componente com estado e receba feedback visual da resposta.',
    tempo: '12 min',
    status: 'bloqueada',
    plano: 'Pro',
    tipo: 'Desafio',
  },
  {
    numero: '08',
    titulo: 'Certificado da trilha',
    descricao: 'Conclua todos os passos para liberar o certificado digital da trilha.',
    tempo: 'Final',
    status: 'bloqueada',
    plano: 'Gratuito',
    tipo: 'Conclusão',
  },
]

const statusLabel: Record<string, string> = {
  concluida: 'Concluída',
  andamento: 'Em andamento',
  disponivel: 'Disponível',
  bloqueada: 'Bloqueada',
}

export function TrilhaDetailPage({ onBackToMinhasTrilhas, onOpenDashboard, onOpenAula, onBackToLogin }: TrilhaDetailPageProps) {
  return (
    <div className="editor-page trilha-detail-page">
      <header className="editor-header dashboard-header">
        <button className="editor-logo" type="button" onClick={onBackToLogin}>
          PATHLY
        </button>

        <nav className="editor-nav">
          <button type="button" className="nav-text-button" onClick={onBackToMinhasTrilhas}>Minhas Trilhas</button>
          <a href="#explorar">Explorar</a>
          <button className="profile-button" type="button" aria-label="Perfil">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
            </svg>
          </button>
        </nav>
      </header>

      <div className="dashboard-shell">
        <AprendizSidebar
          active="trilhas"
          onOpenDashboard={onOpenDashboard}
          onOpenMinhasTrilhas={onBackToMinhasTrilhas}
        />

        <main className="dashboard-content trilha-content trilha-visual-content">
          <button type="button" className="back-link-button" onClick={onBackToMinhasTrilhas}>
            ← Voltar
          </button>

          <section className="trilha-visual-hero">
            <div>
              <span className="trilha-tag">Trilha visual</span>
              <h1 className="trilha-title">Introdução ao React</h1>
              <p className="trilha-description">
                Siga os passos da trilha em sequência. Cada bloco representa uma aula, exercício, desafio ou conclusão, como previsto nos wireframes de “Passos” e “Trilha Visual”.
              </p>
            </div>

            <aside className="trilha-visual-summary" aria-label="Resumo do progresso">
              <div>
                <strong>75%</strong>
                <span>concluído</span>
              </div>
              <div className="progress-bar-bg trilha-progress-bar" role="progressbar" aria-valuenow={75} aria-valuemin={0} aria-valuemax={100}>
                <div className="progress-bar-fill" style={{ width: '75%' }} />
              </div>
              <button type="button" className="trilha-primary-action" onClick={onOpenAula}>
                Continuar aula
              </button>
            </aside>
          </section>

          <section className="trilha-visual-board" aria-labelledby="trilha-visual-title">
            <div className="trilha-section-header visual-section-header">
              <div>
                <h2 id="trilha-visual-title">Passos da trilha</h2>
                <p>Visualização em blocos conectados para o aprendiz entender onde está e o que vem depois.</p>
              </div>
              <span className="trilha-plan-note">Gratuito / Pro</span>
            </div>

            <div className="visual-path" aria-label="Trilha visual da jornada do aprendiz">
              {PASSOS.map((passo, index) => {
                const isLocked = passo.status === 'bloqueada'
                const canOpen = passo.status === 'andamento' || passo.status === 'disponivel'

                return (
                  <button
                    type="button"
                    key={passo.numero}
                    className={`visual-step visual-step-${passo.status}${index % 2 === 1 ? ' visual-step-right' : ''}`}
                    onClick={canOpen ? onOpenAula : undefined}
                    disabled={isLocked}
                  >
                    <span className="visual-step-node" aria-hidden="true">
                      {passo.status === 'concluida' ? '✓' : passo.status === 'bloqueada' ? '🔒' : passo.numero}
                    </span>

                    <span className="visual-step-card">
                      <span className="visual-step-topline">
                        <span>{passo.tipo}</span>
                        <span className={`plan-pill ${passo.plano === 'Pro' ? 'plan-pro' : 'plan-free'}`}>{passo.plano}</span>
                      </span>
                      <strong>{passo.titulo}</strong>
                      <small>{passo.descricao}</small>
                      <span className="visual-step-footer">
                        <span>{statusLabel[passo.status]}</span>
                        <span>{passo.tempo}</span>
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
