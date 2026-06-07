<script setup>
defineProps({
  modelValue: { type: Boolean, default: false }, label: { type: String, default: '' },
  error: { type: String, default: '' }, disabled: Boolean,
})
const emit = defineEmits(['update:modelValue'])
function onChange(e) { emit('update:modelValue', e.target.checked) }
</script>

<template>
  <div class="flex items-start gap-2.5">
    <input type="checkbox" :checked="modelValue" :disabled="disabled" :aria-invalid="!!error"
      class="mt-0.5 h-4 w-4 rounded border-border text-primary focus:ring-[3px] focus:ring-primary/15 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      :class="error ? 'border-danger' : ''" @change="onChange" />
    <label v-if="label" class="text-sm text-text-secondary cursor-pointer select-none" @click="!disabled && emit('update:modelValue', !modelValue)">{{ label }}</label>
    <p v-if="error" class="text-xs text-danger font-medium" role="alert">{{ error }}</p>
  </div>
</template>
