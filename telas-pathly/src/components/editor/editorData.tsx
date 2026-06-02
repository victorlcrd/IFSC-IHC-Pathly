import type { ReactNode } from 'react'
import { CircleHelp, Flag, MapPin, MessageSquareText, Share2, Trophy } from 'lucide-react'
import type { BlockType, CanvasBlock } from './editorTypes'

export const blockOptions: Array<{ type: BlockType; icon: ReactNode; color: string }> = [
  { type: 'Início', icon: <MapPin size={21} />, color: '#10b981' },
  { type: 'Conteúdo', icon: <MessageSquareText size={21} />, color: '#6366f1' },
  { type: 'Pergunta', icon: <CircleHelp size={21} />, color: '#f59e0b' },
  { type: 'Escolha', icon: <Share2 size={21} />, color: '#8b5cf6' },
  { type: 'Conquista', icon: <Trophy size={21} />, color: '#ef4444' },
  { type: 'Fim', icon: <Flag size={21} />, color: '#374151' },
]

export const blockMeta: Record<BlockType, { icon: ReactNode; color: string }> = {
  'Início': { icon: <MapPin size={20} />, color: '#10b981' },
  'Conteúdo': { icon: <MessageSquareText size={20} />, color: '#6366f1' },
  'Pergunta': { icon: <CircleHelp size={20} />, color: '#f59e0b' },
  'Escolha': { icon: <Share2 size={20} />, color: '#8b5cf6' },
  'Conquista': { icon: <Trophy size={20} />, color: '#ef4444' },
  'Fim': { icon: <Flag size={20} />, color: '#374151' },
}

export const INITIAL_CANVAS_BLOCKS: CanvasBlock[] = [
  { id: 0, type: 'Início', title: 'Introdução', description: '' },
  { id: 1, type: 'Conteúdo', title: 'Conteúdo principal', description: '' },
  { id: 2, type: 'Pergunta', title: 'Avaliação', description: '' },
]
