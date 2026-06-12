import {
  ArrowLeft,
  Bold,
  ChevronDown,
  Eye,
  GripVertical,
  Heading2,
  Image as ImageIcon,
  Italic,
  Plus,
  Trash2,
  Type,
  Upload,
} from 'lucide-react'
import { useRef, useState, type ChangeEvent, type CSSProperties, type DragEvent } from 'react'
import { IconUser } from '../components/common/Icons'
import { PathlyLogo } from '../components/PathlyLogo'
import { blockMeta, blockOptions, INITIAL_CANVAS_BLOCKS } from '../components/editor/editorData'
import type { BlockConfig, BlockType, CanvasBlock, CreatorTrail, CreatorTrailStatus, PublishData, QuestionType } from '../components/editor/editorTypes'
import { PreviewModal } from '../components/editor/PreviewModal'
import { PublishModal } from '../components/editor/PublishModal'

type EditorPageProps = {
  initialTrail?: CreatorTrail
  onBackToLogin: () => void
  onSaveTrail: (data: PublishData, status: CreatorTrailStatus, blocks: CanvasBlock[]) => void
  onOpenPerfil: () => void
}

const EMPTY_BLOCK_CONFIG: BlockConfig = {
  title: '',
  description: '',
  icon: 'Conteúdo',
  contentText: '',
  questionText: '',
  videoSummary: '',
  questionType: 'Objetiva',
  options: ['', ''],
  correctOptionIndex: 0,
  trueFalseAnswer: true,
  expectedAnswer: '',
}

const EMPTY_PUBLISH_DATA: PublishData = {
  coverDataUrl: '',
  title: '',
  description: '',
  category: '',
  level: '',
  tags: '',
  visibility: 'public',
}

function blockToConfig(block: CanvasBlock): BlockConfig {
  return {
    title: block.title,
    description: block.description,
    icon: block.type,
    contentText: block.contentText ?? '',
    questionText: block.questionText ?? '',
    videoSummary: block.videoSummary ?? '',
    questionType: block.questionType ?? 'Objetiva',
    options: block.options?.length ? block.options : ['', ''],
    correctOptionIndex: block.correctOptionIndex ?? 0,
    trueFalseAnswer: block.trueFalseAnswer ?? true,
    expectedAnswer: block.expectedAnswer ?? '',
  }
}

function createBlock(id: number, type: BlockType, source?: Partial<BlockConfig>): CanvasBlock {
  const baseTitle = source?.title?.trim() || type
  const baseDescription = source?.description?.trim() || ''
  const block: CanvasBlock = {
    id,
    type,
    title: baseTitle,
    description: baseDescription,
  }

  if (type === 'Conteúdo') {
    block.contentText = source?.contentText ?? ''
  }

  if (type === 'Vídeo') {
    block.videoSummary = source?.videoSummary ?? ''
  }

  if (type === 'Pergunta') {
    block.questionType = source?.questionType ?? 'Objetiva'
    block.questionText = source?.questionText ?? ''
    block.options = source?.options?.length ? source.options : ['', '']
    block.correctOptionIndex = source?.correctOptionIndex ?? 0
    block.trueFalseAnswer = source?.trueFalseAnswer ?? true
    block.expectedAnswer = source?.expectedAnswer ?? ''
  }

  return block
}

function cloneCanvasBlocks(blocks: CanvasBlock[]) {
  return blocks.map(block => ({
    ...block,
    options: block.options ? [...block.options] : undefined,
  }))
}

