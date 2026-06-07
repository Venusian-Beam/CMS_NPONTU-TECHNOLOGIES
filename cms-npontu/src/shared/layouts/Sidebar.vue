<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useBrandingStore } from '@shared/stores/brandingStore'
import { useAuthStore } from '@shared/stores/authStore'

const route = useRoute()
const brandingStore = useBrandingStore()
const authStore = useAuthStore()

const navigationItems = computed(() => {
  const portal = route.path.split('/')[1]
  return getNavigationForPortal(portal)
})

const isActive = (path) => {
  return route.path === path || route.path.startsWith(path + '/')
}
</script>

<template>
  <aside class="w-64 bg-surface border-r border-border flex flex-col h-full">
    <div class="flex items-center gap-3 px-4 py-5 border-b border-border">
      <img
        v-if="brandingStore.tenant?.logo_url"
        :src="brandingStore.tenant.logo_url"
        :alt="brandingStore.tenant?.name"
        class="w-10 h-10 rounded-lg object-cover"
      />
      <div
        v-else
        class="w-10 h-10 rounded-lg bg-primary flex items-center justify-center flex-shrink-0"
      >
        <span class="text-primary-contrast font-bold text-sm">
          {{ brandingStore.tenant?.name?.charAt(0) || 'E' }}
        </span>
      </div>
      <div class="flex-1 min-w-0">
        <p class="font-semibold text-text text-sm truncate">
          {{ brandingStore.tenant?.name || 'ELEVA' }}
        </p>
        <p class="text-muted text-xs truncate">
          {{ getPortalLabel(brandingStore.tenant ? 'institution' : authStore.userRole) }}
        </p>
      </div>
    </div>

    <nav class="flex-1 py-4 overflow-y-auto">
      <ul class="space-y-1 px-2">
        <li v-for="item in navigationItems" :key="item.path">
          <router-link
            v-if="item.visible"
            :to="item.path"
            class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
            :class="
              isActive(item.path)
                ? 'bg-primary/10 text-primary'
                : 'text-muted hover:text-text hover:bg-surface'
            "
          >
            <span class="text-base">{{ item.icon }}</span>
            {{ item.label }}
          </router-link>
        </li>
      </ul>
    </nav>

    <div class="border-t border-border p-4">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <span class="text-primary-contrast font-medium text-xs">
            {{ authStore.user?.name?.charAt(0) || 'U' }}
          </span>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-text truncate">{{ authStore.user?.name || 'User' }}</p>
          <p class="text-xs text-muted truncate">{{ formatRole(authStore.userRole) }}</p>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
function getNavigationForPortal(portal) {
  const nav = {
    super_admin: [
      { path: '/super-admin', label: 'Dashboard', icon: '📊' },
      { path: '/super-admin/institutions', label: 'Institutions', icon: '🏫' },
      { path: '/super-admin/subscriptions', label: 'Subscriptions', icon: '💳' },
      { path: '/super-admin/users', label: 'Users', icon: '👥' },
      { path: '/super-admin/analytics', label: 'Analytics', icon: '📈' },
      { path: '/super-admin/audit-log', label: 'Audit Log', icon: '📋' },
      { path: '/super-admin/settings', label: 'Settings', icon: '⚙️' },
    ],
    institution: [
      { path: '/institution', label: 'Dashboard', icon: '📊' },
      { path: '/institution/admissions', label: 'Admissions', icon: '🎓' },
      { path: '/institution/students', label: 'Students', icon: '👨‍🎓' },
      { path: '/institution/staff', label: 'Staff', icon: '👩‍🏫' },
      { path: '/institution/academics', label: 'Academics', icon: '📚' },
      { path: '/institution/finance', label: 'Finance', icon: '💰' },
      { path: '/institution/communication', label: 'Communication', icon: '📢' },
      { path: '/institution/reports', label: 'Reports', icon: '📄' },
      { path: '/institution/settings', label: 'Settings', icon: '⚙️' },
    ],
    staff: [
      { path: '/staff', label: 'Dashboard', icon: '📊' },
      { path: '/staff/courses', label: 'My Courses', icon: '📚' },
      { path: '/staff/attendance', label: 'Attendance', icon: '📋' },
      { path: '/staff/assessments', label: 'Assessments', icon: '📝' },
      { path: '/staff/results', label: 'Results', icon: '📊' },
      { path: '/staff/students', label: 'Students', icon: '👨‍🎓' },
      { path: '/staff/messages', label: 'Messages', icon: '✉️' },
    ],
    student: [
      { path: '/student', label: 'Dashboard', icon: '📊' },
      { path: '/student/registration', label: 'Registration', icon: '📝' },
      { path: '/student/courses', label: 'My Courses', icon: '📚' },
      { path: '/student/timetable', label: 'Timetable', icon: '🗓️' },
      { path: '/student/attendance', label: 'Attendance', icon: '📋' },
      { path: '/student/results', label: 'Results', icon: '📊' },
      { path: '/student/payments', label: 'Payments', icon: '💳' },
      { path: '/student/accommodation', label: 'Accommodation', icon: '🏠' },
      { path: '/student/transcript', label: 'Transcript', icon: '📄' },
      { path: '/student/announcements', label: 'Announcements', icon: '📢' },
      { path: '/student/profile', label: 'Profile', icon: '👤' },
    ],
  }
  return nav[portal] || []
}

function getPortalLabel(portal) {
  const labels = {
    super_admin: 'Super Admin',
    institution: 'Institution Portal',
    staff: 'Staff Portal',
    student: 'Student Portal',
  }
  return labels[portal] || 'Portal'
}

function formatRole(role) {
  const roles = {
    super_admin: 'Super Admin',
    institution_admin: 'Institution Admin',
    registrar: 'Registrar',
    bursar: 'Bursar',
    finance_officer: 'Finance Officer',
    hod: 'Head of Department',
    examination_officer: 'Examination Officer',
    hr_manager: 'HR Manager',
    hostel_manager: 'Hostel Manager',
    lecturer: 'Lecturer',
    tutor: 'Tutor',
    student: 'Student',
  }
  return roles[role] || role || 'User'
}
</script>