<script setup>
const myCourses = [
  { code: 'COSC201', title: 'Social & Ethical Issues in CS', students: 120, assignments: 2, attendance: '88%', status: 'Active' },
  { code: 'COSC305', title: 'Artificial Intelligence', students: 85, assignments: 1, attendance: '94%', status: 'Active' },
  { code: 'COSC401', title: 'Software Engineering', students: 245, assignments: 3, attendance: '82%', status: 'Active' },
]

const courseMaterials = [
  { course: 'COSC201', title: 'Lecture 4 - IP & Copyright', downloads: 112, date: 'Oct 12' },
  { course: 'COSC305', title: 'Assignment 1 Data Set', downloads: 85, date: 'Oct 10' },
  { course: 'COSC401', title: 'Agile Methodology Slides', downloads: 210, date: 'Oct 08' },
]
</script>

<template>
  <div class="space-y-6 max-w-7xl mx-auto pb-10">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-text mb-1">My Courses</h1>
        <p class="text-muted font-medium">Manage your assigned courses and teaching materials.</p>
      </div>
      <button class="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold shadow-panel transition-all">
        + Add Material
      </button>
    </div>

    <!-- Course List -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Main Content -->
      <div class="lg:col-span-2 space-y-5">
        <div v-for="course in myCourses" :key="course.code" class="card-soft overflow-hidden group hover:border-primary/30 transition-colors">
          <div class="bg-gradient-to-r from-soft to-white p-5 border-b border-border flex items-start justify-between">
            <div>
              <div class="flex items-center gap-3 mb-1">
                <span class="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-black uppercase">{{ course.code }}</span>
                <span class="px-2 py-0.5 rounded bg-success-bg text-success text-[10px] font-bold uppercase tracking-wider">{{ course.status }}</span>
              </div>
              <h2 class="text-xl font-black text-text mt-2">{{ course.title }}</h2>
            </div>
            <button class="p-2 border border-border rounded-lg text-muted hover:text-primary hover:bg-primary/5 transition-colors">
              ⚙️
            </button>
          </div>
          <div class="p-5">
            <div class="grid grid-cols-3 gap-4 mb-5">
              <div class="bg-page p-3 rounded-xl border border-border">
                <p class="text-[10px] font-bold text-muted uppercase tracking-wider mb-1">Enrolled</p>
                <p class="text-lg font-black text-text">{{ course.students }}</p>
              </div>
              <div class="bg-page p-3 rounded-xl border border-border">
                <p class="text-[10px] font-bold text-muted uppercase tracking-wider mb-1">Avg Attendance</p>
                <p class="text-lg font-black text-text">{{ course.attendance }}</p>
              </div>
              <div class="bg-page p-3 rounded-xl border border-border">
                <p class="text-[10px] font-bold text-muted uppercase tracking-wider mb-1">Assignments</p>
                <p class="text-lg font-black text-text">{{ course.assignments }}</p>
              </div>
            </div>
            <div class="flex gap-3">
              <button class="flex-1 py-2 border border-border rounded-lg text-sm font-bold text-text hover:bg-page transition-colors">View Students</button>
              <button class="flex-1 py-2 border border-border rounded-lg text-sm font-bold text-text hover:bg-page transition-colors">Materials</button>
              <button class="flex-1 py-2 border border-border rounded-lg text-sm font-bold text-text hover:bg-page transition-colors">Gradebook</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Sidebar -->
      <div class="space-y-6">
        <div class="card-soft p-5">
          <h3 class="font-bold text-lg text-text mb-4">Recent Uploads</h3>
          <div class="space-y-3">
            <div v-for="(mat, idx) in courseMaterials" :key="idx" class="p-3 border border-border rounded-lg hover:bg-page transition-colors cursor-pointer">
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 rounded bg-surface border border-border flex items-center justify-center shrink-0">
                  📄
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-xs font-bold text-primary mb-0.5">{{ mat.course }}</p>
                  <p class="text-sm font-semibold text-text truncate">{{ mat.title }}</p>
                  <div class="flex items-center justify-between mt-1">
                    <p class="text-xs text-muted font-medium">{{ mat.downloads }} downloads</p>
                    <p class="text-xs text-muted font-medium">{{ mat.date }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button class="w-full mt-4 py-2 text-sm font-bold text-primary bg-primary/5 hover:bg-primary/10 rounded-lg transition-colors">
            File Manager →
          </button>
        </div>
      </div>

    </div>
  </div>
</template>