<script setup>
import { useRouter } from 'vue-router'
import Button from '@shared/components/Button.vue'

const router = useRouter()
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-[60vh] text-center">
    <h1 class="text-6xl font-bold text-primary mb-4">404</h1>
    <h2 class="text-2xl font-semibold text-text mb-2">Page Not Found</h2>
    <p class="text-muted mb-6">The page you are looking for does not exist.</p>
    <Button @click="router.push('/')">Go Home</Button>
  </div>
</template>