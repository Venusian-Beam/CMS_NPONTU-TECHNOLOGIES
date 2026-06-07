<script setup>
defineProps({
  label: { type: String, required: true },
  value: { type: String, required: true },
  trend: { type: String, default: '' },
  tone: { type: String, default: 'primary' },
  icon: { type: String, default: '01' },
})
</script>

<template>
  <article class="rounded-xl border border-border/70 bg-white p-4 shadow-card">
    <div class="flex items-start justify-between gap-4">
      <div
        class="flex h-10 w-10 items-center justify-center rounded-xl text-xs font-bold"
        :class="{
          'bg-primary-light text-primary': tone === 'primary',
          'bg-info-bg text-info': tone === 'info',
          'bg-success-bg text-success': tone === 'success',
          'bg-danger-bg text-danger': tone === 'danger',
          'bg-warning-bg text-warning': tone === 'warning',
          'bg-pink-50 text-secondary': tone === 'secondary',
        }"
      >
        {{ icon }}
      </div>
      <span
        v-if="trend"
        class="rounded-full px-2 py-1 text-[11px] font-semibold"
        :class="trend.startsWith('-') ? 'bg-danger-bg text-danger' : 'bg-success-bg text-success'"
      >
        {{ trend }}
      </span>
    </div>
    <p class="mt-4 text-sm font-medium text-text-secondary">{{ label }}</p>
    <p class="mt-1 text-2xl font-bold tracking-tight text-text">{{ value }}</p>
    <div class="mt-4 flex h-8 items-end gap-1">
      <span
        v-for="height in [25, 35, 18, 48, 68, 40, 78, 55, 30, 64]"
        :key="`${label}-${height}`"
        class="w-1.5 rounded-t-full"
        :class="tone === 'danger' ? 'bg-danger/50' : tone === 'secondary' ? 'bg-secondary/50' : 'bg-primary/50'"
        :style="{ height: `${height}%` }"
      />
    </div>
  </article>
</template>
