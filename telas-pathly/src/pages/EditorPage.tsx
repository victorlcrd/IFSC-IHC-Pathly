import {
  ChevronDown,
  GripVertical,
  Plus,
  Trash2,
  Eye,
} from 'lucide-react'
import { useRef, useState, type CSSProperties, type DragEvent } from 'react'
import { IconUser } from '../components/common/Icons'
import { PathlyLogo } from '../components/PathlyLogo'
import { blockMeta, blockOptions, INITIAL_CANVAS_BLOCKS } from '../components/editor/editorData'
import type { BlockConfig, BlockType, CanvasBlock, PublishData } from '../components/editor/editorTypes'
import { PreviewModal } from '../components/editor/PreviewModal'
import { PublishModal } from '../components/editor/PublishModal'

type EditorPageProps = {
  onBackToLogin: () => void
  onPublish: () => void
  onOpenPerfil: () => void
}

// ── CanvasCard ────────────────────────────────────────────────────────────────
function CanvasCard({
  block,
  isSelected,
  isNew,
  onSelect,
  onDelete,
  onDragStart,
  onDragEnter,
  onDragEnd,
  onDrop,         // Fix 1 — prop adicionada
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
  onDrop:      (e: DragEvent<HTMLDivElement>) => void  // Fix 1
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
      onDrop={onDrop}           // Fix 1 — conectado
      onClick={onSelect}
      role="button"
      tabIndex={0}
      aria-label={`Bloco ${block.type}: ${block.title}`}
      onKeyDown={e => e.key === 'Enter' && onSelect()}
      style={{ '--block-color': meta.color } as CSSProperties}
    >
      <span className="dnd-card-grip" aria-hidden="true">
        <GripVertical size={15} />
      </span>

      <span className="dnd-card-icon" style={{ background: `${meta.color}18`, color: meta.color }}>
        {meta.icon}
      </span>

      <span className="dnd-card-info">
        <span className="dnd-card-type">{block.type}</span>
        <span className="dnd-card-title">{block.title || block.type}</span>
      </span>

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

// ── DropZone ──────────────────────────────────────────────────────────────────
// Fix 2 — recebe onDragEnter para ativar o destaque visual corretamente
function DropZone({
  active,
  onDrop,
  onDragEnter,
}: {
  active: boolean
  onDrop: () => void
  onDragEnter: () => void
}) {
  return (
    <div
      className={`drop-zone${active ? ' drop-zone-active' : ''}`}
      onDragEnter={onDragEnter}                   // Fix 2
      onDragOver={e => e.preventDefault()}
      onDrop={e => { e.stopPropagation(); onDrop() }}
      aria-hidden="true"
    />
  )
}

// ── EditorPage ────────────────────────────────────────────────────────────────
export function EditorPage({ onBackToLogin, onPublish, onOpenPerfil }: EditorPageProps) {
  // Fix 3 — selectedBlock guarda o estado do painel de edição
  const [selectedBlock,   setSelectedBlock]   = useState<BlockConfig>({ title: '', description: '', icon: 'Conteúdo' })
  // Fix 3/4 — id do bloco atualmente selecionado no canvas
  const [selectedBlockId, setSelectedBlockId] = useState<number | null>(null)

  const [canvasBlocks,    setCanvasBlocks]    = useState<CanvasBlock[]>(INITIAL_CANVAS_BLOCKS)
  const [nextId,          setNextId]          = useState(10)
  const [recentlyAddedId, setRecentlyAddedId] = useState<number | null>(null)
  const [showPreview,     setShowPreview]     = useState(false)
  const [showPublish,     setShowPublish]     = useState(false)
  const [publishing,      setPublishing]      = useState(false)

  // Drag state
  const dragIndexRef  = useRef<number | null>(null)
  const dragTypeRef   = useRef<BlockType | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)
  const [dropZoneOver,  setDropZoneOver]  = useState<number | null>(null)

  // ── Fix 3/4 — Selecionar um bloco do canvas carrega seus dados no painel ──
  function selectCanvasBlock(block: CanvasBlock) {
    setSelectedBlockId(block.id)
    setSelectedBlock({
      title: block.title,
      description: block.description,
      icon: block.type,
    })
  }

  // ── Fix 3 — Salvar persiste as alterações no canvasBlock correspondente ───
  function saveSelectedBlock() {
    if (selectedBlockId === null) return
    setCanvasBlocks(prev =>
      prev.map(b =>
        b.id === selectedBlockId
          ? { ...b, title: selectedBlock.title, description: selectedBlock.description, type: selectedBlock.icon }
          : b
      )
    )
  }

  function addBlock(type: BlockType) {
    const id = nextId
    setNextId(n => n + 1)
    const newBlock: CanvasBlock = {
      id,
      type,
      title: selectedBlock.title || type,
      description: selectedBlock.description,
    }
    setCanvasBlocks(prev => [...prev, newBlock])
    setSelectedBlock(c => ({ ...c, icon: type, title: '', description: '' }))
    setSelectedBlockId(id)
    setRecentlyAddedId(id)
    setTimeout(() => setRecentlyAddedId(null), 1200)
  }

  function deleteBlock(index: number) {
    const removed = canvasBlocks[index]
    setCanvasBlocks(prev => prev.filter((_, i) => i !== index))
    if (selectedBlockId === removed.id) setSelectedBlockId(null)
  }

  // Fix 5 — handleConfirmPublish recebe e loga o payload
  function handleConfirmPublish(data: PublishData) {
    console.log('Publicando trilha:', data)
    setShowPublish(false)
    setPublishing(true)
    setTimeout(() => { setPublishing(false); onPublish() }, 1400)
  }

  // ── Drag handlers ─────────────────────────────────────────────────────────
  function onSidebarDragStart(type: BlockType) {
    dragIndexRef.current = null
    dragTypeRef.current  = type
  }

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

  // Fix 1 — onCardDrop agora é chamado pelo onDrop do CanvasCard
  function onCardDrop(targetIndex: number) {
    if (dragTypeRef.current !== null) {
      const type = dragTypeRef.current
      const id   = nextId
      setNextId(n => n + 1)
      const newBlock: CanvasBlock = { id, type, title: type, description: '' }
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

  function onDropZoneDrop(dropIndex: number) {
    if (dragTypeRef.current !== null) {
      const type = dragTypeRef.current
      const id   = nextId
      setNextId(n => n + 1)
      const newBlock: CanvasBlock = { id, type, title: type, description: '' }
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

  function onCanvasDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    if (dragTypeRef.current !== null) {
      const type = dragTypeRef.current
      const id   = nextId
      setNextId(n => n + 1)
      setCanvasBlocks(prev => [...prev, { id, type, title: type, description: '' }])
      setRecentlyAddedId(id)
      setTimeout(() => setRecentlyAddedId(null), 1200)
    }
    dragIndexRef.current = null
    dragTypeRef.current  = null
    setDragOverIndex(null)
    setDropZoneOver(null)
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      <div className={`editor-page${showPreview || showPublish ? ' editor-page-blurred' : ''}`}>
        <header className="editor-header editor-builder-header">
          <PathlyLogo onClick={onBackToLogin} variant="branco" size="md" />

          <div className="editor-builder-search">
            <IconSearch />
            <input type="text" placeholder="Pesquisar blocos" aria-label="Pesquisar blocos" />
          </div>

          <nav className="editor-nav editor-builder-nav">
            <button className="editor-nav-button" type="button" onClick={onBackToLogin}>
              Dashboard
            </button>

            <button className="profile-button" type="button" aria-label="Perfil" onClick={onOpenPerfil}>
              <IconUser />
            </button>
          </nav>
        </header>

        <main className="editor-shell">
          {/* ── Sidebar ── */}
          <aside className="blocks-panel">
            <h2>Blocos</h2>
            <div className="block-list">
              {blockOptions.map(block => (
                <div
                  key={block.type}
                  className={`block-card${selectedBlock.icon === block.type ? ' block-card-active' : ''}`}
                  draggable
                  onDragStart={() => onSidebarDragStart(block.type)}
                  onClick={() => {
                    setSelectedBlock(c => ({ ...c, icon: block.type }))
                    setSelectedBlockId(null)
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && setSelectedBlock(c => ({ ...c, icon: block.type }))}
                  aria-label={`Bloco ${block.type}`}
                  style={{ '--block-color': block.color } as CSSProperties}
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

            <div className="flow-canvas dnd-canvas" onDragOver={e => e.preventDefault()} onDrop={onCanvasDrop}>
              {canvasBlocks.length === 0 && (
                <div className="dnd-empty-state">
                  <Plus size={28} />
                  <span>Arraste blocos aqui para montar sua trilha</span>
                </div>
              )}

              <div className="dnd-list">
                {/* Fix 2 — Drop zone inicial com onDragEnter */}
                <DropZone
                  active={dropZoneOver === 0}
                  onDragEnter={() => setDropZoneOver(0)}
                  onDrop={() => onDropZoneDrop(0)}
                />

                {canvasBlocks.map((block, index) => (
                  <div key={block.id}>
                    {/* Fix 1 + Fix 2 + Fix 4 — onDrop e onDragEnter conectados, onSelect carrega dados */}
                    <CanvasCard
                      block={block}
                      isSelected={selectedBlockId === block.id}
                      isNew={recentlyAddedId === block.id}
                      onSelect={() => selectCanvasBlock(block)}           // Fix 4
                      onDelete={() => deleteBlock(index)}
                      onDragStart={e => onCardDragStart(e, index)}
                      onDragEnter={e => { onCardDragEnter(e, index); setDropZoneOver(null) }}
                      onDragEnd={onCardDragEnd}
                      onDrop={e => { e.preventDefault(); e.stopPropagation(); onCardDrop(index) }} // Fix 1
                      isDragOver={dragOverIndex === index}
                    />

                    {/* Fix 2 — Drop zone com onDragEnter */}
                    <DropZone
                      active={dropZoneOver === index + 1}
                      onDragEnter={() => setDropZoneOver(index + 1)}       // Fix 2
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
                placeholder={selectedBlockId === null ? 'Selecione um bloco no canvas' : 'Nome do bloco'}
                disabled={selectedBlockId === null}
                onChange={e => setSelectedBlock(c => ({ ...c, title: e.target.value }))}
              />
            </label>

            <label className="field-label">
              Descrição
              <textarea
                value={selectedBlock.description}
                placeholder={selectedBlockId === null ? 'Selecione um bloco no canvas' : 'Descrição breve'}
                disabled={selectedBlockId === null}
                onChange={e => setSelectedBlock(c => ({ ...c, description: e.target.value }))}
              />
            </label>

            <section className="settings-area">
              <h3>Configurações</h3>
              <button type="button">Regras do bloco <ChevronDown size={17} /></button>
              <button type="button">Progresso <ChevronDown size={17} /></button>
            </section>

            {/* Fix 3 — Salvar com onClick conectado */}
            <button
              className="save-button"
              type="button"
              onClick={saveSelectedBlock}
              disabled={selectedBlockId === null}
              title={selectedBlockId === null ? 'Selecione um bloco no canvas para editar' : 'Salvar alterações'}
            >
              Salvar
            </button>

            <div className="selected-preview" aria-label="Bloco selecionado">
              {blockMeta[selectedBlock.icon].icon}
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

      {/* Fix 5 — onConfirm recebe PublishData */}
      {showPublish && (
        <PublishModal
          onClose={() => setShowPublish(false)}
          onConfirm={handleConfirmPublish}
        />
      )}
    </>
  )
}

function IconSearch() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
