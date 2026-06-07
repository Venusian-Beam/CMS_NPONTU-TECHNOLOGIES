<script setup>
defineProps({
  modelValue: { type: [String, Number], default: '' }, label: { type: String, default: '' },
  placeholder: { type: String, default: 'Select...' }, options: { type: Array, default: () => [] },
  error: { type: String, default: '' }, disabled: Boolean, required: Boolean,
})
const emit = defineEmits(['update:modelValue'])
function onChange(e) { emit('update:modelValue', e.target.value) }
</script>

<template>
  <div class="space-y-1.5">
    <label v-if="label" :for="label" class="block text-sm font-medium text-text">{{ label }}<span v-if="required" class="text-danger ml-0.5">*</span></label>
    <div class="relative">
      <select
        :id="label" :value="modelValue" :disabled="disabled" :required="required" :aria-invalid="!!error"
        class="block w-full rounded-xl border bg-white px-4 py-2.5 pr-10 text-sm text-text transition-all duration-150 focus:border-primary focus:ring-[3px] focus:ring-primary/10 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed appearance-none"
        :class="error ? 'border-danger focus:border-danger focus:ring-danger/10' : 'border-border hover:border-muted/30'"
        @change="onChange"
      >
        <option value="" disabled>{{ placeholder }}</option>
        <option v-for="opt in options" :key="opt.value" :value="opt.value" :disabled="opt.disabled">{{ opt.label }}</option>
      </select>
      <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
    </div>
    <p v-if="error" class="text-xs text-danger font-medium" role="alert">{{ error }}</p>
  </div>
</template>
