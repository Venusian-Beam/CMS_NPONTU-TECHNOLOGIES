<script setup>
const attendanceSummary = [
  { course: 'COSC201', title: 'Social & Ethical Issues in CS', totalClasses: 24, attended: 22, percentage: 91.6, status: 'Excellent' },
  { course: 'MATH203', title: 'Engineering Mathematics', totalClasses: 24, attended: 20, percentage: 83.3, status: 'Good' },
  { course: 'COSC205', title: 'Database Systems', totalClasses: 24, attended: 24, percentage: 100, status: 'Perfect' },
  { course: 'MATH201', title: 'Linear Algebra', totalClasses: 24, attended: 18, percentage: 75.0, status: 'Warning' },
  { course: 'STAT201', title: 'Probability & Statistics', totalClasses: 24, attended: 21, percentage: 87.5, status: 'Good' },
]

const recentAbsences = [
  { course: 'MATH201', date: 'Oct 14, 2025', reason: 'Medical Leave', approved: true },
  { course: 'MATH203', date: 'Oct 10, 2025', reason: 'Unexcused', approved: false },
]

const getStatusColor = (percentage) => {
  if (percentage >= 90) return 'text-success bg-success-bg'
  if (percentage >= 80) return 'text-info bg-info-bg'
  if (percentage >= 75) return 'text-warning bg-warning-bg'
  return 'text-danger bg-danger-bg'
}
</script>

<template>
  <div class="space-y-6 max-w-7xl mx-auto pb-10">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-text mb-1">Attendance</h1>
        <p class="text-muted font-medium">Monitor your class attendance and absences.</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Main Attendance Table -->
      <div class="lg:col-span-2 space-y-6">
        <div class="card-soft overflow-hidden">
          <div class="p-5 border-b border-border">
            <h2 class="font-bold text-lg text-text">Course Attendance</h2>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead class="bg-soft border-b border-border">
                <tr>
                  <th class="py-3 px-5 text-left font-semibold text-muted">Course</th>
                  <th class="py-3 px-5 text-center font-semibold text-muted">Classes</th>
                  <th class="py-3 px-5 text-center font-semibold text-muted">Attended</th>
                  <th class="py-3 px-5 text-left font-semibold text-muted">Progress</th>
                  <th class="py-3 px-5 text-right font-semibold text-muted">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-border">
                <tr v-for="item in attendanceSummary" :key="item.course" class="hover:bg-page transition-colors">
                  <td class="py-4 px-5">
                    <p class="font-bold text-text">{{ item.course }}</p>
                    <p class="text-xs font-medium text-muted mt-0.5">{{ item.title }}</p>
                  </td>
                  <td class="py-4 px-5 text-center font-bold text-text">{{ item.totalClasses }}</td>
                  <td class="py-4 px-5 text-center font-bold text-primary">{{ item.attended }}</td>
                  <td class="py-4 px-5 min-w-[150px]">
                    <div class="flex items-center gap-3">
                      <div class="h-2 flex-1 bg-surface border border-border rounded-full overflow-hidden">
                        <div class="h-full bg-primary rounded-full" :style="{ width: item.percentage + '%' }"></div>
                      </div>
                      <span class="text-xs font-bold text-text w-8">{{ item.percentage }}%</span>
                    </div>
                  </td>
                  <td class="py-4 px-5 text-right">
                    <span class="inline-block px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider" :class="getStatusColor(item.percentage)">
                      {{ item.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Absences Sidebar -->
      <div class="space-y-6">
        <div class="card-soft p-5 bg-gradient-to-br from-warning-bg to-amber-50">
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 rounded-full bg-warning/20 flex items-center justify-center text-warning text-xl shrink-0">
              ⚠️
            </div>
            <div>
              <h3 class="font-bold text-warning mb-1">Attendance Policy</h3>
              <p class="text-sm text-warning/80 font-medium leading-relaxed">
                A minimum of 75% attendance is required to sit for the final examination in any course.
              </p>
            </div>
          </div>
        </div>

        <div class="card-soft p-5">
          <h2 class="font-bold text-lg text-text mb-4">Recent Absences</h2>
          <div v-if="recentAbsences.length === 0" class="text-center py-6 text-muted font-medium text-sm border border-dashed border-border rounded-xl">
            No recent absences recorded.
          </div>
          <div v-else class="space-y-3">
            <div v-for="(abs, idx) in recentAbsences" :key="idx" class="p-3 border border-border rounded-xl bg-surface">
              <div class="flex items-center justify-between mb-2">
                <span class="font-bold text-sm text-text">{{ abs.course }}</span>
                <span class="text-xs font-medium text-muted">{{ abs.date }}</span>
              </div>
              <p class="text-sm text-muted mb-2">{{ abs.reason }}</p>
              <div class="flex items-center gap-1.5">
                <span v-if="abs.approved" class="text-[10px] font-bold uppercase tracking-wider text-success bg-success-bg px-2 py-0.5 rounded">Excused</span>
                <span v-else class="text-[10px] font-bold uppercase tracking-wider text-danger bg-danger-bg px-2 py-0.5 rounded">Unexcused</span>
              </div>
            </div>
          </div>
          <button class="w-full mt-4 py-2 border border-border text-sm font-bold text-text hover:bg-page rounded-lg transition-colors shadow-sm">
            Log an Excuse
          </button>
        </div>
      </div>

    </div>
  </div>
</template>