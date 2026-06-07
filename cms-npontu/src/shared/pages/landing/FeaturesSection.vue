<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { GraduationCap, BookOpen, Users, Wallet, UserRound, CalendarDays, Megaphone, BarChart3, ArrowRight } from '@lucide/vue'

const features = [
  {
    title: 'Admissions', desc: 'Streamline student applications, admissions workflows, approvals, and enrollment processes.',
    icon: GraduationCap, color: '#F59E0B', iconColor: '#D97706',
    step: '01', side: 'left',
  },
  {
    title: 'Academics', desc: 'Manage courses, departments, academic records, grading systems, and curriculum structures.',
    icon: BookOpen, color: '#0EA5E9', iconColor: '#06B6D4',
    step: '02', side: 'right',
  },
  {
    title: 'Students', desc: 'Track attendance, performance, student profiles, discipline records, and progress.',
    icon: Users, color: '#10B981', iconColor: '#F59E0B',
    step: '03', side: 'left',
  },
  {
    title: 'Finance', desc: 'Automate fee collection, invoicing, scholarships, financial reporting, and payment tracking.',
    icon: Wallet, color: '#F97316', iconColor: '#0EA5E9',
    step: '04', side: 'right',
  },
  {
    title: 'Staff', desc: 'Manage employees, payroll, contracts, departments, evaluations, and performance reviews.',
    icon: UserRound, color: '#3B82F6', iconColor: '#10B981',
    step: '05', side: 'left',
  },
  {
    title: 'Scheduling', desc: 'Create class schedules, examination timetables, room allocations, and academic calendars.',
    icon: CalendarDays, color: '#059669', iconColor: '#F97316',
    step: '06', side: 'right',
  },
  {
    title: 'Communication', desc: 'Send announcements, notifications, emails, SMS alerts, and institution-wide updates.',
    icon: Megaphone, color: '#D97706', iconColor: '#3B82F6',
    step: '07', side: 'left',
  },
  {
    title: 'Analytics', desc: 'Generate actionable insights through dashboards, KPIs, reports, and institutional analytics.',
    icon: BarChart3, color: '#0891B2', iconColor: '#059669',
    step: '08', side: 'right',
  },
]

const count = features.length

// DOM-based orb animation
const sectionRef = ref(null)
const containerRef = ref(null)
const cardRefs = ref([])
const orbX = ref(0)
const orbY = ref(0)
const revealed = ref(new Set())
const pulsing = ref(-1)
const hasStarted = ref(false)

let animFrame = null
let startTime = null
let checkpointY = []
let containerTop = 0
let centerX = 0
const duration = 5000
const obs = ref(null)

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function measurePositions() {
  if (!containerRef.value || !sectionRef.value) return
  const sectionRect = sectionRef.value.getBoundingClientRect()
  const containerRect = containerRef.value.getBoundingClientRect()
  containerTop = containerRect.top - sectionRect.top + sectionRef.value.scrollTop
  centerX = containerRect.width / 2
  checkpointY = []
  for (const el of cardRefs.value) {
    if (!el) continue
    const rect = el.getBoundingClientRect()
    const relY = rect.top - sectionRect.top + rect.height / 2 + sectionRef.value.scrollTop
    checkpointY.push(relY)
  }
  // Set initial orb position to first checkpoint or top
  if (checkpointY.length > 0) {
    const firstY = checkpointY[0]
    const secondY = checkpointY.length > 1 ? checkpointY[1] : firstY + 220
    // Start the orb above the first node
    orbX.value = centerX
    orbY.value = firstY - (secondY - firstY) * 0.3
  }
}

function animateOrb(ts) {
  if (!startTime) startTime = ts
  const elapsed = ts - startTime
  const progress = Math.min(elapsed / duration, 1)
  const eased = easeInOutCubic(progress)

  if (checkpointY.length > 1) {
    // Map eased (0..1) to the orb traveling from above first node to below last node
    const startY = checkpointY[0] - (checkpointY[1] - checkpointY[0]) * 0.3
    const endY = checkpointY[checkpointY.length - 1] + (checkpointY[1] - checkpointY[0]) * 0.3
    const yRange = endY - startY
    const targetY = startY + eased * yRange

    // Smooth interpolation between checkpoints
    orbX.value = centerX
    orbY.value = targetY
  }

  // Trigger card reveals at checkpoints
  for (let i = 0; i < count; i++) {
    const checkpointFraction = (i + 1) / (count + 1)
    if (eased >= checkpointFraction && !revealed.value.has(i)) {
      const newSet = new Set(revealed.value)
      newSet.add(i)
      revealed.value = newSet
      pulsing.value = i
      setTimeout(() => { pulsing.value = -1 }, 800)
    }
  }

  if (progress < 1) {
    animFrame = requestAnimationFrame(animateOrb)
  } else {
    // Ensure all cards are revealed at end
    const all = new Set()
    for (let i = 0; i < count; i++) all.add(i)
    revealed.value = all
  }
}

function startAnimation() {
  if (hasStarted.value) return
  hasStarted.value = true
  measurePositions()
  startTime = null
  animFrame = requestAnimationFrame(animateOrb)
}

