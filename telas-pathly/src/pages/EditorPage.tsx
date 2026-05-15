import {
  CircleHelp,
  ChevronDown,
  Flag,
  GripVertical,
  Lock,
  MapPin,
  MessageSquareText,
  Plus,
  Search,
  Share2,
  Trash2,
  Trophy,
  UserCircle,
  X,
  CheckCircle2,
  Image as ImageIcon,
  Eye,
} from 'lucide-react'
import { useRef, useState, type DragEvent, type ReactNode } from 'react'

// ── Tipos ─────────────────────────────────────────────────────────────────────
type BlockType = 'Início' | 'Conteúdo' | 'Pergunta' | 'Escolha' | 'Conquista' | 'Fim'

type BlockConfig = {
  title: string
  description: string
  icon: BlockType
}

type CanvasBlock = {
  id: number
  type: BlockType
  title: string
}

type EditorPageProps = {
  onBackToLogin: () => void
  onPublish: () => void
}

// ── Dados estáticos ───────────────────────────────────────────────────────────
const blockOptions: Array<{ type: BlockType; icon: ReactNode; color: string }> = [
  { type: 'Início',    icon: <MapPin size={21} />,           color: '#10b981' },
  { type: 'Conteúdo', icon: <MessageSquareText size={21} />, color: '#6366f1' },
  { type: 'Pergunta', icon: <CircleHelp size={21} />,        color: '#f59e0b' },
  { type: 'Escolha',  icon: <Share2 size={21} />,            color: '#8b5cf6' },
  { type: 'Conquista',icon: <Trophy size={21} />,            color: '#ef4444' },
  { type: 'Fim',      icon: <Flag size={21} />,              color: '#374151' },
]

const blockMeta: Record<BlockType, { icon: ReactNode; color: string }> = {
  'Início':    { icon: <MapPin size={20} />,           color: '#10b981' },
  'Conteúdo':  { icon: <MessageSquareText size={20} />, color: '#6366f1' },
  'Pergunta':  { icon: <CircleHelp size={20} />,        color: '#f59e0b' },
  'Escolha':   { icon: <Share2 size={20} />,            color: '#8b5cf6' },
  'Conquista': { icon: <Trophy size={20} />,            color: '#ef4444' },
  'Fim':       { icon: <Flag size={20} />,              color: '#374151' },
}

const INITIAL_CANVAS_BLOCKS: CanvasBlock[] = [
  { id: 0, type: 'Início',    title: 'Introdução'         },
  { id: 1, type: 'Conteúdo',  title: 'Conteúdo principal' },
  { id: 2, type: 'Pergunta',  title: 'Avaliação'          },
]

// ── FlowIcon helper ───────────────────────────────────────────────────────────
function FlowIcon({ type }: { type: BlockType }) {
  return <>{blockMeta[type].icon}</>
}

