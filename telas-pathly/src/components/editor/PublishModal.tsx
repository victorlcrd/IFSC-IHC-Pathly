import { useRef, useState, type ChangeEvent } from 'react'
import { Image as ImageIcon, Upload } from 'lucide-react'
import type { CreatorTrailStatus, PublishData } from './editorTypes'

type PublishModalProps = {
  initialData?: PublishData
  onClose: () => void
  onConfirm: (data: PublishData, status: CreatorTrailStatus) => void
}

const visibilityOptions: Array<{ value: PublishData['visibility']; label: string }> = [
  { value: 'public', label: 'Pública — visível para todos' },
  { value: 'private', label: 'Privada — somente você' },
  { value: 'link', label: 'Por link — somente quem tiver o link' },
]

export function PublishModal({ initialData, onClose, onConfirm }: PublishModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [form, setForm] = useState<PublishData>(initialData ?? {
    coverDataUrl: '',
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

  function handleCoverChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') updateField('coverDataUrl', reader.result)
    }
    reader.readAsDataURL(file)
  }

  const canPublish = form.title.trim().length > 0 && form.description.trim().length > 0

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Publicar trilha">
      <div className="modal-publish">
        <div className="modal-publish-header">
          <span className="modal-publish-title">Publicar</span>
          <button className="modal-close-text" type="button" onClick={onClose}>Fechar</button>
        </div>

        <div className="modal-publish-body">
          <input
            ref={fileInputRef}
            className="publish-cover-input"
            type="file"
            accept="image/*"
            onChange={handleCoverChange}
            aria-label="Selecionar imagem de capa"
          />
          <button className={`publish-cover-area${form.coverDataUrl ? ' publish-cover-filled' : ''}`} type="button" aria-label="Adicionar capa" onClick={() => fileInputRef.current?.click()}>
            {form.coverDataUrl ? (
              <>
                <img src={form.coverDataUrl} alt="" />
                <span className="publish-cover-change"><Upload size={15} /> Trocar capa</span>
              </>
            ) : (
              <>
                <ImageIcon size={22} color="#a5b4fc" />
                <span>Capa</span>
              </>
            )}
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
          <button className="publish-draft-btn" type="button" onClick={() => onConfirm(form, 'draft')}>Salvar rascunho</button>
          <button className="publish-confirm-btn" type="button" onClick={() => onConfirm(form, 'published')} disabled={!canPublish}>Publicar</button>
        </div>
      </div>
    </div>
  )
}
