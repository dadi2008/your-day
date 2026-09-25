<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { gsap } from 'gsap'
import { magicParticleCount } from 'common/constants/animation'
import type { Translation } from 'common/interfaces/application'
import type { Wish } from 'common/interfaces/quotes'
import { getMagicParticleFlight, getMagicParticlePosition } from 'helpers/animation/magicParticles'
import { prefersReducedMotion } from 'utils/animation'
import './DailyWish.css'

const props = defineProps<{
  formattedDate: string
  copy: Translation
  wish: Wish
}>()

const emit = defineEmits<{
  showNextWish: []
}>()

const dateElement = ref<HTMLElement>()
const titleElement = ref<HTMLElement>()
const subtitleElement = ref<HTMLElement>()
const cardElement = ref<HTMLElement>()
const quoteElement = ref<HTMLElement>()
const authorElement = ref<HTMLElement>()
const particlesElement = ref<HTMLElement>()
const isTransitioning = ref(false)
const hasCompletedEntrance = ref(false)
const shouldAnimateWishChange = ref(false)

let entranceTimeline: gsap.core.Timeline | undefined
let wishTimeline: gsap.core.Timeline | undefined

function getParticleElements(): HTMLElement[] {
  return particlesElement.value
    ? gsap.utils.toArray<HTMLElement>(particlesElement.value.children)
    : []
}

function positionParticlesAroundCard() {
  getParticleElements().forEach((particleElement, index) => {
    const { horizontalPosition, verticalPosition } = getMagicParticlePosition(index)

    gsap.set(particleElement, {
      left: `${horizontalPosition}%`,
      top: `${verticalPosition}%`,
    })
  })
}

function getCardContentElements() {
  const card = cardElement.value
  const quote = quoteElement.value
  const author = authorElement.value

  if (!card || !quote || !author) return

  return { card, quote, author }
}

function animatePageEntrance() {
  if (prefersReducedMotion()) return

  const date = dateElement.value
  const title = titleElement.value
  const subtitle = subtitleElement.value
  const card = cardElement.value

  if (!date || !title || !subtitle || !card) return

  entranceTimeline?.kill()
  entranceTimeline = gsap.timeline({ onComplete: () => { hasCompletedEntrance.value = true } })
  entranceTimeline
    .fromTo(date, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.5 })
    .fromTo(title, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.25')
    .fromTo(subtitle, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.55 }, '-=0.45')
    .fromTo(card, { autoAlpha: 0, y: 42, rotateX: -8 }, { autoAlpha: 1, y: 0, rotateX: 0, duration: 0.9, ease: 'power3.out' }, '-=0.3')
}

function animateWishReveal() {
  if (prefersReducedMotion()) {
    isTransitioning.value = false
    return
  }

  const cardContentElements = getCardContentElements()
  if (!cardContentElements) {
    isTransitioning.value = false
    return
  }

  const particleElements = getParticleElements()
  const { author, card, quote } = cardContentElements

  positionParticlesAroundCard()
  wishTimeline?.kill()
  const revealTimeline = gsap.timeline({ onComplete: () => { isTransitioning.value = false } })
  wishTimeline = revealTimeline
  revealTimeline
    .set([quote, author], { autoAlpha: 0, y: 18 })
    .set(card, { scale: 0.97, rotateY: -5 })
    .set(particleElements, {
      x: 0,
      y: 0,
      autoAlpha: 0,
      scale: 0.2,
    })
    .to(card, { scale: 1, rotateY: 0, duration: 0.55, ease: 'power3.out' })
    .to([quote, author], { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.08 }, '-=0.2')

  particleElements.forEach((particleElement, index) => {
    const particleFlight = getMagicParticleFlight(index)
    const animationStart = 0.55 + index * 0.025

    revealTimeline
      .to(particleElement, {
        autoAlpha: 0.9,
        duration: 0.12,
        ease: 'power1.out',
      }, animationStart)
      .to(particleElement, {
        x: particleFlight.x,
        y: particleFlight.y,
        scale: 0.65 + (index % 3) * 0.2,
        duration: particleFlight.duration,
        ease: 'power2.out',
      }, animationStart)
      .to(particleElement, {
        autoAlpha: 0,
        duration: particleFlight.duration * 0.65,
        ease: 'power1.in',
      }, animationStart + particleFlight.duration * 0.32)
  })
}

function handleNextWish() {
  if (isTransitioning.value) return

  if (prefersReducedMotion()) {
    emit('showNextWish')
    return
  }

  shouldAnimateWishChange.value = true
  const cardContentElements = getCardContentElements()
  if (!cardContentElements) return

  const { author, card, quote } = cardContentElements
  isTransitioning.value = true
  wishTimeline?.kill()
  wishTimeline = gsap.timeline({ onComplete: () => emit('showNextWish') })
  wishTimeline
    .to([quote, author], { autoAlpha: 0, y: -18, duration: 0.28, stagger: 0.05 })
    .to(card, { scale: 0.97, rotateY: 5, duration: 0.35, ease: 'power2.in' }, 0)
}

function handleCardPointerMove(event: PointerEvent) {
  if (prefersReducedMotion() || !cardElement.value || isTransitioning.value) return

  const cardBounds = cardElement.value.getBoundingClientRect()
  const horizontalOffset = (event.clientX - cardBounds.left) / cardBounds.width - 0.5
  const verticalOffset = (event.clientY - cardBounds.top) / cardBounds.height - 0.5

  gsap.to(cardElement.value, {
    rotateX: verticalOffset * -7,
    rotateY: horizontalOffset * 10,
    duration: 0.45,
    ease: 'power2.out',
  })
}

function resetCardTilt() {
  if (prefersReducedMotion() || !cardElement.value) return

  gsap.to(cardElement.value, { rotateX: 0, rotateY: 0, duration: 0.7, ease: 'elastic.out(1, 0.45)' })
}

onMounted(() => {
  positionParticlesAroundCard()
  animatePageEntrance()
})
watch(() => props.wish.text, async () => {
  if (!hasCompletedEntrance.value || !shouldAnimateWishChange.value) return

  shouldAnimateWishChange.value = false
  await nextTick()
  animateWishReveal()
})
onBeforeUnmount(() => {
  entranceTimeline?.kill()
  wishTimeline?.kill()
})
</script>

<template>
  <section class="content">
    <p ref="dateElement" class="date">{{ formattedDate }}</p>
    <h1 ref="titleElement">{{ copy.title }}</h1>
    <p ref="subtitleElement" class="subtitle">{{ copy.subtitle }}</p>

    <article
      ref="cardElement"
      class="wish-card"
      aria-live="polite"
      @pointermove="handleCardPointerMove"
      @pointerleave="resetCardTilt"
    >
      <span class="quote-mark" aria-hidden="true">“</span>
      <div ref="particlesElement" class="magic-particles" aria-hidden="true">
        <span v-for="particle in magicParticleCount" :key="particle" class="magic-particle"></span>
      </div>
      <blockquote ref="quoteElement">{{ wish.text }}</blockquote>
      <p ref="authorElement" class="author">— {{ wish.author }}</p>
    </article>

    <button class="new-wish-button" type="button" :disabled="isTransitioning || !hasCompletedEntrance" @click="handleNextWish">
      <span aria-hidden="true">↻</span>
      {{ copy.newWish }}
    </button>
    <p class="source">{{ copy.source }}</p>
  </section>
</template>
