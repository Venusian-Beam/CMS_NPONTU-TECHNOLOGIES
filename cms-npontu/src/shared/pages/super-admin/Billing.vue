<script setup>
const invoices = [
  { id: 'INV-2025-1001', institution: 'ELEVA University', amount: '$1,500.00', date: 'Oct 01, 2025', status: 'Paid', plan: 'Enterprise' },
  { id: 'INV-2025-1002', institution: 'Global Tech Institute', amount: '$850.00', date: 'Oct 05, 2025', status: 'Paid', plan: 'Pro' },
  { id: 'INV-2025-1003', institution: 'Standard Business School', amount: '$250.00', date: 'Oct 01, 2025', status: 'Overdue', plan: 'Basic' },
  { id: 'INV-2025-1004', institution: 'National Academy of Arts', amount: '$850.00', date: 'Oct 15, 2025', status: 'Pending', plan: 'Pro' },
]

const getStatusColor = (s) => {
  if (s === 'Paid') return 'bg-success-bg text-success'
  if (s === 'Overdue') return 'bg-danger-bg text-danger'
  return 'bg-warning-bg text-warning'
}
</script>

<template>
  <div class="space-y-6 max-w-7xl mx-auto pb-10">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-text mb-1">Billing & Subscriptions</h1>
        <p class="text-muted font-medium">Manage tenant subscriptions, invoices, and revenue.</p>
      </div>
      <div class="flex gap-2">
        <button class="px-5 py-2.5 bg-gray-900 hover:bg-black text-white rounded-xl font-bold shadow-panel transition-all">
          Revenue Report
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Main Content -->
      <div class="lg:col-span-2 space-y-6">
        
        <div class="grid grid-cols-2 gap-4">
          <div class="card-soft p-5 border-l-4 border-l-green-500">
            <p class="text-xs font-bold text-muted uppercase tracking-wider mb-1">Monthly Recurring Revenue</p>
            <p class="text-3xl font-black text-text">$85,200</p>
          </div>
          <div class="card-soft p-5 border-l-4 border-l-red-500">
            <p class="text-xs font-bold text-muted uppercase tracking-wider mb-1">Overdue Payments</p>
            <p class="text-3xl font-black text-text">$4,500</p>
          </div>
        </div>

        <div class="card-soft overflow-hidden">
          <div class="flex items-center justify-between p-5 border-b border-border bg-page">
            <h2 class="font-bold text-lg text-text">Recent Invoices</h2>
            <button class="text-sm font-bold text-primary">View All →</button>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead class="bg-soft border-b border-border">
                <tr>
                  <th class="py-3 px-5 text-left font-semibold text-muted">Invoice</th>
                  <th class="py-3 px-5 text-left font-semibold text-muted">Institution & Plan</th>
                  <th class="py-3 px-5 text-right font-semibold text-muted">Amount</th>
                  <th class="py-3 px-5 text-center font-semibold text-muted">Status</th>
                  <th class="py-3 px-5 text-right font-semibold text-muted">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-border">
                <tr v-for="inv in invoices" :key="inv.id" class="hover:bg-page transition-colors">
                  <td class="py-3 px-5">
                    <p class="font-mono text-xs font-bold text-text">{{ inv.id }}</p>
                    <p class="text-[10px] text-muted font-medium">{{ inv.date }}</p>
                  </td>
                  <td class="py-3 px-5">
                    <p class="font-bold text-text">{{ inv.institution }}</p>
                    <p class="text-[10px] font-bold text-muted uppercase tracking-wider">{{ inv.plan }} Plan</p>
                  </td>
                  <td class="py-3 px-5 text-right font-black text-text">{{ inv.amount }}</td>
                  <td class="py-3 px-5 text-center">
                    <span class="inline-block px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider" :class="getStatusColor(inv.status)">
                      {{ inv.status }}
                    </span>
                  </td>
                  <td class="py-3 px-5 text-right">
                    <button class="text-xs font-bold text-primary hover:underline">Download</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <!-- Right Sidebar -->
      <div class="space-y-6">
        
        <div class="card-soft p-5">
          <h3 class="font-bold text-lg text-text mb-4">Subscription Plans</h3>
          <div class="space-y-3 mb-4">
            <div class="p-4 border border-border rounded-xl bg-surface flex justify-between items-center">
              <div>
                <p class="text-sm font-black text-text mb-0.5">Enterprise</p>
                <p class="text-xs font-medium text-muted">Custom / user</p>
              </div>
              <span class="px-2 py-1 bg-gray-900 text-white rounded text-[10px] font-bold uppercase">12 Tenants</span>
            </div>
            <div class="p-4 border border-border rounded-xl bg-surface flex justify-between items-center">
              <div>
                <p class="text-sm font-black text-text mb-0.5">Pro</p>
                <p class="text-xs font-medium text-muted">$850 / month</p>
              </div>
              <span class="px-2 py-1 bg-page border border-border text-text rounded text-[10px] font-bold uppercase">24 Tenants</span>
            </div>
            <div class="p-4 border border-border rounded-xl bg-surface flex justify-between items-center">
              <div>
                <p class="text-sm font-black text-text mb-0.5">Basic</p>
                <p class="text-xs font-medium text-muted">$250 / month</p>
              </div>
              <span class="px-2 py-1 bg-page border border-border text-text rounded text-[10px] font-bold uppercase">9 Tenants</span>
            </div>
          </div>
          <button class="w-full py-2 border border-border text-sm font-bold text-text bg-white hover:bg-page rounded-xl transition-colors shadow-sm">
            Manage Pricing
          </button>
        </div>

      </div>

    </div>
  </div>
</template>
