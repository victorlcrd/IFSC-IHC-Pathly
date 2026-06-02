import { CheckCircle2, Lock, X } from 'lucide-react'
import { blockMeta } from './editorData'
import type { CanvasBlock } from './editorTypes'

type PreviewModalProps = {
  blocks: CanvasBlock[]
  onClose: () => void
  onGoPublish: () => void
}

export function PreviewModal({ blocks, onClose, onGoPublish }: PreviewModalProps) {
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
              const isActive = index === unlockedCount - 1
              const meta = blockMeta[block.type]

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
