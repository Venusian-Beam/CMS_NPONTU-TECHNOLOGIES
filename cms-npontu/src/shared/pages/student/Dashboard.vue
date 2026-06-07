<script setup>
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import studentHero from '@/assets/illustrations/student-hero.png'

// ── KPI Cards with premium gradient designs ───────────────────────────────
const kpiCards = [
  {
    label: 'Current GPA',
    value: '3.75',
    sub: 'out of 4.00',
    change: '+0.15',
    changeType: 'up',
    icon: 'heroicons-solid:academic-cap',
    theme: 'purple',
    bars: [6, 10, 7, 13, 9, 15, 11, 17, 13, 19],
  },
  {
    label: 'Registered Courses',
    value: '7',
    sub: '21 credits',
    change: 'This sem',
    changeType: 'neutral',
    icon: 'heroicons-solid:book-open',
    theme: 'pink',
    bars: [7, 11, 8, 14, 16, 12, 18, 14, 20, 16],
  },
  {
    label: 'Attendance',
    value: '92%',
    sub: 'avg across courses',
    change: '+3.2%',
    changeType: 'up',
    icon: 'heroicons-solid:check-badge',
    theme: 'teal',
    bars: [8, 12, 9, 14, 11, 17, 13, 18, 14, 20],
  },
  {
    label: 'Outstanding',
    value: '₵1,200',
    sub: 'due Mar 15',
    change: 'Pay Now',
    changeType: 'warning',
    icon: 'heroicons-solid:credit-card',
    theme: 'orange',
    bars: [7, 11, 8, 14, 12, 16, 13, 19, 15, 21],
  },
]

// ── Registration Window ───────────────────────────────────────────────────
const registrationWindow = {
  isOpen: true,
  semester: 'Semester 2, 2024/2025',
  closesAt: 'March 20, 2025',
  daysRemaining: 12,
  minCredits: 18,
  maxCredits: 24,
  currentCredits: 21,
}

// ── Stats at top ──────────────────────────────────────────────────────────
const topStats = [
  { label: 'Attendance', value: '92%', color: '#0f172a', bg: '#0f172a' },
  { label: 'GPA', value: '3.75', color: '#5b5cf6', bg: '#eef0ff' },
  { label: 'Pending', value: '14%', color: '#64748b', bg: '#f1f5f9' },
]

// ── Courses Data ──────────────────────────────────────────────────────────
const courses = [
  {
    id: 1,
    code: 'COSC 201',
    title: 'Social & Ethical Issues',
    department: 'Computer Science',
    venue: 'Room A203',
    venueFlag: '🏛️',
    credits: 3,
    lecturer: 'Dr. E. Baah',
    lecturerAvatar: 'https://i.pravatar.cc/100?img=12',
    enrollDate: 'Mar 13, 2025',
    status: 'Active',
    statusType: 'success',
    attendance: 91,
  },
  {
    id: 2,
    code: 'MATH 203',
    title: 'Engineering Mathematics',
    department: 'Mathematics',
    venue: 'Hall B',
    venueFlag: '🏛️',
    credits: 3,
    lecturer: 'Dr. K. Mensah',
    lecturerAvatar: 'https://i.pravatar.cc/100?img=33',
    enrollDate: 'Oct 13, 2024',
    status: 'In Progress',
    statusType: 'warning',
    attendance: 83,
  },
  {
    id: 3,
    code: 'COSC 205',
    title: 'Database Systems',
    department: 'Computer Science',
    venue: 'Lab 4',
    venueFlag: '💻',
    credits: 3,
    lecturer: 'Dr. Adjei',
    lecturerAvatar: 'https://i.pravatar.cc/100?img=47',
    enrollDate: 'Nov 4, 2024',
    status: 'Active',
    statusType: 'success',
    attendance: 100,
  },
  {
    id: 4,
    code: 'MATH 201',
    title: 'Linear Algebra',
    department: 'Mathematics',
    venue: 'Room C101',
    venueFlag: '🏛️',
    credits: 3,
    lecturer: 'Dr. Osei',
    lecturerAvatar: 'https://i.pravatar.cc/100?img=15',
    enrollDate: 'Sep 4, 2024',
    status: 'Active',
    statusType: 'success',
    attendance: 75,
  },
  {
    id: 5,
    code: 'STAT 201',
    title: 'Statistics & Probability',
    department: 'Mathematics',
    venue: 'Hall A',
    venueFlag: '🏛️',
    credits: 3,
    lecturer: 'Dr. Amoako',
    lecturerAvatar: 'https://i.pravatar.cc/100?img=32',
    enrollDate: 'Feb 21, 2025',
    status: 'In Progress',
    statusType: 'warning',
    attendance: 88,
  },
  {
    id: 6,
    code: 'FREN 101',
    title: 'Introduction to French',
    department: 'Languages',
    venue: 'Room D205',
    venueFlag: '🌐',
    credits: 2,
    lecturer: 'Mr. Ofori',
    lecturerAvatar: 'https://i.pravatar.cc/100?img=68',
    enrollDate: 'Aug 2, 2024',
    status: 'Active',
    statusType: 'success',
    attendance: 92,
  },
]

// ── Attendance ────────────────────────────────────────────────────────────
const attendanceSummary = computed(() =>
  courses.map((c) => ({
    code: c.code,
    title: c.title,
    attendance: c.attendance,
    sessionsHeld: 12,
    sessionsAttended: Math.round((c.attendance / 100) * 12),
  }))
)

// ── Chart — GPA Trend with proper scaling ─────────────────────────────────
const chartData = [
  { label: 'L100 S1', gpa: 3.20, attendance: 85 },
  { label: 'L100 S2', gpa: 3.45, attendance: 88 },
  { label: 'L200 S1', gpa: 3.60, attendance: 90 },
  { label: 'L200 S2', gpa: 3.75, attendance: 92 },
]

const chartW = 600
const chartH = 240
const chartPad = { l: 40, r: 20, t: 30, b: 40 }

// Smart y-axis range — focus on actual data range
const gpaMin = 2.5
const gpaMax = 4.0
const attMin = 70
const attMax = 100

const getX = (i) => chartPad.l + (i / (chartData.length - 1)) * (chartW - chartPad.l - chartPad.r)
const getYGpa = (val) => {
  const normalized = (val - gpaMin) / (gpaMax - gpaMin)
  return chartH - chartPad.b - normalized * (chartH - chartPad.t - chartPad.b)
}
const getYAtt = (val) => {
  const normalized = (val - attMin) / (attMax - attMin)
  return chartH - chartPad.b - normalized * (chartH - chartPad.t - chartPad.b)
}

// Smooth curve generator (bezier curve)
const smoothLine = (points) => {
  if (points.length < 2) return ''
  let path = `M ${points[0].x} ${points[0].y}`
  for (let i = 0; i < points.length - 1; i++) {
    const x1 = points[i].x
    const y1 = points[i].y
    const x2 = points[i + 1].x
    const y2 = points[i + 1].y
    const cx1 = x1 + (x2 - x1) / 2
    const cy1 = y1
    const cx2 = x1 + (x2 - x1) / 2
    const cy2 = y2
    path += ` C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`
  }
  return path
}

const gpaPoints = computed(() => chartData.map((d, i) => ({ x: getX(i), y: getYGpa(d.gpa) })))
const attPoints = computed(() => chartData.map((d, i) => ({ x: getX(i), y: getYAtt(d.attendance) })))

const gpaPath = computed(() => smoothLine(gpaPoints.value))
const attPath = computed(() => smoothLine(attPoints.value))

