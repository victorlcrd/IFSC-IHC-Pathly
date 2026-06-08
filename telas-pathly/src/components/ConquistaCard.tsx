import type { ReactNode } from 'react'
import { IconBook, IconCheckCircle, IconCode, IconFlame, IconLock, IconStar, IconTrophy, IconUsers, IconZap } from './common/Icons'
import { ProgressBar } from './common/ProgressBar'
import type { Conquista, ConquistaIcone } from '../data/conquistasMock'

type ConquistaCardProps = {
  conquista: Conquista
}

const iconePorTipo: Record<ConquistaIcone, ReactNode> = {
  trophy: <IconTrophy size={28} />,
  flame: <IconFlame size={28} />,
  book: <IconBook size={28} />,
  star: <IconStar size={28} />,
  check: <IconCheckCircle size={28} />,
  users: <IconUsers size={28} />,
  code: <IconCode />,
  zap: <IconZap />,
}

export function ConquistaCard({ conquista }: ConquistaCardProps) {
  const desbloqueada = conquista.status === 'desbloqueada'
  const progresso = conquista.progresso
  const temProgresso = progresso !== null

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
            <ProgressBar
              value={progresso.atual}
              max={progresso.total}
              label={`Progresso: ${progresso.atual} de ${progresso.total}`}
            />
          </div>
        )}
      </div>
    </article>
  )
}
