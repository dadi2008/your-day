import { magicParticleCount } from 'common/constants/animation'
import type { MagicParticleFlight, MagicParticlePosition } from 'common/interfaces/animation'

export function getMagicParticlePosition(index: number): MagicParticlePosition {
  const perimeterProgress = index / magicParticleCount

  if (perimeterProgress < 0.25) {
    return { horizontalPosition: perimeterProgress * 400, verticalPosition: -12 }
  }

  if (perimeterProgress < 0.5) {
    return { horizontalPosition: 112, verticalPosition: (perimeterProgress - 0.25) * 400 }
  }

  if (perimeterProgress < 0.75) {
    return { horizontalPosition: 100 - (perimeterProgress - 0.5) * 400, verticalPosition: 112 }
  }

  return { horizontalPosition: -12, verticalPosition: 100 - (perimeterProgress - 0.75) * 400 }
}

export function getMagicParticleFlight(index: number): MagicParticleFlight {
  const perimeterProgress = index / magicParticleCount
  const speedOffset = (index % 5) * 0.12

  if (perimeterProgress < 0.25) {
    return { x: (perimeterProgress - 0.125) * 260, y: -180 - (index % 4) * 28, duration: 0.58 + speedOffset }
  }

  if (perimeterProgress < 0.5) {
    return { x: 180 + (index % 4) * 28, y: (perimeterProgress - 0.375) * 260, duration: 0.58 + speedOffset }
  }

  if (perimeterProgress < 0.75) {
    return { x: (0.625 - perimeterProgress) * 260, y: 180 + (index % 4) * 28, duration: 0.58 + speedOffset }
  }

  return { x: -180 - (index % 4) * 28, y: (0.875 - perimeterProgress) * 260, duration: 0.58 + speedOffset }
}
