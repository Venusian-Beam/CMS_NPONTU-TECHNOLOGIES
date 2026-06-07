<script setup>
const overview = {
  totalRevenue: '4,250,000',
  expectedRevenue: '5,000,000',
  collectionRate: 85,
  outstanding: '750,000',
}

const transactions = [
  { id: 'PAY-8921-A', student: 'Kwame Asante', amount: 3000, desc: 'Tuition Fee', date: 'Oct 15, 2025', status: 'Successful' },
  { id: 'PAY-8922-B', student: 'Abena Mensah', amount: 1500, desc: 'Hostel Fee', date: 'Oct 15, 2025', status: 'Successful' },
  { id: 'PAY-8923-C', student: 'John Doe', amount: 4500, desc: 'Full Payment', date: 'Oct 14, 2025', status: 'Failed' },
  { id: 'PAY-8924-D', student: 'Ama Serwaa', amount: 2000, desc: 'Tuition Installment', date: 'Oct 14, 2025', status: 'Successful' },
]

const feeStructures = [
  { name: 'BSc. Computer Science (Level 100)', amount: '6,500' },
  { name: 'BA. Economics (Level 100)', amount: '5,800' },
  { name: 'BSc. Nursing (Level 100)', amount: '7,200' },
]
</script>

<template>
  <div class="space-y-6 max-w-7xl mx-auto pb-10">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-text mb-1">Financial Overview</h1>
        <p class="text-muted font-medium">Monitor fee collections, transactions, and financial settings.</p>
      </div>
      <div class="flex gap-2">
        <button class="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold shadow-panel transition-all">
          Generate Financial Report
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Main Content -->
      <div class="lg:col-span-2 space-y-6">
        
        <!-- Collection Overview -->
        <div class="card-soft p-6 bg-gradient-to-br from-soft to-surface">
          <h2 class="text-lg font-bold text-text mb-6">Fee Collection Status (2025/2026)</h2>
          <div class="flex flex-col sm:flex-row items-center gap-8">
            <div class="relative w-32 h-32 flex items-center justify-center shrink-0">
              <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" class="stroke-border" stroke-width="12"></circle>
                <circle cx="50" cy="50" r="40" fill="none" class="stroke-success" stroke-width="12" :stroke-dasharray="251.2" :stroke-dashoffset="251.2 - (251.2 * overview.collectionRate) / 100" stroke-linecap="round"></circle>
              </svg>
              <div class="absolute inset-0 flex flex-col items-center justify-center">
                <span class="text-2xl font-black text-text">{{ overview.collectionRate }}%</span>
              </div>
            </div>
            <div class="flex-1 grid grid-cols-2 gap-4 w-full">
              <div>
                <p class="text-xs font-bold text-muted uppercase tracking-wider mb-1">Collected</p>
                <p class="text-2xl font-black text-success">GH₵ {{ overview.totalRevenue }}</p>
              </div>
              <div>
                <p class="text-xs font-bold text-muted uppercase tracking-wider mb-1">Expected</p>
                <p class="text-2xl font-black text-text">GH₵ {{ overview.expectedRevenue }}</p>
              </div>
              <div class="col-span-2 pt-4 border-t border-border">
                <p class="text-xs font-bold text-muted uppercase tracking-wider mb-1">Outstanding Deficit</p>
                <p class="text-xl font-bold text-danger">GH₵ {{ overview.outstanding }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Transactions -->
        <div class="card-soft overflow-hidden">
          <div class="flex items-center justify-between p-5 border-b border-border bg-page">
            <h2 class="font-bold text-lg text-text">Recent Transactions</h2>
            <button class="text-sm font-bold text-primary">View All →</button>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead class="bg-soft border-b border-border">
                <tr>
                  <th class="py-3 px-5 text-left font-semibold text-muted">ID / Date</th>
                  <th class="py-3 px-5 text-left font-semibold text-muted">Student</th>
                  <th class="py-3 px-5 text-left font-semibold text-muted">Description</th>
                  <th class="py-3 px-5 text-right font-semibold text-muted">Amount</th>
                  <th class="py-3 px-5 text-right font-semibold text-muted">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-border">
                <tr v-for="trx in transactions" :key="trx.id" class="hover:bg-page transition-colors">
                  <td class="py-3 px-5">
                    <p class="font-mono text-xs font-bold text-text">{{ trx.id }}</p>
                    <p class="text-[10px] text-muted">{{ trx.date }}</p>
                  </td>
                  <td class="py-3 px-5 font-bold text-text">{{ trx.student }}</td>
                  <td class="py-3 px-5 font-medium text-muted">{{ trx.desc }}</td>
                  <td class="py-3 px-5 text-right font-black text-text">GH₵ {{ trx.amount.toLocaleString() }}</td>
                  <td class="py-3 px-5 text-right">
                    <span class="inline-block px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider" :class="trx.status === 'Successful' ? 'bg-success-bg text-success' : 'bg-danger-bg text-danger'">
                      {{ trx.status }}
                    </span>
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
          <h3 class="font-bold text-lg text-text mb-4">Fee Structures</h3>
          <div class="space-y-3 mb-4">
            <div v-for="(fs, idx) in feeStructures" :key="idx" class="p-3 border border-border rounded-lg bg-surface">
              <p class="text-sm font-bold text-text mb-1">{{ fs.name }}</p>
              <p class="text-xs font-medium text-muted">Total: <span class="font-bold text-primary">GH₵ {{ fs.amount }}</span></p>
            </div>
          </div>
          <button class="w-full py-2 border border-border text-sm font-bold text-text bg-white hover:bg-page rounded-xl transition-colors shadow-sm">
            Manage Fee Structures
          </button>
        </div>

        <div class="card-soft p-5 bg-page">
          <h3 class="font-bold text-lg text-text mb-2">Payment Gateway</h3>
          <p class="text-sm text-muted mb-4">Paystack Integration is currently active.</p>
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-success"></span>
            <span class="text-sm font-bold text-text">Live Mode</span>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>