const gpaArea = computed(() => {
  const path = smoothLine(gpaPoints.value)
  return `${path} L ${gpaPoints.value[gpaPoints.value.length - 1].x} ${chartH - chartPad.b} L ${gpaPoints.value[0].x} ${chartH - chartPad.b} Z`
})

const yAxisLabels = [4.0, 3.5, 3.0, 2.5]

// ── Image ─────────────────────────────────────────────────────────────────
const imageError = ref(false)
const handleImageError = () => (imageError.value = true)

// ── Helpers ───────────────────────────────────────────────────────────────
const getAttendanceColor = (val) => {
  if (val >= 90) return '#14b8a6'
  if (val >= 75) return '#f59e0b'
  return '#f43f5e'
}

const getStatusStyle = (type) => {
  const styles = {
    success: { bg: '#dcfce7', color: '#15803d', dot: '#22c55e' },
    warning: { bg: '#fef3c7', color: '#b45309', dot: '#f59e0b' },
    danger:  { bg: '#fee2e2', color: '#b91c1c', dot: '#ef4444' },
    info:    { bg: '#dbeafe', color: '#1d4ed8', dot: '#3b82f6' },
  }
  return styles[type] || styles.info
}

const getAttendanceStatus = (val) => {
  if (val >= 90) return 'success'
  if (val >= 75) return 'warning'
  return 'danger'
}

// ── Selection & Search ───────────────────────────────────────────────────
const selectedCourseIds = ref(new Set([2]))
const courseSearchQuery = ref('')

const allCoursesChecked = computed(() =>
  courses.length > 0 && selectedCourseIds.value.size === courses.length
)
const someCoursesChecked = computed(() =>
  selectedCourseIds.value.size > 0 && !allCoursesChecked.value
)

const toggleCourseSelect = (id) => {
  const set = new Set(selectedCourseIds.value)
  if (set.has(id)) set.delete(id)
  else set.add(id)
  selectedCourseIds.value = set
}

const toggleAllCourses = () => {
  if (allCoursesChecked.value) selectedCourseIds.value = new Set()
  else selectedCourseIds.value = new Set(courses.map(c => c.id))
}

const filteredCourses = computed(() => {
  if (!courseSearchQuery.value) return courses
  const q = courseSearchQuery.value.toLowerCase()
  return courses.filter(c =>
    c.code.toLowerCase().includes(q) ||
    c.title.toLowerCase().includes(q) ||
    c.lecturer.toLowerCase().includes(q) ||
    c.department.toLowerCase().includes(q)
  )
})

// ── Filter dropdowns ─────────────────────────────────────────────────────
const filters = [
  { label: 'Department', icon: 'heroicons:building-office' },
  { label: 'Semester', icon: 'heroicons:calendar-days' },
  { label: 'Lecturer', icon: 'heroicons:user' },
  { label: 'Status', icon: 'heroicons:check-circle' },
  { label: 'Credits', icon: 'heroicons:hashtag' },
]


</script>

