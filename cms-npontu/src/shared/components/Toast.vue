<script setup>
import { ref, watch, onUnmounted } from 'vue'
const props = defineProps({
  message: { type: String, default: '' },
  type: { type: String, default: 'info', validator: (v) => ['info', 'success', 'warning', 'danger'].includes(v) },
  duration: { type: Number, default: 5000 }, visible: { type: Boolean, default: false },
})
const emit = defineEmits(['close'])
const isVisible = ref(false); let timer = null
watch(() => props.visible, (v) => { if (v) { isVisible.value = true; if (props.duration > 0) { clearTimeout(timer); timer = setTimeout(() => close(), props.duration) } } else isVisible.value = false })
function close() { isVisible.value = false; emit('close') }
onUnmounted(() => clearTimeout(timer))
const icons = {
  info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  success: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  warning: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z',
  danger: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
}
const styles = {
  info: 'bg-info-bg text-info border-info/20', success: 'bg-success-bg text-success border-success/20',
  warning: 'bg-warning-bg text-warning border-warning/20', danger: 'bg-danger-bg text-danger border-danger/20',
}
</script>

<template>
  <Teleport to="body">
    <div v-if="isVisible" class="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-slide-up" role="alert">
      <div :class="['flex items-start gap-3 p-4 rounded-2xl border shadow-panel', styles[type]]">
        <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="icons[type]" /></svg>
        <p class="text-sm flex-1 font-medium">{{ message }}</p>
        <button type="button" class="flex-shrink-0 p-1 rounded-lg hover:opacity-70 transition-opacity" @click="close" aria-label="Close"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
      </div>
    </div>
  </Teleport>
</template>
<style scoped>
@keyframes slide-up { from { opacity: 0; transform: translateY(1rem); } to { opacity: 1; transform: translateY(0); } }
.animate-slide-up { animation: slide-up 0.25s ease-out; }
</style>
