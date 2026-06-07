<script setup>
const students = [
  { id: 'CS2025012', name: 'Kwame Asante', assign1: 85, midSem: 78, exam: '-', total: '-', grade: '-' },
  { id: 'CS2025015', name: 'Abena Mensah', assign1: 90, midSem: 82, exam: '-', total: '-', grade: '-' },
  { id: 'CS2025018', name: 'Kofi Owusu', assign1: 65, midSem: 55, exam: '-', total: '-', grade: '-' },
  { id: 'CS2025022', name: 'Ama Serwaa', assign1: 72, midSem: 68, exam: '-', total: '-', grade: '-' },
  { id: 'CS2025029', name: 'Yaw Osei', assign1: 88, midSem: 85, exam: '-', total: '-', grade: '-' },
]

const courses = ['COSC201', 'COSC305', 'COSC401']
</script>

<template>
  <div class="space-y-6 max-w-7xl mx-auto pb-10">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-text mb-1">Results & Gradebook</h1>
        <p class="text-muted font-medium">Record and submit student grades for your courses.</p>
      </div>
      <div class="flex gap-2">
        <button class="px-4 py-2 border border-border text-text hover:bg-page rounded-xl font-bold transition-all shadow-sm">
          Export CSV
        </button>
        <button class="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold shadow-panel transition-all">
          Submit to Registry
        </button>
      </div>
    </div>

    <div class="card-soft overflow-hidden">
      <!-- Controls -->
      <div class="p-5 border-b border-border bg-page flex flex-wrap items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <select class="bg-surface border border-border rounded-lg px-4 py-2 text-sm font-bold text-text outline-none focus:border-primary shadow-sm">
            <option v-for="c in courses" :key="c" :value="c">{{ c }} - Main View</option>
          </select>
        </div>
        <div class="flex items-center gap-4 text-sm font-semibold">
          <p class="text-muted"><span class="text-text font-bold">120</span> Students</p>
          <div class="w-px h-4 bg-border"></div>
          <p class="text-muted">Status: <span class="text-warning font-bold">Draft</span></p>
        </div>
      </div>
      
      <!-- Gradebook Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-soft border-b border-border">
            <tr>
              <th class="py-3 px-6 text-left font-semibold text-muted sticky left-0 bg-soft border-r border-border">Student ID</th>
              <th class="py-3 px-6 text-left font-semibold text-muted">Name</th>
              <th class="py-3 px-4 text-center font-semibold text-muted">Assign 1 (10%)</th>
              <th class="py-3 px-4 text-center font-semibold text-muted">Mid Sem (30%)</th>
              <th class="py-3 px-4 text-center font-semibold text-muted">Exam (60%)</th>
              <th class="py-3 px-4 text-center font-semibold text-primary bg-primary/5">Total (100%)</th>
              <th class="py-3 px-6 text-center font-semibold text-muted">Grade</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border">
            <tr v-for="std in students" :key="std.id" class="hover:bg-page transition-colors">
              <td class="py-3 px-6 font-mono text-xs font-bold text-muted sticky left-0 bg-white border-r border-border group-hover:bg-page transition-colors">{{ std.id }}</td>
              <td class="py-3 px-6 font-bold text-text whitespace-nowrap">{{ std.name }}</td>
              <td class="py-2 px-4 text-center">
                <input type="text" :value="std.assign1" class="w-14 text-center bg-surface border border-border rounded px-2 py-1 text-sm font-semibold focus:border-primary focus:ring-1 focus:ring-primary outline-none">
              </td>
              <td class="py-2 px-4 text-center">
                <input type="text" :value="std.midSem" class="w-14 text-center bg-surface border border-border rounded px-2 py-1 text-sm font-semibold focus:border-primary focus:ring-1 focus:ring-primary outline-none">
              </td>
              <td class="py-2 px-4 text-center">
                <input type="text" :value="std.exam" class="w-14 text-center bg-surface border border-border rounded px-2 py-1 text-sm font-semibold focus:border-primary focus:ring-1 focus:ring-primary outline-none placeholder-muted" placeholder="-">
              </td>
              <td class="py-3 px-4 text-center font-black text-primary bg-primary/5">
                {{ std.total }}
              </td>
              <td class="py-3 px-6 text-center font-bold text-muted">
                {{ std.grade }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="p-4 bg-page border-t border-border flex justify-between items-center text-sm font-medium text-muted">
        <p>Showing 5 of 120 entries</p>
        <button class="px-4 py-2 border border-border rounded-lg bg-surface hover:bg-page transition-colors">Save Draft</button>
      </div>
    </div>
  </div>
</template>