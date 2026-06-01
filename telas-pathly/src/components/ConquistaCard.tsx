import type { ReactNode } from 'react'
import type { Conquista, ConquistaIcone } from '../data/conquistasMock'

type ConquistaCardProps = {
  conquista: Conquista
}

const iconePorTipo: Record<ConquistaIcone, ReactNode> = {
  trophy: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  ),
  flame: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  ),
  book: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  star: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  check: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  users: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  code: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  zap: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
}

function IconLock() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

export function ConquistaCard({ conquista }: ConquistaCardProps) {
  const desbloqueada = conquista.status === 'desbloqueada'
  const progresso = conquista.progresso
  const temProgresso = progresso !== null
  const pctProgresso = temProgresso
    ? Math.min(100, Math.round((progresso.atual / progresso.total) * 100))
    : 100

  return (
    <article
      className={`conquista-card conquista-card--${conquista.cor}${desbloqueada ? ' conquista-card--desbloqueada' : ' conquista-card--bloqueada'}`}
      aria-label={`${conquista.titulo} — ${desbloqueada ? 'desbloqueada' : 'bloqueada'}`}
    >
      <div className="conquista-card-icon-wrap">
        <span className="conquista-card-icon">{iconePorTipo[conquista.icone]}</span>
        {!desbloqueada && (
          <span className="conquista-card-lock" aria-hidden="true">
            <IconLock />
          </span>
        )}
      </div>

      <div className="conquista-card-body">
        <div className="conquista-card-header">
          <h2 className="conquista-card-title">{conquista.titulo}</h2>
          <span className={`conquista-card-status${desbloqueada ? ' conquista-card-status--unlocked' : ''}`}>
            {desbloqueada ? 'Desbloqueada' : 'Bloqueada'}
          </span>
        </div>

        <p className="conquista-card-desc">{conquista.descricao}</p>

        {desbloqueada && conquista.dataDesbloqueio && (
          <p className="conquista-card-date">Desbloqueada em {conquista.dataDesbloqueio}</p>
        )}

        {temProgresso && progresso && (
          <div className="conquista-card-progress">
            <div className="conquista-card-progress-header">
              <span className="conquista-card-progress-label">Progresso</span>
              <span className="conquista-card-progress-value">
                {progresso.atual}/{progresso.total}
              </span>
            </div>
            <div
              className="progress-bar-bg"
              role="progressbar"
              aria-valuenow={progresso.atual}
              aria-valuemin={0}
              aria-valuemax={progresso.total}
              aria-label={`Progresso: ${progresso.atual} de ${progresso.total}`}
            >
              <div className="progress-bar-fill" style={{ width: `${pctProgresso}%` }} />
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