<template>
  <div class="dashboard">
    <!-- ═══════════════ PAGE HEADER ═══════════════ -->
    <div class="page-header">
      <p class="breadcrumb">
        <span>Home</span>
        <Icon icon="heroicons:chevron-right" width="11" />
        <span class="breadcrumb-current">Student</span>
      </p>
      <div class="header-row">
        <div>
          <h1 class="page-title">Welcome back, Kwame <span class="wave">👋</span></h1>
          <p class="page-subtitle">Semester 2, 2024/2025 · Level 200 · BSc Computer Science</p>
        </div>
        <div class="header-actions">
          <button class="btn-outline">
            <Icon icon="heroicons:arrow-down-tray" width="14" />
            Transcript
          </button>
          <button class="btn-outline">
            <Icon icon="heroicons:bell" width="14" />
            <span class="notif-badge">3</span>
          </button>
        </div>
      </div>
    </div>

    <!-- ═══════════════ ROW 1: HERO + KPIS ═══════════════ -->
    <div class="row-hero-kpi">
      <!-- HERO -->
      <div class="hero-card">
        <div class="hero-blob hero-blob-1"></div>
        <div class="hero-blob hero-blob-2"></div>
        <div class="hero-blob hero-blob-3"></div>

        <div class="hero-content">
          <h2 class="hero-title">Plan your semester</h2>
          <p class="hero-desc">
            Registration closes in <strong>{{ registrationWindow.daysRemaining }} days</strong>. Finalize your course selections now.
          </p>
          <div class="hero-actions">
            <button class="hero-btn-primary">
              Register Courses
              <Icon icon="heroicons:arrow-right" width="13" />
            </button>
            <button class="hero-btn-ghost">
              Timetable
            </button>
          </div>
        </div>

        <div class="hero-illustration">
          <img
            v-if="!imageError"
            :src="studentHero"
            alt="Student"
            class="hero-img"
            @error="handleImageError"
          />
          <div v-else class="hero-fallback">
            <Icon icon="heroicons:academic-cap" width="80" color="rgba(255,255,255,0.4)" />
          </div>
        </div>
      </div>

      <!-- KPI GRID — Premium Credit Card Aesthetic -->
      <div class="kpi-grid">
        <div
          v-for="(kpi, i) in kpiCards"
          :key="i"
          class="kpi-card"
          :class="`kpi-${kpi.theme}`"
        >
          <!-- Decorative SVG pattern background -->
          <svg class="kpi-pattern" viewBox="0 0 280 200" preserveAspectRatio="xMidYMid slice">
            <template v-if="kpi.theme === 'purple'">
              <circle cx="260" cy="-20" r="80" fill="rgba(255,255,255,0.15)" />
              <circle cx="220" cy="40" r="40" fill="rgba(255,255,255,0.1)" />
              <path d="M -20,180 Q 60,140 140,180 T 300,180 L 300,220 L -20,220 Z" fill="rgba(255,255,255,0.08)" />
              <circle cx="40" cy="30" r="3" fill="rgba(255,255,255,0.4)" />
              <circle cx="80" cy="60" r="2" fill="rgba(255,255,255,0.3)" />
            </template>
            <template v-if="kpi.theme === 'pink'">
              <path d="M 280,0 Q 200,40 240,100 T 280,200 L 280,200 L 280,0 Z" fill="rgba(255,255,255,0.12)" />
              <circle cx="220" cy="160" r="60" fill="rgba(255,255,255,0.08)" />
              <circle cx="60" cy="40" r="25" fill="rgba(255,255,255,0.1)" />
              <circle cx="30" cy="70" r="2" fill="rgba(255,255,255,0.4)" />
              <circle cx="100" cy="20" r="2.5" fill="rgba(255,255,255,0.3)" />
            </template>
            <template v-if="kpi.theme === 'teal'">
              <path d="M 0,140 Q 80,100 160,140 T 320,140 L 320,200 L 0,200 Z" fill="rgba(255,255,255,0.15)" />
              <circle cx="240" cy="50" r="50" fill="rgba(255,255,255,0.1)" />
              <path d="M 280,-20 L 320,30 L 280,80 L 240,30 Z" fill="rgba(255,255,255,0.08)" />
              <circle cx="50" cy="40" r="3" fill="rgba(255,255,255,0.4)" />
            </template>
            <template v-if="kpi.theme === 'orange'">
              <circle cx="-20" cy="180" r="90" fill="rgba(255,255,255,0.1)" />
              <circle cx="250" cy="30" r="45" fill="rgba(255,255,255,0.12)" />
              <path d="M 200,140 Q 240,100 280,140 Q 240,180 200,140 Z" fill="rgba(255,255,255,0.08)" />
              <circle cx="120" cy="30" r="2.5" fill="rgba(255,255,255,0.4)" />
              <circle cx="180" cy="60" r="2" fill="rgba(255,255,255,0.3)" />
            </template>
          </svg>

          <!-- Glass effect overlay -->
          <div class="kpi-glass"></div>

          <!-- Card content -->
          <div class="kpi-content">
            <div class="kpi-header">
              <div class="kpi-icon-box">
                <Icon :icon="kpi.icon" width="22" color="white" />
              </div>
              <span
                class="kpi-change-pill"
                :class="{
                  'change-up': kpi.changeType === 'up',
                  'change-down': kpi.changeType === 'down',
                  'change-warning': kpi.changeType === 'warning',
                  'change-neutral': kpi.changeType === 'neutral',
                }"
              >
                {{ kpi.change }}
              </span>
            </div>

            <p class="kpi-label">{{ kpi.label }}</p>

            <div class="kpi-value-block">
              <p class="kpi-value">{{ kpi.value }}</p>
              <p class="kpi-sub">{{ kpi.sub }}</p>
            </div>

            <!-- Mini bar chart -->
            <div class="kpi-bars">
              <div
                v-for="(h, idx) in kpi.bars"
                :key="idx"
                class="kpi-bar"
                :style="{
                  height: h * 1.6 + 'px',
                  opacity: Math.min(0.35 + idx * 0.075, 1),
                }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ═══════════════ REGISTRATION BANNER — Premium Design ═══════════════ -->
    <div class="reg-banner">
      <!-- Decorative gradient background -->
      <div class="reg-bg-pattern"></div>

      <!-- Left: Status Section -->
      <div class="reg-status">
        <div class="reg-status-icon">
          <Icon icon="heroicons:clipboard-document-check" width="22" color="white" />
          <span class="reg-pulse-ring"></span>
        </div>
        <div class="reg-status-text">
          <div class="reg-status-title-row">
            <h3 class="reg-status-title">Course Registration</h3>
            <span class="reg-status-badge">
              <span class="reg-status-dot"></span>
              OPEN
            </span>
          </div>
          <p class="reg-status-meta">
            <Icon icon="heroicons:calendar" width="12" />
            {{ registrationWindow.semester }}
            <span class="reg-divider-text">•</span>
            <Icon icon="heroicons:clock" width="12" />
            <strong>{{ registrationWindow.daysRemaining }} days</strong> left
          </p>
        </div>
      </div>

      <!-- Middle: Credit Visualization -->
      <div class="reg-credits">
        <div class="reg-credits-display">
          <div class="reg-credits-numbers">
            <span class="reg-current">{{ registrationWindow.currentCredits }}</span>
            <span class="reg-divider">/</span>
            <span class="reg-max">{{ registrationWindow.maxCredits }}</span>
          </div>
          <p class="reg-credits-label">CREDITS REGISTERED</p>
        </div>

        <div class="reg-bar-container">
          <div class="reg-bar-track">
            <!-- Min threshold zone -->
            <div
              class="reg-bar-min-zone"
              :style="{ width: ((registrationWindow.minCredits / registrationWindow.maxCredits) * 100) + '%' }"
            ></div>
            <!-- Active fill -->
            <div
              class="reg-bar-fill"
              :style="{ width: ((registrationWindow.currentCredits / registrationWindow.maxCredits) * 100) + '%' }"
            >
              <span class="reg-bar-glow"></span>
            </div>
            <!-- Min marker -->
            <div
              class="reg-bar-marker reg-marker-min"
              :style="{ left: ((registrationWindow.minCredits / registrationWindow.maxCredits) * 100) + '%' }"
            >
              <span class="reg-marker-tooltip">Min</span>
            </div>
          </div>
          <div class="reg-bar-labels">
            <span class="reg-bar-label">0</span>
            <span class="reg-bar-label reg-bar-label-min">{{ registrationWindow.minCredits }} min</span>
            <span class="reg-bar-label">{{ registrationWindow.maxCredits }} max</span>
          </div>
        </div>
      </div>

      <!-- Right: CTA -->
      <button class="reg-cta">
        <span class="reg-cta-text">
          <span class="reg-cta-label">Manage</span>
          <span class="reg-cta-sub">Registration</span>
        </span>
        <span class="reg-cta-arrow">
          <Icon icon="heroicons:arrow-right" width="16" />
        </span>
      </button>
    </div>

    <!-- ═══════════════ TOP STATS + COURSES TABLE ═══════════════ -->
    <div class="table-section">
      <!-- TOP STATS BAR + ACTIONS -->
      <div class="top-bar">
        <div class="top-stats">
          <div
            v-for="(stat, i) in topStats"
            :key="i"
            class="stat-pill"
            :class="{ 'stat-pill-dark': i === 0 }"
          >
            <span class="stat-pill-value">{{ stat.value }}</span>
            <span class="stat-pill-label">{{ stat.label }}</span>
          </div>
        </div>

        <div class="top-actions">
          <button class="action-link">
            Schedule
            <Icon icon="heroicons:chevron-down" width="12" />
          </button>
          <button class="action-link">
            Calendar
            <Icon icon="heroicons:chevron-down" width="12" />
          </button>
          <button class="action-link">
            Insights
            <Icon icon="heroicons:chevron-down" width="12" />
          </button>
        </div>
      </div>

      <!-- TABLE CARD -->
      <div class="table-card">
        <!-- FILTER BAR -->
        <div class="filter-bar">
          <div class="filter-pills">
            <button
              v-for="(filter, i) in filters"
              :key="i"
              class="filter-pill"
            >
              {{ filter.label }}
              <Icon icon="heroicons:chevron-down" width="11" />
            </button>

            <div class="search-pill">
              <Icon icon="heroicons:magnifying-glass" width="14" color="#94a3b8" />
              <input
                v-model="courseSearchQuery"
                type="text"
                placeholder="Search"
                class="search-pill-input"
              />
            </div>
          </div>

          <div class="filter-actions">
            <button class="action-icon-btn" title="Add">
              <Icon icon="heroicons:plus" width="16" />
            </button>
            <button class="action-icon-btn" title="Filter">
              <Icon icon="heroicons:adjustments-horizontal" width="16" />
            </button>
            <button class="export-btn">
              <Icon icon="heroicons:arrow-up-tray" width="13" />
              Export
            </button>
          </div>
        </div>

        <!-- TABLE -->
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th class="th-check">
                  <label class="checkbox-wrap">
                    <input
                      type="checkbox"
                      :checked="allCoursesChecked"
                      :indeterminate.prop="someCoursesChecked"
                      @change="toggleAllCourses"
                    />
                    <span class="checkbox-box"></span>
                  </label>
                </th>
                <th class="th-name">
                  <span class="th-content">
                    Course
                    <Icon icon="heroicons:arrows-up-down" width="11" />
                  </span>
                </th>
                <th>
                  <span class="th-content">
                    Title
                    <Icon icon="heroicons:arrows-up-down" width="11" />
                  </span>
                </th>
                <th>
                  <span class="th-content">Department</span>
                </th>
                <th>
                  <span class="th-content">Venue</span>
                </th>
                <th>
                  <span class="th-content">Credits</span>
                </th>
                <th>
                  <span class="th-content">
                    Enrolled
                    <Icon icon="heroicons:arrows-up-down" width="11" />
                  </span>
                </th>
                <th>
                  <span class="th-content">Lecturer</span>
                </th>
                <th class="th-right">
                  <span class="th-content">Status</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="course in filteredCourses"
                :key="course.id"
                class="data-row"
                :class="{ 'data-row-selected': selectedCourseIds.has(course.id) }"
                @click="toggleCourseSelect(course.id)"
              >
                <td class="td-check" @click.stop>
                  <label class="checkbox-wrap">
                    <input
                      type="checkbox"
                      :checked="selectedCourseIds.has(course.id)"
                      @change="toggleCourseSelect(course.id)"
                    />
                    <span class="checkbox-box"></span>
                  </label>
                </td>
                <td class="td-name">
                  <div class="name-cell">
                    <img
                      :src="course.lecturerAvatar"
                      :alt="course.lecturer"
                      class="row-avatar"
                    />
                    <span class="cell-strong">{{ course.code }}</span>
                  </div>
                </td>
                <td>
                  <span class="cell-text">{{ course.title }}</span>
                </td>
                <td>
                  <span class="cell-text">{{ course.department }}</span>
                </td>
                <td>
                  <div class="venue-cell">
                    <span class="venue-flag">{{ course.venueFlag }}</span>
                    <span class="cell-text">{{ course.venue }}</span>
                  </div>
                </td>
                <td>
                  <span class="cell-strong">{{ course.credits }} cr</span>
                </td>
                <td>
                  <span class="cell-text">{{ course.enrollDate }}</span>
                </td>
                <td>
                  <span class="cell-text">{{ course.lecturer }}</span>
                </td>
                <td class="td-right">
                  <span
                    class="status-pill"
                    :style="{
                      background: getStatusStyle(course.statusType).bg,
                      color: getStatusStyle(course.statusType).color,
                    }"
                  >
                    <span
                      class="status-pill-dot"
                      :style="{ background: getStatusStyle(course.statusType).dot }"
                    ></span>
                    {{ course.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- ═══════════════ ATTENDANCE + CHART ═══════════════ -->
    <div class="row-two">
      <!-- ATTENDANCE -->
      <div class="card">
        <div class="card-header">
          <div>
            <h2 class="card-title">Attendance Summary</h2>
            <p class="card-sub">92% average · this semester</p>
          </div>
          <a href="#" class="view-all">
            Details
            <Icon icon="heroicons:chevron-right" width="11" />
          </a>
        </div>

        <div class="att-list">
          <div v-for="(item, i) in attendanceSummary" :key="i" class="att-row">
            <div class="att-row-top">
              <div class="att-row-left">
                <span class="att-code">{{ item.code }}</span>
                <span class="att-sessions">{{ item.sessionsAttended }}/{{ item.sessionsHeld }} sessions</span>
              </div>
              <span class="att-pct" :style="{ color: getAttendanceColor(item.attendance) }">
                {{ item.attendance }}%
              </span>
            </div>
            <div class="att-track">
              <div class="att-fill" :style="{ width: item.attendance + '%', background: getAttendanceColor(item.attendance) }"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- CHART -->
      <div class="card">
        <div class="card-header">
          <div>
            <h2 class="card-title">Academic Progress</h2>
            <p class="card-sub">GPA trend across semesters</p>
          </div>
          <button class="dropdown-btn">
            All Semesters
            <Icon icon="heroicons:chevron-down" width="11" />
          </button>
        </div>

        <div class="chart-stats">
          <div class="chart-stat">
            <p class="chart-stat-label">Current GPA</p>
            <div class="chart-stat-value-row">
              <span class="chart-stat-value" style="color: #5b21f5;">3.75</span>
              <span class="chart-stat-change up">↑ 0.15</span>
            </div>
          </div>
          <div class="chart-stat">
            <p class="chart-stat-label">Avg Attendance</p>
            <div class="chart-stat-value-row">
              <span class="chart-stat-value" style="color: #ec4899;">92%</span>
              <span class="chart-stat-change up">↑ 3.2%</span>
            </div>
          </div>
        </div>

        <div class="chart-wrap">
          <svg :viewBox="`0 0 ${chartW} ${chartH}`" class="chart-svg" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="gpaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#5b21f5" stop-opacity="0.18" />
                <stop offset="100%" stop-color="#5b21f5" stop-opacity="0" />
              </linearGradient>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feFlood flood-color="#5b21f5" flood-opacity="0.4" />
                <feComposite in2="blur" operator="in" />
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <g v-for="(val, i) in yAxisLabels" :key="'y' + i">
              <text :x="chartPad.l - 10" :y="getYGpa(val) + 3" font-size="10" fill="#94a3b8" text-anchor="end" font-family="Inter, sans-serif" font-weight="500">{{ val.toFixed(1) }}</text>
              <line :x1="chartPad.l" :x2="chartW - chartPad.r" :y1="getYGpa(val)" :y2="getYGpa(val)" stroke="#f1f5f9" stroke-width="1" stroke-dasharray="3 4" />
            </g>

            <path :d="gpaArea" fill="url(#gpaGrad)" />
            <path :d="attPath" fill="none" stroke="#ec4899" stroke-width="2" stroke-dasharray="5 4" stroke-linecap="round" stroke-linejoin="round" opacity="0.7" />
            <path :d="gpaPath" fill="none" stroke="#5b21f5" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />

            <g v-for="(pt, i) in gpaPoints" :key="'gpa-dot' + i">
              <circle :cx="pt.x" :cy="pt.y" r="7" fill="white" />
              <circle :cx="pt.x" :cy="pt.y" r="5" fill="#5b21f5" />
              <circle :cx="pt.x" :cy="pt.y" r="2.5" fill="white" />
              <text :x="pt.x" :y="pt.y - 14" font-size="10" font-weight="700" fill="#5b21f5" text-anchor="middle" font-family="Inter, sans-serif">{{ chartData[i].gpa.toFixed(2) }}</text>
            </g>

            <g v-for="(pt, i) in attPoints" :key="'att-dot' + i">
              <circle :cx="pt.x" :cy="pt.y" r="4" fill="white" stroke="#ec4899" stroke-width="2" />
            </g>

            <text v-for="(d, i) in chartData" :key="'x' + i" :x="getX(i)" :y="chartH - 12" font-size="11" fill="#64748b" text-anchor="middle" font-family="Inter, sans-serif" font-weight="600">{{ d.label }}</text>
          </svg>

          <div class="chart-legend">
            <div class="legend-item">
              <span class="legend-line legend-line-solid"></span>
              <span class="legend-label">GPA Score</span>
            </div>
            <div class="legend-item">
              <span class="legend-line legend-line-dashed"></span>
              <span class="legend-label">Attendance %</span>
            </div>
          </div>
        </div>
      </div>
    </div>



  </div>
</template>

<style scoped>
/* ═══════════════ ROOT ═══════════════ */
.dashboard {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 24px;
  background: #f8fafc;
  min-height: 100vh;
}

/* ═══════════════ PAGE HEADER ═══════════════ */
.page-header { margin-bottom: 24px; }

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 500;
  color: #5b21f5;
  margin-bottom: 8px;
}

.breadcrumb-current { color: #94a3b8; }

.header-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.page-title {
  font-size: 24px;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.5px;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.wave {
  display: inline-block;
  animation: wave 2s ease-in-out infinite;
  transform-origin: 70% 70%;
}

@keyframes wave {
  0%, 100% { transform: rotate(0); }
  10%, 30% { transform: rotate(14deg); }
  20%, 40% { transform: rotate(-8deg); }
  50% { transform: rotate(0); }
}

.page-subtitle {
  font-size: 13px;
  font-weight: 500;
  color: #94a3b8;
}

.header-actions {
  display: flex;
  gap: 8px;
}

.btn-outline {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: white;
  border: 1px solid #e2e8f0;
  color: #475569;
  font-size: 13px;
  font-weight: 600;
  padding: 8px 14px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-outline:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
}

.notif-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: #ec4899;
  color: white;
  font-size: 9px;
  font-weight: 700;
  min-width: 16px;
  height: 16px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
  border: 2px solid white;
}

/* ═══════════════ ROW 1: HERO + KPI ═══════════════ */
.row-hero-kpi {
  display: grid;
  grid-template-columns: 1.3fr 1.7fr;
  gap: 16px;
  margin-bottom: 16px;
}

/* HERO CARD */
.hero-card {
  position: relative;
  border-radius: 18px;
  background: linear-gradient(135deg, #7c6aff 0%, #5b21f5 100%);
  overflow: hidden;
  min-height: 240px;
  display: flex;
}

.hero-blob {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  z-index: 1;
}

.hero-blob-1 {
  width: 200px; height: 200px;
  background: rgba(255, 255, 255, 0.08);
  right: -50px; top: -50px;
}
.hero-blob-2 {
  width: 120px; height: 120px;
  background: rgba(255, 255, 255, 0.06);
  right: 40px; bottom: -40px;
}
.hero-blob-3 {
  width: 40px; height: 40px;
  background: rgba(255, 255, 255, 0.12);
  left: 30px; top: 30px;
}

.hero-content {
  position: relative;
  z-index: 3;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 70%;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: white;
  font-size: 10px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 100px;
  margin-bottom: 14px;
  width: fit-content;
  backdrop-filter: blur(10px);
  letter-spacing: 0.2px;
}

.hero-badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #4ade80;
  box-shadow: 0 0 8px #4ade80;
  animation: pulse 2s infinite;
}

.hero-title {
  font-size: 24px;
  font-weight: 800;
  color: white;
  line-height: 1.1;
  margin-bottom: 8px;
  letter-spacing: -0.5px;
}

.hero-desc {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.88);
  line-height: 1.55;
  margin-bottom: 18px;
}

.hero-desc strong {
  color: white;
  font-weight: 700;
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: nowrap;
}

.hero-btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: linear-gradient(135deg, #ec4899, #f43f5e);
  color: white;
  border: none;
  font-size: 12px;
  font-weight: 600;
  padding: 10px 16px;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(236, 72, 153, 0.4);
  transition: all 0.2s;
  white-space: nowrap;
}

.hero-btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(236, 72, 153, 0.5);
}

