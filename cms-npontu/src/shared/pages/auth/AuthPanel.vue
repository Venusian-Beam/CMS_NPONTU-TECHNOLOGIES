<script setup>
import { ref, watch } from 'vue'
import { useTransition } from '@vueuse/core'
import { gsap } from 'gsap'

const props = defineProps({
  isActive: { type: Boolean, required: true }
})

const emit = defineEmits(['switch'])

const containerRef = ref(null)
const panelRef = ref(null)
const formRef = ref(null)
const transitionState = ref(true)

const panelTransition = useTransition(props.isActive, {
  duration: 800,
  easing: cubic-bezier(0.22, 1, 0.36, 1),
  onAfter: () => {
    transitionState.value = props.isActive
  }
})

function animatePanel() {
  if (!panelRef.value || !formRef.value) return

  const containerWidth = containerRef.value?.offsetWidth || 600
  const panelWidth = panelRef.value?.offsetWidth || 400
  const formWidth = formRef.value?.offsetWidth || 400

  const panelTarget = props.isActive ? 0 : containerWidth - panelWidth
  const formTarget = props.isActive ? panelWidth : 0

  gsap.to(panelRef.value, {
    x: panelTarget,
    duration: 0.8,
    ease: 'power3.out',
    force3D: true
  })

  gsap.to(formRef.value, {
    x: formTarget,
    duration: 0.8,
    ease: 'power3.out',
    force3D: true
  })
}

watch(() => props.isActive, () => {
  animatePanel()
})
</script>

<template>
  <div ref="containerRef" class="relative h-full w-full overflow-hidden">
    <div 
      ref="panelRef"
      class="absolute top-0 h-full flex-shrink-0"
      :class="transitionState === props.isActive ? 'w-1/2' : 'w-1/2'"
      :style="{
        transform: panelTransition ? `translateX(${props.isActive ? 0 : '-50%'})` : undefined,
        transition: 'transform 0.8s cubic-bezier(0.22,1,0.36,1)'
      }"
    >
      <slot name="branding" />
    </div>

    <div 
      ref="formRef"
      class="absolute top-0 h-full flex-shrink-0"
      :class="transitionState === props.isActive ? 'w-1/2' : 'w-1/2'"
      :style="{
        transform: panelTransition ? `translateX(${props.isActive ? '50%' : 0})` : undefined,
        transition: 'transform 0.8s cubic-bezier(0.22,1,0.36,1)'
      }"
    >
      <slot name="form" />
    </div>
  </div>
</template>