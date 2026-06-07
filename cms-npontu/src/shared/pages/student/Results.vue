<script setup>
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'

const semesters = [
  { id: '2025-sem1', label: '2025/2026 · Semester 1' },
  { id: '2024-sem2', label: '2024/2025 · Semester 2' },
  { id: '2024-sem1', label: '2024/2025 · Semester 1' },
]

const latestResults = [
  { code: 'COSC 101', title: 'Intro to Programming', ca: 35, exam: 52, total: 87, grade: 'A', gradeBg: '#ccfbf1', gradeColor: '#0d9488' },
  { code: 'MATH 101', title: 'Calculus I', ca: 28, exam: 45, total: 73, grade: 'B+', gradeBg: '#dbeafe', gradeColor: '#1d4ed8' },
  { code: 'PHYS 101', title: 'Mechanics', ca: 32, exam: 48, total: 80, grade: 'A-', gradeBg: '#ede9ff', gradeColor: '#5b21f5' },
  { code: 'ENGL 101', title: 'Communication Skills', ca: 25, exam: 40, total: 65, grade: 'B', gradeBg: '#fef3c7', gradeColor: '#b45309' },
]

// ── Selection & Search ───────────────────────────────────────────────────
const selectedResultIds = ref(new Set())
const resultSearchQuery = ref('')

const allResultsChecked = computed(() =>
  latestResults.length > 0 && selectedResultIds.value.size === latestResults.length
)
const someResultsChecked = computed(() =>
  selectedResultIds.value.size > 0 && !allResultsChecked.value
)

const toggleResultSelect = (id) => {
  const set = new Set(selectedResultIds.value)
  if (set.has(id)) set.delete(id)
  else set.add(id)
  selectedResultIds.value = set
}

const toggleAllResults = () => {
  if (allResultsChecked.value) selectedResultIds.value = new Set()
  else selectedResultIds.value = new Set(latestResults.map((_, i) => i))
}

const filteredResults = computed(() => {
  const q = resultSearchQuery.value.toLowerCase()
  if (!q) return latestResults
  return latestResults.filter(r =>
    r.code.toLowerCase().includes(q) ||
    r.title.toLowerCase().includes(q)
  )
})

const getGradeStyle = (grade) => {
  const styles = {
    'A':  { bg: 'linear-gradient(135deg, #ccfbf1, #99f6e4)', color: '#0d9488', border: 'rgba(20, 184, 166, 0.2)' },
    'A-': { bg: 'linear-gradient(135deg, #d4cafd, #c4b5fd)', color: '#5b21f5', border: 'rgba(91, 33, 245, 0.2)' },
    'B+': { bg: 'linear-gradient(135deg, #dbeafe, #bfdbfe)', color: '#1d4ed8', border: 'rgba(29, 78, 216, 0.2)' },
    'B':  { bg: 'linear-gradient(135deg, #fef3c7, #fde68a)', color: '#b45309', border: 'rgba(180, 83, 9, 0.2)' },
    'C':  { bg: 'linear-gradient(135deg, #ffedd5, #fed7aa)', color: '#c2410c', border: 'rgba(194, 65, 12, 0.2)' },
    'D':  { bg: 'linear-gradient(135deg, #fee2e2, #fecaca)', color: '#b91c1c', border: 'rgba(185, 28, 28, 0.2)' },
  }
  return styles[grade] || styles['B']
}
</script>

