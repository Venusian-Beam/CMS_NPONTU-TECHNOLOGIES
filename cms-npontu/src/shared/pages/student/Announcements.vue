<script setup>
import { ref } from 'vue'

const activeFilter = ref('all')

const announcements = [
  { id: 1, title: 'End of Semester Examinations Timetable Released', date: 'Oct 14, 2025', sender: 'Academic Affairs', type: 'urgent', content: 'The provisional timetable for the End of Semester Examinations has been published. All students are advised to review the timetable and report any clashes to their respective departments by Oct 20.', read: false },
  { id: 2, title: 'Deadline for Course Registration', date: 'Oct 10, 2025', sender: 'Registry', type: 'important', content: 'Please note that the portal for course registration will close on Friday, October 24th at 11:59 PM. Late registration will attract a penalty fee.', read: true },
  { id: 3, title: 'Departmental Seminar: AI in Healthcare', date: 'Oct 08, 2025', sender: 'Computer Science Dept', type: 'general', content: 'Join us for this weeks departmental seminar on the applications of Artificial Intelligence in Healthcare. Venue: N-Block Room 3. Time: 2:00 PM.', read: true },
  { id: 4, title: 'Hostel Maintenance Notice', date: 'Oct 05, 2025', sender: 'Estates', type: 'general', content: 'There will be a scheduled power outage in Valco Trust Hostel on Saturday from 9:00 AM to 2:00 PM for routine maintenance work.', read: true },
]

const getBadgeStyle = (type) => {
  if (type === 'urgent') return 'bg-danger-bg text-danger border-danger/20'
  if (type === 'important') return 'bg-warning-bg text-warning border-warning/20'
  return 'bg-info-bg text-info border-info/20'
}
</script>

<template>
  <div class="space-y-6 max-w-7xl mx-auto pb-10">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-text mb-1">Announcements</h1>
        <p class="text-muted font-medium">Official communications and notices.</p>
      </div>
    </div>

    <!-- Filters -->
    <div class="flex gap-2 border-b border-border">
      <button v-for="f in ['All', 'Urgent', 'Important', 'General']" :key="f"
        @click="activeFilter = f.toLowerCase()"
        class="px-4 py-2.5 text-sm font-bold relative transition-colors"
        :class="activeFilter === f.toLowerCase() ? 'text-primary' : 'text-muted hover:text-text'"
      >
        {{ f }}
        <div v-if="activeFilter === f.toLowerCase()" class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full"></div>
      </button>
    </div>

    <!-- Notice Board -->
    <div class="space-y-4">
      <div v-for="ann in announcements" :key="ann.id" 
           class="card-soft p-5 transition-all duration-200"
           :class="!ann.read ? 'border-l-4 border-l-primary bg-white' : 'bg-surface opacity-80'">
        
        <div class="flex items-start justify-between gap-4 mb-3">
          <div class="flex items-center gap-3">
            <div v-if="!ann.read" class="w-2 h-2 rounded-full bg-primary shrink-0"></div>
            <h2 class="text-lg font-bold text-text">{{ ann.title }}</h2>
          </div>
          <span class="shrink-0 inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border" :class="getBadgeStyle(ann.type)">
            {{ ann.type }}
          </span>
        </div>
        
        <div class="pl-0 sm:pl-5 text-sm text-text leading-relaxed mb-4">
          {{ ann.content }}
        </div>
        
        <div class="pl-0 sm:pl-5 flex items-center gap-4 text-xs font-semibold text-muted">
          <span class="flex items-center gap-1.5"><span class="text-lg leading-none">👤</span> {{ ann.sender }}</span>
          <span class="flex items-center gap-1.5"><span class="text-lg leading-none">📅</span> {{ ann.date }}</span>
        </div>
        
      </div>
    </div>

  </div>
</template>