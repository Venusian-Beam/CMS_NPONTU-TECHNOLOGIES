<script setup>
const setupModules = [
  { id: 'faculties', icon: '🏛️', name: 'Faculties', desc: 'Manage institutional faculties', count: 8 },
  { id: 'departments', icon: '🏢', name: 'Departments', desc: 'Configure academic departments', count: 24 },
  { id: 'programmes', icon: '📜', name: 'Programmes', desc: 'Degree and diploma programmes', count: 45 },
  { id: 'courses', icon: '📚', name: 'Courses', desc: 'Course catalog and syllabus', count: 320 },
  { id: 'sessions', icon: '🗓️', name: 'Academic Sessions', desc: 'Manage years and semesters', count: 2 },
  { id: 'grading', icon: '📝', name: 'Grading System', desc: 'Configure grade scales', count: 1 },
]

const recentActivity = [
  { text: 'New course added: Artificial Intelligence (COSC405)', time: '2h ago', type: 'add' },
  { text: 'Faculty of Engineering renamed', time: '1d ago', type: 'edit' },
  { text: 'Semester 1 activated for 2025/2026', time: '2d ago', type: 'status' },
]

const getIconColor = (type) => {
  if (type === 'add') return 'bg-success-bg text-success'
  if (type === 'edit') return 'bg-warning-bg text-warning'
  return 'bg-info-bg text-info'
}
</script>

<template>
  <div class="space-y-6 max-w-7xl mx-auto pb-10">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-text mb-1">Academics Setup</h1>
        <p class="text-muted font-medium">Configure institutional structures, courses, and academic calendars.</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Main Grid -->
      <div class="lg:col-span-2">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div v-for="mod in setupModules" :key="mod.id" class="card-soft p-5 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer group flex flex-col">
            <div class="flex items-start justify-between mb-4">
              <div class="w-12 h-12 rounded-xl bg-surface border border-border flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform">
                {{ mod.icon }}
              </div>
              <span class="px-2.5 py-1 rounded-lg bg-page font-bold text-xs text-muted border border-border">{{ mod.count }} Total</span>
            </div>
            <h3 class="font-bold text-lg text-text mb-1 group-hover:text-primary transition-colors">{{ mod.name }}</h3>
            <p class="text-sm font-medium text-muted flex-1">{{ mod.desc }}</p>
            <div class="mt-4 flex items-center text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              Manage Module →
            </div>
          </div>
        </div>
      </div>

      <!-- Right Sidebar -->
      <div class="space-y-6">
        
        <div class="card-soft p-6 bg-gradient-to-br from-page to-surface border-border">
          <h3 class="font-bold text-lg text-text mb-2">Active Session</h3>
          <div class="bg-white rounded-xl p-4 border border-border shadow-sm mb-4">
            <p class="text-xs font-bold text-muted uppercase tracking-wider mb-1">Academic Year</p>
            <p class="font-black text-primary text-xl">2025 / 2026</p>
            <div class="mt-3 pt-3 border-t border-border">
              <p class="text-xs font-bold text-muted uppercase tracking-wider mb-1">Semester</p>
              <div class="flex items-center justify-between">
                <p class="font-bold text-text">Semester 1</p>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-success-bg text-success tracking-wider">Active</span>
              </div>
            </div>
          </div>
          <button class="w-full py-2 border border-border text-sm font-bold text-text bg-white hover:bg-page rounded-xl transition-colors shadow-sm">
            Change Session
          </button>
        </div>

        <div class="card-soft p-6">
          <h3 class="font-bold text-lg text-text mb-4">Recent Activity</h3>
          <div class="space-y-4">
            <div v-for="(act, idx) in recentActivity" :key="idx" class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0" :class="getIconColor(act.type)">
                {{ act.type === 'add' ? '+' : act.type === 'edit' ? '✎' : 'ℹ' }}
              </div>
              <div>
                <p class="text-sm font-medium text-text leading-tight">{{ act.text }}</p>
                <p class="text-xs font-semibold text-muted mt-1">{{ act.time }}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>