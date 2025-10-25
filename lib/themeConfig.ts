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
      background: 'linear-gradient(to bottom right, #f8fafc, #e0f2fe)',
      primary: '#0ea5e9',
      accent: '#0284c7',
      text: '#0f172a',
    },
    dark: {
      background: 'linear-gradient(to bottom right, #0f172a, #1e293b)',
      primary: '#0ea5e9',
      accent: '#38bdf8',
      text: '#e2e8f0',
    },
    mood: 'Cool, flowing, text-stream effects',
  },
  image: {
    name: 'Image Detection',
    icon: 'Image',
    light: {
      background: 'linear-gradient(to bottom right, #fdf4ff, #fae8ff)',
      primary: '#a21caf',
      accent: '#86198f',
      text: '#3b0764',
    },
    dark: {
      background: 'linear-gradient(to bottom right, #1a1625, #2d1b3d)',
      primary: '#d946ef',
      accent: '#a855f7',
      text: '#f1f0fb',
    },
    mood: 'Bokeh particles, blur effects, photographic feel',
  },
  video: {
    name: 'Video Detection',
    icon: 'Video',
    light: {
      background: 'linear-gradient(to bottom right, #fff7ed, #ffedd5)',
      primary: '#c2410c',
      accent: '#ea580c',
      text: '#431407',
    },
    dark: {
      background: 'linear-gradient(to bottom right, #1c1917, #292524)',
      primary: '#f97316',
      accent: '#fb923c',
      text: '#fef3ec',
    },
    mood: 'Film grain, light rays, cinematic motion',
  },
}

