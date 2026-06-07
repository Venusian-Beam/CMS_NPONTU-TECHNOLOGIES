<script setup>
import GradientCard from '@shared/components/GradientCard.vue'

const institution = {
  name: 'ELEVA University',
  admin: 'Osei Tutu',
  role: 'Institution Admin',
  session: '2025/2026 Academic Year',
}

const kpiCards = [
  { title: 'Total Students', value: '14,250', trend: '+5.2% from last year', variant: 'blue' },
  { title: 'Active Staff', value: '854', trend: '12 on leave', variant: 'purple' },
  { title: 'Revenue (YTD)', value: 'GH₵ 4.2M', trend: '85% Collection Rate', variant: 'green' },
  { title: 'Active Courses', value: '320', trend: 'Across 8 Faculties', variant: 'orange' },
]

const recentAdmissions = [
  { id: 'APP-2025-001', name: 'John Doe', programme: 'BSc. Computer Science', status: 'Admitted', date: '2h ago' },
  { id: 'APP-2025-002', name: 'Jane Smith', programme: 'BA. Economics', status: 'Reviewing', date: '5h ago' },
  { id: 'APP-2025-003', name: 'Peter Owusu', programme: 'BSc. Nursing', status: 'Pending', date: '1d ago' },
]

const quickActions = [
  { icon: '📢', label: 'Broadcast Message', color: 'text-primary bg-primary/10' },
  { icon: '👨‍🎓', label: 'Admit Student', color: 'text-success bg-success-bg' },
  { icon: '👩‍🏫', label: 'Add Staff', color: 'text-info bg-info-bg' },
  { icon: '💰', label: 'Record Payment', color: 'text-warning bg-warning-bg' },
]
</script>

