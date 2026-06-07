<script setup>
import { useBrandingStore } from '@shared/stores/brandingStore'
import { useToast } from '@shared/composables/useToast'
import Toast from '@shared/components/Toast.vue'

const brandingStore = useBrandingStore()
brandingStore.applyPlatformDefaults()

const { toasts, dismiss } = useToast()
</script>

<template>
  <router-view />
  <Toast
    v-for="t in toasts"
    :key="t.id"
    :message="t.message"
    :type="t.type"
    :visible="t.visible"
    :duration="0"
    @close="dismiss(t.id)"
  />
</template>
