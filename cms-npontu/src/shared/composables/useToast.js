import { ref } from 'vue'

const toasts = ref([])
let id = 0

export function useToast() {
  function show(message, type = 'info', duration = 5000) {
    const toastId = ++id
    toasts.value.push({ id: toastId, message, type, duration, visible: true })
    if (duration > 0) {
      setTimeout(() => dismiss(toastId), duration)
    }
    return toastId
  }

  function dismiss(id) {
    const idx = toasts.value.findIndex((t) => t.id === id)
    if (idx !== -1) {
      toasts.value[idx].visible = false
      setTimeout(() => {
        toasts.value = toasts.value.filter((t) => t.id !== id)
      }, 300)
    }
  }

  return { toasts, show, dismiss }
}
