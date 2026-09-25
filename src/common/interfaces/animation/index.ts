export interface FloatingThought {
  element: HTMLElement
  x: number
  y: number
  renderX: number
  renderY: number
  velocityX: number
  velocityY: number
  width: number
  height: number
}

export interface GoldParticlePosition {
  x: number
  y: number
  radius: number
}

export interface MagicParticlePosition {
  horizontalPosition: number
  verticalPosition: number
}

export interface MagicParticleFlight {
  x: number
  y: number
  duration: number
}
