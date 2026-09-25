import type { Language, Theme } from '../../types/application'
import type { FloatingThoughtId } from '../../types/animation'

export const magicParticleCount = 18

export const floatingThoughtConfig = {
  minimumSpeed: 18,
  maximumSpeed: 42,
  fadeDuration: 1.2,
  edgePadding: 90,
  thoughtCollisionPadding: 14,
  goldParticleCollisionPadding: 18,
  maximumFrameDuration: 0.05,
  positionSmoothing: 14,
  goldParticleSelector: '.magic-particle',
} as const

export const floatingThoughtOpacity: Record<Theme, number> = {
  light: 0.38,
  dark: 0.22,
}

export const floatingThoughts: Record<Language, Record<FloatingThoughtId, string>> = {
  uk: {
    calm: 'спокій', hope: 'надія', strength: 'сила', warmth: 'тепло',
    joy: 'радість', inspiration: 'натхнення', care: 'турбота', light: 'світло',
  },
  en: {
    calm: 'calm', hope: 'hope', strength: 'strength', warmth: 'warmth',
    joy: 'joy', inspiration: 'inspiration', care: 'care', light: 'light',
  },
}
