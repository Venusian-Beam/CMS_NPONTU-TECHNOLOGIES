<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@shared/stores/authStore'

const route = useRoute()
const authStore = useAuthStore()

const pageTitle = computed(() => {
  const portal = route.path.split('/')[1]
  const titles = {
    super_admin: {
      '/super-admin': 'Dashboard',
      '/super-admin/institutions': 'Institutions',
      '/super-admin/subscriptions': 'Subscriptions & Billing',
      '/super-admin/users': 'Users',
      '/super-admin/analytics': 'Analytics & Reports',
      '/super-admin/audit-log': 'Audit Log',
      '/super-admin/settings': 'Settings',
    },
    institution: {
      '/institution': 'Dashboard',
      '/institution/admissions': 'Admissions',
      '/institution/students': 'Students',
      '/institution/staff': 'Staff',
      '/institution/academics': 'Academics',
      '/institution/finance': 'Finance',
      '/institution/communication': 'Communication',
      '/institution/reports': 'Reports',
      '/institution/settings': 'Settings',
    },
    staff: {
      '/staff': 'Dashboard',
      '/staff/courses': 'My Courses',
      '/staff/attendance': 'Attendance',
      '/staff/assessments': 'Assessments',
      '/staff/results': 'Results',
      '/staff/students': 'Students',
      '/staff/messages': 'Messages',
    },
    student: {
      '/student': 'Dashboard',
      '/student/registration': 'Course Registration',
      '/student/courses': 'My Courses',
      '/student/timetable': 'Timetable',
      '/student/attendance': 'Attendance',
      '/student/results': 'Results',
      '/student/payments': 'Payments',
      '/student/accommodation': 'Accommodation',
      '/student/transcript': 'Transcript',
      '/student/announcements': 'Announcements',
      '/student/profile': 'Profile',
    },
  }
  return titles[portal]?.[route.path] || 'ELEVA'
})
</script>

<template>
  <header class="h-14 bg-surface border-b border-border flex items-center px-4 lg:px-6">
    <h1 class="text-lg font-semibold text-text">{{ pageTitle }}</h1>
    <div class="flex-1 flex items-center justify-end gap-3">
      <button class="p-2 rounded-lg text-muted hover:text-text hover:bg-page transition-colors">
        🔔
      </button>
      <button class="p-2 rounded-lg text-muted hover:text-text hover:bg-page transition-colors">
        ⚙️
      </button>
    </div>
  </header>
</template>