export type ConquistaStatus = 'desbloqueada' | 'bloqueada'

export type ConquistaIcone =
  | 'trophy'
  | 'flame'
  | 'book'
  | 'star'
  | 'check'
  | 'users'
  | 'code'
  | 'zap'

export type ConquistaCor = 'gold' | 'blue' | 'green' | 'coral'

export type Conquista = {
  id: string
  titulo: string
  descricao: string
  icone: ConquistaIcone
  status: ConquistaStatus
  /** null indica conquista imediata (sem barra de progresso) */
  progresso: { atual: number; total: number } | null
  cor: ConquistaCor
  dataDesbloqueio?: string
}

export const CONQUISTAS_MOCK: Conquista[] = [
  {
    id: 'primeira-trilha',
    titulo: 'Primeira trilha',
    descricao: 'Complete sua primeira trilha de aprendizado na plataforma.',
    icone: 'trophy',
    status: 'desbloqueada',
    progresso: null,
    cor: 'gold',
    dataDesbloqueio: '12/05/2026',
  },
  {
    id: 'streak-7-dias',
    titulo: '7 dias streak',
    descricao: 'Estude por 7 dias consecutivos sem interrupção.',
    icone: 'flame',
    status: 'desbloqueada',
    progresso: { atual: 7, total: 7 },
    cor: 'blue',
    dataDesbloqueio: '18/05/2026',
  },
  {
    id: 'react-master',
    titulo: 'React master',
    descricao: 'Conclua todas as aulas da trilha Introdução ao React.',
    icone: 'code',
    status: 'desbloqueada',
    progresso: { atual: 8, total: 8 },
    cor: 'green',
    dataDesbloqueio: '25/05/2026',
  },
  {
    id: 'explorador',
    titulo: 'Explorador',
    descricao: 'Inscreva-se em 5 trilhas diferentes.',
    icone: 'book',
    status: 'bloqueada',
    progresso: { atual: 4, total: 5 },
    cor: 'blue',
  },
  {
    id: 'estrela-dedicado',
    titulo: 'Estrela dedicado',
    descricao: 'Acumule 500 pontos de XP na plataforma.',
    icone: 'star',
    status: 'bloqueada',
    progresso: { atual: 320, total: 500 },
    cor: 'gold',
  },
  {
    id: 'perfeccionista',
    titulo: 'Perfeccionista',
    descricao: 'Obtenha 100% de acerto em 3 exercícios consecutivos.',
    icone: 'check',
    status: 'bloqueada',
    progresso: { atual: 1, total: 3 },
    cor: 'green',
  },
  {
    id: 'comunidade',
    titulo: 'Espírito comunitário',
    descricao: 'Participe do ranking semanal entre aprendizes.',
    icone: 'users',
    status: 'bloqueada',
    progresso: { atual: 0, total: 1 },
    cor: 'coral',
  },
  {
    id: 'velocista',
    titulo: 'Velocista',
    descricao: 'Complete 3 aulas em um único dia.',
    icone: 'zap',
    status: 'bloqueada',
    progresso: { atual: 2, total: 3 },
    cor: 'coral',
  },
]
