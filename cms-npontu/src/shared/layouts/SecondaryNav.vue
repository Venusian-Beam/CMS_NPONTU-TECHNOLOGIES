<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const navItems = [
  {
    name: 'Dashboard', path: '/student',
    icon: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  },
  {
    name: 'Registration', path: '/student/registration', chevron: true,
    icon: '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4z"/>',
  },
  {
    name: 'My Courses', path: '/student/courses', chevron: true,
    icon: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
  },
  {
    name: 'Timetable', path: '/student/timetable', chevron: true,
    icon: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
  },
  {
    name: 'Attendance', path: '/student/attendance', chevron: true,
    icon: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><polyline points="9 16 11 18 15 14"/>',
  },
  {
    name: 'Results', path: '/student/results', chevron: true,
    icon: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
  },
  {
    name: 'Payments', path: '/student/payments', chevron: true,
    icon: '<rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>',
  },
  {
    name: 'Accommodation', path: '/student/accommodation', chevron: true,
    icon: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  },
  {
    name: 'Transcript', path: '/student/transcript', chevron: true,
    icon: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',
  },
  {
    name: 'Announcements', path: '/student/announcements',
    icon: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
  },
  {
    name: 'Profile', path: '/student/profile',
    icon: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  },
]

const isActive = (path) => {
  if (path === '/student') return route.path === '/student' || route.path === '/student/'
  return route.path.startsWith(path)
}
</script>

<template>
  <nav class="bg-white border-b sticky z-10"
       style="top:68px; border-color:#f1f5f9; box-shadow:0 1px 3px rgba(0,0,0,.03);">
    <div class="flex items-center h-12 px-4 overflow-x-auto overflow-y-hidden"
         style="-webkit-overflow-scrolling:touch; scrollbar-width:none;">

      <!-- Scroll left arrow -->
      <button class="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center border mr-3 transition-colors hover:bg-slate-50"
              style="border-color:#e2e8f0; color:#94a3b8;">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none"
             stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </button>

      <!-- Nav items -->
      <div class="flex items-center h-full gap-1">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="relative flex items-center gap-1.5 h-full px-3 text-[13px] font-medium whitespace-nowrap transition-colors group"
          :class="isActive(item.path)
            ? 'text-indigo-600'
            : 'text-slate-500 hover:text-slate-800'"
        >
          <!-- Icon -->
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none"
               stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
               v-html="item.icon" class="shrink-0"/>

          <span>{{ item.name }}</span>

          <!-- Chevron for dropdown hint -->
          <svg v-if="item.chevron" xmlns="http://www.w3.org/2000/svg" width="11" height="11" fill="none"
               stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
               class="opacity-40 shrink-0">
            <polyline points="6 9 12 15 18 9"/>
          </svg>

          <!-- Active underline -->
          <span v-if="isActive(item.path)"
                class="absolute bottom-0 left-2 right-2 h-[2px] rounded-t-full"
                style="background:#6366f1;"></span>
        </router-link>
      </div>

      <!-- Scroll right arrow -->
      <button class="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center border ml-3 transition-colors hover:bg-slate-50"
              style="border-color:#e2e8f0; color:#94a3b8;">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none"
             stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </button>

    </div>
  </nav>
</template>

<style scoped>
nav div::-webkit-scrollbar { display: none; }
</style>
