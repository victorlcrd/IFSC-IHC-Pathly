import type { ReactNode } from 'react'
import { CircleHelp, Flag, MapPin, MessageSquareText, Trophy, Video } from 'lucide-react'
import type { BlockType, CanvasBlock } from './editorTypes'

export const blockOptions: Array<{ type: BlockType; icon: ReactNode; color: string }> = [
  { type: 'Início', icon: <MapPin size={21} />, color: '#10b981' },
  { type: 'Conteúdo', icon: <MessageSquareText size={21} />, color: '#6366f1' },
  { type: 'Vídeo', icon: <Video size={21} />, color: '#0ea5e9' },
  { type: 'Pergunta', icon: <CircleHelp size={21} />, color: '#f59e0b' },
  { type: 'Conquista', icon: <Trophy size={21} />, color: '#ef4444' },
  { type: 'Fim', icon: <Flag size={21} />, color: '#374151' },
]

export const blockMeta: Record<BlockType, { icon: ReactNode; color: string }> = {
  'Início': { icon: <MapPin size={20} />, color: '#10b981' },
  'Conteúdo': { icon: <MessageSquareText size={20} />, color: '#6366f1' },
  'Vídeo': { icon: <Video size={20} />, color: '#0ea5e9' },
  'Pergunta': { icon: <CircleHelp size={20} />, color: '#f59e0b' },
  'Conquista': { icon: <Trophy size={20} />, color: '#ef4444' },
  'Fim': { icon: <Flag size={20} />, color: '#374151' },
}

export const INITIAL_CANVAS_BLOCKS: CanvasBlock[] = [
  { id: 0, type: 'Início', title: 'Introdução', description: 'Apresentação inicial da trilha.' },
  { id: 1, type: 'Conteúdo', title: 'Conteúdo principal', description: 'Primeiro material da trilha.', contentText: '' },
  { id: 2, type: 'Pergunta', title: 'Avaliação', description: 'Pergunta de fixação.', questionType: 'Objetiva', questionText: '', options: ['', ''], correctOptionIndex: 0 },
]
