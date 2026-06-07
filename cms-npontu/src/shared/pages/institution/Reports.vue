<script setup>
const reportsList = [
  { category: 'Admissions', icon: '📝', items: ['Enrollment Demographics', 'Application Trends', 'Admission Yield Rate'] },
  { category: 'Academics', icon: '🎓', items: ['Course Performance Analysis', 'Graduation Rates', 'Faculty Workload'] },
  { category: 'Finance', icon: '💰', items: ['Revenue Summary', 'Outstanding Fees', 'Financial Aid Distribution'] },
  { category: 'System & Audit', icon: '⚙️', items: ['User Activity Logs', 'System Error Reports', 'Data Export Logs'] },
]
</script>

<template>
  <div class="space-y-6 max-w-7xl mx-auto pb-10">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-text mb-1">Reports & Analytics</h1>
        <p class="text-muted font-medium">Generate institutional reports and data insights.</p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div v-for="(cat, idx) in reportsList" :key="idx" class="card-soft p-6 border-t-4 border-t-primary">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-xl shadow-sm">
            {{ cat.icon }}
          </div>
          <h2 class="font-bold text-lg text-text">{{ cat.category }} Reports</h2>
        </div>
        
        <div class="space-y-3">
          <div v-for="(item, i) in cat.items" :key="i" class="p-4 border border-border rounded-xl hover:border-primary/30 hover:bg-page transition-colors cursor-pointer flex items-center justify-between group">
            <span class="font-semibold text-text group-hover:text-primary transition-colors">{{ item }}</span>
            <button class="px-3 py-1.5 bg-white border border-border rounded text-xs font-bold text-text group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-colors shadow-sm">Generate</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>