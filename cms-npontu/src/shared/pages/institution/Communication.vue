<script setup>
import { ref } from 'vue'

const activeTab = ref('notices')

const notices = [
  { id: 1, title: 'End of Semester Examinations', date: 'Oct 14, 2025', target: 'All Students', status: 'Published' },
  { id: 2, title: 'Deadline for Course Registration', date: 'Oct 10, 2025', target: 'All Students', status: 'Published' },
  { id: 3, title: 'Faculty Meeting', date: 'Oct 08, 2025', target: 'All Academic Staff', status: 'Published' },
  { id: 4, title: 'System Maintenance Notice', date: 'Oct 05, 2025', target: 'All Users', status: 'Archived' },
]

const messages = [
  { id: 1, subject: 'Payment Issue', sender: 'Kwame Asante', type: 'Support Ticket', date: '2h ago', status: 'Open' },
  { id: 2, subject: 'Missing Grade for COSC201', sender: 'Abena Mensah', type: 'Academic Query', date: '5h ago', status: 'Open' },
  { id: 3, subject: 'Leave Request', sender: 'Mr. Kwame Mensah', type: 'HR Request', date: '1d ago', status: 'Closed' },
]

const getStatusColor = (s) => {
  if (s === 'Published' || s === 'Closed') return 'bg-success-bg text-success'
  if (s === 'Archived') return 'bg-page text-muted'
  return 'bg-warning-bg text-warning'
}
</script>

<template>
  <div class="space-y-6 max-w-7xl mx-auto pb-10">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-text mb-1">Communication Hub</h1>
        <p class="text-muted font-medium">Manage announcements, notices, and internal messaging.</p>
      </div>
      <button class="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold shadow-panel transition-all">
        Create Broadcast
      </button>
    </div>

    <div class="card-soft overflow-hidden">
      <!-- Tabs -->
      <div class="flex border-b border-border bg-page px-4">
        <button @click="activeTab = 'notices'" class="px-6 py-4 text-sm font-bold relative transition-colors" :class="activeTab === 'notices' ? 'text-primary' : 'text-muted hover:text-text'">
          Notice Board
          <div v-if="activeTab === 'notices'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full"></div>
        </button>
        <button @click="activeTab = 'messages'" class="px-6 py-4 text-sm font-bold relative transition-colors" :class="activeTab === 'messages' ? 'text-primary' : 'text-muted hover:text-text'">
          Incoming Messages <span class="ml-2 px-1.5 py-0.5 rounded bg-danger text-white text-[10px]">2</span>
          <div v-if="activeTab === 'messages'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full"></div>
        </button>
      </div>

      <!-- Tab Content: Notices -->
      <div v-if="activeTab === 'notices'" class="p-0">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-soft border-b border-border">
              <tr>
                <th class="py-3 px-6 text-left font-semibold text-muted">Title</th>
                <th class="py-3 px-6 text-left font-semibold text-muted">Target Audience</th>
                <th class="py-3 px-6 text-center font-semibold text-muted">Date</th>
                <th class="py-3 px-6 text-center font-semibold text-muted">Status</th>
                <th class="py-3 px-6 text-right font-semibold text-muted">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border">
              <tr v-for="not in notices" :key="not.id" class="hover:bg-page transition-colors">
                <td class="py-4 px-6 font-bold text-text">{{ not.title }}</td>
                <td class="py-4 px-6 font-medium text-muted">{{ not.target }}</td>
                <td class="py-4 px-6 text-center font-semibold text-text">{{ not.date }}</td>
                <td class="py-4 px-6 text-center">
                  <span class="inline-block px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider" :class="getStatusColor(not.status)">
                    {{ not.status }}
                  </span>
                </td>
                <td class="py-4 px-6 text-right">
                  <button class="p-2 text-muted hover:text-primary transition-colors">✎</button>
                  <button class="p-2 text-muted hover:text-danger transition-colors">🗑️</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Tab Content: Messages -->
      <div v-if="activeTab === 'messages'" class="p-0">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-soft border-b border-border">
              <tr>
                <th class="py-3 px-6 text-left font-semibold text-muted">Sender</th>
                <th class="py-3 px-6 text-left font-semibold text-muted">Subject</th>
                <th class="py-3 px-6 text-center font-semibold text-muted">Type</th>
                <th class="py-3 px-6 text-center font-semibold text-muted">Date</th>
                <th class="py-3 px-6 text-center font-semibold text-muted">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border">
              <tr v-for="msg in messages" :key="msg.id" class="hover:bg-page transition-colors cursor-pointer">
                <td class="py-4 px-6 font-bold text-text">{{ msg.sender }}</td>
                <td class="py-4 px-6 font-semibold text-text">{{ msg.subject }}</td>
                <td class="py-4 px-6 text-center font-medium text-muted">{{ msg.type }}</td>
                <td class="py-4 px-6 text-center font-semibold text-text">{{ msg.date }}</td>
                <td class="py-4 px-6 text-center">
                  <span class="inline-block px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider" :class="getStatusColor(msg.status)">
                    {{ msg.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>
</template>