<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { gsap } from 'gsap'
import { floatingThoughtConfig, floatingThoughtOpacity, floatingThoughts } from '../../common/constants/animation'
import type { FloatingThought, GoldParticlePosition } from '../../common/interfaces/animation'
import type { Language, Theme } from '../../common/types/application'
import {
  getRandomThoughtVelocity,
  isThoughtOutsideStream,
  resolveGoldParticleCollisions,
  resolveThoughtCollisions,
} from '../../helpers/animation/floatingThoughts'
import { prefersReducedMotion } from '../../utils/animation'
import { getRandomNumber } from '../../utils/numbers'
import './ThoughtStream.css'

const props = defineProps<{
  language: Language
  theme: Theme
}>()

const streamContainer = ref<HTMLElement>()

let animationFrameId: number | undefined
let lastFrameTime = 0
let activeThoughts: FloatingThought[] = []

function renderThought(thought: FloatingThought) {
  thought.element.style.transform = `translate3d(${thought.renderX}px, ${thought.renderY}px, 0)`
}

function resetThought(thought: FloatingThought, shouldFadeIn = true) {
  const streamBounds = streamContainer.value?.getBoundingClientRect()
  if (!streamBounds) return

  thought.width = thought.element.offsetWidth
  thought.height = thought.element.offsetHeight
  thought.x = getRandomNumber(-floatingThoughtConfig.edgePadding, streamBounds.width - thought.width + floatingThoughtConfig.edgePadding)
  thought.y = getRandomNumber(-floatingThoughtConfig.edgePadding, streamBounds.height - thought.height + floatingThoughtConfig.edgePadding)
  thought.renderX = thought.x
  thought.renderY = thought.y

  const velocity = getRandomThoughtVelocity()
  thought.velocityX = velocity.velocityX
  thought.velocityY = velocity.velocityY
  renderThought(thought)

  gsap.killTweensOf(thought.element, 'opacity')
  const targetOpacity = floatingThoughtOpacity[props.theme]

  gsap.set(thought.element, { autoAlpha: shouldFadeIn ? 0 : targetOpacity })

  if (shouldFadeIn) {
    gsap.to(thought.element, {
      autoAlpha: targetOpacity,
      duration: floatingThoughtConfig.fadeDuration,
      ease: 'sine.out',
    })
  }
}

function getGoldParticlePositions(): GoldParticlePosition[] {
  const streamBounds = streamContainer.value?.getBoundingClientRect()
  if (!streamBounds) return []

  const particlePositions: GoldParticlePosition[] = []
  document.querySelectorAll<HTMLElement>(floatingThoughtConfig.goldParticleSelector).forEach((particleElement) => {
    if (Number.parseFloat(getComputedStyle(particleElement).opacity) <= 0.05) return

    const particleBounds = particleElement.getBoundingClientRect()
    particlePositions.push({
      x: particleBounds.left - streamBounds.left + particleBounds.width / 2,
      y: particleBounds.top - streamBounds.top + particleBounds.height / 2,
      radius: particleBounds.width / 2 + floatingThoughtConfig.goldParticleCollisionPadding,
    })
  })

  return particlePositions
}

function updateThoughts(frameTime: number) {
  const elapsedTime = Math.min(
    (frameTime - lastFrameTime) / 1000,
    floatingThoughtConfig.maximumFrameDuration,
  )
  lastFrameTime = frameTime

  activeThoughts.forEach((thought) => {
    thought.x += thought.velocityX * elapsedTime
    thought.y += thought.velocityY * elapsedTime
  })

  resolveThoughtCollisions(activeThoughts)
  resolveGoldParticleCollisions(activeThoughts, getGoldParticlePositions())

  activeThoughts.forEach((thought) => {
    const streamBounds = streamContainer.value?.getBoundingClientRect()

    if (streamBounds && isThoughtOutsideStream(thought, streamBounds.width, streamBounds.height)) {
      resetThought(thought)
    }

    const smoothingFactor = 1 - Math.exp(-floatingThoughtConfig.positionSmoothing * elapsedTime)
    thought.renderX += (thought.x - thought.renderX) * smoothingFactor
    thought.renderY += (thought.y - thought.renderY) * smoothingFactor
    renderThought(thought)
  })
}

function runPhysics(frameTime: number) {
  updateThoughts(frameTime)
  animationFrameId = window.requestAnimationFrame(runPhysics)
}

function stopPhysics() {
  if (animationFrameId !== undefined) window.cancelAnimationFrame(animationFrameId)
  animationFrameId = undefined
  activeThoughts.forEach((thought) => gsap.killTweensOf(thought.element))
  activeThoughts = []
}

function startPhysics() {
  stopPhysics()

  if (prefersReducedMotion() || !streamContainer.value) return

  const thoughtElements = Array.from(streamContainer.value.children).filter(
    (element): element is HTMLElement => element instanceof HTMLElement,
  )

  activeThoughts = thoughtElements.map((element) => ({
    element,
    x: 0,
    y: 0,
    renderX: 0,
    renderY: 0,
    velocityX: 0,
    velocityY: 0,
    width: element.offsetWidth,
    height: element.offsetHeight,
  }))

  activeThoughts.forEach((thought) => resetThought(thought))
  lastFrameTime = performance.now()
  animationFrameId = window.requestAnimationFrame(runPhysics)
}

function updateThoughtMeasurements() {
  activeThoughts.forEach((thought) => {
    thought.width = thought.element.offsetWidth
    thought.height = thought.element.offsetHeight
  })
}

function updateThoughtOpacity() {
  const targetOpacity = floatingThoughtOpacity[props.theme]

  activeThoughts.forEach((thought) => {
    if (Number.parseFloat(getComputedStyle(thought.element).opacity) <= 0.05) return

    gsap.to(thought.element, {
      autoAlpha: targetOpacity,
      duration: floatingThoughtConfig.fadeDuration,
      ease: 'sine.out',
      overwrite: 'auto',
    })
  })
}

onMounted(() => {
  window.addEventListener('resize', startPhysics)
  startPhysics()
})

watch(() => props.language, async () => {
  await nextTick()
  updateThoughtMeasurements()
})

watch(() => props.theme, updateThoughtOpacity)

onBeforeUnmount(() => {
  window.removeEventListener('resize', startPhysics)
  stopPhysics()
})
</script>

<template>
  <div ref="streamContainer" class="thought-stream" aria-hidden="true">
    <span v-for="(thought, thoughtId) in floatingThoughts[language]" :key="thoughtId" class="thought-stream__item">
      {{ thought }}
    </span>
  </div>
</template>
