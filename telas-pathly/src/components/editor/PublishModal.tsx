import { useState } from 'react'
import { Image as ImageIcon } from 'lucide-react'
import type { PublishData } from './editorTypes'

type PublishModalProps = {
  onClose: () => void
  onConfirm: (data: PublishData) => void
}

const visibilityOptions: Array<{ value: PublishData['visibility']; label: string }> = [
  { value: 'public', label: 'Pública — visível para todos' },
  { value: 'private', label: 'Privada — somente você' },
  { value: 'link', label: 'Por link — somente quem tiver o link' },
]

export function PublishModal({ onClose, onConfirm }: PublishModalProps) {
  const [form, setForm] = useState<PublishData>({
    title: '',
    description: '',
    category: '',
    level: '',
    tags: '',
    visibility: 'public',
  })

  function updateField<Field extends keyof PublishData>(field: Field, value: PublishData[Field]) {
    setForm((current) => ({ ...current, [field]: value }))
  }

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
          <input className="publish-field" type="text" placeholder="Título" value={form.title} onChange={(e) => updateField('title', e.target.value)} />
          <textarea className="publish-field publish-field-textarea" placeholder="Descrição" value={form.description} onChange={(e) => updateField('description', e.target.value)} />
          <div className="publish-row">
            <input className="publish-field" type="text" placeholder="Categoria" value={form.category} onChange={(e) => updateField('category', e.target.value)} />
            <input className="publish-field" type="text" placeholder="Nível" value={form.level} onChange={(e) => updateField('level', e.target.value)} />
          </div>
          <input className="publish-field" type="text" placeholder="Tags" value={form.tags} onChange={(e) => updateField('tags', e.target.value)} />

          <div className="publish-visibility-section">
            <p className="publish-visibility-label">Visibilidade e privacidade</p>
            <div className="publish-visibility-options">
              {visibilityOptions.map((option) => (
                <label key={option.value} className={`publish-visibility-option ${form.visibility === option.value ? 'publish-visibility-active' : ''}`}>
                  <input
                    type="radio"
                    name="visibility"
                    value={option.value}
                    checked={form.visibility === option.value}
                    onChange={() => updateField('visibility', option.value)}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-publish-footer">
          <button className="publish-confirm-btn" type="button" onClick={() => onConfirm(form)}>Publicar</button>
        </div>
      </div>
    </div>
  )
}
