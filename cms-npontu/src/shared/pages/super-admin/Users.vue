<script setup>
const users = [
  { id: 'USR-8901', name: 'Osei Tutu', role: 'Institution Admin', institution: 'ELEVA University', lastLogin: '10 mins ago', status: 'Active' },
  { id: 'USR-8902', name: 'Sarah Mensah', role: 'System Admin', institution: 'Global Tech Institute', lastLogin: '2 hours ago', status: 'Active' },
  { id: 'USR-8903', name: 'David Appiah', role: 'Support Agent', institution: 'ELEVA Support', lastLogin: '1 day ago', status: 'Inactive' },
  { id: 'USR-8904', name: 'James Ofori', role: 'Institution Admin', institution: 'Standard Business School', lastLogin: '1 month ago', status: 'Suspended' },
]

const getStatusColor = (s) => {
  if (s === 'Active') return 'text-success bg-success-bg'
  if (s === 'Inactive') return 'text-warning bg-warning-bg'
  return 'text-danger bg-danger-bg'
}
</script>

<template>
  <div class="space-y-6 max-w-7xl mx-auto pb-10">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-text mb-1">Global User Directory</h1>
        <p class="text-muted font-medium">Manage administrative and support users across all tenants.</p>
      </div>
      <div class="flex gap-2">
        <button class="px-5 py-2.5 bg-gray-900 hover:bg-black text-white rounded-xl font-bold shadow-panel transition-all">
          + Add User
        </button>
      </div>
    </div>

    <div class="card-soft overflow-hidden">
      <!-- Controls -->
      <div class="p-5 border-b border-border bg-page flex flex-wrap items-center justify-between gap-4">
        <div class="flex gap-3">
          <input type="text" placeholder="Search by name, email or ID..." class="bg-surface border border-border rounded-lg px-4 py-2 text-sm outline-none focus:border-gray-900 shadow-sm min-w-[250px]">
          <select class="bg-surface border border-border rounded-lg px-4 py-2 text-sm font-bold text-text outline-none focus:border-gray-900 shadow-sm">
            <option>All Roles</option>
            <option>Institution Admin</option>
            <option>System Admin</option>
            <option>Support Agent</option>
          </select>
          <select class="bg-surface border border-border rounded-lg px-4 py-2 text-sm font-bold text-text outline-none focus:border-gray-900 shadow-sm">
            <option>All Institutions</option>
            <option>ELEVA University</option>
            <option>Global Tech Institute</option>
          </select>
        </div>
      </div>
      
      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-soft border-b border-border">
            <tr>
              <th class="py-4 px-6 text-left font-semibold text-muted">User Details</th>
              <th class="py-4 px-6 text-left font-semibold text-muted">Role & Institution</th>
              <th class="py-4 px-6 text-center font-semibold text-muted">Last Login</th>
              <th class="py-4 px-6 text-center font-semibold text-muted">Status</th>
              <th class="py-4 px-6 text-right font-semibold text-muted">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border">
            <tr v-for="user in users" :key="user.id" class="hover:bg-page transition-colors">
              <td class="py-4 px-6">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center text-text font-bold shadow-sm">
                    {{ user.name.charAt(0) }}
                  </div>
                  <div>
                    <p class="font-bold text-text">{{ user.name }}</p>
                    <p class="font-mono text-xs text-muted">{{ user.id }}</p>
                  </div>
                </div>
              </td>
              <td class="py-4 px-6">
                <p class="font-semibold text-text">{{ user.role }}</p>
                <p class="text-xs text-muted font-medium">{{ user.institution }}</p>
              </td>
              <td class="py-4 px-6 text-center font-medium text-muted">{{ user.lastLogin }}</td>
              <td class="py-4 px-6 text-center">
                <span class="inline-block px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider" :class="getStatusColor(user.status)">
                  {{ user.status }}
                </span>
              </td>
              <td class="py-4 px-6 text-right">
                <button class="px-3 py-1.5 border border-border rounded-lg text-xs font-bold text-text hover:bg-page transition-colors">Manage</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="p-4 bg-page border-t border-border flex justify-between items-center text-sm font-medium text-muted">
        <p>Showing 1 to 4 of 1,205 admin users</p>
      </div>
    </div>
  </div>
</template>