// ── Modal Pré-Visualizar ──────────────────────────────────────────────────────
function PreviewModal({
  blocks,
  onClose,
  onGoPublish,
}: {
  blocks: CanvasBlock[]
  onClose: () => void
  onGoPublish: () => void
}) {
  const unlockedCount = Math.max(1, Math.ceil(blocks.length * 0.5))

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Pré-visualização da trilha">
      <div className="modal-preview">
        <header className="preview-header">
          <span className="preview-header-logo">Página Inicial</span>
          <div className="preview-header-actions">
            <button className="preview-header-btn" type="button" onClick={onClose}>Editar</button>
            <button className="preview-header-btn preview-header-btn-primary" type="button" onClick={onGoPublish}>Publicar</button>
          </div>
        </header>

        <div className="preview-body">
          <h2 className="preview-trail-title">Trilha Visual</h2>

          <div className="preview-trail-flow">
            {blocks.map((block, index) => {
              const isUnlocked = index < unlockedCount
              const isActive   = index === unlockedCount - 1
              const meta       = blockMeta[block.type]
              return (
                <div key={block.id} className="preview-step">
                  {index > 0 && <div className="preview-connector" />}
                  <div className="preview-step-row">
                    <div
                      className={`preview-node ${isUnlocked ? 'preview-node-done' : 'preview-node-locked'} ${isActive ? 'preview-node-active' : ''}`}
                      style={isUnlocked ? { borderColor: meta.color, color: meta.color, background: `${meta.color}18` } : undefined}
                    >
                      {isUnlocked
                        ? isActive
                          ? <span className="preview-node-number">{index + 1}</span>
                          : <CheckCircle2 size={17} />
                        : <Lock size={14} />}
                    </div>
                    <span className={`preview-step-number${!isUnlocked ? ' preview-step-locked-text' : ''}`}>
                      {index + 1}. {block.title || block.type}
                    </span>
                    {!isUnlocked && <Lock size={12} style={{ color: '#94a3b8', flexShrink: 0 }} />}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="preview-progress-card">
            <p className="preview-progress-label">Progresso</p>
            <p className="preview-progress-count">{unlockedCount}/{blocks.length}</p>
            <p className="preview-progress-sub">módulos concluídos</p>
            <div className="preview-progress-bar-bg">
              <div
                className="preview-progress-bar-fill"
                style={{ width: `${Math.round((unlockedCount / blocks.length) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        <button className="modal-close-btn" type="button" onClick={onClose} aria-label="Fechar pré-visualização">
          <X size={18} />
        </button>
      </div>
    </div>
  )
}

// ── Modal Publicar ────────────────────────────────────────────────────────────
function PublishModal({ onClose, onConfirm }: { onClose: () => void; onConfirm: () => void }) {
  const [title,       setTitle]       = useState('')
  const [description, setDescription] = useState('')
  const [category,    setCategory]    = useState('')
  const [level,       setLevel]       = useState('')
  const [tags,        setTags]        = useState('')
  const [visibility,  setVisibility]  = useState<'public' | 'private' | 'link'>('public')

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Publicar trilha">
      <div className="modal-publish">
        <div className="modal-publish-header">
          <span className="modal-publish-title">Publicar</span>
          <button className="modal-close-text" type="button" onClick={onClose}>Fechar</button>
        </div>

        <div className="modal-publish-body">
          <button className="publish-cover-area" type="button" aria-label="Adicionar capa">
            <ImageIcon size={22} color="#a5b4fc" />
            <span>Capa</span>
          </button>
          <input className="publish-field" type="text" placeholder="Título"      value={title}       onChange={e => setTitle(e.target.value)} />
          <textarea className="publish-field publish-field-textarea" placeholder="Descrição"   value={description} onChange={e => setDescription(e.target.value)} />
          <div className="publish-row">
            <input className="publish-field" type="text" placeholder="Categoria" value={category}    onChange={e => setCategory(e.target.value)} />
            <input className="publish-field" type="text" placeholder="Nível"     value={level}       onChange={e => setLevel(e.target.value)} />
          </div>
          <input className="publish-field" type="text" placeholder="Tags"        value={tags}        onChange={e => setTags(e.target.value)} />

          <div className="publish-visibility-section">
            <p className="publish-visibility-label">Visibilidade e privacidade</p>
            <div className="publish-visibility-options">
              {(['public', 'private', 'link'] as const).map(opt => (
                <label key={opt} className={`publish-visibility-option ${visibility === opt ? 'publish-visibility-active' : ''}`}>
                  <input type="radio" name="visibility" value={opt} checked={visibility === opt} onChange={() => setVisibility(opt)} />
                  <span>
                    {opt === 'public'  && 'Pública — visível para todos'}
                    {opt === 'private' && 'Privada — somente você'}
                    {opt === 'link'    && 'Por link — somente quem tiver o link'}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-publish-footer">
          <button className="publish-confirm-btn" type="button" onClick={onConfirm}>Publicar</button>
        </div>
      </div>
    </div>
  )
}

// ── CanvasCard (bloco no canvas — draggable) ──────────────────────────────────
function CanvasCard({
  block,
  isSelected,
  isNew,
  onSelect,
  onDelete,
  onDragStart,
  onDragEnter,
  onDragEnd,
  isDragOver,
}: {
  block: CanvasBlock
  isSelected: boolean
  isNew: boolean
  onSelect: () => void
  onDelete: () => void
  onDragStart: (e: DragEvent<HTMLDivElement>) => void
  onDragEnter: (e: DragEvent<HTMLDivElement>) => void
  onDragEnd:   (e: DragEvent<HTMLDivElement>) => void
  isDragOver: boolean
}) {
  const meta = blockMeta[block.type]

  return (
    <div
      className={`dnd-card${isSelected ? ' dnd-card-selected' : ''}${isNew ? ' dnd-card-new' : ''}${isDragOver ? ' dnd-card-dragover' : ''}`}
      draggable
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragEnd={onDragEnd}
      onDragOver={e => e.preventDefault()}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      aria-label={`Bloco ${block.type}: ${block.title}`}
      onKeyDown={e => e.key === 'Enter' && onSelect()}
      style={{ '--block-color': meta.color } as React.CSSProperties}
    >
      {/* Handle de arrastar */}
      <span className="dnd-card-grip" onMouseDown={e => e.stopPropagation()} aria-hidden="true">
        <GripVertical size={15} />
      </span>

      {/* Ícone colorido */}
      <span className="dnd-card-icon" style={{ background: `${meta.color}18`, color: meta.color }}>
        {meta.icon}
      </span>

      {/* Texto */}
      <span className="dnd-card-info">
        <span className="dnd-card-type">{block.type}</span>
        <span className="dnd-card-title">{block.title || block.type}</span>
      </span>

      {/* Deletar */}
      <button
        className="dnd-card-delete"
        type="button"
        aria-label={`Remover bloco ${block.type}`}
        onClick={e => { e.stopPropagation(); onDelete() }}
      >
        <Trash2 size={13} />
      </button>
    </div>
  )
}

// ── DropZone (zona de soltar entre cards) ─────────────────────────────────────
function DropZone({ active, onDrop }: { active: boolean; onDrop: () => void }) {
  return (
    <div
      className={`drop-zone${active ? ' drop-zone-active' : ''}`}
      onDragOver={e => e.preventDefault()}
      onDrop={onDrop}
      aria-hidden="true"
    />
  )
}

// ── EditorPage ────────────────────────────────────────────────────────────────
export function EditorPage({ onBackToLogin, onPublish }: EditorPageProps) {
  const [selectedBlock, setSelectedBlock] = useState<BlockConfig>({ title: '', description: '', icon: 'Conteúdo' })
  const [canvasBlocks,  setCanvasBlocks]  = useState<CanvasBlock[]>(INITIAL_CANVAS_BLOCKS)
  const [nextId,        setNextId]        = useState(10)
  const [recentlyAddedId, setRecentlyAddedId] = useState<number | null>(null)
  const [showPreview,   setShowPreview]   = useState(false)
  const [showPublish,   setShowPublish]   = useState(false)
  const [publishing,    setPublishing]    = useState(false)

  // Drag state
  const dragIndexRef   = useRef<number | null>(null)   // índice sendo arrastado (do canvas)
  const dragTypeRef    = useRef<BlockType | null>(null) // tipo sendo arrastado (da sidebar)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null) // sobre qual card
  const [dropZoneOver, setDropZoneOver]  = useState<number | null>(null)  // sobre qual drop-zone

  // ── Funções ─────────────────────────────────────────────────────────────────
  function selectBlock(icon: BlockType) {
    setSelectedBlock(c => ({ ...c, icon }))
  }

  function addBlock(type: BlockType) {
    const id = nextId
    setNextId(n => n + 1)
    setCanvasBlocks(prev => [...prev, { id, type, title: selectedBlock.title || type }])
    setSelectedBlock(c => ({ ...c, icon: type, title: '' }))
    setRecentlyAddedId(id)
    setTimeout(() => setRecentlyAddedId(null), 1200)
  }

  function deleteBlock(index: number) {
    setCanvasBlocks(prev => prev.filter((_, i) => i !== index))
  }

  function handleConfirmPublish() {
    setShowPublish(false)
    setPublishing(true)
    setTimeout(() => { setPublishing(false); onPublish() }, 1400)
  }

  // ── Drag from sidebar ───────────────────────────────────────────────────────
  function onSidebarDragStart(type: BlockType) {
    dragIndexRef.current = null
    dragTypeRef.current  = type
  }

  // ── Drag within canvas ──────────────────────────────────────────────────────
  function onCardDragStart(_e: DragEvent<HTMLDivElement>, index: number) {
    dragIndexRef.current = index
    dragTypeRef.current  = null
  }

  function onCardDragEnter(_e: DragEvent<HTMLDivElement>, index: number) {
    setDragOverIndex(index)
    setDropZoneOver(null)
  }

  function onCardDragEnd() {
    dragIndexRef.current = null
    dragTypeRef.current  = null
    setDragOverIndex(null)
    setDropZoneOver(null)
  }

  // Drop ON a card → reorder
  function onCardDrop(targetIndex: number) {
    if (dragTypeRef.current !== null) {
      // Vindo da sidebar — insere na posição do card alvo
      const type = dragTypeRef.current
      const id = nextId
      setNextId(n => n + 1)
      const newBlock: CanvasBlock = { id, type, title: type }
      setCanvasBlocks(prev => {
        const next = [...prev]
        next.splice(targetIndex, 0, newBlock)
        return next
      })
      setRecentlyAddedId(id)
      setTimeout(() => setRecentlyAddedId(null), 1200)
    } else if (dragIndexRef.current !== null && dragIndexRef.current !== targetIndex) {
      const from = dragIndexRef.current
      setCanvasBlocks(prev => {
        const next = [...prev]
        const [moved] = next.splice(from, 1)
        next.splice(targetIndex, 0, moved)
        return next
      })
    }
    setDragOverIndex(null)
    setDropZoneOver(null)
    dragIndexRef.current = null
    dragTypeRef.current  = null
  }

  // Drop on a DropZone → insert/reorder at position
  function onDropZoneDrop(dropIndex: number) {
    if (dragTypeRef.current !== null) {
      const type = dragTypeRef.current
      const id = nextId
      setNextId(n => n + 1)
      const newBlock: CanvasBlock = { id, type, title: type }
      setCanvasBlocks(prev => {
        const next = [...prev]
        next.splice(dropIndex, 0, newBlock)
        return next
      })
      setRecentlyAddedId(id)
      setTimeout(() => setRecentlyAddedId(null), 1200)
    } else if (dragIndexRef.current !== null) {
      const from = dragIndexRef.current
      const to   = from < dropIndex ? dropIndex - 1 : dropIndex
      if (from !== to) {
        setCanvasBlocks(prev => {
          const next = [...prev]
          const [moved] = next.splice(from, 1)
          next.splice(to, 0, moved)
          return next
        })
      }
    }
    setDragOverIndex(null)
    setDropZoneOver(null)
    dragIndexRef.current = null
    dragTypeRef.current  = null
  }

  // Canvas: drop on empty area → append
  function onCanvasDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    if (dragTypeRef.current !== null) {
      const type = dragTypeRef.current
      const id = nextId
      setNextId(n => n + 1)
      setCanvasBlocks(prev => [...prev, { id, type, title: type }])
      setRecentlyAddedId(id)
      setTimeout(() => setRecentlyAddedId(null), 1200)
    }
    dragIndexRef.current = null
    dragTypeRef.current  = null
    setDragOverIndex(null)
    setDropZoneOver(null)
  }

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <>
      <div className={`editor-page${showPreview || showPublish ? ' editor-page-blurred' : ''}`}>
        <header className="editor-header">
          <button className="editor-logo" type="button" onClick={onBackToLogin}>PATHLY</button>

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
          {/* ── Sidebar: Blocos ── */}
          <aside className="blocks-panel">
            <h2>Blocos</h2>

            <div className="block-list">
              {blockOptions.map(block => (
                <div
                  key={block.type}
                  className={`block-card${selectedBlock.icon === block.type ? ' block-card-active' : ''}`}
                  draggable
                  onDragStart={() => onSidebarDragStart(block.type)}
                  onClick={() => selectBlock(block.type)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && selectBlock(block.type)}
                  aria-label={`Bloco ${block.type}`}
                  style={{ '--block-color': block.color } as React.CSSProperties}
                >
                  <span
                    className="block-icon"
                    style={selectedBlock.icon === block.type
                      ? { background: `${block.color}22`, color: block.color }
                      : undefined}
                  >
                    {block.icon}
                  </span>
                  <span>{block.type}</span>
                </div>
              ))}
            </div>

            <button className="add-to-canvas-button" type="button" onClick={() => addBlock(selectedBlock.icon)}>
              <Plus size={15} />
              Adicionar ao fluxo
            </button>

            <div className="drag-helper">Arraste os blocos para o fluxo</div>
          </aside>

          {/* ── Canvas ── */}
          <section className="flow-workspace" aria-label="Fluxo da trilha">
            <div className="workspace-title-row">
              <h1>Fluxo da trilha</h1>
              <div className="workspace-actions">
                <button className="workspace-action-btn" type="button" onClick={() => setShowPreview(true)}>
                  <Eye size={15} />
                  Pré-Visualizar
                </button>
                <button className="workspace-action-btn workspace-action-btn-primary" type="button" onClick={() => setShowPublish(true)}>
                  Publicar
                </button>
              </div>
            </div>

            <div
              className="flow-canvas dnd-canvas"
              onDragOver={e => e.preventDefault()}
              onDrop={onCanvasDrop}
            >
              {canvasBlocks.length === 0 && (
                <div className="dnd-empty-state">
                  <Plus size={28} />
                  <span>Arraste blocos aqui para montar sua trilha</span>
                </div>
              )}

              <div className="dnd-list">
                {/* Drop zone antes do primeiro bloco */}
                <DropZone
                  active={dropZoneOver === 0}
                  onDrop={() => onDropZoneDrop(0)}
                />

                {canvasBlocks.map((block, index) => (
                  <div
                    key={block.id}
                    onDragEnter={() => setDropZoneOver(null)}
                  >
                    <CanvasCard
                      block={block}
                      isSelected={selectedBlock.icon === block.type}
                      isNew={recentlyAddedId === block.id}
                      onSelect={() => selectBlock(block.type)}
                      onDelete={() => deleteBlock(index)}
                      onDragStart={e => onCardDragStart(e, index)}
                      onDragEnter={e => onCardDragEnter(e, index)}
                      onDragEnd={onCardDragEnd}
                      isDragOver={dragOverIndex === index}
                    />

                    {/* Drop zone após cada bloco */}
                    <DropZone
                      active={dropZoneOver === index + 1}
                      onDrop={() => onDropZoneDrop(index + 1)}
                    />
                  </div>
                ))}
              </div>

              <div className="zoom-controls" aria-label="Controles de zoom">
                <button type="button">−</button>
                <span>100%</span>
                <button type="button">+</button>
              </div>
            </div>
          </section>

          {/* ── Painel de edição ── */}
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
                onChange={e => setSelectedBlock(c => ({ ...c, title: e.target.value }))}
              />
            </label>

            <label className="field-label">
              Descrição
              <textarea
                value={selectedBlock.description}
                placeholder="Descrição breve"
                onChange={e => setSelectedBlock(c => ({ ...c, description: e.target.value }))}
              />
            </label>

            <section className="settings-area">
              <h3>Configurações</h3>
              <button type="button">Regras do bloco <ChevronDown size={17} /></button>
              <button type="button">Progresso <ChevronDown size={17} /></button>
            </section>

            <button className="save-button" type="button">Salvar</button>

            <div className="selected-preview" aria-label="Bloco selecionado">
              <FlowIcon type={selectedBlock.icon} />
              <span>{selectedBlock.icon}</span>
            </div>
          </aside>
        </main>

        {publishing && (
          <div className="publishing-overlay" aria-live="polite">
            <div className="publishing-box">
              <span className="publish-spinner" aria-hidden="true" />
              <span>Publicando trilha…</span>
            </div>
          </div>
        )}
      </div>

      {showPreview && (
        <PreviewModal
          blocks={canvasBlocks}
          onClose={() => setShowPreview(false)}
          onGoPublish={() => { setShowPreview(false); setShowPublish(true) }}
        />
      )}

      {showPublish && (
        <PublishModal
          onClose={() => setShowPublish(false)}
          onConfirm={handleConfirmPublish}
        />
      )}
    </>
  )
}