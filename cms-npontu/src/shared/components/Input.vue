<script setup>
import { ref, watch } from 'vue'
const props = defineProps({
  modelValue: { type: [String, Number], default: '' },
  label: { type: String, default: '' }, type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' }, error: { type: String, default: '' },
  hint: { type: String, default: '' }, disabled: Boolean, readonly: Boolean, required: Boolean,
  showPasswordToggle: Boolean,
})
const emit = defineEmits(['update:modelValue'])
const showPassword = ref(false)
const inputType = ref(props.type)
watch(() => props.type, (t) => { inputType.value = t })
function togglePassword() { showPassword.value = !showPassword.value; inputType.value = showPassword.value ? 'text' : 'password' }
function onInput(e) { emit('update:modelValue', e.target.value) }
</script>

<template>
  <div class="space-y-1.5">
    <label v-if="label" :for="label" class="block text-sm font-medium text-text">{{ label }}<span v-if="required" class="text-danger ml-0.5">*</span></label>
    <div class="relative">
      <input
        :id="label" :type="inputType" :value="modelValue" :placeholder="placeholder"
        :disabled="disabled" :readonly="readonly" :required="required" :aria-invalid="!!error"
        :aria-describedby="error ? `${label}-error` : hint ? `${label}-hint` : undefined"
        class="block w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-text placeholder-muted/40 transition-all duration-150 focus:border-primary focus:ring-[3px] focus:ring-primary/10 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed read-only:bg-soft read-only:cursor-default"
        :class="error ? 'border-danger focus:border-danger focus:ring-danger/10' : 'border-border hover:border-muted/30'"
        @input="onInput"
      />
      <button
        v-if="type === 'password' && showPasswordToggle" type="button"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-text p-1 rounded-lg hover:bg-soft transition-colors"
        tabindex="-1" @click="togglePassword"
        :aria-label="showPassword ? 'Hide password' : 'Show password'"
      >
        <svg v-if="!showPassword" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
        <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7A9.97 9.97 0 014.02 8.971m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" /></svg>
      </button>
    </div>
    <p v-if="error" :id="`${label}-error`" class="text-xs text-danger font-medium" role="alert">{{ error }}</p>
    <p v-else-if="hint" :id="`${label}-hint`" class="text-xs text-muted">{{ hint }}</p>
  </div>
</template>