onMounted(async () => {
  await nextTick()
  // Wait a frame for layout to settle
  setTimeout(() => {
    measurePositions()
    // Set up IntersectionObserver
    if (sectionRef.value) {
      obs.value = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            startAnimation()
            if (obs.value) obs.value.disconnect()
          }
        }
      }, { threshold: 0.15 })
      obs.value.observe(sectionRef.value)
    }
  }, 100)
})

onBeforeUnmount(() => {
  if (animFrame) cancelAnimationFrame(animFrame)
  if (obs.value) obs.value.disconnect()
})
</script>

<template>
  <section ref="sectionRef" class="py-28 lg:py-36 bg-white overflow-hidden relative">
    <div ref="containerRef" class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-20 lg:mb-24">
        <span class="inline-block text-xs font-semibold tracking-[0.18em] uppercase mb-4 text-black/40">Features</span>
        <h2 class="font-extrabold tracking-tight text-balance leading-tight text-[#111827]">
          <span style="font-size: clamp(40px, 5vw, 56px);">Everything You Need.</span><br>
          <span style="font-size: clamp(40px, 5vw, 56px); background: linear-gradient(135deg, #4F46E5, #06B6D4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">All in One Platform.</span>
        </h2>
        <p class="mt-5 text-base lg:text-lg leading-relaxed text-[#6B7280] max-w-[520px] mx-auto">
          ELEVA brings all critical campus operations together in a smart, scalable platform.
        </p>
      </div>

      <!-- Timeline Container -->
      <div class="relative mx-auto" style="max-width: 1100px;">
        <!-- SVG dotted timeline (purely decorative) -->
        <svg
          class="absolute top-0 left-1/2 -translate-x-1/2 h-full pointer-events-none hidden md:block"
          style="width: 120px; z-index: 1; overflow: visible;"
          viewBox="0 0 120 2000"
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <line x1="60" y1="0" x2="60" y2="2000" stroke="#D1D5DB" stroke-width="2" stroke-dasharray="4 4" stroke-linecap="round" />
        </svg>

        <!-- Glowing orb (positioned absolutely, driven by DOM measurements) -->
        <div
          v-if="hasStarted"
          class="hidden md:block absolute pointer-events-none"
          style="z-index: 15;"
          :style="{ left: orbX + 'px', top: orbY + 'px', transform: 'translate(-50%, -50%)' }"
        >
          <div class="orb-glow"></div>
          <div class="orb-core"></div>
        </div>

        <!-- Pulse ring -->
        <div
          v-if="pulsing >= 0 && cardRefs[pulsing]"
          class="hidden md:block absolute pointer-events-none pulse-ring-html"
          style="z-index: 12;"
          :style="{
            left: centerX + 'px',
            top: (checkpointY[pulsing] || 0) + 'px',
            transform: 'translate(-50%, -50%)'
          }"
          :key="'pulse-' + pulsing"
        ></div>

        <!-- Grid Layout: [Left Card] [Timeline Column] [Right Card] -->
        <div class="grid grid-cols-[1fr_auto_1fr] gap-0 relative" style="z-index: 10;">
          <template v-for="(f, i) in features" :key="f.title">
            <!-- Left card -->
            <div v-if="f.side === 'left'" :data-f-idx="i" class="flex justify-end pr-8" style="grid-column: 1;">
              <div
                :ref="el => { if (el) cardRefs[i] = el }"
                class="feature-card-wrapper"
                :class="{ 'card-reveal': revealed.has(i) }"
                style="width: 500px; --slide-from: -120px;"
              >
                <div class="feature-card" :style="{ background: f.color }">
                  <div class="card-glass">
                    <div class="pl-16 pr-20 py-4 flex flex-col justify-center" style="min-height: 132px;">
                      <h3 class="card-title text-white font-black text-3xl leading-tight">{{ f.title }}</h3>
                      <p class="card-desc text-white/95 text-lg leading-relaxed mt-1.5 font-bold">{{ f.desc }}</p>
                    </div>
                  </div>
                </div>
                <div class="icon-circle" style="right: -50px;" :class="{ 'icon-reveal': revealed.has(i) }">
                  <component :is="f.icon" :size="42" stroke-width="1.5" :color="f.iconColor" />
                </div>
              </div>
            </div>

            <!-- Timeline cell -->
            <div style="grid-column: 2; width: 80px;" class="flex flex-col items-center justify-center">
              <div class="flex flex-col items-center" style="margin-top: 6px;">
                <span class="step-num block text-2xl font-black leading-none" :class="{ 'step-reveal': revealed.has(i) }" :style="{ color: f.color }">
                  {{ f.step }}
                </span>
                <span class="block text-[9px] font-semibold tracking-[0.12em] uppercase text-black/30 mt-0.5">Step</span>
              </div>
            </div>

            <!-- Right card -->
            <div v-if="f.side === 'right'" :data-f-idx="i" class="flex justify-start pl-8" style="grid-column: 3;">
              <div
                :ref="el => { if (el) cardRefs[i] = el }"
                class="feature-card-wrapper"
                :class="{ 'card-reveal': revealed.has(i) }"
                style="width: 500px; --slide-from: 120px;"
              >
                <div class="feature-card" :style="{ background: f.color }">
                  <div class="card-glass">
                    <div class="pl-20 pr-8 py-4 flex flex-col justify-center" style="min-height: 132px;">
                      <h3 class="card-title text-white font-black text-3xl leading-tight">{{ f.title }}</h3>
                      <p class="card-desc text-white/95 text-lg leading-relaxed mt-1.5 font-bold">{{ f.desc }}</p>
                    </div>
                  </div>
                </div>
                <div class="icon-circle" style="left: -50px;" :class="{ 'icon-reveal': revealed.has(i) }">
                  <component :is="f.icon" :size="42" stroke-width="1.5" :color="f.iconColor" />
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>

      <!-- CTA -->
      <div class="text-center mt-24">
        <button class="cta-btn group">
          <span>Explore All Features</span>
          <ArrowRight :size="18" stroke-width="2.5" class="cta-arrow" />
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Orb HTML elements */
.orb-glow {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(99,102,241,0.5) 0%, rgba(99,102,241,0) 70%);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: orb-pulse-glow 1.5s ease-in-out infinite alternate;
}
.orb-core {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #818CF8;
  box-shadow: 0 0 12px rgba(99,102,241,0.8), 0 0 24px rgba(99,102,241,0.4);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
@keyframes orb-pulse-glow {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.7; }
  100% { transform: translate(-50%, -50%) scale(1.3); opacity: 1; }
}

