<script setup>
const staff = [
  { id: 'STF-2015-089', name: 'Dr. Ebenezer Baah', role: 'Senior Lecturer', dept: 'Computer Science', status: 'Active' },
  { id: 'STF-2018-102', name: 'Prof. Asare', role: 'HOD', dept: 'Computer Science', status: 'Active' },
  { id: 'STF-2020-045', name: 'Mrs. Janet Osei', role: 'Accountant', dept: 'Finance Office', status: 'Active' },
  { id: 'STF-2012-011', name: 'Mr. Kwame Mensah', role: 'Security Officer', dept: 'Estates', status: 'On Leave' },
  { id: 'STF-2022-090', name: 'Dr. Akua Serwaa', role: 'Lecturer', dept: 'Economics', status: 'Active' },
]

const getStatusColor = (s) => {
  if (s === 'Active') return 'text-success bg-success-bg'
  if (s === 'On Leave') return 'text-warning bg-warning-bg'
  return 'text-danger bg-danger-bg'
}
</script>

<template>
  <div class="space-y-6 max-w-7xl mx-auto pb-10">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-text mb-1">Staff Directory</h1>
        <p class="text-muted font-medium">Manage academic and non-academic staff.</p>
      </div>
      <div class="flex gap-2">
        <button class="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold shadow-panel transition-all">
          + Add Staff Member
        </button>
      </div>
    </div>

    <div class="card-soft overflow-hidden">
      <!-- Controls -->
      <div class="p-5 border-b border-border bg-page flex flex-wrap items-center justify-between gap-4">
        <div class="flex gap-3">
          <input type="text" placeholder="Search by name or ID..." class="bg-surface border border-border rounded-lg px-4 py-2 text-sm outline-none focus:border-primary shadow-sm min-w-[250px]">
          <select class="bg-surface border border-border rounded-lg px-4 py-2 text-sm font-bold text-text outline-none focus:border-primary shadow-sm">
            <option>All Departments</option>
            <option>Computer Science</option>
            <option>Finance Office</option>
            <option>Estates</option>
          </select>
          <select class="bg-surface border border-border rounded-lg px-4 py-2 text-sm font-bold text-text outline-none focus:border-primary shadow-sm">
            <option>All Roles</option>
            <option>Academic</option>
            <option>Non-Academic</option>
          </select>
        </div>
      </div>
      
      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-soft border-b border-border">
            <tr>
              <th class="py-4 px-6 text-left font-semibold text-muted">Staff Details</th>
              <th class="py-4 px-6 text-left font-semibold text-muted">Role</th>
              <th class="py-4 px-6 text-left font-semibold text-muted">Department</th>
              <th class="py-4 px-6 text-center font-semibold text-muted">Status</th>
              <th class="py-4 px-6 text-right font-semibold text-muted">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border">
            <tr v-for="s in staff" :key="s.id" class="hover:bg-page transition-colors">
              <td class="py-4 px-6">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-accent-blue/10 flex items-center justify-center text-accent-blue font-bold">
                    {{ s.name.charAt(0) }}
                  </div>
                  <div>
                    <p class="font-bold text-text">{{ s.name }}</p>
                    <p class="font-mono text-xs text-muted">{{ s.id }}</p>
                  </div>
                </div>
              </td>
              <td class="py-4 px-6 font-semibold text-text">{{ s.role }}</td>
              <td class="py-4 px-6 font-medium text-muted">{{ s.dept }}</td>
              <td class="py-4 px-6 text-center">
                <span class="inline-block px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider" :class="getStatusColor(s.status)">
                  {{ s.status }}
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
        <p>Showing 1 to 5 of 854 entries</p>
      </div>
    </div>
  </div>
</template>