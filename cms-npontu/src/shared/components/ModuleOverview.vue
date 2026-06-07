<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Badge from './Badge.vue'

const route = useRoute()

const fallback = {
  title: 'Module Workspace',
  subtitle: 'A structured workspace for managing records, tasks, and reports.',
  action: 'New Record',
  status: 'Ready',
  stats: ['24 Active', '08 Pending', '92% Complete'],
  columns: ['Name', 'Owner', 'Status', 'Updated'],
  rows: [
    ['Academic Setup', 'Operations', 'Active', 'Today'],
    ['Student Records', 'Registrar', 'Review', 'Yesterday'],
    ['Finance Queue', 'Bursar', 'Pending', '2 days ago'],
  ],
}

const pages = {
  '/super-admin/institutions': {
    title: 'Institutions',
    subtitle: 'Manage tenant onboarding, lifecycle states, branding, and admin accounts.',
    action: 'Create Institution',
    status: 'Tenant Registry',
    stats: ['128 Institutions', '114 Active', '09 Attention'],
    columns: ['Institution', 'Plan', 'Status', 'Last Active'],
    rows: [['University of Ghana', 'Enterprise', 'Active', 'Today'], ['KNUST', 'Enterprise', 'Provisioned', '2 hours ago'], ['Central College', 'Starter', 'Suspended', 'Yesterday']],
  },
  '/super-admin/subscriptions': { title: 'Subscriptions & Billing', subtitle: 'Track plans, invoices, payments, trials, and overdue accounts.', action: 'Record Payment', status: 'Billing', stats: ['$82.4K MRR', '14 Trials', '09 Overdue'] },
  '/super-admin/users': { title: 'Global Users', subtitle: 'Review platform users, super admins, institution admins, and login activity.', action: 'Invite User', status: 'Directory', stats: ['18.2K Users', '42 Locked', '99.9% Verified'] },
  '/super-admin/analytics': { title: 'Analytics & Reports', subtitle: 'Analyze tenant growth, revenue, adoption, and usage patterns.', action: 'Export Report', status: 'Insights', stats: ['12% Growth', '4.8M Events', '500 Tenants Cap'] },
  '/super-admin/audit-log': { title: 'Audit Log', subtitle: 'Search immutable operator actions, lifecycle changes, and security events.', action: 'Export Logs', status: 'Immutable', stats: ['3,842 Events', '18 Critical', '0 Unresolved'] },
  '/institution/admissions': { title: 'Admissions', subtitle: 'Review applications, decisions, letters, and enrollment handoff.', action: 'Review Applications', status: 'Admission Cycle', stats: ['842 Applicants', '126 Pending', '314 Admitted'] },
  '/institution/students': { title: 'Students', subtitle: 'Manage student profiles, enrollment status, academic records, and documents.', action: 'Register Student', status: 'Student Records', stats: ['12,486 Students', '386 Pending', '94% Active'] },
  '/institution/staff': { title: 'Staff', subtitle: 'Manage staff profiles, lecturer assignments, departments, and workload.', action: 'Add Staff', status: 'Staff Directory', stats: ['842 Staff', '316 Lecturers', '28 Departments'] },
  '/institution/academics': { title: 'Academics', subtitle: 'Configure faculties, departments, programmes, sessions, semesters, and courses.', action: 'Create Course', status: 'Academic Setup', stats: ['12 Faculties', '48 Programmes', '316 Courses'] },
  '/institution/finance': { title: 'Finance', subtitle: 'Manage fee structures, invoices, student payments, and financial reports.', action: 'Record Payment', status: 'Finance Desk', stats: ['$1.2M Billed', '$48.9K Outstanding', '81% Paid'] },
  '/institution/communication': { title: 'Communication', subtitle: 'Publish announcements, notifications, email broadcasts, and SMS drafts.', action: 'New Announcement', status: 'Broadcasts', stats: ['24 Notices', '8 Scheduled', '92% Read'] },
  '/institution/reports': { title: 'Reports', subtitle: 'Generate enrollment, finance, academic, and attendance reports.', action: 'Generate Report', status: 'Reports', stats: ['18 Templates', '42 Exports', '9 Scheduled'] },
  '/institution/settings': { title: 'Settings', subtitle: 'Configure tenant profile, branding preview, academic defaults, and module settings.', action: 'Update Settings', status: 'Configuration', stats: ['Brand Active', '9 Modules', 'AA Contrast'] },
  '/staff/courses': { title: 'My Courses', subtitle: 'View assigned courses, materials, enrolled students, and course statistics.', action: 'Upload Material', status: 'Course Load', stats: ['06 Courses', '284 Students', '18 Materials'] },
  '/staff/attendance': { title: 'Attendance', subtitle: 'Mark attendance, edit permitted sessions, and review course attendance reports.', action: 'Mark Attendance', status: 'Attendance', stats: ['02 Due', '91% Average', '4 Reports'] },
  '/staff/assessments': { title: 'Assessments', subtitle: 'Create assignments, quizzes, upload files, and monitor submissions.', action: 'Create Assessment', status: 'Assessment Desk', stats: ['14 Active', '82 Submitted', '18 Pending'] },
  '/staff/results': { title: 'Results', subtitle: 'Enter grades, review drafts, submit results, and track approval status.', action: 'Enter Results', status: 'Results Workflow', stats: ['74% Drafted', '3 Submitted', '1 Approved'] },
  '/staff/students': { title: 'Students', subtitle: 'Review assigned students, attendance summaries, and academic performance.', action: 'View Cohort', status: 'Assigned Students', stats: ['284 Students', '12 At Risk', '91% Attendance'] },
  '/staff/messages': { title: 'Messages', subtitle: 'Send course announcements and communicate with assigned students.', action: 'New Message', status: 'Communication', stats: ['18 Unread', '5 Announcements', '3 Drafts'] },
  '/student/registration': { title: 'Course Registration', subtitle: 'Browse eligible courses, register, drop, and review your semester summary.', action: 'Browse Courses', status: 'Registration Open', stats: ['05 Registered', '02 Eligible', '18 Credits'] },
  '/student/courses': { title: 'My Courses', subtitle: 'View registered courses, lecturers, credits, materials, and course status.', action: 'Open Materials', status: 'Current Semester', stats: ['05 Courses', '18 Credits', '3 Materials'] },
  '/student/timetable': { title: 'Timetable', subtitle: 'See your weekly course schedule, venues, lecturers, and updates.', action: 'Download Schedule', status: 'Weekly Plan', stats: ['12 Sessions', '5 Courses', '0 Conflicts'] },
  '/student/attendance': { title: 'Attendance', subtitle: 'Track course attendance percentages and per-session status.', action: 'View Details', status: 'Read Only', stats: ['88% Average', '2 Missed', '1 Excused'] },
  '/student/results': { title: 'Results', subtitle: 'Review published semester results, GPA, grade scale, and academic history.', action: 'View Transcript', status: 'Published', stats: ['3.62 GPA', '18 Credits', '0 Carryovers'] },
  '/student/payments': { title: 'Payments', subtitle: 'Review fee balance, payment history, receipts, and pending invoices.', action: 'Pay Now', status: 'Finance', stats: ['$420 Due', '3 Receipts', '80% Paid'] },
  '/student/accommodation': { title: 'Accommodation', subtitle: 'View hostel allocation, room details, roommates, and payment status.', action: 'View Room', status: 'Allocated', stats: ['Block C', 'Room 204', 'Paid'] },
  '/student/transcript': { title: 'Transcript', subtitle: 'View your academic record and download published transcript documents.', action: 'Download PDF', status: 'Read Only', stats: ['3.58 CGPA', '96 Credits', '6 Semesters'] },
  '/student/announcements': { title: 'Announcements', subtitle: 'Read institution, programme, and course notices relevant to you.', action: 'Mark All Read', status: 'Notices', stats: ['08 New', '3 Course', '2 Global'] },
  '/student/profile': { title: 'Profile', subtitle: 'Manage personal information, contact details, password, and account status.', action: 'Edit Profile', status: 'Account', stats: ['Active', 'Verified', '2 Contacts'] },
}