/* Pulse ring */
.pulse-ring-html {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid #818CF8;
  animation: html-pulse-expand 0.8s ease-out forwards;
}
@keyframes html-pulse-expand {
  0% { width: 12px; height: 12px; opacity: 1; border-width: 2px; }
  100% { width: 60px; height: 60px; opacity: 0; border-width: 1px; }
}

/* Card reveal */
.feature-card-wrapper {
  position: relative;
  flex-shrink: 0;
  opacity: 0;
  transform: translateX(var(--slide-from, 120px)) scale(0.9);
  filter: blur(10px);
}

.card-reveal {
  animation: card-enter 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes card-enter {
  0% {
    opacity: 0;
    transform: translateX(var(--slide-from)) scale(0.9);
    filter: blur(10px);
  }
  100% {
    opacity: 1;
    transform: translateX(0) scale(1);
    filter: blur(0px);
  }
}

/* Icon circle */
.icon-circle {
  position: absolute;
  top: 50%;
  transform: translateY(-50%) scale(0) rotate(-180deg);
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.10), inset 0 -3px 8px rgba(0, 0, 0, 0.03);
  transition: box-shadow 350ms ease, transform 350ms ease;
}

.icon-reveal {
  animation: icon-enter 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s forwards;
}

@keyframes icon-enter {
  0% {
    transform: translateY(-50%) scale(0) rotate(-180deg);
  }
  100% {
    transform: translateY(-50%) scale(1) rotate(0deg);
  }
}

/* Title stagger */
.card-title {
  opacity: 0;
  transform: translateY(20px);
}
.card-reveal .card-title {
  animation: text-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards;
}

/* Desc stagger */
.card-desc {
  opacity: 0;
  transform: translateY(16px);
}
.card-reveal .card-desc {
  animation: text-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
}

@keyframes text-up {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Step number */
.step-num {
  opacity: 0;
  transform: scale(0.5);
}
.step-reveal {
  animation: step-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s forwards;
}
@keyframes step-pop {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* Base styles */
.feature-card {
  width: 100%;
  height: 140px;
  border-radius: 999px;
  padding: 4px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
  transition: all 400ms cubic-bezier(0.22, 1, 0.36, 1);
}
.feature-card:hover {
  translate: 0 -6px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.16);
}

.card-glass {
  height: 100%;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 36px;
  border-radius: 9999px;
  background: linear-gradient(135deg, #4F46E5, #6366F1);
  color: white;
  font-weight: 700;
  font-size: 16px;
  border: none;
  cursor: pointer;
  transition: all 350ms cubic-bezier(0.22, 1, 0.36, 1);
  box-shadow: 0 4px 24px rgba(79, 70, 229, 0.25);
}
.cta-btn:hover {
  translate: 0 -4px;
  box-shadow: 0 8px 40px rgba(79, 70, 229, 0.35);
}

.cta-arrow {
  transition: transform 250ms ease-out;
}
.cta-btn:hover .cta-arrow {
  transform: translateX(6px);
}

/* Hover card + icon interaction */
.feature-card-wrapper:hover .icon-circle.icon-reveal {
  box-shadow: 0 10px 36px rgba(0, 0, 0, 0.14), inset 0 -3px 8px rgba(0, 0, 0, 0.03);
}

/* Mobile */
@media (max-width: 1023px) {
  .grid {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
  }
  .feature-card {
    height: 120px;
  }
  .icon-circle {
    width: 80px;
    height: 80px;
  }
  .icon-circle :deep(svg) {
    width: 34px;
    height: 34px;
  }
  .feature-card-wrapper {
    width: min(90vw, 440px) !important;
  }
}
</style>
