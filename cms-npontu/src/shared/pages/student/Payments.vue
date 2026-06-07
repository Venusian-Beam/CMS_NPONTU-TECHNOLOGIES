<script setup>
const transactions = [
  { id: 'TRX-9932-A1', date: 'Sep 15, 2025', description: 'Tuition Fee - First Installment', amount: 3000, type: 'payment', status: 'Completed' },
  { id: 'TRX-8821-B2', date: 'Sep 10, 2025', description: 'Hostel Fee - Block A', amount: 1500, type: 'payment', status: 'Completed' },
  { id: 'TRX-7710-C3', date: 'Sep 01, 2025', description: 'Late Registration Penalty', amount: 300, type: 'charge', status: 'Pending' },
  { id: 'TRX-6609-D4', date: 'Aug 25, 2025', description: 'SRC Dues', amount: 150, type: 'payment', status: 'Completed' },
]

const feeBreakdown = [
  { item: 'Tuition', amount: 4500 },
  { item: 'Facility User Fee', amount: 800 },
  { item: 'Examination Fee', amount: 400 },
  { item: 'Medical Exam', amount: 150 },
  { item: 'SRC Dues', amount: 150 },
]

const totalFees = 6000
const totalPaid = 4650
const balance = totalFees - totalPaid
const percentPaid = Math.round((totalPaid / totalFees) * 100)
</script>

<template>
  <div class="space-y-6 max-w-7xl mx-auto pb-10">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-text mb-1">Payments & Fees</h1>
        <p class="text-muted font-medium">Manage your tuition, fees, and payment history.</p>
      </div>
      <button class="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold shadow-panel transition-all hover:-translate-y-0.5">
        Make a Payment
      </button>
    </div>

    <!-- Overview Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      <!-- Balance Card -->
      <div class="card-soft p-6 bg-gradient-to-br from-orange-50 to-amber-50 border-orange-100 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-sm font-bold text-orange-800 uppercase tracking-wide">Outstanding Balance</h3>
            <span class="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">!</span>
          </div>
          <p class="text-4xl font-black text-orange-900 mt-2">GH₵ {{ balance.toLocaleString() }}</p>
        </div>
        <p class="text-sm font-medium text-orange-700 mt-4">Due Date: <span class="font-bold text-orange-900">Nov 30, 2025</span></p>
      </div>

      <!-- Paid Progress -->
      <div class="card-soft p-6 flex flex-col justify-between md:col-span-2">
        <div>
          <div class="flex items-center justify-between mb-1">
            <h3 class="text-sm font-bold text-muted uppercase tracking-wide">Payment Progress</h3>
            <p class="text-sm font-bold text-text">{{ percentPaid }}% Paid</p>
          </div>
          <div class="flex items-end gap-3 mt-3">
            <p class="text-3xl font-black text-success">GH₵ {{ totalPaid.toLocaleString() }}</p>
            <p class="text-sm font-medium text-muted mb-1.5">of GH₵ {{ totalFees.toLocaleString() }} total</p>
          </div>
        </div>
        <div class="mt-4 h-3 bg-surface border border-border rounded-full overflow-hidden shadow-inner">
          <div class="h-full bg-gradient-to-r from-success to-emerald-400 rounded-full" :style="{ width: percentPaid + '%' }"></div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Transactions History -->
      <div class="lg:col-span-2 space-y-6">
        <div class="card-soft overflow-hidden">
          <div class="p-5 border-b border-border flex items-center justify-between">
            <h2 class="font-bold text-lg text-text">Recent Transactions</h2>
            <button class="text-sm font-bold text-primary hover:text-primary-hover">View All</button>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead class="bg-soft border-b border-border">
                <tr>
                  <th class="py-3 px-5 text-left font-semibold text-muted">Date</th>
                  <th class="py-3 px-5 text-left font-semibold text-muted">Description</th>
                  <th class="py-3 px-5 text-center font-semibold text-muted">ID</th>
                  <th class="py-3 px-5 text-right font-semibold text-muted">Amount</th>
                  <th class="py-3 px-5 text-right font-semibold text-muted">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-border">
                <tr v-for="trx in transactions" :key="trx.id" class="hover:bg-page transition-colors">
                  <td class="py-4 px-5 text-sm font-medium text-muted whitespace-nowrap">{{ trx.date }}</td>
                  <td class="py-4 px-5 font-bold text-text">{{ trx.description }}</td>
                  <td class="py-4 px-5 text-center text-xs font-medium text-muted font-mono">{{ trx.id }}</td>
                  <td class="py-4 px-5 text-right font-bold" :class="trx.type === 'payment' ? 'text-success' : 'text-danger'">
                    {{ trx.type === 'payment' ? '-' : '+' }}GH₵ {{ trx.amount.toLocaleString() }}
                  </td>
                  <td class="py-4 px-5 text-right">
                    <span class="inline-block px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider" 
                          :class="trx.status === 'Completed' ? 'bg-success-bg text-success' : 'bg-warning-bg text-warning'">
                      {{ trx.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Fee Breakdown -->
      <div class="space-y-6">
        <div class="card-soft p-5">
          <h2 class="font-bold text-lg text-text mb-4">Fee Breakdown</h2>
          <div class="space-y-3">
            <div v-for="(fee, idx) in feeBreakdown" :key="idx" class="flex items-center justify-between py-2 border-b border-border border-dashed last:border-0">
              <span class="text-sm font-medium text-text">{{ fee.item }}</span>
              <span class="text-sm font-bold text-text">GH₵ {{ fee.amount.toLocaleString() }}</span>
            </div>
          </div>
          <div class="mt-4 pt-3 border-t border-border flex items-center justify-between">
            <span class="font-bold text-text">Total Fees</span>
            <span class="font-black text-lg text-text">GH₵ {{ totalFees.toLocaleString() }}</span>
          </div>
          <button class="w-full mt-5 py-2.5 bg-surface border border-border text-sm font-bold text-text hover:bg-page rounded-xl transition-colors shadow-sm">
            Download Invoice
          </button>
        </div>
      </div>

    </div>
  </div>
</template>