const page = computed(() => ({ ...fallback, ...(pages[route.path] || {}) }))
const columns = computed(() => page.value.columns || fallback.columns)
const rows = computed(() => page.value.rows || fallback.rows)
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p class="text-sm font-medium text-primary">Workspace</p>
        <h2 class="mt-1 text-2xl font-bold tracking-tight text-text lg:text-3xl">{{ page.title }}</h2>
        <p class="mt-1 max-w-3xl text-sm leading-6 text-text-secondary">{{ page.subtitle }}</p>
      </div>
      <button class="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-hover">
        {{ page.action }}
      </button>
    </div>

    <section class="grid gap-4 md:grid-cols-3">
      <article v-for="stat in page.stats" :key="stat" class="rounded-xl border border-border/70 bg-white p-5 shadow-card">
        <p class="text-xs font-semibold uppercase tracking-[0.18em] text-muted">{{ page.status }}</p>
        <p class="mt-3 text-xl font-bold text-text">{{ stat }}</p>
      </article>
    </section>

    <section class="grid gap-5 xl:grid-cols-[1fr_0.42fr]">
      <article class="rounded-xl border border-border/70 bg-white shadow-card">
        <div class="flex flex-col gap-3 border-b border-border/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <h3 class="font-semibold text-text">{{ page.title }} Overview</h3>
          <div class="flex gap-2">
            <input class="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10 sm:w-56" placeholder="Search records..." />
            <button class="rounded-lg border border-border px-3 py-2 text-sm font-semibold text-text-secondary">Filter</button>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full text-left text-sm">
            <thead class="bg-soft text-xs uppercase tracking-wide text-muted">
              <tr>
                <th v-for="column in columns" :key="column" class="px-5 py-3 font-semibold">{{ column }}</th>
                <th class="px-5 py-3 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border/70">
              <tr v-for="row in rows" :key="row[0]" class="hover:bg-primary-subtle/60">
                <td v-for="(cell, index) in row" :key="`${row[0]}-${cell}`" class="px-5 py-4" :class="index === 0 ? 'font-semibold text-text' : 'text-text-secondary'">
                  <Badge v-if="index === 2" :variant="String(cell).toLowerCase().includes('active') || String(cell).toLowerCase().includes('ready') || String(cell).toLowerCase().includes('published') ? 'success' : String(cell).toLowerCase().includes('pending') || String(cell).toLowerCase().includes('review') ? 'warning' : 'primary'">
                    {{ cell }}
                  </Badge>
                  <span v-else>{{ cell }}</span>
                </td>
                <td class="px-5 py-4 text-right">
                  <button class="font-semibold text-primary">Open</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </article>

      <aside class="space-y-5">
        <article class="rounded-xl border border-border/70 bg-white p-5 shadow-card">
          <h3 class="font-semibold text-text">Workflow Health</h3>
          <div class="mt-5 space-y-4">
            <div v-for="item in ['Data completeness', 'Pending review', 'User activity']" :key="item">
              <div class="mb-2 flex items-center justify-between text-sm">
                <span class="text-text-secondary">{{ item }}</span>
                <span class="font-semibold text-text">{{ item === 'Pending review' ? '42%' : '86%' }}</span>
              </div>
              <div class="h-2 rounded-full bg-soft">
                <div class="h-2 rounded-full bg-primary" :style="{ width: item === 'Pending review' ? '42%' : '86%' }" />
              </div>
            </div>
          </div>
        </article>
        <article class="rounded-xl border border-border/70 bg-primary p-5 text-white shadow-card">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Design Note</p>
          <p class="mt-3 text-sm leading-6 text-white/80">This screen is frontend-ready with mock data, clear states, and backend handoff-friendly structure.</p>
        </article>
      </aside>
    </section>
  </div>
</template>
