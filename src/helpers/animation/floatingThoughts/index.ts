import { floatingThoughtConfig } from '../../../common/constants/animation'
import type { FloatingThought, GoldParticlePosition } from '../../../common/interfaces/animation'
import { getRandomNumber } from '../../../utils/numbers'

export function getThoughtRadius(thought: FloatingThought): number {
  return Math.max(thought.width, thought.height) / 2 + floatingThoughtConfig.thoughtCollisionPadding
}

export function getRandomThoughtVelocity(): Pick<FloatingThought, 'velocityX' | 'velocityY'> {
  const angle = getRandomNumber(0, Math.PI * 2)
  const speed = getRandomNumber(floatingThoughtConfig.minimumSpeed, floatingThoughtConfig.maximumSpeed)

  return {
    velocityX: Math.cos(angle) * speed,
    velocityY: Math.sin(angle) * speed,
  }
}

export function resolveThoughtCollisions(thoughts: FloatingThought[]): void {
  thoughts.forEach((firstThought, firstIndex) => {
    thoughts.slice(firstIndex + 1).forEach((secondThought) => {
      const firstCenterX = firstThought.x + firstThought.width / 2
      const firstCenterY = firstThought.y + firstThought.height / 2
      const secondCenterX = secondThought.x + secondThought.width / 2
      const secondCenterY = secondThought.y + secondThought.height / 2
      const distanceX = secondCenterX - firstCenterX
      const distanceY = secondCenterY - firstCenterY
      const distance = Math.hypot(distanceX, distanceY)
      const collisionDistance = getThoughtRadius(firstThought) + getThoughtRadius(secondThought)

      if (distance === 0 || distance >= collisionDistance) return

      const normalX = distanceX / distance
      const normalY = distanceY / distance
      const firstSpeed = Math.hypot(firstThought.velocityX, firstThought.velocityY)
      const secondSpeed = Math.hypot(secondThought.velocityX, secondThought.velocityY)

      firstThought.velocityX = -normalX * firstSpeed
      firstThought.velocityY = -normalY * firstSpeed
      secondThought.velocityX = normalX * secondSpeed
      secondThought.velocityY = normalY * secondSpeed

      const separation = (collisionDistance - distance) / 2
      firstThought.x -= normalX * separation
      firstThought.y -= normalY * separation
      secondThought.x += normalX * separation
      secondThought.y += normalY * separation
    })
  })
}

export function resolveGoldParticleCollisions(
  thoughts: FloatingThought[],
  particlePositions: GoldParticlePosition[],
): void {
  thoughts.forEach((thought) => {
    particlePositions.forEach((particlePosition) => {
      const thoughtCenterX = thought.x + thought.width / 2
      const thoughtCenterY = thought.y + thought.height / 2
      const distanceX = thoughtCenterX - particlePosition.x
      const distanceY = thoughtCenterY - particlePosition.y
      const distance = Math.hypot(distanceX, distanceY)
      const collisionDistance = getThoughtRadius(thought) + particlePosition.radius

      if (distance === 0 || distance >= collisionDistance) return

      const normalX = distanceX / distance
      const normalY = distanceY / distance
      const velocityAlongNormal = thought.velocityX * normalX + thought.velocityY * normalY

      if (velocityAlongNormal < 0) {
        thought.velocityX -= 2 * velocityAlongNormal * normalX
        thought.velocityY -= 2 * velocityAlongNormal * normalY
      }

      const separation = collisionDistance - distance
      thought.x += normalX * separation
      thought.y += normalY * separation
    })
  })
}

export function isThoughtOutsideStream(thought: FloatingThought, width: number, height: number): boolean {
  const { edgePadding } = floatingThoughtConfig

  return thought.x + thought.width < -edgePadding
    || thought.x > width + edgePadding
    || thought.y + thought.height < -edgePadding
    || thought.y > height + edgePadding
}
