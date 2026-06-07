<script setup>
import StatCard from './StatCard.vue'

const props = defineProps({
  portal: { type: String, required: true },
})

const dashboards = {
  superAdmin: {
    crumb: 'Home',
    title: 'Platform Command Center',
    subtitle: 'Monitor tenant health, onboarding, billing, and platform activity.',
    bannerTitle: 'Provision and govern institutions with confidence',
    bannerText: 'Track tenant lifecycle, subscriptions, audit events, and growth from one operator console.',
    bannerAction: 'Create Institution',
    stats: [
      { label: 'Total Institutions', value: '128', trend: '+8.2%', tone: 'primary', icon: 'TI' },
      { label: 'Active Tenants', value: '114', trend: '+5.1%', tone: 'success', icon: 'AT' },
      { label: 'MRR Snapshot', value: '$82.4K', trend: '+12%', tone: 'secondary', icon: 'MR' },
      { label: 'Overdue Accounts', value: '09', trend: '-3.4%', tone: 'danger', icon: 'OD' },
    ],
    tableTitle: 'Institutions Requiring Attention',
    rows: [
      ['Ashesi University', 'Professional', 'Active', '4,820 students'],
      ['KNUST', 'Enterprise', 'Provisioned', 'Setup review'],
      ['University of Ghana', 'Enterprise', 'Active', '23,410 students'],
      ['Central College', 'Starter', 'Suspended', 'Billing overdue'],
    ],
    chartTitle: 'Platform Growth',
    callouts: ['Revenue increased 12% this quarter', '14 institutions onboarded this month'],
  },
  institution: {
    crumb: 'Institution',
    title: 'Institution Operations',
    subtitle: 'Run academics, admissions, staff, finance, and campus communication.',
    bannerTitle: 'Academic session is open',
    bannerText: 'Complete department setup, course offerings, lecturer assignments, and student enrollment before registration closes.',
    bannerAction: 'Review Setup',
    stats: [
      { label: 'Students', value: '12,486', trend: '+7.2%', tone: 'primary', icon: 'ST' },
      { label: 'Staff', value: '842', trend: '+2.4%', tone: 'info', icon: 'SF' },
      { label: 'Active Courses', value: '316', trend: '+4.8%', tone: 'success', icon: 'AC' },
      { label: 'Outstanding Fees', value: '$48.9K', trend: '-5.2%', tone: 'danger', icon: 'FE' },
    ],
    tableTitle: 'Operational Queue',
    rows: [
      ['Admissions Review', 'Registrar', '42 pending', 'Due today'],
      ['Course Allocation', 'Academics', '18 courses', 'In progress'],
      ['Payment Reconciliation', 'Finance', '31 records', 'Needs review'],
      ['Announcements', 'Communication', '5 scheduled', 'Ready'],
    ],
    chartTitle: 'Enrollment And Revenue',
    callouts: ['Attendance average is 86%', 'Registration window closes in 9 days'],
  },
  staff: {
    crumb: 'Staff',
    title: 'Teaching Workspace',
    subtitle: 'Manage assigned courses, attendance, assessments, results, and messages.',
    bannerTitle: 'Today needs your attention',
    bannerText: 'Two attendance registers and one assessment review are pending for your assigned courses.',
    bannerAction: 'Open Tasks',
    stats: [
      { label: 'Assigned Courses', value: '06', trend: '+1', tone: 'primary', icon: 'CO' },
      { label: 'Students', value: '284', trend: '+12', tone: 'info', icon: 'SS' },
      { label: 'Attendance Due', value: '02', trend: '-1', tone: 'danger', icon: 'AD' },
      { label: 'Results Drafted', value: '74%', trend: '+9%', tone: 'success', icon: 'RD' },
    ],
    tableTitle: 'Course Workload',
    rows: [
      ['CS301 Software Engineering', 'Attendance', 'Due today', '142 students'],
      ['CS205 Data Structures', 'Assessment', 'Review', '86 students'],
      ['CS407 Project Work', 'Results', 'Drafting', '58 students'],
      ['CS101 Computing Basics', 'Materials', 'Published', '210 students'],
    ],
    chartTitle: 'Weekly Teaching Activity',
    callouts: ['Average attendance is 91%', '18 submissions need review'],
  },
  student: {
    crumb: 'Student',
    title: 'Student Self-Service',
    subtitle: 'Track courses, timetable, payments, results, and announcements.',
    bannerTitle: 'Course registration is open',
    bannerText: 'You have registered 5 of 7 eligible courses. Review your timetable before the deadline.',
    bannerAction: 'Register Courses',
    stats: [
      { label: 'Registered Courses', value: '05', trend: '+2', tone: 'primary', icon: 'RC' },
      { label: 'Outstanding Fees', value: '$420', trend: '-15%', tone: 'danger', icon: 'OF' },
      { label: 'Current GPA', value: '3.62', trend: '+0.18', tone: 'success', icon: 'GP' },
      { label: 'Announcements', value: '08', trend: '+3', tone: 'secondary', icon: 'AN' },
    ],
    tableTitle: 'Today At A Glance',
    rows: [
      ['CS301 Lecture', '09:00 AM', 'Engineering Lab 2', 'Dr Mensah'],
      ['Fee Payment', 'Pending', '$420 outstanding', 'Due Friday'],
      ['Assignment', 'CS205', 'Submit by 11:59 PM', 'Open'],
      ['Announcement', 'Registrar', 'Registration reminder', 'Unread'],
    ],
    chartTitle: 'Semester Progress',
    callouts: ['Attendance average is 88%', '2 course slots still available'],
  },
}