<template>
  <div class="page-wrap">
    <!-- ═══════════════ PAGE HEADER ═══════════════ -->
    <div class="page-header">
      <p class="breadcrumb">
        <span>Home</span>
        <Icon icon="heroicons:chevron-right" width="11" />
        <span class="breadcrumb-current">Results</span>
      </p>
      <div class="header-row">
        <div>
          <h1 class="page-title">Academic Results</h1>
          <p class="page-subtitle">View your grades and academic performance history.</p>
        </div>
        <div class="header-actions">
          <select class="semester-select">
            <option v-for="sem in semesters" :key="sem.id" :value="sem.id">{{ sem.label }}</option>
          </select>
          <button class="export-btn">
            <Icon icon="heroicons:printer" width="13" />
            Print
          </button>
        </div>
      </div>
    </div>

    <!-- ═══════════════ SUMMARY CARDS ═══════════════ -->
    <div class="summary-grid">
      <div class="summary-card">
        <div class="summary-card-accent" style="background: #5b5cf6;"></div>
        <p class="summary-card-label">Semester GPA</p>
        <p class="summary-card-value">3.65</p>
      </div>
      <div class="summary-card">
        <div class="summary-card-accent" style="background: #22c55e;"></div>
        <p class="summary-card-label">Cumulative GPA</p>
        <p class="summary-card-value">3.75</p>
      </div>
      <div class="summary-card">
        <div class="summary-card-accent" style="background: #3b82f6;"></div>
        <p class="summary-card-label">Credits Earned</p>
        <p class="summary-card-value">15 <span class="summary-card-sub">/ 15</span></p>
      </div>
      <div class="summary-card">
        <div class="summary-card-accent" style="background: #a855f7;"></div>
        <p class="summary-card-label">Class</p>
        <p class="summary-card-value" style="font-size: 18px;">First Class</p>
      </div>
    </div>

    <!-- ═══════════════ RESULTS TABLE ═══════════════ -->
    <div class="table-card">
      <!-- FILTER BAR -->
      <div class="filter-bar">
        <div class="filter-pills">
          <button class="filter-pill">
            Semester
            <Icon icon="heroicons:chevron-down" width="11" />
          </button>
          <button class="filter-pill">
            Grade
            <Icon icon="heroicons:chevron-down" width="11" />
          </button>

          <div class="search-pill">
            <Icon icon="heroicons:magnifying-glass" width="14" color="#94a3b8" />
            <input
              v-model="resultSearchQuery"
              type="text"
              placeholder="Search results"
              class="search-pill-input"
            />
          </div>
        </div>

        <div class="filter-actions">
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
                  <input type="checkbox" :checked="allResultsChecked" :indeterminate.prop="someResultsChecked" @change="toggleAllResults" />
                  <span class="checkbox-box"></span>
                </label>
              </th>
              <th>
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
              <th class="th-right">
                <span class="th-content">CA</span>
              </th>
              <th class="th-right">
                <span class="th-content">Exam</span>
              </th>
              <th class="th-right">
                <span class="th-content">Total</span>
              </th>
              <th class="th-right">
                <span class="th-content">Grade</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(r, i) in filteredResults" :key="i" class="data-row" :class="{ 'data-row-selected': selectedResultIds.has(i) }" @click="toggleResultSelect(i)">
              <td class="td-check" @click.stop>
                <label class="checkbox-wrap">
                  <input type="checkbox" :checked="selectedResultIds.has(i)" @change="toggleResultSelect(i)" />
                  <span class="checkbox-box"></span>
                </label>
              </td>
              <td><span class="cell-strong">{{ r.code }}</span></td>
              <td><span class="cell-text">{{ r.title }}</span></td>
              <td class="td-right">
                <div class="score-cell-inline">
                  <span class="cell-strong">{{ r.ca }}</span>
                  <span class="score-max-inline">/{{ r.caMax || 40 }}</span>
                </div>
              </td>
              <td class="td-right">
                <div class="score-cell-inline">
                  <span class="cell-strong">{{ r.exam }}</span>
                  <span class="score-max-inline">/{{ r.examMax || 60 }}</span>
                </div>
              </td>
              <td class="td-right">
                <div class="total-cell-inline">
                  <span class="cell-strong">{{ r.total }}</span>
                  <Icon v-if="r.trend === 'up'" icon="heroicons:arrow-trending-up" width="13" color="#22c55e" />
                  <Icon v-else-if="r.trend === 'down'" icon="heroicons:arrow-trending-down" width="13" color="#ef4444" />
                  <Icon v-else icon="heroicons:minus" width="13" color="#cbd5e1" />
                </div>
              </td>
              <td class="td-right">
                <span class="grade-pill" :style="{ background: getGradeStyle(r.grade).bg, color: getGradeStyle(r.grade).color, borderColor: getGradeStyle(r.grade).border }">
                  {{ r.grade }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ═══════════════════════════════════════════════════════════════════════════
   PAGE WRAP
   ═══════════════════════════════════════════════════════════════════════════ */
.page-wrap {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
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
  color: #5b5cf6;
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
}

.page-subtitle {
  font-size: 13px;
  font-weight: 500;
  color: #94a3b8;
}

.header-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

.semester-select {
  background: white;
  border: 1px solid #e2e8f0;
  color: #475569;
  font-size: 12px;
  font-weight: 600;
  padding: 8px 14px;
  border-radius: 10px;
  outline: none;
  font-family: inherit;
  cursor: pointer;
}

.semester-select:focus {
  border-color: #5b5cf6;
}

/* ═══════════════ SUMMARY GRID ═══════════════ */
.summary-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 20px;
}

.summary-card {
  background: white;
  border-radius: 14px;
  padding: 16px 20px;
  border: 1px solid #f1f5f9;
  position: relative;
  overflow: hidden;
}

.summary-card-accent {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  border-radius: 0 4px 4px 0;
}

.summary-card-label {
  font-size: 11px;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
}

.summary-card-value {
  font-size: 26px;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.5px;
}

.summary-card-sub {
  font-size: 14px;
  font-weight: 600;
  color: #94a3b8;
}

/* ═══════════════ TABLE CARD ═══════════════ */
.table-card {
  background: #eef0ff;
  border-radius: 24px;
  padding: 8px;
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

/* ── GRADE PILL ────────────────────────────────────────────────────────── */
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

/* ═══════════════ RESPONSIVE ═══════════════ */
@media (max-width: 1024px) {
  .summary-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .table-wrap { overflow-x: auto; }
  .data-table { min-width: 700px; }
}

@media (max-width: 640px) {
  .header-row { flex-direction: column; align-items: stretch; }
  .header-actions { justify-content: flex-end; }
  .summary-grid { grid-template-columns: 1fr; }
}
</style>
