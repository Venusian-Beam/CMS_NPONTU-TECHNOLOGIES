<script setup>
const students = [
  { id: 'CS2025012', name: 'Kwame Asante', level: '200', programme: 'BSc. Computer Science', status: 'Active' },
  { id: 'CS2025015', name: 'Abena Mensah', level: '200', programme: 'BSc. Computer Science', status: 'Active' },
  { id: 'EC2025088', name: 'John Doe', level: '100', programme: 'BA. Economics', status: 'Inactive' },
  { id: 'NU2024102', name: 'Jane Smith', level: '300', programme: 'BSc. Nursing', status: 'Active' },
  { id: 'BA2023005', name: 'Peter Owusu', level: '400', programme: 'BSc. Admin', status: 'Graduated' },
]

const getStatusColor = (s) => {
  if (s === 'Active') return 'text-success bg-success-bg'
  if (s === 'Inactive') return 'text-warning bg-warning-bg'
  if (s === 'Graduated') return 'text-info bg-info-bg'
  return 'text-danger bg-danger-bg'
}
</script>

<template>
  <div class="space-y-6 max-w-7xl mx-auto pb-10">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-text mb-1">Student Directory</h1>
        <p class="text-muted font-medium">Manage all enrolled students across the institution.</p>
      </div>
      <div class="flex gap-2">
        <button class="px-4 py-2 border border-border text-text hover:bg-page rounded-xl font-bold transition-all shadow-sm">
          Import CSV
        </button>
        <button class="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold shadow-panel transition-all">
          + Add Student
        </button>
      </div>
    </div>

    <div class="card-soft overflow-hidden">
      <!-- Controls -->
      <div class="p-5 border-b border-border bg-page flex flex-wrap items-center justify-between gap-4">
        <div class="flex gap-3">
          <input type="text" placeholder="Search by name or ID..." class="bg-surface border border-border rounded-lg px-4 py-2 text-sm outline-none focus:border-primary shadow-sm min-w-[250px]">
          <select class="bg-surface border border-border rounded-lg px-4 py-2 text-sm font-bold text-text outline-none focus:border-primary shadow-sm">
            <option>All Faculties</option>
            <option>Faculty of Science</option>
            <option>Business School</option>
          </select>
          <select class="bg-surface border border-border rounded-lg px-4 py-2 text-sm font-bold text-text outline-none focus:border-primary shadow-sm">
            <option>All Levels</option>
            <option>Level 100</option>
            <option>Level 200</option>
            <option>Level 300</option>
            <option>Level 400</option>
          </select>
        </div>
      </div>
      
      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-soft border-b border-border">
            <tr>
              <th class="py-4 px-6 text-left font-semibold text-muted">Student Details</th>
              <th class="py-4 px-6 text-left font-semibold text-muted">Programme</th>
              <th class="py-4 px-6 text-center font-semibold text-muted">Level</th>
              <th class="py-4 px-6 text-center font-semibold text-muted">Status</th>
              <th class="py-4 px-6 text-right font-semibold text-muted">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border">
            <tr v-for="std in students" :key="std.id" class="hover:bg-page transition-colors">
              <td class="py-4 px-6">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {{ std.name.charAt(0) }}
                  </div>
                  <div>
                    <p class="font-bold text-text">{{ std.name }}</p>
                    <p class="font-mono text-xs text-muted">{{ std.id }}</p>
                  </div>
                </div>
              </td>
              <td class="py-4 px-6 font-semibold text-text">{{ std.programme }}</td>
              <td class="py-4 px-6 text-center font-bold text-muted">{{ std.level }}</td>
              <td class="py-4 px-6 text-center">
                <span class="inline-block px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider" :class="getStatusColor(std.status)">
                  {{ std.status }}
                </span>
              </td>
              <td class="py-4 px-6 text-right">
                <button class="p-2 text-muted hover:text-primary transition-colors">⚙️</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="p-4 bg-page border-t border-border flex justify-between items-center text-sm font-medium text-muted">
        <p>Showing 1 to 5 of 14,250 entries</p>
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