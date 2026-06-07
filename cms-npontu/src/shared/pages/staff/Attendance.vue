<script setup>
const courses = [
  { id: 'COSC201', name: 'Social & Ethical Issues in CS' },
  { id: 'COSC305', name: 'Artificial Intelligence' },
  { id: 'COSC401', name: 'Software Engineering' },
]

const recentRegisters = [
  { course: 'COSC201', date: 'Oct 15, 2025', present: 115, absent: 5, total: 120, status: 'Logged' },
  { course: 'COSC305', date: 'Oct 14, 2025', present: 80, absent: 5, total: 85, status: 'Logged' },
  { course: 'COSC401', date: 'Oct 12, 2025', present: 200, absent: 45, total: 245, status: 'Draft' },
]

const students = [
  { id: 'CS2025012', name: 'Kwame Asante', status: 'Present', notes: '' },
  { id: 'CS2025015', name: 'Abena Mensah', status: 'Present', notes: '' },
  { id: 'CS2025018', name: 'Kofi Owusu', status: 'Absent', notes: 'Medical' },
  { id: 'CS2025022', name: 'Ama Serwaa', status: 'Late', notes: '15 mins' },
  { id: 'CS2025029', name: 'Yaw Osei', status: 'Present', notes: '' },
]

const getStatusColor = (s) => {
  if (s === 'Present') return 'bg-success-bg text-success'
  if (s === 'Absent') return 'bg-danger-bg text-danger'
  if (s === 'Late') return 'bg-warning-bg text-warning'
  return 'bg-surface text-text border border-border'
}
</script>

<template>
  <div class="space-y-6 max-w-7xl mx-auto pb-10">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-text mb-1">Attendance Management</h1>
        <p class="text-muted font-medium">Log and monitor student attendance for your courses.</p>
      </div>
      <button class="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold shadow-panel transition-all">
        Start New Session
      </button>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
      
      <!-- Current Session Entry -->
      <div class="xl:col-span-2 space-y-6">
        <div class="card-soft overflow-hidden">
          <div class="p-6 border-b border-border bg-page flex flex-wrap items-center justify-between gap-4">
            <div>
              <div class="flex gap-3 mb-2">
                <select class="bg-surface border border-border rounded-lg px-3 py-1.5 text-sm font-bold text-text outline-none focus:border-primary">
                  <option v-for="c in courses" :key="c.id" :value="c.id">{{ c.id }}</option>
                </select>
                <input type="date" value="2025-10-15" class="bg-surface border border-border rounded-lg px-3 py-1.5 text-sm font-bold text-text outline-none focus:border-primary">
              </div>
              <h2 class="font-bold text-lg text-text">Social & Ethical Issues in CS</h2>
            </div>
            <div class="flex gap-2">
              <button class="px-4 py-2 bg-surface border border-border text-text rounded-lg text-sm font-bold hover:bg-page transition-colors">Mark All Present</button>
            </div>
          </div>
          
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead class="bg-soft border-b border-border">
                <tr>
                  <th class="py-3 px-6 text-left font-semibold text-muted">Student ID</th>
                  <th class="py-3 px-6 text-left font-semibold text-muted">Name</th>
                  <th class="py-3 px-6 text-center font-semibold text-muted">Status</th>
                  <th class="py-3 px-6 text-left font-semibold text-muted">Notes</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-border">
                <tr v-for="std in students" :key="std.id" class="hover:bg-page transition-colors group">
                  <td class="py-3 px-6 font-mono text-xs font-bold text-muted">{{ std.id }}</td>
                  <td class="py-3 px-6 font-bold text-text">{{ std.name }}</td>
                  <td class="py-3 px-6 text-center">
                    <div class="inline-flex rounded-lg border border-border overflow-hidden bg-surface shadow-sm">
                      <button class="px-3 py-1 text-xs font-bold transition-colors" :class="std.status === 'Present' ? 'bg-success text-white' : 'hover:bg-page'">P</button>
                      <button class="px-3 py-1 text-xs font-bold border-l border-r border-border transition-colors" :class="std.status === 'Late' ? 'bg-warning text-white' : 'hover:bg-page'">L</button>
                      <button class="px-3 py-1 text-xs font-bold transition-colors" :class="std.status === 'Absent' ? 'bg-danger text-white' : 'hover:bg-page'">A</button>
                    </div>
                  </td>
                  <td class="py-3 px-6">
                    <input type="text" :value="std.notes" placeholder="Add note..." class="w-full bg-transparent border-b border-transparent focus:border-primary outline-none text-sm px-1 py-0.5 text-text placeholder-muted opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity">
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="p-4 border-t border-border bg-page flex justify-end">
            <button class="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-lg font-bold shadow-sm transition-all">Save Register</button>
          </div>
        </div>
      </div>

      <!-- History Sidebar -->
      <div class="space-y-6">
        <div class="card-soft p-5">
          <h3 class="font-bold text-lg text-text mb-4">Recent Registers</h3>
          <div class="space-y-3">
            <div v-for="(reg, idx) in recentRegisters" :key="idx" class="p-4 border border-border rounded-xl hover:border-primary/30 transition-colors cursor-pointer bg-surface relative overflow-hidden">
              <div v-if="reg.status === 'Draft'" class="absolute top-0 right-0 w-8 h-8 bg-warning text-white flex items-center justify-center -rotate-12 translate-x-3 -translate-y-3 shadow-sm" style="clip-path: polygon(0 0, 100% 0, 100% 100%);">
                <span class="absolute right-3 top-1.5 text-[8px] font-black rotate-12">!</span>
              </div>
              <div class="flex justify-between items-start mb-2">
                <div>
                  <p class="text-xs font-bold text-primary mb-0.5">{{ reg.course }}</p>
                  <p class="text-sm font-bold text-text">{{ reg.date }}</p>
                </div>
                <span class="text-[10px] font-bold uppercase px-2 py-0.5 rounded" :class="reg.status === 'Logged' ? 'bg-success-bg text-success' : 'bg-warning-bg text-warning'">{{ reg.status }}</span>
              </div>
              <div class="flex items-center gap-4 text-xs font-medium">
                <span class="text-success">{{ reg.present }} Present</span>
                <span class="text-danger">{{ reg.absent }} Absent</span>
                <span class="text-muted">{{ reg.total }} Total</span>
              </div>
            </div>
          </div>
        </div>

        <div class="card-soft p-5 bg-gradient-to-br from-primary-light to-blue-50 border-primary/20">
          <h3 class="font-bold text-primary mb-2">Generate Report</h3>
          <p class="text-sm text-text font-medium mb-4">Download attendance summaries for examination clearance.</p>
          <button class="w-full py-2 bg-white text-primary border border-primary/20 font-bold rounded-lg shadow-sm hover:shadow-md transition-shadow">Download PDF</button>
        </div>
      </div>

    </div>
  </div>
</template>