.hero-btn-ghost {
  display: inline-flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: white;
  font-size: 12px;
  font-weight: 600;
  padding: 10px 16px;
  border-radius: 10px;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 0.2s;
  white-space: nowrap;
}

.hero-btn-ghost:hover { background: rgba(255, 255, 255, 0.25); }

.hero-illustration {
  position: absolute;
  right: -20px;
  bottom: 0;
  top: 0;
  width: 40%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  pointer-events: none;
  z-index: 2;
}

.hero-img {
  width: 100%;
  height: auto;
  max-height: 210px;
  object-fit: contain;
  object-position: bottom right;
  filter: drop-shadow(0 12px 24px rgba(0, 0, 0, 0.2));
}

.hero-fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}

/* ═══════════════════════════════════════════════════════════════════════════
   KPI GRID — Premium Credit Card Aesthetic
   ═══════════════════════════════════════════════════════════════════════════ */
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

/* KPI CARD BASE */
.kpi-card {
  position: relative;
  border-radius: 18px;
  padding: 0;
  min-height: 190px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow:
    0 4px 12px rgba(15, 23, 42, 0.08),
    0 2px 4px rgba(15, 23, 42, 0.04);
}

.kpi-card:hover {
  transform: translateY(-4px) scale(1.01);
  box-shadow:
    0 12px 28px rgba(15, 23, 42, 0.15),
    0 4px 8px rgba(15, 23, 42, 0.06);
}

