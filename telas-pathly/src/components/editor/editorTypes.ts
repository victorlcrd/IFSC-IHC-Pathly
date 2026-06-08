export type BlockType = 'Início' | 'Conteúdo' | 'Vídeo' | 'Pergunta' | 'Conquista' | 'Fim'

export type QuestionType = 'Objetiva' | 'Verdadeiro ou falso' | 'Discursiva'

export type BlockConfig = {
  title: string
  description: string
  icon: BlockType
  contentText: string
  questionText: string
  videoSummary: string
  questionType: QuestionType
  options: string[]
  correctOptionIndex: number
  trueFalseAnswer: boolean
  expectedAnswer: string
}

export type CanvasBlock = {
  id: number
  type: BlockType
  title: string
  description: string
  contentText?: string
  questionText?: string
  videoSummary?: string
  questionType?: QuestionType
  options?: string[]
  correctOptionIndex?: number
  trueFalseAnswer?: boolean
  expectedAnswer?: string
}

export type PublishData = {
  title: string
  description: string
  category: string
  level: string
  tags: string
  visibility: 'public' | 'private' | 'link'
}
