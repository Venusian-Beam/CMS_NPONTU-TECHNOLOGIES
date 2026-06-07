<script setup>
const students = [
  { id: 'CS2025012', name: 'Kwame Asante', level: '200', programme: 'BSc. Computer Science', status: 'Excellent Standing' },
  { id: 'CS2025015', name: 'Abena Mensah', level: '200', programme: 'BSc. Computer Science', status: 'Good Standing' },
  { id: 'CS2025018', name: 'Kofi Owusu', level: '200', programme: 'BSc. Computer Science', status: 'Academic Warning' },
  { id: 'CS2025022', name: 'Ama Serwaa', level: '200', programme: 'BSc. Computer Science', status: 'Good Standing' },
  { id: 'CS2025029', name: 'Yaw Osei', level: '200', programme: 'BSc. Computer Science', status: 'Excellent Standing' },
]

const getStatusColor = (s) => {
  if (s.includes('Excellent')) return 'text-success bg-success-bg'
  if (s.includes('Warning')) return 'text-danger bg-danger-bg'
  return 'text-info bg-info-bg'
}
</script>

<template>
  <div class="space-y-6 max-w-7xl mx-auto pb-10">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-text mb-1">My Students</h1>
        <p class="text-muted font-medium">Directory of students enrolled in your courses.</p>
      </div>
      <div class="flex gap-2">
        <input type="text" placeholder="Search by name or ID..." class="bg-surface border border-border rounded-xl px-4 py-2 text-sm outline-none focus:border-primary shadow-sm min-w-[250px]">
      </div>
    </div>

    <div class="card-soft overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-soft border-b border-border">
            <tr>
              <th class="py-4 px-6 text-left font-semibold text-muted">Student</th>
              <th class="py-4 px-6 text-left font-semibold text-muted">Programme / Level</th>
              <th class="py-4 px-6 text-left font-semibold text-muted">Status</th>
              <th class="py-4 px-6 text-right font-semibold text-muted">Action</th>
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
              <td class="py-4 px-6">
                <p class="font-semibold text-text">{{ std.programme }}</p>
                <p class="text-xs text-muted font-medium">Level {{ std.level }}</p>
              </td>
              <td class="py-4 px-6">
                <span class="inline-block px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider" :class="getStatusColor(std.status)">
                  {{ std.status }}
                </span>
              </td>
              <td class="py-4 px-6 text-right">
                <button class="px-3 py-1.5 border border-border rounded-lg text-xs font-bold text-text hover:bg-page transition-colors">Profile</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>