<template>
  <div class="space-y-6 max-w-7xl mx-auto pb-10">
    
    <!-- Header Section -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="flex items-center gap-4">
        <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent-blue flex items-center justify-center shadow-panel text-white font-bold text-xl">
          EU
        </div>
        <div>
          <div class="flex items-center gap-3 mb-1">
            <h1 class="text-2xl font-bold text-text">{{ institution.name }}</h1>
            <span class="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-success-bg text-success shadow-sm">
              Active
            </span>
          </div>
          <p class="text-muted font-medium">
            {{ institution.role }} <span class="mx-1.5 opacity-50">•</span> {{ institution.session }}
          </p>
        </div>
      </div>
      <div class="flex gap-3">
        <button class="px-4 py-2 bg-surface border border-border hover:bg-page text-text rounded-xl font-bold transition-all shadow-sm">
          Settings
        </button>
        <button class="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold transition-all shadow-panel hover:-translate-y-0.5">
          Generate Reports
        </button>
      </div>
    </div>

    <!-- KPI Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <GradientCard 
        v-for="k in kpiCards" 
        :key="k.title"
        :variant="k.variant"
        :title="k.title"
        :value="k.value"
        :trend="k.trend"
      />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

      <!-- Left Column (2/3) -->
      <div class="lg:col-span-2 space-y-6">

        <!-- Revenue Chart Placeholder -->
        <div class="card-soft p-6">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h2 class="text-lg font-bold text-text">Revenue Overview</h2>
              <p class="text-sm text-muted mt-1">Fee collections vs target</p>
            </div>
            <select class="bg-surface border border-border rounded-lg px-3 py-1.5 text-sm font-bold text-text outline-none shadow-sm">
              <option>This Year</option>
              <option>Last Year</option>
            </select>
          </div>
          <div class="h-64 flex items-end gap-2 sm:gap-4 px-2">
            <!-- Mock Bar Chart -->
            <div v-for="h in [40, 60, 80, 50, 90, 70, 100, 85, 65, 45, 75, 95]" :key="h" class="flex-1 bg-primary/10 rounded-t-lg relative group">
              <div class="absolute bottom-0 left-0 right-0 bg-primary rounded-t-lg transition-all duration-1000" :style="`height: ${h}%`"></div>
              <div class="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-text text-white text-[10px] font-bold py-1 px-2 rounded shadow-lg z-10 transition-opacity">
                {{ h }}%
              </div>
            </div>
          </div>
          <div class="flex justify-between mt-4 text-xs font-bold text-muted uppercase">
            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
            <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
          </div>
        </div>

        <!-- Recent Admissions -->
        <div class="card-soft overflow-hidden">
          <div class="flex items-center justify-between p-6 border-b border-border">
            <h2 class="text-lg font-bold text-text">Recent Applications</h2>
            <router-link to="/institution/admissions" class="text-sm font-bold text-primary hover:text-primary-hover transition-colors">
              View Admissions →
            </router-link>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead class="bg-soft border-b border-border">
                <tr>
                  <th class="text-left font-semibold py-3 px-6 text-muted">Applicant</th>
                  <th class="text-left font-semibold py-3 text-muted">Programme</th>
                  <th class="text-left font-semibold py-3 text-muted">Status</th>
                  <th class="text-right font-semibold py-3 px-6 text-muted">Date</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-border">
                <tr v-for="app in recentAdmissions" :key="app.id" class="hover:bg-page transition-colors">
                  <td class="py-4 px-6">
                    <p class="font-bold text-text">{{ app.name }}</p>
                    <p class="text-[10px] font-mono text-muted">{{ app.id }}</p>
                  </td>
                  <td class="py-4 font-semibold text-text">{{ app.programme }}</td>
                  <td class="py-4">
                    <span class="inline-block px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider"
                          :class="app.status === 'Admitted' ? 'bg-success-bg text-success' : app.status === 'Reviewing' ? 'bg-info-bg text-info' : 'bg-warning-bg text-warning'">
                      {{ app.status }}
                    </span>
                  </td>
                  <td class="py-4 px-6 text-right font-medium text-muted">{{ app.date }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <!-- Right Column (1/3) -->
      <div class="space-y-6">

        <!-- Quick Actions -->
        <div class="card-soft p-6">
          <h2 class="text-lg font-bold text-text mb-5">Quick Actions</h2>
          <div class="grid grid-cols-2 gap-4">
            <button v-for="action in quickActions" :key="action.label" class="flex flex-col items-center justify-center gap-3 p-4 rounded-xl border border-border hover:bg-page hover:border-primary/30 transition-all group">
              <div class="w-12 h-12 rounded-full flex items-center justify-center text-xl transition-transform group-hover:scale-110" :class="action.color">
                {{ action.icon }}
              </div>
              <span class="text-xs font-bold text-text text-center">{{ action.label }}</span>
            </button>
          </div>
        </div>

        <!-- Academic Calendar Status -->
        <div class="card-soft p-6 bg-gradient-to-br from-primary to-accent-blue text-white relative overflow-hidden">
          <div class="absolute right-0 top-0 opacity-10 text-8xl -mt-4 -mr-4">📅</div>
          <div class="relative z-10">
            <span class="inline-block px-2 py-0.5 rounded bg-white/20 text-[10px] font-bold uppercase tracking-wider mb-2">Current Semester</span>
            <h2 class="text-2xl font-black mb-1">Semester 1</h2>
            <p class="text-white/80 font-medium text-sm mb-6">2025/2026 Academic Year</p>
            
            <div class="space-y-3">
              <div>
                <div class="flex justify-between text-xs font-bold mb-1">
                  <span>Semester Progress</span>
                  <span>Week 6 of 16</span>
                </div>
                <div class="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div class="h-full bg-white rounded-full" style="width: 37.5%"></div>
                </div>
              </div>
              <div class="pt-3 border-t border-white/20">
                <p class="text-xs font-semibold text-white/80 mb-1">Upcoming Milestone</p>
                <p class="font-bold text-sm">Mid-Semester Exams <span class="font-normal opacity-80">(Oct 20)</span></p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>