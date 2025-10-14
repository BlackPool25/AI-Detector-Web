import { DetectionMode } from './utils'

export interface ModeTheme {
  name: string
  icon: string
  light: {
    background: string
    primary: string
    accent: string
    text: string
  }
  dark: {
    background: string
    primary: string
    accent: string
    text: string
  }
  mood: string
}

export const modeThemes: Record<DetectionMode, ModeTheme> = {
  text: {
    name: 'Text Detection',
    icon: 'FileText',
    light: {
      background: 'linear-gradient(to bottom right, #F8FAFB, #E8F2F7)',
      primary: '#0EA5E9',
      accent: '#38BDF8',
      text: '#0F172A',
    },
    dark: {
      background: 'linear-gradient(to bottom right, #0F172A, #1E293B)',
      primary: '#06B6D4',
      accent: '#22D3EE',
      text: '#F1F5F9',
    },
    mood: 'Cool, flowing, text-stream effects',
  },
  image: {
    name: 'Image Detection',
    icon: 'Image',
    light: {
      background: 'linear-gradient(to bottom right, #FDF4FF, #FCE7F3)',
      primary: '#EC4899',
      accent: '#F472B6',
      text: '#3F1950',
    },
    dark: {
      background: 'linear-gradient(to bottom right, #1E1B29, #2D1B3D)',
      primary: '#D946EF',
      accent: '#C026D3',
      text: '#FAF5FF',
    },
    mood: 'Bokeh particles, blur effects, photographic feel',
  },
  video: {
    name: 'Video Detection',
    icon: 'Video',
    light: {
      background: 'linear-gradient(to bottom right, #FFF7ED, #FFEDD5)',
      primary: '#F97316',
      accent: '#FB923C',
      text: '#431407',
    },
    dark: {
      background: 'linear-gradient(to bottom right, #1C1917, #292524)',
      primary: '#EF4444',
      accent: '#F87171',
      text: '#FEF2F2',
    },
    mood: 'Film grain, light rays, cinematic motion',
  },
}

