<script setup>
import GradientCard from '@shared/components/GradientCard.vue'

const staff = {
  name: 'Dr. Ebenezer Baah',
  role: 'Senior Lecturer',
  department: 'Computer Science',
  faculty: 'Faculty of Science',
  id: 'STF-2015-089',
  status: 'Active',
}

const kpiCards = [
  { title: 'Active Courses', value: '3', trend: 'This Semester', variant: 'purple' },
  { title: 'Total Students', value: '450', trend: 'Across all classes', variant: 'blue' },
  { title: 'Pending Assessments', value: '12', trend: 'Requires grading', variant: 'orange' },
  { title: 'Avg. Attendance', value: '88%', trend: '+2% from last week', variant: 'green' },
]

const upcomingClasses = [
  { course: 'COSC201', title: 'Social & Ethical Issues', time: '08:00 AM - 10:00 AM', room: 'Room A12', students: 120 },
  { course: 'COSC305', title: 'Artificial Intelligence', time: '11:00 AM - 01:00 PM', room: 'Lab 1', students: 85 },
  { course: 'COSC401', title: 'Software Engineering', time: '02:00 PM - 04:00 PM', room: 'Room C02', students: 245 },
]

const recentMessages = [
  { sender: 'Prof. Asare (HOD)', subject: 'Department Meeting Update', time: '2h ago', unread: true },
  { sender: 'Kwame Asante', subject: 'Question regarding Assignment 1', time: '5h ago', unread: true },
  { sender: 'Academic Registry', subject: 'Submission of Mid-Sem Results', time: '1d ago', unread: false },
]

const tasks = [
  { title: 'Grade COSC201 Assignment 1', due: 'Tomorrow, 11:59 PM', priority: 'High', completed: false },
  { title: 'Upload Course Outline for COSC305', due: 'Oct 18, 2025', priority: 'Medium', completed: true },
  { title: 'Review Final Year Project Proposals', due: 'Oct 20, 2025', priority: 'High', completed: false },
]
</script>

<template>
  <div class="space-y-6 max-w-7xl mx-auto pb-10">
    
    <!-- Header Section -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="flex items-center gap-4">
        <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent-blue flex items-center justify-center shadow-panel text-white font-bold text-xl">
          EB
        </div>
        <div>
          <div class="flex items-center gap-3 mb-1">
            <h1 class="text-2xl font-bold text-text">{{ staff.name }}</h1>
            <span class="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-success-bg text-success shadow-sm">
              {{ staff.status }}
            </span>
          </div>
          <p class="text-muted font-medium">
            {{ staff.role }} <span class="mx-1.5 opacity-50">•</span> {{ staff.department }}
          </p>
        </div>
      </div>
      <div class="flex gap-3">
        <button class="px-4 py-2 bg-surface border border-border hover:bg-page text-text rounded-xl font-bold transition-all shadow-sm">
          Send Message
        </button>
        <button class="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold transition-all shadow-panel hover:-translate-y-0.5">
          Take Attendance
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

        <!-- Today's Schedule -->
        <div class="card-soft overflow-hidden">
          <div class="flex items-center justify-between p-6 border-b border-border bg-page">
            <h2 class="text-lg font-bold text-text">Today's Classes</h2>
            <p class="text-sm font-semibold text-muted">October 15, 2025</p>
          </div>
          <div class="divide-y divide-border">
            <div v-for="cls in upcomingClasses" :key="cls.course" class="p-5 hover:bg-page transition-colors flex items-center justify-between group">
              <div class="flex items-start gap-4">
                <div class="w-1.5 h-12 rounded-full bg-primary mt-1 shrink-0"></div>
                <div>
                  <p class="text-sm font-bold text-primary mb-1">{{ cls.time }}</p>
                  <p class="font-bold text-text text-lg mb-0.5">{{ cls.title }} <span class="text-sm font-semibold text-muted ml-2">({{ cls.course }})</span></p>
                  <p class="text-sm text-muted font-medium flex items-center gap-4">
                    <span>📍 {{ cls.room }}</span>
                    <span>👥 {{ cls.students }} Students</span>
                  </p>
                </div>
              </div>
              <button class="opacity-0 group-hover:opacity-100 transition-opacity px-4 py-2 border border-border rounded-lg text-sm font-bold bg-white hover:bg-page">
                Manage
              </button>
            </div>
          </div>
        </div>

        <!-- Pending Tasks -->
        <div class="card-soft p-6">
          <div class="flex items-center justify-between mb-5">
            <h2 class="text-lg font-bold text-text">Action Items</h2>
            <button class="text-sm font-bold text-primary hover:text-primary-hover">View All</button>
          </div>
          <div class="space-y-3">
            <div v-for="(task, idx) in tasks" :key="idx" class="flex items-start gap-3 p-3 rounded-lg hover:bg-page transition-colors cursor-pointer border border-transparent hover:border-border">
              <div class="mt-1 shrink-0">
                <div class="w-5 h-5 rounded border-2 flex items-center justify-center transition-colors"
                     :class="task.completed ? 'bg-success border-success' : 'border-muted'">
                  <svg v-if="task.completed" xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
              <div class="flex-1 min-w-0" :class="task.completed ? 'opacity-50' : ''">
                <p class="font-bold text-sm text-text" :class="{'line-through': task.completed}">{{ task.title }}</p>
                <div class="flex items-center gap-3 mt-1">
                  <p class="text-xs font-semibold text-muted">Due: {{ task.due }}</p>
                  <span v-if="!task.completed" class="inline-block px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest"
                        :class="task.priority === 'High' ? 'bg-danger-bg text-danger' : 'bg-warning-bg text-warning'">
                    {{ task.priority }} Priority
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Right Column (1/3) -->
      <div class="space-y-6">

        <!-- Recent Messages -->
        <div class="card-soft p-6">
          <div class="flex items-center justify-between mb-5">
            <h2 class="text-lg font-bold text-text">Messages</h2>
            <span class="w-6 h-6 rounded-full bg-danger-bg text-danger text-xs font-bold flex items-center justify-center">2</span>
          </div>
          <div class="space-y-4">
            <div v-for="(msg, idx) in recentMessages" :key="idx" class="flex gap-3 items-start group cursor-pointer relative">
              <div v-if="msg.unread" class="absolute -left-3 top-2 w-1.5 h-1.5 rounded-full bg-primary"></div>
              <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0 text-sm">
                {{ msg.sender.charAt(0) }}
              </div>
              <div class="flex-1 min-w-0 border-b border-border pb-4 group-last:border-0 group-last:pb-0">
                <div class="flex items-center justify-between mb-0.5">
                  <p class="font-bold text-sm text-text truncate pr-2" :class="{'opacity-80': !msg.unread}">{{ msg.sender }}</p>
                  <p class="text-xs font-medium text-muted shrink-0">{{ msg.time }}</p>
                </div>
                <p class="text-sm truncate" :class="msg.unread ? 'font-bold text-text' : 'font-medium text-muted'">{{ msg.subject }}</p>
              </div>
            </div>
          </div>
          <button class="w-full mt-4 py-2 border border-border text-sm font-bold text-text hover:bg-page rounded-lg transition-colors shadow-sm">
            Go to Inbox
          </button>
        </div>

      </div>
    </div>
  </div>
</template>