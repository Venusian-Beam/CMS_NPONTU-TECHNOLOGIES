<script setup>
const assessments = [
  { title: 'Mid-Semester Exam', course: 'COSC201', type: 'Exam', weight: '30%', date: 'Oct 20, 2025', status: 'Draft' },
  { title: 'Programming Assignment 1', course: 'COSC201', type: 'Assignment', weight: '10%', date: 'Sep 15, 2025', status: 'Graded' },
  { title: 'Project Proposal', course: 'COSC401', type: 'Project', weight: '15%', date: 'Oct 10, 2025', status: 'Needs Grading' },
  { title: 'Quiz 2: Search Algorithms', course: 'COSC305', type: 'Quiz', weight: '5%', date: 'Oct 05, 2025', status: 'Graded' },
]

const recentSubmissions = [
  { student: 'Kwame Asante', id: 'CS2025012', assessment: 'Project Proposal', submitted: '2h ago', status: 'Pending' },
  { student: 'Abena Mensah', id: 'CS2025015', assessment: 'Project Proposal', submitted: '5h ago', status: 'Pending' },
  { student: 'Kofi Owusu', id: 'CS2025018', assessment: 'Project Proposal', submitted: '1d ago', status: 'Graded' },
]

const getStatusColor = (s) => {
  if (s === 'Graded') return 'bg-success-bg text-success border-success/20'
  if (s === 'Needs Grading' || s === 'Pending') return 'bg-warning-bg text-warning border-warning/20'
  return 'bg-page text-muted border-border'
}
</script>

<template>
  <div class="space-y-6 max-w-7xl mx-auto pb-10">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-text mb-1">Assessments</h1>
        <p class="text-muted font-medium">Create and manage assignments, quizzes, and exams.</p>
      </div>
      <button class="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold shadow-panel transition-all">
        + Create Assessment
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- List -->
      <div class="lg:col-span-2 space-y-6">
        <div class="card-soft overflow-hidden">
          <div class="flex items-center gap-4 p-5 border-b border-border bg-page">
            <select class="bg-surface border border-border rounded-lg px-3 py-1.5 text-sm font-bold text-text outline-none focus:border-primary shadow-sm">
              <option>All Courses</option>
              <option>COSC201</option>
              <option>COSC305</option>
              <option>COSC401</option>
            </select>
          </div>
          <div class="divide-y divide-border">
            <div v-for="(ass, idx) in assessments" :key="idx" class="p-5 hover:bg-page transition-colors">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary text-xl shrink-0">
                    {{ ass.type === 'Exam' ? '📝' : ass.type === 'Assignment' ? '📄' : '📁' }}
                  </div>
                  <div>
                    <div class="flex items-center gap-2 mb-1">
                      <span class="text-[10px] font-black uppercase tracking-wider text-muted bg-surface border border-border px-1.5 py-0.5 rounded">{{ ass.course }}</span>
                      <span class="text-[10px] font-black uppercase tracking-wider text-muted bg-surface border border-border px-1.5 py-0.5 rounded">{{ ass.type }}</span>
                    </div>
                    <h3 class="font-bold text-lg text-text">{{ ass.title }}</h3>
                    <p class="text-sm font-medium text-muted mt-1">Due/Date: {{ ass.date }} <span class="mx-2">•</span> Weight: {{ ass.weight }}</p>
                  </div>
                </div>
                <div class="flex sm:flex-col items-center sm:items-end justify-between gap-3 shrink-0">
                  <span class="inline-flex px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider border" :class="getStatusColor(ass.status)">
                    {{ ass.status }}
                  </span>
                  <button class="text-sm font-bold text-primary hover:text-primary-hover">Manage →</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Sidebar -->
      <div class="space-y-6">
        
        <div class="card-soft p-5">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-bold text-lg text-text">Recent Submissions</h3>
            <span class="w-6 h-6 rounded-full bg-warning-bg text-warning text-xs font-bold flex items-center justify-center">2</span>
          </div>
          <div class="space-y-3">
            <div v-for="(sub, idx) in recentSubmissions" :key="idx" class="p-3 border border-border rounded-xl bg-surface hover:border-primary/30 transition-colors cursor-pointer group">
              <div class="flex items-start justify-between mb-2">
                <div>
                  <p class="font-bold text-sm text-text">{{ sub.student }}</p>
                  <p class="text-[10px] font-mono text-muted">{{ sub.id }}</p>
                </div>
                <span class="text-xs font-medium text-muted">{{ sub.submitted }}</span>
              </div>
              <p class="text-xs font-semibold text-text truncate mb-2">On: {{ sub.assessment }}</p>
              <div class="flex justify-between items-center">
                <span class="text-[10px] font-bold uppercase px-2 py-0.5 rounded" :class="sub.status === 'Pending' ? 'bg-warning-bg text-warning' : 'bg-success-bg text-success'">{{ sub.status }}</span>
                <button v-if="sub.status === 'Pending'" class="text-[11px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">Grade Now</button>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>