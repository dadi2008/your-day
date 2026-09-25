<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { prefersReducedMotion } from 'utils/animation'
import './MorningLight.css'

const lightContainer = ref<HTMLElement>()
let animationContext: gsap.Context | undefined

onMounted(() => {
  if (prefersReducedMotion() || !lightContainer.value) return

  animationContext = gsap.context(() => {
    gsap.to('.morning-light__orb--first', {
      x: '24vw',
      y: '14vh',
      scale: 1.18,
      duration: 14,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    })
    gsap.to('.morning-light__orb--second', {
      x: '-18vw',
      y: '-10vh',
      scale: 0.82,
      duration: 18,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    })
    gsap.to('.morning-light__orb--third', {
      x: '-10vw',
      y: '12vh',
      scale: 1.12,
      duration: 16,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    })
  }, lightContainer.value)
})

onBeforeUnmount(() => animationContext?.revert())
</script>

<template>
  <div ref="lightContainer" class="morning-light" aria-hidden="true">
    <span class="morning-light__orb morning-light__orb--first"></span>
    <span class="morning-light__orb morning-light__orb--second"></span>
    <span class="morning-light__orb morning-light__orb--third"></span>
  </div>
</template>
