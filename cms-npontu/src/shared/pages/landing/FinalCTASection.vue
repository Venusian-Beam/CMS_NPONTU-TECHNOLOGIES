<script setup>
import { useRouter } from 'vue-router'
import Button from '@shared/components/Button.vue'

const router = useRouter()
</script>

<template>
  <section class="relative py-28 lg:py-36 overflow-hidden" style="background: linear-gradient(135deg, #5B5CF6 0%, #7C3AED 50%, #5B5CF6 100%);">
    <!-- Floating decorative elements -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div class="absolute top-10 left-[10%] w-64 h-64 rounded-full bg-white/5 blur-3xl" />
      <div class="absolute bottom-10 right-[10%] w-80 h-80 rounded-full bg-white/5 blur-3xl" />
      <div class="absolute top-1/3 right-[20%] w-4 h-4 rounded-full bg-white/20" />
      <div class="absolute bottom-1/4 left-[15%] w-6 h-6 rounded-full bg-white/15" />
      <div class="absolute top-1/2 left-[40%] w-3 h-3 rounded-full bg-white/10" />
      <div class="absolute bottom-1/3 right-[30%] w-5 h-5 rounded-full bg-white/20" />

      <!-- Decorative grid pattern -->
      <div class="absolute inset-0 opacity-[0.04]" style="background-image: radial-gradient(circle, white 1px, transparent 1px); background-size: 32px 32px;" />

      <!-- Abstract curves -->
      <svg class="absolute -top-20 -left-20 w-96 h-96 pointer-events-none" viewBox="0 0 400 400" fill="none">
        <path d="M0 200 Q 100 0 200 200 T 400 200" stroke="white" stroke-width="1" opacity="0.08" />
      </svg>
      <svg class="absolute -bottom-20 -right-20 w-96 h-96 pointer-events-none" viewBox="0 0 400 400" fill="none">
        <path d="M0 200 Q 100 400 200 200 T 400 200" stroke="white" stroke-width="1" opacity="0.08" />
      </svg>
    </div>

    <div class="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
      <h2 class="font-extrabold tracking-tight text-balance text-white" :style="{ fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 800, lineHeight: '1.1' }">
        Ready to Transform<br />Your Institution?
      </h2>
      <p class="mt-6 text-base lg:text-lg leading-relaxed" style="color: rgba(255,255,255,0.8); max-width: 550px; margin: 24px auto 0;">
        Join modern institutions using ELEVA to streamline academics, finance and administration.
      </p>
      <div class="flex flex-col sm:flex-row justify-center gap-4 mt-10">
        <Button size="lg" @click="router.push('/signup')" class="!bg-white !text-[#5B5CF6] hover:!bg-white/90 !shadow-lg !shadow-black/20">
          Request Demo
        </Button>
        <Button
          variant="outline"
          size="lg"
          @click="router.push('/login')"
          class="!border-white !text-white hover:!bg-white/10"
        >
          Explore Platform
        </Button>
      </div>
    </div>
  </section>
</template>
