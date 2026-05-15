import {
  CircleHelp,
  ChevronDown,
  Flag,
  MapPin,
  MessageSquareText,
  Plus,
  Search,
  Share2,
  Trophy,
  UserCircle,
} from 'lucide-react'
import { useState, type ReactNode } from 'react'

type BlockType = 'Início' | 'Conteúdo' | 'Pergunta' | 'Escolha' | 'Conquista' | 'Fim'

type BlockConfig = {
  title: string
  description: string
  icon: BlockType
}

type EditorPageProps = {
  onBackToLogin: () => void
}

const blockOptions: Array<{ type: BlockType; icon: ReactNode }> = [
  { type: 'Início', icon: <MapPin size={21} /> },
  { type: 'Conteúdo', icon: <MessageSquareText size={21} /> },
  { type: 'Pergunta', icon: <CircleHelp size={21} /> },
  { type: 'Escolha', icon: <Share2 size={21} /> },
  { type: 'Conquista', icon: <Trophy size={21} /> },
  { type: 'Fim', icon: <Flag size={21} /> },
]

function FlowIcon({ type }: { type: BlockType }) {
  const option = blockOptions.find((block) => block.type === type)
  return <>{option?.icon}</>
}

export function EditorPage({ onBackToLogin }: EditorPageProps) {
  const [selectedBlock, setSelectedBlock] = useState<BlockConfig>({
    title: '',
    description: '',
    icon: 'Conteúdo',
  })

  function selectBlock(icon: BlockType) {
    setSelectedBlock((current) => ({ ...current, icon }))
  }

  return (
    <div className="editor-page">
      <header className="editor-header">
        <button className="editor-logo" type="button" onClick={onBackToLogin}>
          PATHLY
        </button>

        <label className="editor-search" aria-label="Pesquisar">
          <Search size={18} />
          <input aria-label="Pesquisar trilhas" placeholder="Pesquisar trilhas" />
        </label>

        <nav className="editor-nav" aria-label="Menu principal">
          <a href="#explorar">Explorar</a>
          <a href="#minhas-trilhas">Minhas trilhas</a>
          <button className="profile-button" type="button" aria-label="Perfil">
            <UserCircle size={31} />
          </button>
        </nav>
      </header>

      <main className="editor-shell">
        <aside className="blocks-panel">
          <h2>Blocos</h2>

          <div className="block-list">
            {blockOptions.map((block) => (
              <button
                className={selectedBlock.icon === block.type ? 'block-card block-card-active' : 'block-card'}
                key={block.type}
                type="button"
                onClick={() => selectBlock(block.type)}
              >
                <span className="block-icon">{block.icon}</span>
                <span>{block.type}</span>
              </button>
            ))}
          </div>

          <div className="drag-helper">Arraste os blocos para o fluxo</div>
        </aside>

        <section className="flow-workspace" aria-label="Fluxo da trilha">
          <div className="workspace-title-row">
            <h1>Fluxo da trilha</h1>
            <span>Rascunho</span>
          </div>

          <div className="flow-canvas">
            <button className="flow-node start-node" type="button" onClick={() => selectBlock('Início')}>
              <MapPin size={25} />
            </button>
            <div className="connector vertical first" />

            <button className="flow-node content-node" type="button" onClick={() => selectBlock('Conteúdo')}>
              <MessageSquareText size={25} />
            </button>
            <div className="connector vertical second" />

            <button className="decision-node" type="button" onClick={() => selectBlock('Pergunta')}>
              <span>?</span>
            </button>
            <div className="connector diagonal left" />
            <div className="connector diagonal right" />

            <button className="flow-node reward-node" type="button" onClick={() => selectBlock('Conquista')}>
              <Trophy size={24} />
            </button>
            <button className="flow-node end-node" type="button" onClick={() => selectBlock('Fim')}>
              <Flag size={24} />
            </button>

            <div className="zoom-controls" aria-label="Controles de zoom">
              <button type="button">−</button>
              <span>100%</span>
              <button type="button">+</button>
            </div>
          </div>
        </section>

        <aside className="edit-panel">
          <h2>Editar bloco</h2>

          <button className="icon-upload" type="button">
            <Plus size={30} />
            <span>Ícone</span>
          </button>

          <label className="field-label">
            Título
            <input
              value={selectedBlock.title}
              placeholder="Nome do bloco"
              onChange={(event) => setSelectedBlock((current) => ({ ...current, title: event.target.value }))}
            />
          </label>

          <label className="field-label">
            Descrição
            <textarea
              value={selectedBlock.description}
              placeholder="Descrição breve"
              onChange={(event) =>
                setSelectedBlock((current) => ({ ...current, description: event.target.value }))
              }
            />
          </label>

          <section className="settings-area">
            <h3>Configurações</h3>
            <button type="button">
              Regras do bloco
              <ChevronDown size={17} />
            </button>
            <button type="button">
              Progresso
              <ChevronDown size={17} />
            </button>
          </section>

          <button className="save-button" type="button">
            Salvar
          </button>

          <div className="selected-preview" aria-label="Bloco selecionado">
            <FlowIcon type={selectedBlock.icon} />
            <span>{selectedBlock.icon}</span>
          </div>
        </aside>
      </main>
    </div>
  )
}
