<script setup>
defineProps({
  variant: { type: String, default: 'default', validator: (v) => ['default', 'success', 'warning', 'danger', 'info', 'primary', 'secondary'].includes(v) },
  size: { type: String, default: 'sm', validator: (v) => ['sm', 'md'].includes(v) },
})
const vc = {
  default: 'bg-soft text-text-secondary border border-border/50',
  success: 'bg-success-bg text-success border border-success/20',
  warning: 'bg-warning-bg text-warning border border-warning/20',
  danger: 'bg-danger-bg text-danger border border-danger/20',
  info: 'bg-info-bg text-info border border-info/20',
  primary: 'bg-primary-light text-primary border border-primary/20',
  secondary: 'bg-pink-50 text-secondary border border-secondary/20',
}
const sc = { sm: 'px-2.5 py-0.5 text-xs font-medium', md: 'px-3 py-1 text-sm font-medium' }
</script>

<template>
  <span :class="['inline-flex items-center rounded-full', vc[variant], sc[size]]"><slot /></span>
</template>