/* Pattern SVG background */
.kpi-pattern {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

/* Glass effect overlay for subtle depth */
.kpi-glass {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0) 50%,
    rgba(0, 0, 0, 0.05) 100%
  );
  z-index: 2;
  pointer-events: none;
}

/* ═══════════════════════════════════════════════════════════════════════════
   KPI THEMES — Premium Gradients
   ═══════════════════════════════════════════════════════════════════════════ */

.kpi-purple {
  background: linear-gradient(135deg, #7c6aff 0%, #5b21f5 50%, #4318c9 100%);
}

.kpi-pink {
  background: linear-gradient(135deg, #f472b6 0%, #ec4899 50%, #db2777 100%);
}

.kpi-teal {
  background: linear-gradient(135deg, #2dd4bf 0%, #14b8a6 50%, #0d9488 100%);
}

.kpi-orange {
  background: linear-gradient(135deg, #fb923c 0%, #f97316 50%, #ea580c 100%);
}

/* ═══════════════════════════════════════════════════════════════════════════
   KPI CONTENT
   ═══════════════════════════════════════════════════════════════════════════ */
.kpi-content {
  position: relative;
  z-index: 3;
  padding: 18px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.kpi-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.kpi-icon-box {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.kpi-change-pill {
  font-size: 10px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 100px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  letter-spacing: 0.2px;
}

.kpi-label {
  font-size: 11px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.85);
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-bottom: 6px;
}

.kpi-value-block {
  margin-bottom: auto;
}

.kpi-value {
  font-size: 28px;
  font-weight: 800;
  color: white;
  line-height: 1.1;
  letter-spacing: -0.8px;
  margin-bottom: 4px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.kpi-sub {
  font-size: 11px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.75);
}

/* Mini bars - white with opacity ramp */
.kpi-bars {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  gap: 3px;
  height: 36px;
  margin-top: 12px;
}

.kpi-bar {
  width: 4px;
  border-radius: 2px 2px 0 0;
  background: white;
  transition: all 0.3s;
}

.kpi-card:hover .kpi-bar {
  opacity: 1 !important;
}

/* ═══════════════════════════════════════════════════════════════════════════
   REGISTRATION BANNER — Skeuomorphic
   ═══════════════════════════════════════════════════════════════════════════ */
.reg-banner {
  position: relative;
  background: #ffffff;
  border-radius: 18px;
  padding: 22px 26px;
  margin-bottom: 18px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 32px;
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.04),
    0 8px 20px rgba(59, 130, 246, 0.10),
    0 20px 40px rgba(59, 130, 246, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.9),
    inset 0 -1px 0 rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.8);
  overflow: hidden;
}

.reg-banner::after {
  content: '';
  position: absolute;
  inset: 2px;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.04);
  pointer-events: none;
  z-index: 0;
}

.reg-bg-pattern {
  position: absolute;
  inset: 0;
  background:
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0, 0, 0, 0.012) 2px,
      rgba(0, 0, 0, 0.012) 3px
    );
  pointer-events: none;
  z-index: 0;
}

/* ── LEFT: Status Section ─────────────────────────────────────────────── */
.reg-status {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 14px;
}

.reg-status-icon {
  position: relative;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: linear-gradient(145deg, #fb923c 0%, #f97316 40%, #ea580c 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow:
    0 4px 14px rgba(249, 115, 22, 0.3),
    inset 0 2px 0 rgba(255, 255, 255, 0.35),
    inset 0 -2px 0 rgba(0, 0, 0, 0.15);
}

.reg-status-icon::before {
  content: '';
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  background: linear-gradient(145deg, rgba(255,255,255,0.5), rgba(249,115,22,0.1), rgba(249,115,22,0.2));
  z-index: -1;
  box-shadow: 0 0 6px rgba(249, 115, 22, 0.15);
}

.reg-pulse-ring {
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  border: 2px solid rgba(249, 115, 22, 0.25);
  opacity: 0;
  animation: pulse-ring 2s ease-out infinite;
}

@keyframes pulse-ring {
  0% {
    transform: scale(0.95);
    opacity: 0.6;
  }
  100% {
    transform: scale(1.2);
    opacity: 0;
  }
}

.reg-status-title-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 4px;
}

.reg-status-title {
  font-size: 16px;
  font-weight: 800;
  color: #1e3a5f;
  letter-spacing: -0.3px;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.8);
}

