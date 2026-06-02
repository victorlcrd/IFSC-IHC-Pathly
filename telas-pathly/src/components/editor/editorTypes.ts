export type BlockType = 'Início' | 'Conteúdo' | 'Pergunta' | 'Escolha' | 'Conquista' | 'Fim'

export type BlockConfig = {
  title: string
  description: string
  icon: BlockType
}

export type CanvasBlock = {
  id: number
  type: BlockType
  title: string
  description: string
}

export type PublishData = {
  title: string
  description: string
  category: string
  level: string
  tags: string
  visibility: 'public' | 'private' | 'link'
}
