<script setup>
import GradientCard from '@shared/components/GradientCard.vue'

const admin = {
  name: 'System Administrator',
  role: 'Super Admin',
}

const kpiCards = [
  { title: 'Total Institutions', value: '45', trend: '+3 this month', variant: 'blue' },
  { title: 'Active Users', value: '124.5k', trend: '+12% vs last month', variant: 'purple' },
  { title: 'MRR', value: '$85,200', trend: '+5.4% growth', variant: 'green' },
  { title: 'System Health', value: '99.9%', trend: 'All systems operational', variant: 'orange' },
]

const recentInstitutions = [
  { id: 'INS-0045', name: 'ELEVA University', plan: 'Enterprise', status: 'Active', date: 'Oct 10, 2025' },
  { id: 'INS-0046', name: 'Global Tech Institute', plan: 'Pro', status: 'Onboarding', date: 'Oct 12, 2025' },
  { id: 'INS-0047', name: 'Standard Business School', plan: 'Basic', status: 'Suspended', date: 'Oct 14, 2025' },
]

const systemAlerts = [
  { type: 'warning', message: 'High CPU usage detected on Database Cluster 2', time: '10 mins ago' },
  { type: 'info', message: 'Automated backup completed successfully', time: '2 hours ago' },
  { type: 'danger', message: 'Failed payment webhook from Paystack', time: '5 hours ago' },
]

const getAlertColor = (t) => {
  if (t === 'danger') return 'bg-danger-bg text-danger border-danger/20'
  if (t === 'warning') return 'bg-warning-bg text-warning border-warning/20'
  return 'bg-info-bg text-info border-info/20'
}
</script>

<template>
  <div class="space-y-6 max-w-7xl mx-auto pb-10">
    
    <!-- Header Section -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="flex items-center gap-4">
        <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-800 to-black flex items-center justify-center shadow-panel text-white font-bold text-xl">
          SA
        </div>
        <div>
          <div class="flex items-center gap-3 mb-1">
            <h1 class="text-2xl font-bold text-text">{{ admin.name }}</h1>
            <span class="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-success-bg text-success shadow-sm">
              Root Access
            </span>
          </div>
          <p class="text-muted font-medium">
            {{ admin.role }} <span class="mx-1.5 opacity-50">•</span> Global View
          </p>
        </div>
      </div>
      <div class="flex gap-3">
        <button class="px-4 py-2 bg-surface border border-border hover:bg-page text-text rounded-xl font-bold transition-all shadow-sm">
          System Logs
        </button>
        <button class="px-5 py-2.5 bg-gray-900 hover:bg-black text-white rounded-xl font-bold transition-all shadow-panel hover:-translate-y-0.5">
          + New Tenant
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

        <!-- Activity Chart Placeholder -->
        <div class="card-soft p-6">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h2 class="text-lg font-bold text-text">Platform Usage</h2>
              <p class="text-sm text-muted mt-1">Daily active users across all tenants</p>
            </div>
            <select class="bg-surface border border-border rounded-lg px-3 py-1.5 text-sm font-bold text-text outline-none shadow-sm">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div class="h-64 flex items-end gap-2 px-2 border-b border-border">
            <!-- Mock Line/Area Chart -->
            <div class="w-full h-full relative overflow-hidden">
              <div class="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-primary/20 to-transparent"></div>
              <svg class="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                <path d="M0,150 Q100,50 200,100 T400,120 T600,60 T800,140" fill="none" stroke="var(--color-primary, #6366f1)" stroke-width="3" />
              </svg>
            </div>
          </div>
          <div class="flex justify-between mt-4 text-xs font-bold text-muted uppercase">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>

        <!-- Recent Tenants -->
        <div class="card-soft overflow-hidden">
          <div class="flex items-center justify-between p-6 border-b border-border">
            <h2 class="text-lg font-bold text-text">Recent Institutions</h2>
            <router-link to="/super-admin/institutions" class="text-sm font-bold text-primary hover:text-primary-hover transition-colors">
              View All →
            </router-link>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead class="bg-soft border-b border-border">
                <tr>
                  <th class="text-left font-semibold py-3 px-6 text-muted">Institution Name</th>
                  <th class="text-left font-semibold py-3 text-muted">Plan</th>
                  <th class="text-left font-semibold py-3 text-muted">Status</th>
                  <th class="text-right font-semibold py-3 px-6 text-muted">Date Added</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-border">
                <tr v-for="ins in recentInstitutions" :key="ins.id" class="hover:bg-page transition-colors">
                  <td class="py-4 px-6">
                    <p class="font-bold text-text">{{ ins.name }}</p>
                    <p class="text-[10px] font-mono text-muted">{{ ins.id }}</p>
                  </td>
                  <td class="py-4 font-semibold text-text">{{ ins.plan }}</td>
                  <td class="py-4">
                    <span class="inline-block px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider"
                          :class="ins.status === 'Active' ? 'bg-success-bg text-success' : ins.status === 'Onboarding' ? 'bg-info-bg text-info' : 'bg-warning-bg text-warning'">
                      {{ ins.status }}
                    </span>
                  </td>
                  <td class="py-4 px-6 text-right font-medium text-muted">{{ ins.date }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <!-- Right Column (1/3) -->
      <div class="space-y-6">

        <!-- System Status -->
        <div class="card-soft p-6">
          <h2 class="text-lg font-bold text-text mb-5">System Health</h2>
          <div class="space-y-4 mb-6">
            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span class="text-muted">Web Servers</span>
                <span class="text-success">Healthy</span>
              </div>
              <div class="h-2 bg-surface rounded-full overflow-hidden">
                <div class="h-full bg-success rounded-full" style="width: 100%"></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span class="text-muted">Database Cluster</span>
                <span class="text-warning">85% Load</span>
              </div>
              <div class="h-2 bg-surface rounded-full overflow-hidden">
                <div class="h-full bg-warning rounded-full" style="width: 85%"></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span class="text-muted">Storage Volume</span>
                <span class="text-text">60% Used</span>
              </div>
              <div class="h-2 bg-surface rounded-full overflow-hidden">
                <div class="h-full bg-primary rounded-full" style="width: 60%"></div>
              </div>
            </div>
          </div>
          
          <h3 class="text-sm font-bold text-text mb-3">Recent Alerts</h3>
          <div class="space-y-3">
            <div v-for="(alert, idx) in systemAlerts" :key="idx" class="p-3 border rounded-lg flex gap-3 items-start bg-white" :class="getAlertColor(alert.type)">
              <span class="text-sm shrink-0 mt-0.5">
                {{ alert.type === 'danger' ? '⛔' : alert.type === 'warning' ? '⚠️' : 'ℹ️' }}
              </span>
              <div>
                <p class="text-xs font-bold">{{ alert.message }}</p>
                <p class="text-[10px] font-semibold opacity-70 mt-0.5">{{ alert.time }}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>