.reg-status-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 10px;
  font-weight: 800;
  padding: 3px 12px 3px 10px;
  background: linear-gradient(180deg, #fff7ed 0%, #ffedd5 100%);
  color: #c2410c;
  border-radius: 100px;
  letter-spacing: 0.5px;
  border: 1px solid rgba(249, 115, 22, 0.3);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.8),
    0 2px 4px rgba(249, 115, 22, 0.1);
}

.reg-status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: linear-gradient(135deg, #fb923c, #f97316);
  box-shadow:
    0 0 6px rgba(249, 115, 22, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
  animation: dot-pulse 2s infinite;
}

@keyframes dot-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(0.85); }
}

.reg-status-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 500;
  color: #94a3b8;
}

.reg-status-meta strong {
  color: #ec4899;
  font-weight: 700;
}

.reg-divider-text {
  color: #cbd5e1;
  margin: 0 2px;
}

/* ── MIDDLE: Credit Visualization ─────────────────────────────────────── */
.reg-credits {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 0 28px;
  border-left: 1px solid rgba(59, 130, 246, 0.08);
  border-right: 1px solid rgba(59, 130, 246, 0.08);
}

.reg-credits-display {
  flex-shrink: 0;
  text-align: center;
}

.reg-credits-numbers {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 2px;
  line-height: 1;
}

.reg-current {
  font-size: 34px;
  font-weight: 900;
  background: linear-gradient(180deg, #3b82f6 0%, #ec4899 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -1px;
  text-shadow: 0 2px 4px rgba(59, 130, 246, 0.1);
  filter: drop-shadow(0 1px 1px rgba(255, 255, 255, 0.5));
}

.reg-divider {
  font-size: 18px;
  font-weight: 600;
  color: #cbd5e1;
}

.reg-max {
  font-size: 18px;
  font-weight: 600;
  color: #94a3b8;
}

.reg-credits-label {
  font-size: 9px;
  font-weight: 700;
  color: #3b82f6;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-top: 4px;
  opacity: 0.65;
}

.reg-bar-container {
  flex: 1;
  min-width: 0;
}

.reg-bar-track {
  position: relative;
  height: 14px;
  background: linear-gradient(180deg, #d4d4d8 0%, #e4e4e7 100%);
  border-radius: 100px;
  overflow: visible;
  box-shadow:
    inset 0 2px 4px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(0, 0, 0, 0.04),
    0 1px 0 rgba(255, 255, 255, 0.6);
  padding: 2px;
}

.reg-bar-min-zone {
  position: absolute;
  top: 2px;
  left: 2px;
  bottom: 2px;
  border-radius: 100px 0 0 100px;
  background: repeating-linear-gradient(
    45deg,
    rgba(236, 72, 153, 0.08),
    rgba(236, 72, 153, 0.08) 5px,
    transparent 5px,
    transparent 10px
  );
}

.reg-bar-fill {
  position: relative;
  height: 100%;
  background: linear-gradient(180deg, #60a5fa 0%, #3b82f6 40%, #ec4899 100%);
  border-radius: 100px;
  transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow:
    0 1px 4px rgba(59, 130, 246, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.25),
    inset 0 -1px 0 rgba(0, 0, 0, 0.1);
}

.reg-bar-glow {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 24px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.25));
  border-radius: 100px;
  animation: glow-shift 2s ease-in-out infinite;
}

@keyframes glow-shift {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

.reg-bar-marker {
  position: absolute;
  top: -6px;
  bottom: -6px;
  width: 3px;
  background: linear-gradient(180deg, #a1a1aa, #52525b);
  border-radius: 2px;
  transform: translateX(-1px);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
}

.reg-marker-tooltip {
  position: absolute;
  top: -24px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 9px;
  font-weight: 700;
  color: #f8fafc;
  background: linear-gradient(180deg, #52525b 0%, #3f3f46 100%);
  padding: 3px 8px;
  border-radius: 4px;
  white-space: nowrap;
  box-shadow:
    0 2px 6px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.reg-bar-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  padding: 0 2px;
}

.reg-bar-label {
  font-size: 10px;
  font-weight: 600;
  color: #94a3b8;
}

.reg-bar-label-min {
  color: #ec4899;
  font-weight: 700;
}

/* ── RIGHT: CTA Button ────────────────────────────────────────────────── */
.reg-cta {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(180deg, #60a5fa 0%, #3b82f6 40%, #2563eb 100%);
  color: white;
  border: none;
  padding: 14px 18px 14px 22px;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.12s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow:
    0 6px 16px rgba(59, 130, 246, 0.35),
    0 2px 4px rgba(0, 0, 0, 0.08),
    inset 0 2px 0 rgba(255, 255, 255, 0.25),
    inset 0 -2px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.reg-cta::before {
  content: '';
  position: absolute;
  inset: 1px;
  border-radius: 13px;
  background: linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 40%);
  pointer-events: none;
}

.reg-cta::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transition: left 0.5s;
}

.reg-cta:hover {
  transform: translateY(-1px);
  background: linear-gradient(180deg, #93c5fd 0%, #3b82f6 40%, #2563eb 100%);
  box-shadow:
    0 8px 24px rgba(59, 130, 246, 0.4),
    0 2px 4px rgba(0, 0, 0, 0.06),
    inset 0 2px 0 rgba(255, 255, 255, 0.3),
    inset 0 -2px 0 rgba(0, 0, 0, 0.08);
}

.reg-cta:hover::after {
  left: 100%;
}

.reg-cta:active {
  transform: translateY(2px);
  background: linear-gradient(180deg, #2563eb 0%, #1d4ed8 100%);
  box-shadow:
    0 2px 4px rgba(59, 130, 246, 0.2),
    inset 0 2px 4px rgba(0, 0, 0, 0.2),
    inset 0 -1px 0 rgba(255, 255, 255, 0.05);
  transition: all 0.04s;
}

.reg-cta-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 1.1;
}

.reg-cta-label {
  font-size: 11px;
  font-weight: 600;
  opacity: 0.75;
  letter-spacing: 0.3px;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
}

.reg-cta-sub {
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.2px;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
}

.reg-cta-arrow {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.06) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s, background 0.3s;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.3),
    inset 0 -1px 0 rgba(0, 0, 0, 0.06);
}

.reg-cta:hover .reg-cta-arrow {
  transform: translateX(4px);
  background: linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 100%);
}

/* ═══════════════ TWO COLUMN ROW ═══════════════ */
.row-two {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
}

/* ═══════════════ CARD — Base ═══════════════ */
.card {
  background: white;
  border: 1px solid #f1f5f9;
  border-radius: 18px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04);
}

/* ═══════════════ PREMIUM HEADER ═══════════════ */
.premium-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 20px;
  gap: 16px;
  position: relative;
  z-index: 1;
}

.card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 18px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.header-icon-wrap {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: #5b21f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.header-icon-pink {
  background: #ec4899;
}

.card-title {
  font-size: 16px;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.3px;
  margin-bottom: 2px;
}

.card-sub {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  font-weight: 500;
  color: #94a3b8;
  margin-top: 2px;
}

.header-stat {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.header-stat-active {
  color: #5b21f5;
  font-weight: 600;
}

.header-stat-published {
  color: #0d9488;
  font-weight: 600;
}

.active-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #5b21f5;
  box-shadow: 0 0 6px rgba(91, 33, 245, 0.5);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.header-divider {
  color: #cbd5e1;
  font-size: 10px;
}

.header-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 700;
  color: #5b21f5;
  text-decoration: none;
  padding: 6px 12px;
  border-radius: 10px;
  background: #f5f3ff;
  border: 1px solid rgba(91, 33, 245, 0.08);
  transition: all 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;
}

