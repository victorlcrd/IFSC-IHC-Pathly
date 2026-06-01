import { AprendizSidebar } from '../components/AprendizSidebar'
import { PathlyLogo } from '../components/PathlyLogo'

type AulaPageProps = {
  onBackToTrilha: () => void
  onBackToLogin: () => void
  onOpenDashboard: () => void
  onOpenPerfil: () => void
}

const CODE_LINES = [
  'function Contador() {',
  '  const [pontos, setPontos] = useState(0)',
  '',
  '  return (',
  '    <button onClick={() => setPontos(pontos + 1)}>',
  '      Pontos: {pontos}',
  '    </button>',
  '  )',
  '}',
]

export function AulaPage({ onBackToTrilha, onBackToLogin, onOpenDashboard, onOpenPerfil }: AulaPageProps) {
  return (
    <div className="editor-page aula-page">
      <header className="editor-header dashboard-header">
        <PathlyLogo onClick={onBackToLogin} variant="branco" size="md" />

        <nav className="editor-nav">
          <a href="#fixacao">Fixação</a>
          <button className="profile-button" type="button" aria-label="Perfil" onClick={onOpenPerfil}>
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
          onOpenMinhasTrilhas={onBackToTrilha}
          onOpenPerfil={onOpenPerfil}
        />

        <main className="dashboard-content aula-shell">
        <section className="aula-main-card" id="conteudo">
          <button type="button" className="back-link-button" onClick={onBackToTrilha}>
            ← Voltar
          </button>

          <div className="aula-topline">
            <span>Introdução ao React</span>
            <span>Aula 6 de 12</span>
          </div>

          <div className="aula-progress-wrap">
            <div className="progress-bar-bg" role="progressbar" aria-valuenow={75} aria-valuemin={0} aria-valuemax={100}>
              <div className="progress-bar-fill" style={{ width: '75%' }} />
            </div>
            <span>75%</span>
          </div>

          <h1>Hooks e Estado</h1>
          <p className="aula-lead">
            Nesta micro-aula você aprende como o useState guarda informações temporárias da interface e permite que o componente reaja às ações do usuário.
          </p>

          <div className="aula-time-card">
            <strong>8 min</strong>
            <span>Tempo estimado para concluir esta aula</span>
          </div>

          <article className="lesson-content-block">
            <h2>Ideia central</h2>
            <p>
              Estado é qualquer informação que pode mudar durante o uso da tela. Em React, o hook useState cria uma variável de leitura e uma função para atualizar essa variável.
            </p>
            <p>
              Quando a função de atualização é chamada, o componente é renderizado novamente com o novo valor. Isso evita manipulação manual da interface e mantém o fluxo previsível.
            </p>
          </article>

          <article className="code-example-card">
            <div className="code-example-header">
              <span>Exemplo prático</span>
              <span>Contador.tsx</span>
            </div>
            <pre aria-label="Exemplo de código"><code>{CODE_LINES.join('\n')}</code></pre>
          </article>
        </section>

        <aside className="aula-side-panel" id="fixacao">
          <section className="aula-side-card">
            <h2>Checklist da aula</h2>
            <ul className="aula-checklist">
              <li className="done">Conceito de estado</li>
              <li className="done">Exemplo com useState</li>
              <li>Responder pergunta de fixação</li>
            </ul>
          </section>

          <section className="aula-side-card fixation-card">
            <span className="fixation-eyebrow">Pergunta rápida</span>
            <h2>Qual função altera o valor de pontos no exemplo?</h2>

            <div className="fixation-options">
              <button type="button">useState</button>
              <button type="button" className="selected-answer">setPontos</button>
              <button type="button">Contador</button>
            </div>

            <div className="answer-feedback">
              <strong>Resposta correta</strong>
              <span>setPontos atualiza o estado e faz o componente renderizar novamente.</span>
            </div>

            <button type="button" className="trilha-primary-action full-action">
              Concluir aula
            </button>
          </section>
        </aside>
        </main>
      </div>
    </div>
  )
}