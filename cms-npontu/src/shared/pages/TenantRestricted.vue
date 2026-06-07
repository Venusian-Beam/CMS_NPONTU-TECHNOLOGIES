<script setup>
import { useRouter } from 'vue-router'
import Button from '@shared/components/Button.vue'

const router = useRouter()
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-[60vh] text-center">
    <h1 class="text-6xl font-bold text-primary mb-4">⛔</h1>
    <h2 class="text-2xl font-semibold text-text mb-2">Access Restricted</h2>
    <p class="text-muted mb-6">Your institution account is restricted. Contact your administrator.</p>
    <Button @click="router.push('/login')">Sign Out</Button>
  </div>
</template>