const data = dashboards[props.portal] || dashboards.institution
</script>

<template>
  <div class="space-y-6">
    <div>
      <p class="text-sm font-medium text-primary">{{ data.crumb }}</p>
      <h2 class="mt-1 text-2xl font-bold tracking-tight text-text lg:text-3xl">{{ data.title }}</h2>
      <p class="mt-1 text-sm text-text-secondary">{{ data.subtitle }}</p>
    </div>

    <section class="grid gap-5 xl:grid-cols-[1.25fr_1fr]">
      <div class="relative overflow-hidden rounded-xl bg-primary p-6 text-white shadow-card">
        <div class="relative z-10 max-w-xl">
          <p class="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">Priority Workflow</p>
          <h3 class="mt-3 text-2xl font-bold">{{ data.bannerTitle }}</h3>
          <p class="mt-2 max-w-lg text-sm leading-6 text-white/75">{{ data.bannerText }}</p>
          <button class="mt-5 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-primary shadow-sm transition hover:bg-white/90">
            {{ data.bannerAction }}
          </button>
        </div>
        <div class="absolute right-5 top-5 hidden h-28 w-28 rounded-full border border-white/20 bg-white/10 xl:block" />
        <div class="absolute -bottom-10 right-14 hidden h-36 w-36 rounded-full bg-secondary/25 xl:block" />
      </div>
      <div class="grid gap-5 sm:grid-cols-2">
        <StatCard v-for="stat in data.stats.slice(0, 2)" :key="stat.label" v-bind="stat" />
      </div>
    </section>

    <section class="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      <StatCard v-for="stat in data.stats.slice(2)" :key="stat.label" v-bind="stat" />
      <article v-for="callout in data.callouts" :key="callout" class="rounded-xl border border-border/70 bg-white p-5 shadow-card">
        <p class="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Insight</p>
        <p class="mt-3 text-sm font-semibold leading-6 text-text">{{ callout }}</p>
      </article>
    </section>

    <section class="grid gap-5 xl:grid-cols-[0.95fr_1.25fr]">
      <article class="rounded-xl border border-border/70 bg-white shadow-card">
        <div class="flex items-center justify-between border-b border-border/70 px-5 py-4">
          <h3 class="font-semibold text-text">{{ data.tableTitle }}</h3>
          <button class="text-sm font-semibold text-primary">View all</button>
        </div>
        <div class="divide-y divide-border/70">
          <div v-for="row in data.rows" :key="row[0]" class="grid grid-cols-[1.2fr_0.8fr_0.8fr_0.9fr] gap-3 px-5 py-4 text-sm">
            <span class="font-semibold text-text">{{ row[0] }}</span>
            <span class="text-text-secondary">{{ row[1] }}</span>
            <span class="text-text-secondary">{{ row[2] }}</span>
            <span class="text-right text-muted">{{ row[3] }}</span>
          </div>
        </div>
      </article>

      <article class="rounded-xl border border-border/70 bg-white p-5 shadow-card">
        <div class="flex items-center justify-between">
          <h3 class="font-semibold text-text">{{ data.chartTitle }}</h3>
          <button class="rounded-lg border border-border px-3 py-2 text-xs font-semibold text-text-secondary">This week</button>
        </div>
        <div class="mt-5 rounded-xl bg-soft p-5">
          <div class="grid gap-4 sm:grid-cols-2">
            <div>
              <p class="text-sm text-text-secondary">Total Activity</p>
              <p class="mt-1 text-2xl font-bold text-text">75,896</p>
            </div>
            <div>
              <p class="text-sm text-text-secondary">Performance</p>
              <p class="mt-1 text-2xl font-bold text-text">+5.6%</p>
            </div>
          </div>
        </div>
        <div class="mt-6 flex h-52 items-end gap-3 border-b border-l border-border/70 px-4">
          <div v-for="(height, index) in [35, 52, 46, 78, 60, 88, 50, 64, 72, 58, 92, 76]" :key="index" class="flex flex-1 flex-col items-center justify-end gap-2">
            <span class="w-full rounded-t-lg bg-primary/65" :style="{ height: `${height}%` }" />
          </div>
        </div>
      </article>
    </section>
  </div>
</template>
