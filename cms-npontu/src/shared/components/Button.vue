<script setup>
defineProps({
  variant: { type: String, default: 'primary', validator: (v) => ['primary', 'secondary', 'outline', 'ghost', 'danger'].includes(v) },
  size: { type: String, default: 'md', validator: (v) => ['sm', 'md', 'lg'].includes(v) },
  loading: Boolean, disabled: Boolean, block: Boolean, type: { type: String, default: 'button' },
})
const emit = defineEmits(['click'])
</script>

<template>
  <button
    :type="type" :disabled="disabled || loading"
    :class="[
      'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.97]',
      { 'w-full': block,
        'px-3 py-1.5 text-sm gap-1.5': size === 'sm',
        'px-5 py-2.5 text-sm gap-2': size === 'md',
        'px-7 py-3 text-base gap-2.5': size === 'lg',
        'bg-primary text-white hover:bg-primary-hover shadow-sm hover:shadow focus-visible:outline-primary': variant === 'primary',
        'bg-secondary text-white hover:opacity-90 shadow-sm focus-visible:outline-secondary': variant === 'secondary',
        'border-2 border-border text-text-secondary hover:bg-soft hover:text-text hover:border-muted/30 focus-visible:outline-primary': variant === 'outline',
        'text-text-secondary hover:text-primary hover:bg-primary-light focus-visible:outline-primary': variant === 'ghost',
        'bg-danger text-white hover:bg-red-600 shadow-sm focus-visible:outline-danger': variant === 'danger',
      }
    ]"
    @click="emit('click', $event)"
  >
    <svg v-if="loading" class="animate-spin -ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
    <slot />
  </button>
</template>
