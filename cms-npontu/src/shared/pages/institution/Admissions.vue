<script setup>
const metrics = [
  { label: 'Total Applications', value: '3,450', trend: '+12% vs last year', color: 'blue' },
  { label: 'Pending Review', value: '845', trend: 'Needs action', color: 'orange' },
  { label: 'Offers Sent', value: '2,100', trend: '65% Acceptance Rate', color: 'green' },
  { label: 'Rejected', value: '505', trend: '14% Rejection Rate', color: 'red' },
]

const applications = [
  { id: 'APP-2025-001', name: 'John Doe', programme: 'BSc. Computer Science', status: 'Admitted', date: '2h ago', score: 'A' },
  { id: 'APP-2025-002', name: 'Jane Smith', programme: 'BA. Economics', status: 'Reviewing', date: '5h ago', score: 'B+' },
  { id: 'APP-2025-003', name: 'Peter Owusu', programme: 'BSc. Nursing', status: 'Pending', date: '1d ago', score: '-' },
  { id: 'APP-2025-004', name: 'Mary Mensah', programme: 'LLB Law', status: 'Admitted', date: '1d ago', score: 'A+' },
  { id: 'APP-2025-005', name: 'Kofi Annan', programme: 'BSc. Admin', status: 'Rejected', date: '2d ago', score: 'C' },
]

const getStatusColor = (status) => {
  if (status === 'Admitted') return 'bg-success-bg text-success'
  if (status === 'Reviewing') return 'bg-info-bg text-info'
  if (status === 'Rejected') return 'bg-danger-bg text-danger'
  return 'bg-warning-bg text-warning'
}
</script>

<template>
  <div class="space-y-6 max-w-7xl mx-auto pb-10">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-text mb-1">Admissions Management</h1>
        <p class="text-muted font-medium">Review applications and manage the enrollment process.</p>
      </div>
      <div class="flex gap-2">
        <button class="px-4 py-2 border border-border text-text hover:bg-page rounded-xl font-bold transition-all shadow-sm">
          Export Data
        </button>
        <button class="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold shadow-panel transition-all">
          Open Admission Portal
        </button>
      </div>
    </div>

    <!-- Metrics Grid -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="m in metrics" :key="m.label" class="card-soft p-5 border-l-4" :style="`border-left-color: var(--color-${m.color}-500, ${m.color === 'blue' ? '#3b82f6' : m.color === 'orange' ? '#f97316' : m.color === 'green' ? '#22c55e' : '#ef4444'})`">
        <p class="text-xs font-bold text-muted uppercase tracking-wider mb-1">{{ m.label }}</p>
        <p class="text-3xl font-black text-text">{{ m.value }}</p>
        <p class="text-xs font-medium text-muted mt-2">{{ m.trend }}</p>
      </div>
    </div>

    <div class="card-soft overflow-hidden">
      <!-- Controls -->
      <div class="p-5 border-b border-border bg-page flex flex-wrap items-center justify-between gap-4">
        <div class="flex gap-3">
          <input type="text" placeholder="Search applicant..." class="bg-surface border border-border rounded-lg px-4 py-2 text-sm outline-none focus:border-primary shadow-sm min-w-[200px]">
          <select class="bg-surface border border-border rounded-lg px-4 py-2 text-sm font-bold text-text outline-none focus:border-primary shadow-sm">
            <option>All Programmes</option>
            <option>Computer Science</option>
            <option>Business Admin</option>
          </select>
          <select class="bg-surface border border-border rounded-lg px-4 py-2 text-sm font-bold text-text outline-none focus:border-primary shadow-sm">
            <option>All Statuses</option>
            <option>Pending</option>
            <option>Reviewing</option>
            <option>Admitted</option>
          </select>
        </div>
      </div>
      
      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-soft border-b border-border">
            <tr>
              <th class="text-left font-semibold py-3 px-6 text-muted">Applicant ID / Name</th>
              <th class="text-left font-semibold py-3 px-6 text-muted">Programme Applied</th>
              <th class="text-center font-semibold py-3 px-6 text-muted">Interview Score</th>
              <th class="text-center font-semibold py-3 px-6 text-muted">Status</th>
              <th class="text-right font-semibold py-3 px-6 text-muted">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border">
            <tr v-for="app in applications" :key="app.id" class="hover:bg-page transition-colors">
              <td class="py-4 px-6">
                <p class="font-bold text-text">{{ app.name }}</p>
                <p class="text-[10px] font-mono text-muted mt-0.5">{{ app.id }}</p>
              </td>
              <td class="py-4 px-6 font-semibold text-text">{{ app.programme }}</td>
              <td class="py-4 px-6 text-center font-black text-text">{{ app.score }}</td>
              <td class="py-4 px-6 text-center">
                <span class="inline-block px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider" :class="getStatusColor(app.status)">
                  {{ app.status }}
                </span>
              </td>
              <td class="py-4 px-6 text-right">
                <button class="px-3 py-1.5 border border-border rounded-lg text-xs font-bold text-text hover:bg-page transition-colors">Review</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="p-4 bg-page border-t border-border flex justify-between items-center text-sm font-medium text-muted">
        <p>Showing 1 to 5 of 3,450 entries</p>
        <div class="flex gap-1">
          <button class="px-3 py-1 border border-border rounded hover:bg-surface disabled:opacity-50" disabled>&lt;</button>
          <button class="px-3 py-1 border border-border rounded bg-primary text-white">1</button>
          <button class="px-3 py-1 border border-border rounded hover:bg-surface">2</button>
          <button class="px-3 py-1 border border-border rounded hover:bg-surface">3</button>
          <button class="px-3 py-1 border border-border rounded hover:bg-surface">&gt;</button>
        </div>
      </div>
    </div>
  </div>
</template>