function CanvasCard({
  block,
  isSelected,
  isNew,
  onSelect,
  onDelete,
  onDragStart,
  onDragEnter,
  onDragEnd,
  onDrop,
  isDragOver,
}: {
  block: CanvasBlock
  isSelected: boolean
  isNew: boolean
  onSelect: () => void
  onDelete: () => void
  onDragStart: (e: DragEvent<HTMLDivElement>) => void
  onDragEnter: (e: DragEvent<HTMLDivElement>) => void
  onDragEnd: (e: DragEvent<HTMLDivElement>) => void
  onDrop: (e: DragEvent<HTMLDivElement>) => void
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
      onDrop={onDrop}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      aria-label={`Bloco ${block.type}: ${block.title}`}
      onKeyDown={e => e.key === 'Enter' && onSelect()}
      style={{ '--block-color': meta.color } as CSSProperties}
    >
      <span className="dnd-card-grip" aria-hidden="true"><GripVertical size={15} /></span>
      <span className="dnd-card-icon" style={{ background: `${meta.color}18`, color: meta.color }}>{meta.icon}</span>
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

function DropZone({ active, onDrop, onDragEnter }: { active: boolean; onDrop: () => void; onDragEnter: () => void }) {
  return (
    <div
      className={`drop-zone${active ? ' drop-zone-active' : ''}`}
      onDragEnter={onDragEnter}
      onDragOver={e => e.preventDefault()}
      onDrop={e => { e.stopPropagation(); onDrop() }}
      aria-hidden="true"
    />
  )
}

export function EditorPage({ initialTrail, onBackToLogin, onSaveTrail, onOpenPerfil }: EditorPageProps) {
  const coverInputRef = useRef<HTMLInputElement>(null)
  const [selectedBlock, setSelectedBlock] = useState<BlockConfig>(EMPTY_BLOCK_CONFIG)
  const [selectedBlockId, setSelectedBlockId] = useState<number | null>(null)
  const [trailData, setTrailData] = useState<PublishData>(() => initialTrail ?? EMPTY_PUBLISH_DATA)
  const [canvasBlocks, setCanvasBlocks] = useState<CanvasBlock[]>(() =>
    cloneCanvasBlocks(initialTrail?.blocks?.length ? initialTrail.blocks : INITIAL_CANVAS_BLOCKS)
  )
  const [nextId, setNextId] = useState(() => {
    const initialBlocks = initialTrail?.blocks?.length ? initialTrail.blocks : INITIAL_CANVAS_BLOCKS
    return Math.max(...initialBlocks.map(block => block.id), 0) + 1
  })
  const [recentlyAddedId, setRecentlyAddedId] = useState<number | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [showPublish, setShowPublish] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [publishingLabel, setPublishingLabel] = useState('Publicando trilha...')
  const [contentEditorOpen, setContentEditorOpen] = useState(false)
  const [videoSummaryEditorOpen, setVideoSummaryEditorOpen] = useState(false)

  const dragIndexRef = useRef<number | null>(null)
  const dragTypeRef = useRef<BlockType | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)
  const [dropZoneOver, setDropZoneOver] = useState<number | null>(null)

  function updateTrailField<Field extends keyof PublishData>(field: Field, value: PublishData[Field]) {
    setTrailData((current) => ({ ...current, [field]: value }))
  }

  function handleTrailCoverChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') updateTrailField('coverDataUrl', reader.result)
    }
    reader.readAsDataURL(file)
  }

  function selectCanvasBlock(block: CanvasBlock) {
    setSelectedBlockId(block.id)
    setSelectedBlock(blockToConfig(block))
  }

  function getFimIndex(blocks = canvasBlocks) {
    return blocks.findIndex(block => block.type === 'Fim')
  }

  function getSafeInsertIndex(type: BlockType, atIndex?: number) {
    const fimIndex = getFimIndex()

    if (type === 'Fim' && fimIndex !== -1) return null
    if (fimIndex === -1) return atIndex
    if (typeof atIndex !== 'number') return fimIndex
    return Math.min(atIndex, fimIndex)
  }

  function isDropAfterFim(dropIndex: number) {
    const fimIndex = getFimIndex()
    return fimIndex !== -1 && dropIndex > fimIndex
  }

  function keepFimLast(blocks: CanvasBlock[]) {
    const fimIndex = blocks.findIndex(block => block.type === 'Fim')
    if (fimIndex === -1 || fimIndex === blocks.length - 1) return blocks

    const next = [...blocks]
    const [fimBlock] = next.splice(fimIndex, 1)
    return [...next, fimBlock]
  }

  function saveSelectedBlock() {
    if (selectedBlockId === null) return
    setCanvasBlocks(prev =>
      prev.map(block =>
        block.id === selectedBlockId
          ? createBlock(block.id, selectedBlock.icon, selectedBlock)
          : block
      )
    )
  }

  function addBlock(type: BlockType, atIndex?: number) {
    const safeIndex = getSafeInsertIndex(type, atIndex)
    if (safeIndex === null) return

    const id = nextId
    const newBlock = createBlock(id, type, type === selectedBlock.icon ? selectedBlock : undefined)
    setNextId(n => n + 1)
    setCanvasBlocks(prev => {
      if (typeof safeIndex !== 'number') return [...prev, newBlock]
      const next = [...prev]
      next.splice(safeIndex, 0, newBlock)
      return next
    })
    setSelectedBlockId(id)
    setSelectedBlock(blockToConfig(newBlock))
    setRecentlyAddedId(id)
    setTimeout(() => setRecentlyAddedId(null), 1200)
  }

  function deleteBlock(index: number) {
    const removed = canvasBlocks[index]
    setCanvasBlocks(prev => prev.filter((_, i) => i !== index))
    if (selectedBlockId === removed.id) {
      setSelectedBlockId(null)
      setSelectedBlock(EMPTY_BLOCK_CONFIG)
    }
  }

  function handleConfirmPublish(data: PublishData, status: CreatorTrailStatus) {
    const fallbackDescription = canvasBlocks.find(block => block.description.trim())?.description || 'Rascunho criado no editor de trilhas.'
    const trailData: PublishData = {
      ...data,
      title: data.title.trim() || 'Trilha sem título',
      description: data.description.trim() || fallbackDescription,
    }

    setShowPublish(false)
    setPublishing(true)
    setPublishingLabel(status === 'published' ? 'Publicando trilha...' : 'Salvando rascunho...')
    setTimeout(() => {
      setPublishing(false)
      onSaveTrail(trailData, status, canvasBlocks)
    }, 900)
  }

  function resetDragState() {
    setDragOverIndex(null)
    setDropZoneOver(null)
    dragIndexRef.current = null
    dragTypeRef.current = null
  }

  function onSidebarDragStart(type: BlockType) {
    dragIndexRef.current = null
    dragTypeRef.current = type
  }

  function onCardDragStart(_e: DragEvent<HTMLDivElement>, index: number) {
    dragIndexRef.current = index
    dragTypeRef.current = null
  }

  function onCardDrop(targetIndex: number) {
    if (isDropAfterFim(targetIndex)) {
      resetDragState()
      return
    }

    if (dragTypeRef.current !== null) {
      addBlock(dragTypeRef.current, targetIndex)
      resetDragState()
      return
    }

    if (dragIndexRef.current !== null && dragIndexRef.current !== targetIndex) {
      const from = dragIndexRef.current
      setCanvasBlocks(prev => {
        const next = [...prev]
        const [moved] = next.splice(from, 1)
        next.splice(targetIndex, 0, moved)
        return keepFimLast(next)
      })
    }
    resetDragState()
  }

  function onDropZoneDrop(dropIndex: number) {
    if (isDropAfterFim(dropIndex)) {
      resetDragState()
      return
    }

    if (dragTypeRef.current !== null) {
      addBlock(dragTypeRef.current, dropIndex)
      resetDragState()
      return
    }

    if (dragIndexRef.current !== null) {
      const from = dragIndexRef.current
      const to = from < dropIndex ? dropIndex - 1 : dropIndex
      if (from !== to) {
        setCanvasBlocks(prev => {
          const next = [...prev]
          const [moved] = next.splice(from, 1)
          next.splice(to, 0, moved)
          return keepFimLast(next)
        })
      }
    }
    resetDragState()
  }

  function onCanvasDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    if (dragTypeRef.current !== null) addBlock(dragTypeRef.current)
    resetDragState()
  }

  function insertFormattedSnippet(target: 'contentText' | 'videoSummary', format: 'title' | 'bold' | 'italic' | 'text') {
    const snippets = {
      title: '\n## Título da seção\n',
      bold: '**texto em negrito**',
      italic: '*texto em itálico*',
      text: 'Texto do parágrafo.',
    }

    setSelectedBlock(current => ({
      ...current,
      [target]: `${current[target] || ''}${current[target] ? '\n' : ''}${snippets[format]}`,
    }))
  }

  function updateQuestionType(questionType: QuestionType) {
    setSelectedBlock(current => ({
      ...current,
      questionType,
      options: questionType === 'Objetiva' ? (current.options.length ? current.options : ['', '']) : current.options,
    }))
  }

  function updateOption(index: number, value: string) {
    setSelectedBlock(current => ({
      ...current,
      options: current.options.map((option, optionIndex) => optionIndex === index ? value : option),
    }))
  }

  function addOption() {
    setSelectedBlock(current => ({ ...current, options: [...current.options, ''] }))
  }

  function removeOption(index: number) {
    setSelectedBlock(current => {
      const nextOptions = current.options.filter((_, optionIndex) => optionIndex !== index)
      const safeOptions = nextOptions.length >= 2 ? nextOptions : current.options
      return {
        ...current,
        options: safeOptions,
        correctOptionIndex: Math.min(current.correctOptionIndex, safeOptions.length - 1),
      }
    })
  }

  return (
    <>
      <div className={`editor-page${showPreview || showPublish ? ' editor-page-blurred' : ''}`}>
        <header className="editor-header editor-builder-header">
          <button className="editor-nav-button editor-back-button editor-back-button-left" type="button" onClick={onBackToLogin}>
            <ArrowLeft size={15} />
            Voltar
          </button>

          <PathlyLogo onClick={onBackToLogin} variant="branco" size="md" />

          <div className="editor-builder-search">
            <IconSearch />
            <input type="text" placeholder="Pesquisar blocos" aria-label="Pesquisar blocos" />
          </div>

          <nav className="editor-nav editor-builder-nav">
            <button className="editor-nav-button" type="button" onClick={onBackToLogin}>Dashboard</button>
            <button className="profile-button" type="button" aria-label="Perfil" onClick={onOpenPerfil}><IconUser /></button>
          </nav>
        </header>

        <main className="editor-shell">
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
                    setSelectedBlock({ ...EMPTY_BLOCK_CONFIG, icon: block.type, title: '', description: '' })
                    setSelectedBlockId(null)
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && setSelectedBlock({ ...EMPTY_BLOCK_CONFIG, icon: block.type })}
                  aria-label={`Bloco ${block.type}`}
                  style={{ '--block-color': block.color } as CSSProperties}
                >
                  <span
                    className="block-icon"
                    style={selectedBlock.icon === block.type ? { background: `${block.color}22`, color: block.color } : undefined}
                  >
                    {block.icon}
                  </span>
                  <span>{block.type}</span>
                </div>
              ))}
            </div>

            <button className="add-to-canvas-button" type="button" onClick={() => addBlock(selectedBlock.icon)} disabled={selectedBlock.icon === 'Fim' && getFimIndex() !== -1}>
              <Plus size={15} />
              Adicionar ao fluxo
            </button>
            <div className="drag-helper">Arraste os blocos para o fluxo</div>
          </aside>

          <section className="flow-workspace" aria-label="Fluxo da trilha">
            <div className="workspace-title-row">
              <div className="workspace-title-copy">
                <h1>Fluxo da trilha</h1>
                {(initialTrail || trailData.title || trailData.coverDataUrl) && (
                  <div className="editor-trail-summary" aria-label={`Editando ${trailData.title || 'Trilha sem título'}`}>
                    {trailData.coverDataUrl ? (
                      <img src={trailData.coverDataUrl} alt="" />
                    ) : (
                      <div className="editor-trail-summary-fallback">
                        {(trailData.title || 'T').charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <strong>{trailData.title || 'Trilha sem título'}</strong>
                      <p>{initialTrail ? (initialTrail.status === 'draft' ? 'Rascunho em edição' : 'Trilha publicada em edição') : 'Nova trilha em edição'}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="workspace-actions">
                <button className="workspace-action-btn" type="button" onClick={() => setShowPreview(true)}>
                  <Eye size={15} />
                  Pré-Visualizar
                </button>
                <button className="workspace-action-btn workspace-action-btn-primary" type="button" onClick={() => setShowPublish(true)}>Publicar</button>
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
                <DropZone active={dropZoneOver === 0} onDragEnter={() => setDropZoneOver(0)} onDrop={() => onDropZoneDrop(0)} />
                {canvasBlocks.map((block, index) => (
                  <div key={block.id}>
                    <CanvasCard
                      block={block}
                      isSelected={selectedBlockId === block.id}
                      isNew={recentlyAddedId === block.id}
                      onSelect={() => selectCanvasBlock(block)}
                      onDelete={() => deleteBlock(index)}
                      onDragStart={e => onCardDragStart(e, index)}
                      onDragEnter={() => { setDragOverIndex(index); setDropZoneOver(null) }}
                      onDragEnd={resetDragState}
                      onDrop={e => { e.preventDefault(); e.stopPropagation(); onCardDrop(index) }}
                      isDragOver={dragOverIndex === index}
                    />
                    {!isDropAfterFim(index + 1) && (
                      <DropZone active={dropZoneOver === index + 1} onDragEnter={() => setDropZoneOver(index + 1)} onDrop={() => onDropZoneDrop(index + 1)} />
                    )}
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

          <aside className="edit-panel">
            <section className="trail-edit-panel" aria-label="Dados da trilha">
              <h2>Dados da trilha</h2>
              <input
                ref={coverInputRef}
                className="trail-cover-input"
                type="file"
                accept="image/*"
                onChange={handleTrailCoverChange}
                aria-label="Selecionar capa da trilha"
              />
              <button
                className={`trail-cover-editor${trailData.coverDataUrl ? ' trail-cover-editor-filled' : ''}`}
                type="button"
                onClick={() => coverInputRef.current?.click()}
              >
                {trailData.coverDataUrl ? (
                  <>
                    <img src={trailData.coverDataUrl} alt="" />
                    <span><Upload size={14} /> Trocar capa</span>
                  </>
                ) : (
                  <>
                    <ImageIcon size={20} />
                    <span>Adicionar capa</span>
                  </>
                )}
              </button>

              <label className="field-label">
                Título da trilha
                <input
                  value={trailData.title}
                  placeholder="Nome da trilha"
                  onChange={e => updateTrailField('title', e.target.value)}
                />
              </label>
            </section>

            <h2>Editar bloco</h2>

            <div className="selected-preview selected-preview-top" aria-label="Tipo do bloco selecionado">
              {blockMeta[selectedBlock.icon].icon}
              <span>{selectedBlock.icon}</span>
            </div>

            <label className="field-label">
              Título
              <input
                value={selectedBlock.title}
                placeholder={selectedBlockId === null ? 'Nome do novo bloco' : 'Nome do bloco'}
                onChange={e => setSelectedBlock(c => ({ ...c, title: e.target.value }))}
              />
            </label>

            <label className="field-label">
              Descrição
              <textarea
                value={selectedBlock.description}
                placeholder={selectedBlockId === null ? 'Descrição breve do novo bloco' : 'Descrição breve'}
                onChange={e => setSelectedBlock(c => ({ ...c, description: e.target.value }))}
              />
            </label>

            {selectedBlock.icon === 'Conteúdo' && (
              <label className="field-label">
                <span className="field-label-row">
                  Texto do conteúdo
                  <button className="field-label-action" type="button" onClick={e => { e.preventDefault(); setContentEditorOpen(true) }}>Abrir editor</button>
                </span>
                <textarea
                  className="editor-large-textarea"
                  value={selectedBlock.contentText}
                  placeholder="Digite o texto que será exibido ao aprendiz neste módulo."
                  onChange={e => setSelectedBlock(c => ({ ...c, contentText: e.target.value }))}
                />
              </label>
            )}

            {selectedBlock.icon === 'Vídeo' && (
              <div className="video-editor-area">
                <div className="video-placeholder">
                  <span>Placeholder de vídeo</span>
                  <small>Upload real não implementado no protótipo</small>
                </div>

                <label className="field-label">
                  <span className="field-label-row">
                    Resumo do vídeo
                    <button className="field-label-action" type="button" onClick={e => { e.preventDefault(); setVideoSummaryEditorOpen(true) }}>Abrir editor</button>
                  </span>
                  <textarea
                    className="editor-large-textarea"
                    value={selectedBlock.videoSummary}
                    placeholder="Digite um resumo do vídeo para orientar o aprendiz."
                    onChange={e => setSelectedBlock(c => ({ ...c, videoSummary: e.target.value }))}
                  />
                </label>
              </div>
            )}

            {selectedBlock.icon === 'Pergunta' && (
              <section className="question-editor" aria-label="Configuração da pergunta">
                <label className="field-label">
                  Tipo de pergunta
                  <select
                    value={selectedBlock.questionType}
                    onChange={e => updateQuestionType(e.target.value as QuestionType)}
                  >
                    <option value="Objetiva">Objetiva</option>
                    <option value="Verdadeiro ou falso">Verdadeiro ou falso</option>
                    <option value="Discursiva">Discursiva</option>
                  </select>
                </label>

                <label className="field-label">
                  Enunciado
                  <textarea
                    value={selectedBlock.questionText}
                    placeholder="Digite a pergunta que será apresentada ao aprendiz."
                    onChange={e => setSelectedBlock(c => ({ ...c, questionText: e.target.value }))}
                  />
                </label>

                {selectedBlock.questionType === 'Objetiva' && (
                  <div className="question-options-area">
                    <p className="question-options-title">Alternativas</p>
                    {selectedBlock.options.map((option, index) => (
                      <div className="question-option-row" key={index}>
                        <input
                          type="radio"
                          name="correct-option"
                          checked={selectedBlock.correctOptionIndex === index}
                          onChange={() => setSelectedBlock(c => ({ ...c, correctOptionIndex: index }))}
                          aria-label={`Marcar alternativa ${index + 1} como correta`}
                        />
                        <input
                          value={option}
                          placeholder={`Alternativa ${index + 1}`}
                          onChange={e => updateOption(index, e.target.value)}
                        />
                        <button
                          type="button"
                          className="question-option-remove"
                          onClick={() => removeOption(index)}
                          disabled={selectedBlock.options.length <= 2}
                          aria-label={`Remover alternativa ${index + 1}`}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    ))}
                    <button className="question-add-option" type="button" onClick={addOption}>
                      <Plus size={13} />
                      Adicionar alternativa
                    </button>
                  </div>
                )}

                {selectedBlock.questionType === 'Verdadeiro ou falso' && (
                  <div className="true-false-area">
                    <span>Resposta correta</span>
                    <label>
                      <input
                        type="radio"
                        name="true-false-answer"
                        checked={selectedBlock.trueFalseAnswer}
                        onChange={() => setSelectedBlock(c => ({ ...c, trueFalseAnswer: true }))}
                      />
                      Verdadeiro
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="true-false-answer"
                        checked={!selectedBlock.trueFalseAnswer}
                        onChange={() => setSelectedBlock(c => ({ ...c, trueFalseAnswer: false }))}
                      />
                      Falso
                    </label>
                  </div>
                )}

                {selectedBlock.questionType === 'Discursiva' && (
                  <label className="field-label">
                    Resposta esperada ou critério de correção
                    <textarea
                      value={selectedBlock.expectedAnswer}
                      placeholder="Informe uma resposta de referência ou os critérios esperados."
                      onChange={e => setSelectedBlock(c => ({ ...c, expectedAnswer: e.target.value }))}
                    />
                  </label>
                )}
              </section>
            )}

            <section className="settings-area">
              <h3>Configurações</h3>
              <button type="button">Regras do bloco <ChevronDown size={17} /></button>
              <button type="button">Progresso <ChevronDown size={17} /></button>
            </section>

            <button
              className="save-button"
              type="button"
              onClick={() => {
                if (selectedBlockId === null) {
                  addBlock(selectedBlock.icon)
                  return
                }
                saveSelectedBlock()
              }}
              disabled={selectedBlock.icon === 'Fim' && getFimIndex() !== -1 && selectedBlockId === null}
              title={selectedBlockId === null ? 'Adicionar o bloco configurado ao fluxo' : 'Salvar alterações'}
            >
              {selectedBlockId === null ? 'Adicionar bloco' : 'Salvar'}
            </button>
          </aside>
        </main>

        {publishing && (
          <div className="publishing-overlay" aria-live="polite">
            <div className="publishing-box">
              <span className="publish-spinner" aria-hidden="true" />
              <span>{publishingLabel}</span>
            </div>
          </div>
        )}
      </div>

      {contentEditorOpen && (
        <RichTextModal
          title="Editor de conteúdo"
          value={selectedBlock.contentText}
          onChange={value => setSelectedBlock(c => ({ ...c, contentText: value }))}
          onClose={() => setContentEditorOpen(false)}
          onInsert={format => insertFormattedSnippet('contentText', format)}
        />
      )}

      {videoSummaryEditorOpen && (
        <RichTextModal
          title="Editor de resumo do vídeo"
          value={selectedBlock.videoSummary}
          onChange={value => setSelectedBlock(c => ({ ...c, videoSummary: value }))}
          onClose={() => setVideoSummaryEditorOpen(false)}
          onInsert={format => insertFormattedSnippet('videoSummary', format)}
        />
      )}

      {showPreview && (
        <PreviewModal
          blocks={canvasBlocks}
          onClose={() => setShowPreview(false)}
          onGoPublish={() => { setShowPreview(false); setShowPublish(true) }}
        />
      )}

      {showPublish && (
        <PublishModal
          initialData={trailData}
          onClose={() => setShowPublish(false)}
          onConfirm={handleConfirmPublish}
        />
      )}
    </>
  )
}


function RichTextModal({
  title,
  value,
  onChange,
  onClose,
  onInsert,
}: {
  title: string
  value: string
  onChange: (value: string) => void
  onClose: () => void
  onInsert: (format: 'title' | 'bold' | 'italic' | 'text') => void
}) {
  return (
    <div className="rich-text-overlay" role="dialog" aria-modal="true" aria-label={title}>
      <div className="rich-text-modal">
        <div className="rich-text-header">
          <div>
            <span className="rich-text-kicker">Edição ampliada</span>
            <h2>{title}</h2>
          </div>
          <button className="rich-text-close" type="button" onClick={onClose}>Fechar</button>
        </div>

        <div className="rich-text-toolbar" aria-label="Ferramentas de texto">
          <button type="button" onClick={() => onInsert('title')}><Heading2 size={15} /> Título</button>
          <button type="button" onClick={() => onInsert('bold')}><Bold size={15} /> Negrito</button>
          <button type="button" onClick={() => onInsert('italic')}><Italic size={15} /> Itálico</button>
          <button type="button" onClick={() => onInsert('text')}><Type size={15} /> Texto</button>
        </div>

        <textarea
          className="rich-text-area"
          value={value}
          onChange={event => onChange(event.target.value)}
          placeholder="Escreva o conteúdo com mais espaço. Use os botões acima para inserir marcações simples."
          autoFocus
        />

        <div className="rich-text-footer">
          <span>As marcações serão salvas no bloco selecionado.</span>
          <button type="button" onClick={onClose}>Aplicar</button>
        </div>
      </div>
    </div>
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
