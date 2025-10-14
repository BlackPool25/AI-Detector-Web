import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type DetectionMode = 'text' | 'image' | 'video'

export const getModeColors = (mode: DetectionMode, isDark: boolean) => {
  const colors = {
    text: {
      light: '#0EA5E9',
      dark: '#06B6D4',
      accent: '#38BDF8',
    },
    image: {
      light: '#EC4899',
      dark: '#D946EF',
      accent: '#F472B6',
    },
    video: {
      light: '#F97316',
      dark: '#EF4444',
      accent: '#FB923C',
    },
  }

  return isDark ? colors[mode].dark : colors[mode].light
}

export const getModeGradient = (mode: DetectionMode, isDark: boolean) => {
  const gradients = {
    text: {
      light: 'from-[#F8FAFB] to-[#E8F2F7]',
      dark: 'from-[#0F172A] to-[#1E293B]',
    },
    image: {
      light: 'from-[#FDF4FF] to-[#FCE7F3]',
      dark: 'from-[#1E1B29] to-[#2D1B3D]',
    },
    video: {
      light: 'from-[#FFF7ED] to-[#FFEDD5]',
      dark: 'from-[#1C1917] to-[#292524]',
    },
  }

  return isDark ? gradients[mode].dark : gradients[mode].light
}