.header-link:hover {
  background: #ede9ff;
  color: #4f1ed8;
}

.view-all {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  font-size: 12px;
  font-weight: 600;
  color: #5b21f5;
  text-decoration: none;
  padding: 4px 8px;
  border-radius: 6px;
  transition: all 0.2s;
}

.view-all:hover {
  background: #ede9ff;
  color: #4f1ed8;
}

.dropdown-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 6px 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.dropdown-btn:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
}

/* ═══════════════ COURSES LIST ═══════════════ */
.courses-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
  z-index: 1;
}

.course-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px 14px 20px;
  border-radius: 14px;
  background: #fafbfc;
  border: 1px solid #f1f5f9;
  transition: all 0.2s ease;
  cursor: pointer;
  overflow: hidden;
}

.course-card:hover {
  background: white;
  border-color: #e2e8f0;
}

.course-stripe {
  position: absolute;
  left: 0;
  top: 12px;
  bottom: 12px;
  width: 3px;
  border-radius: 0 4px 4px 0;
}

.course-avatar {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: -0.3px;
  flex-shrink: 0;
}

.course-body {
  flex: 1;
  min-width: 0;
}

.course-body-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 6px;
}

.course-code {
  font-size: 13px;
  font-weight: 800;
  color: #0f172a;
  line-height: 1.2;
  letter-spacing: -0.2px;
}

.course-title {
  font-size: 11px;
  font-weight: 500;
  color: #64748b;
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.course-credit-badge {
  display: inline-flex;
  align-items: baseline;
  gap: 2px;
  padding: 4px 10px;
  border-radius: 10px;
  border: 1px solid;
  flex-shrink: 0;
}

.credit-num {
  font-size: 14px;
  font-weight: 800;
  letter-spacing: -0.3px;
}

.credit-label {
  font-size: 10px;
  font-weight: 600;
  opacity: 0.8;
}

.course-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 500;
  color: #94a3b8;
}

.meta-item svg {
  flex-shrink: 0;
}

.meta-time {
  color: #5b21f5;
  font-weight: 600;
}

.meta-divider {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: #cbd5e1;
}

.meta-attendance {
  font-weight: 700;
}

.att-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.course-action {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: white;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

/* ═══════════════ ATTENDANCE ═══════════════ */
.att-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.att-row {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.att-row-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.att-row-left {
  display: flex;
  align-items: baseline;
  gap: 10px;
}

.att-code {
  font-size: 13px;
  font-weight: 700;
  color: #0f172a;
}

.att-sessions {
  font-size: 11px;
  color: #94a3b8;
  font-weight: 500;
}

.att-pct {
  font-size: 13px;
  font-weight: 800;
}

.att-track {
  height: 8px;
  background: #e4e4e7;
  border-radius: 100px;
  overflow: hidden;
}

.att-fill {
  height: 100%;
  border-radius: 100px;
  transition: width 0.6s;
}

/* ═══════════════ RESULTS — Stats Bar ═══════════════ */
.results-stats {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 16px 20px;
  background: #fafbfc;
  border-radius: 12px;
  margin-bottom: 18px;
  border: 1px solid #f1f5f9;
  position: relative;
  z-index: 1;
}

.result-stat {
  flex: 1;
  text-align: center;
  min-width: 0;
}

.result-stat-label {
  font-size: 10px;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-bottom: 4px;
}

.result-stat-value {
  font-size: 22px;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.5px;
  line-height: 1;
}

.result-stat-good {
  background: linear-gradient(180deg, #14b8a6, #0d9488);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 1px 1px rgba(255, 255, 255, 0.5));
}

.result-stat-divider {
  width: 1px;
  height: 32px;
  background: linear-gradient(180deg, transparent, #e2e8f0, transparent);
}

/* ═══════════════ RESULTS TABLE ═══════════════ */
.results-table-wrap {
  width: 100%;
  position: relative;
  z-index: 1;
}

.results-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 6px;
}

.results-table thead tr {
  background: transparent;
}

.results-table th {
  font-size: 10px;
  font-weight: 700;
  color: #94a3b8;
  text-align: left;
  padding: 6px 14px;
  letter-spacing: 0.8px;
  text-transform: uppercase;
}

.th-score { text-align: center; }
.th-grade { text-align: right; padding-right: 14px; }

.result-row {
  transition: all 0.2s ease;
  cursor: pointer;
}

.result-row td {
  padding: 14px;
  vertical-align: middle;
  background: #fafbfc;
  border-top: 1px solid #f1f5f9;
  border-bottom: 1px solid #f1f5f9;
  transition: all 0.2s ease;
}

.result-row td:first-child {
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  border-left: 1px solid #f1f5f9;
}

.result-row td:last-child {
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  border-right: 1px solid #f1f5f9;
}

.result-row:hover td {
  background: white;
  border-color: #e2e8f0;
}

.td-course { width: 32%; }
.td-score { width: 18%; text-align: center; }
.td-total { width: 16%; text-align: center; }
.td-grade { width: 16%; text-align: right; padding-right: 14px !important; }

/* Course cell */
.result-course-cell {
  display: flex;
  align-items: center;
  gap: 10px;
}

.result-course-dot {
  width: 8px;
  height: 34px;
  border-radius: 4px;
  flex-shrink: 0;
}

.result-code {
  font-size: 13px;
  font-weight: 800;
  color: #0f172a;
  line-height: 1.2;
  letter-spacing: -0.2px;
}

.result-title {
  font-size: 11px;
  color: #94a3b8;
  margin-top: 2px;
  font-weight: 500;
}

/* Score cell */
.score-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.score-value {
  font-size: 13px;
  font-weight: 700;
  color: #475569;
  font-variant-numeric: tabular-nums;
}

.score-max {
  font-size: 10px;
  color: #94a3b8;
  font-weight: 500;
  margin-left: -2px;
}

.score-bar {
  width: 44px;
  height: 4px;
  background: #e4e4e7;
  border-radius: 100px;
  overflow: hidden;
  margin-top: 2px;
}

.score-bar-fill {
  height: 100%;
  border-radius: 100px;
  transition: width 0.6s ease;
}

.score-bar-ca {
  background: linear-gradient(90deg, #5b21f5, #7c6aff);
}

.score-bar-exam {
  background: linear-gradient(90deg, #ec4899, #f472b6);
}

/* Total cell */
.total-cell {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.total-value {
  font-size: 16px;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.5px;
  font-variant-numeric: tabular-nums;
}

/* Grade cell */
.grade-wrap {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.grade-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  height: 32px;
  padding: 0 12px;
  font-size: 13px;
  font-weight: 800;
  border-radius: 10px;
  letter-spacing: -0.3px;
  border: 1px solid;
}

.grade-point {
  font-size: 11px;
  font-weight: 700;
  color: #94a3b8;
  font-variant-numeric: tabular-nums;
}

/* ═══════════════ CHART ═══════════════ */
.chart-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  padding: 12px 16px;
  background: #fafbfc;
  border-radius: 12px;
  margin-bottom: 16px;
}

.chart-stat-label {
  font-size: 10px;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}

.chart-stat-value-row {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.chart-stat-value {
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.5px;
}

.chart-stat-change {
  font-size: 11px;
  font-weight: 700;
}

.chart-stat-change.up {
  color: #15803d;
}

.chart-wrap {
  position: relative;
}

.chart-svg {
  width: 100%;
  height: auto;
  display: block;
}

.chart-legend {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin-top: 8px;
  padding-top: 12px;
  border-top: 1px solid #f1f5f9;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.legend-line {
  width: 20px;
  height: 2px;
  border-radius: 2px;
}

.legend-line-solid { background: #5b21f5; }
.legend-line-dashed {
  background: repeating-linear-gradient(
    90deg,
    #ec4899 0,
    #ec4899 4px,
    transparent 4px,
    transparent 7px
  );
}

.legend-label {
  font-size: 11px;
  font-weight: 600;
  color: #64748b;
}

/* ═══════════════════════════════════════════════════════════════════════════
   TABLE SECTION — New Design
   ═══════════════════════════════════════════════════════════════════════════ */

/* ── Table section wrapper ─────────────────────────────────────────────── */
.table-section {
  margin-bottom: 16px;
}

/* ── TOP BAR ───────────────────────────────────────────────────────────── */
.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  gap: 16px;
  flex-wrap: wrap;
}

.top-stats {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stat-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px 6px 6px;
  background: #eef0ff;
  border-radius: 100px;
  font-size: 12px;
  font-weight: 600;
  color: #475569;
}

.stat-pill-dark {
  background: #5b5cf6;
  color: rgba(255, 255, 255, 0.85);
}

.stat-pill-value {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  height: 28px;
  padding: 0 10px;
  background: white;
  border-radius: 100px;
  font-size: 13px;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.3px;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.08);
}

.stat-pill-dark .stat-pill-value {
  background: white;
  color: #0f172a;
}

.stat-pill-label {
  font-size: 12px;
  font-weight: 600;
}

.top-actions {
  display: flex;
  align-items: center;
  gap: 4px;
}

.action-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
  background: white;
  border: 1px solid #e2e8f0;
  padding: 7px 14px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-link:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
  color: #5b5cf6;
}

/* ── TABLE CARD ────────────────────────────────────────────────────────── */
.table-card {
  background: #eef0ff;
  border-radius: 24px;
  padding: 8px;
  margin-bottom: 16px;
  box-shadow: 0 4px 20px rgba(91, 92, 246, 0.15);
}

/* ── FILTER BAR ────────────────────────────────────────────────────────── */
.filter-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 12px 16px;
}

.filter-pills {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  flex: 1;
}

.filter-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 600;
  color: #475569;
  background: white;
  border: 1px solid transparent;
  padding: 7px 14px;
  border-radius: 100px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
}

.filter-pill:hover {
  border-color: #5b5cf6;
  color: #5b5cf6;
}

.search-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: white;
  border: 1px solid transparent;
  padding: 7px 14px;
  border-radius: 100px;
  min-width: 200px;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
}

.search-pill:focus-within {
  border-color: #5b5cf6;
  box-shadow: 0 0 0 3px rgba(91, 92, 246, 0.08);
}

.search-pill-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 12px;
  font-weight: 500;
  color: #0f172a;
  font-family: inherit;
}

