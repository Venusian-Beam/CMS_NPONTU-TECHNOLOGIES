<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'purple',
    validator: (value) => ['purple', 'blue', 'orange', 'green', 'dark', 'coral'].includes(value)
  },
  title: {
    type: String,
    required: false
  },
  value: {
    type: [String, Number],
    required: false
  },
  trend: {
    type: String,
    required: false
  },
  trendLabel: {
    type: String,
    required: false
  },
  icon: {
    type: Object, // Can pass an icon component
    required: false
  }
})

const gradientClasses = computed(() => {
  const map = {
    purple: 'bg-gradient-to-br from-purple-500 via-fuchsia-500 to-pink-500 text-white',
    blue: 'bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 text-white',
    orange: 'bg-gradient-to-br from-orange-400 via-amber-500 to-yellow-500 text-white',
    green: 'bg-gradient-to-br from-teal-400 via-emerald-500 to-green-500 text-white',
    dark: 'bg-gradient-to-br from-gray-800 via-slate-800 to-gray-900 text-white',
    coral: 'bg-gradient-to-br from-rose-400 via-red-500 to-coral-500 text-white',
  }
  return map[props.variant] || map.purple
})
</script>

<template>
  <div class="relative overflow-hidden rounded-2xl p-6 shadow-panel transition-transform hover:-translate-y-1" :class="gradientClasses">
    <!-- Decorative background elements (inspired by image 3) -->
    <div class="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white opacity-10 blur-2xl"></div>
    <div class="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white opacity-10 blur-2xl"></div>
    
    <div class="relative z-10 flex flex-col h-full justify-between">
      <div class="flex items-start justify-between mb-4">
        <div>
          <h3 v-if="title" class="text-sm font-medium opacity-90 mb-1">{{ title }}</h3>
          <div v-if="value" class="text-3xl font-bold tracking-tight">{{ value }}</div>
        </div>
        
        <div v-if="$slots.icon || icon" class="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm shadow-inner">
          <slot name="icon">
            <component :is="icon" class="h-5 w-5" />
          </slot>
        </div>
      </div>
      
      <div v-if="trend || trendLabel" class="flex items-center gap-2 text-sm mt-2">
        <div v-if="trend" class="flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 backdrop-blur-sm font-semibold">
          <svg v-if="trend.startsWith('+')" xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd" />
          </svg>
          <svg v-else-if="trend.startsWith('-')" xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
             <path fill-rule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clip-rule="evenodd" />
          </svg>
          <span>{{ trend }}</span>
        </div>
        <span v-if="trendLabel" class="opacity-80">{{ trendLabel }}</span>
      </div>
      
      <slot />
    </div>
  </div>
</template>
