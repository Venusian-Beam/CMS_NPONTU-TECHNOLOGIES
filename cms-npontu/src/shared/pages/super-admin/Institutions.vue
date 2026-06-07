<script setup>
const institutions = [
  { id: 'INS-0045', name: 'ELEVA University', type: 'University', plan: 'Enterprise', users: '14,250', status: 'Active', renewal: 'Dec 2025' },
  { id: 'INS-0046', name: 'Global Tech Institute', type: 'College', plan: 'Pro', users: '3,200', status: 'Onboarding', renewal: 'Oct 2026' },
  { id: 'INS-0047', name: 'Standard Business School', type: 'Business School', plan: 'Basic', users: '850', status: 'Suspended', renewal: 'Past Due' },
  { id: 'INS-0048', name: 'National Academy of Arts', type: 'Academy', plan: 'Pro', users: '1,500', status: 'Active', renewal: 'Jan 2026' },
]

const getStatusColor = (s) => {
  if (s === 'Active') return 'text-success bg-success-bg'
  if (s === 'Onboarding') return 'text-info bg-info-bg'
  if (s === 'Suspended') return 'text-danger bg-danger-bg'
  return 'text-warning bg-warning-bg'
}
</script>

<template>
  <div class="space-y-6 max-w-7xl mx-auto pb-10">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-text mb-1">Tenants & Institutions</h1>
        <p class="text-muted font-medium">Manage all registered institutions on the platform.</p>
      </div>
      <div class="flex gap-2">
        <button class="px-5 py-2.5 bg-gray-900 hover:bg-black text-white rounded-xl font-bold shadow-panel transition-all">
          + Add Institution
        </button>
      </div>
    </div>

    <div class="card-soft overflow-hidden">
      <!-- Controls -->
      <div class="p-5 border-b border-border bg-page flex flex-wrap items-center justify-between gap-4">
        <div class="flex gap-3">
          <input type="text" placeholder="Search institution..." class="bg-surface border border-border rounded-lg px-4 py-2 text-sm outline-none focus:border-gray-900 shadow-sm min-w-[250px]">
          <select class="bg-surface border border-border rounded-lg px-4 py-2 text-sm font-bold text-text outline-none focus:border-gray-900 shadow-sm">
            <option>All Types</option>
            <option>University</option>
            <option>College</option>
            <option>Academy</option>
          </select>
          <select class="bg-surface border border-border rounded-lg px-4 py-2 text-sm font-bold text-text outline-none focus:border-gray-900 shadow-sm">
            <option>All Statuses</option>
            <option>Active</option>
            <option>Onboarding</option>
            <option>Suspended</option>
          </select>
        </div>
      </div>
      
      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-soft border-b border-border">
            <tr>
              <th class="py-4 px-6 text-left font-semibold text-muted">Institution Details</th>
              <th class="py-4 px-6 text-left font-semibold text-muted">Plan</th>
              <th class="py-4 px-6 text-center font-semibold text-muted">Active Users</th>
              <th class="py-4 px-6 text-center font-semibold text-muted">Status</th>
              <th class="py-4 px-6 text-left font-semibold text-muted">Renewal</th>
              <th class="py-4 px-6 text-right font-semibold text-muted">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border">
            <tr v-for="ins in institutions" :key="ins.id" class="hover:bg-page transition-colors">
              <td class="py-4 px-6">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-gray-900 text-white flex items-center justify-center font-bold">
                    {{ ins.name.charAt(0) }}
                  </div>
                  <div>
                    <p class="font-bold text-text">{{ ins.name }}</p>
                    <p class="text-xs font-medium text-muted">{{ ins.type }} · <span class="font-mono text-[10px]">{{ ins.id }}</span></p>
                  </div>
                </div>
              </td>
              <td class="py-4 px-6">
                <span class="inline-block px-2 py-0.5 rounded border border-border bg-page text-[10px] font-bold uppercase tracking-wider text-text">
                  {{ ins.plan }}
                </span>
              </td>
              <td class="py-4 px-6 text-center font-bold text-muted">{{ ins.users }}</td>
              <td class="py-4 px-6 text-center">
                <span class="inline-block px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider" :class="getStatusColor(ins.status)">
                  {{ ins.status }}
                </span>
              </td>
              <td class="py-4 px-6 text-xs font-semibold" :class="ins.renewal === 'Past Due' ? 'text-danger' : 'text-muted'">
                {{ ins.renewal }}
              </td>
              <td class="py-4 px-6 text-right">
                <button class="px-3 py-1.5 border border-border rounded-lg text-xs font-bold text-text hover:bg-page transition-colors">Manage</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="p-4 bg-page border-t border-border flex justify-between items-center text-sm font-medium text-muted">
        <p>Showing 1 to 4 of 45 entries</p>
      </div>
    </div>
  </div>
</template>