.search-pill-input::placeholder {
  color: #94a3b8;
}

.filter-actions {
  display: flex;
  align-items: center;
  gap: 6px;
}

.action-icon-btn {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.06);
}

.action-icon-btn:hover {
  background: #5b5cf6;
  color: white;
  transform: translateY(-1px);
}

.export-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  color: #0f172a;
  background: white;
  border: none;
  padding: 8px 16px;
  border-radius: 100px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.06);
}

.export-btn:hover {
  background: #5b5cf6;
  color: white;
  transform: translateY(-1px);
}

/* ── TABLE ─────────────────────────────────────────────────────────────── */
.table-wrap {
  background: white;
  border-radius: 18px;
  overflow: hidden;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table thead tr {
  background: white;
  border-bottom: 1px solid #f1f5f9;
}

.data-table th {
  padding: 14px 16px;
  font-size: 11px;
  font-weight: 600;
  color: #94a3b8;
  text-align: left;
  letter-spacing: 0.2px;
  user-select: none;
  cursor: pointer;
  white-space: nowrap;
}

.th-check {
  width: 48px;
  padding-left: 20px !important;
  cursor: default;
}

.th-right {
  text-align: right;
  padding-right: 20px !important;
}

.th-content {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: color 0.2s;
}

.data-table th:hover .th-content {
  color: #5b5cf6;
}

.data-row {
  border-bottom: 1px solid #f1f5f9;
  transition: all 0.2s ease;
  cursor: pointer;
}

.data-row:last-child {
  border-bottom: none;
}

.data-row:hover {
  background: #fafbfc;
}

.data-row-selected {
  background: #eef0ff !important;
  position: relative;
}

.data-row-selected::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: #5b5cf6;
}

.data-row td {
  padding: 14px 16px;
  vertical-align: middle;
}

.td-check {
  width: 48px;
  padding-left: 20px !important;
}

.td-right {
  text-align: right;
  padding-right: 20px !important;
}

/* Cell content */
.name-cell {
  display: flex;
  align-items: center;
  gap: 10px;
}

.row-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  background: #f1f5f9;
  flex-shrink: 0;
}

.cell-strong {
  font-size: 13px;
  font-weight: 700;
  color: #0f172a;
  letter-spacing: -0.2px;
}

.cell-text {
  font-size: 13px;
  font-weight: 500;
  color: #475569;
}

.venue-cell {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.venue-flag {
  font-size: 14px;
  line-height: 1;
}

.score-cell-inline,
.total-cell-inline {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.score-max-inline {
  font-size: 11px;
  font-weight: 500;
  color: #94a3b8;
}

/* ── CHECKBOX ──────────────────────────────────────────────────────────── */
.checkbox-wrap {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  position: relative;
}

.checkbox-wrap input[type='checkbox'] {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.checkbox-box {
  width: 18px;
  height: 18px;
  border-radius: 6px;
  border: 1.5px solid #cbd5e1;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
}

.checkbox-wrap:hover .checkbox-box {
  border-color: #5b5cf6;
}

.checkbox-wrap input:checked + .checkbox-box {
  background: #0f172a;
  border-color: #0f172a;
}

.checkbox-wrap input:checked + .checkbox-box::after {
  content: '';
  width: 9px;
  height: 5px;
  border-left: 2px solid white;
  border-bottom: 2px solid white;
  transform: rotate(-45deg) translate(1px, -1px);
}

.checkbox-wrap input:indeterminate + .checkbox-box {
  background: #0f172a;
  border-color: #0f172a;
}

.checkbox-wrap input:indeterminate + .checkbox-box::after {
  content: '';
  width: 9px;
  height: 2px;
  background: white;
  border-radius: 1px;
}

/* ── STATUS PILL ───────────────────────────────────────────────────────── */
.status-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border-radius: 100px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1px;
}

.status-pill-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

/* ═══════════════ RESPONSIVE ═══════════════ */
@media (max-width: 1400px) {
  .row-hero-kpi { grid-template-columns: 1fr; }
  .kpi-grid { grid-template-columns: repeat(4, 1fr); }
  .kpi-card { min-height: 160px; }
  .hero-card { min-height: 220px; }
}

@media (max-width: 1200px) {
  .reg-banner {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .reg-credits {
    border: none;
    padding: 16px 0;
    border-top: 1px solid rgba(59, 130, 246, 0.08);
    border-bottom: 1px solid rgba(59, 130, 246, 0.08);
  }
  .reg-cta {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 1024px) {
  .row-two { grid-template-columns: 1fr; }
  .top-bar { flex-direction: column; align-items: stretch; }
  .filter-bar { flex-direction: column; align-items: stretch; }
  .filter-actions { justify-content: flex-end; }
}

@media (max-width: 768px) {
  .kpi-grid { grid-template-columns: repeat(2, 1fr); }
  .table-wrap { overflow-x: auto; }
  .data-table { min-width: 900px; }
}

@media (max-width: 640px) {
  .reg-credits {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }
  .reg-credits-display { text-align: left; }
  .reg-credits-numbers { justify-content: flex-start; }
}
</style>
