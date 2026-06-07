<script setup>
const logs = [
  { id: 'LOG-9001', time: '10:45:22 AM', level: 'ERROR', service: 'AuthService', message: 'Failed login attempt from IP 192.168.1.5', tenant: 'ELEVA University' },
  { id: 'LOG-9002', time: '10:42:15 AM', level: 'INFO', service: 'PaymentGateway', message: 'Webhook received for successful payment', tenant: 'Global Tech Institute' },
  { id: 'LOG-9003', time: '10:30:00 AM', level: 'WARN', service: 'Database', message: 'Slow query detected on admissions table (>2000ms)', tenant: 'System' },
  { id: 'LOG-9004', time: '10:15:45 AM', level: 'INFO', service: 'EmailService', message: 'Sent 150 mass emails successfully', tenant: 'ELEVA University' },
  { id: 'LOG-9005', time: '09:55:12 AM', level: 'ERROR', service: 'Storage', message: 'Upload failed: File size exceeds 10MB limit', tenant: 'National Academy of Arts' },
]

const getLevelColor = (l) => {
  if (l === 'ERROR') return 'text-danger bg-danger-bg'
  if (l === 'WARN') return 'text-warning bg-warning-bg'
  return 'text-info bg-info-bg'
}
</script>

<template>
  <div class="space-y-6 max-w-7xl mx-auto pb-10">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-text mb-1">System Logs & Audit</h1>
        <p class="text-muted font-medium">Monitor system events, errors, and security audits globally.</p>
      </div>
      <div class="flex gap-2">
        <button class="px-4 py-2 border border-border text-text hover:bg-page rounded-xl font-bold transition-all shadow-sm">
          Export Logs
        </button>
        <button class="px-5 py-2.5 bg-gray-900 hover:bg-black text-white rounded-xl font-bold shadow-panel transition-all">
          Live Tail
        </button>
      </div>
    </div>

    <div class="card-soft overflow-hidden">
      <!-- Controls -->
      <div class="p-5 border-b border-border bg-page flex flex-wrap items-center justify-between gap-4">
        <div class="flex gap-3">
          <input type="text" placeholder="Search logs..." class="bg-surface border border-border rounded-lg px-4 py-2 text-sm outline-none focus:border-gray-900 shadow-sm min-w-[300px]">
          <select class="bg-surface border border-border rounded-lg px-4 py-2 text-sm font-bold text-text outline-none focus:border-gray-900 shadow-sm">
            <option>All Levels</option>
            <option>INFO</option>
            <option>WARN</option>
            <option>ERROR</option>
            <option>FATAL</option>
          </select>
          <select class="bg-surface border border-border rounded-lg px-4 py-2 text-sm font-bold text-text outline-none focus:border-gray-900 shadow-sm">
            <option>All Tenants</option>
            <option>System</option>
            <option>ELEVA University</option>
            <option>Global Tech Institute</option>
          </select>
        </div>
      </div>
      
      <!-- Log Table -->
      <div class="overflow-x-auto bg-black">
        <table class="w-full text-sm font-mono">
          <thead class="border-b border-gray-800 text-gray-400 text-xs">
            <tr>
              <th class="py-3 px-6 text-left font-normal w-32">Timestamp</th>
              <th class="py-3 px-4 text-left font-normal w-24">Level</th>
              <th class="py-3 px-4 text-left font-normal">Tenant / Service</th>
              <th class="py-3 px-6 text-left font-normal">Message</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-900 text-gray-300 text-[13px]">
            <tr v-for="log in logs" :key="log.id" class="hover:bg-gray-900 transition-colors group">
              <td class="py-3 px-6 whitespace-nowrap text-gray-500">{{ log.time }}</td>
              <td class="py-3 px-4">
                <span class="inline-block px-2 py-0.5 rounded text-[10px] font-bold" :class="getLevelColor(log.level)">
                  {{ log.level }}
                </span>
              </td>
              <td class="py-3 px-4 whitespace-nowrap">
                <p class="text-white font-bold">{{ log.tenant }}</p>
                <p class="text-[10px] text-primary mt-0.5">{{ log.service }}</p>
              </td>
              <td class="py-3 px-6">
                {{ log.message }}
                <p class="text-[10px] text-gray-600 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Trace ID: {{ log.id }}-{{ Math.floor(Math.random()*10000) }}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="p-4 bg-page border-t border-border flex justify-between items-center text-sm font-medium text-muted">
        <p>Showing 50 most recent logs</p>
      </div>
    </div>
  </div>
</template>
