<script setup>
const registeredCourses = [
  { code: 'COSC201', title: 'Social & Ethical Issues in CS', credits: 3, lecturer: 'Dr. E. Baah', type: 'Core', status: 'Registered' },
  { code: 'MATH203', title: 'Engineering Mathematics', credits: 3, lecturer: 'Dr. K. Mensah', type: 'Core', status: 'Registered' },
  { code: 'COSC205', title: 'Database Systems', credits: 3, lecturer: 'Dr. Adjei', type: 'Core', status: 'Registered' },
  { code: 'MATH201', title: 'Linear Algebra', credits: 3, lecturer: 'Dr. Osei', type: 'Core', status: 'Registered' },
  { code: 'STAT201', title: 'Probability & Statistics', credits: 3, lecturer: 'Dr. Amoako', type: 'Elective', status: 'Registered' },
  { code: 'FREN101', title: 'Introduction to French', credits: 2, lecturer: 'Mr. Ofori', type: 'Elective', status: 'Registered' },
]

const courseMaterials = [
  { courseCode: 'COSC205', title: 'Lecture 1 - Intro to Databases', type: 'PDF', date: 'Oct 12, 2025' },
  { courseCode: 'COSC205', title: 'Assignment 1', type: 'Document', date: 'Oct 15, 2025' },
  { courseCode: 'MATH203', title: 'Differential Equations Formula Sheet', type: 'PDF', date: 'Oct 10, 2025' },
]
</script>

<template>
  <div class="space-y-6 max-w-7xl mx-auto pb-10">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-text mb-1">My Courses</h1>
        <p class="text-muted font-medium">Manage your registered courses and materials for the current semester.</p>
      </div>
      <button class="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg font-bold shadow-sm transition-colors">
        Register Courses
      </button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div class="card-soft p-5 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
        <h3 class="text-sm font-bold text-blue-800 uppercase tracking-wide">Total Credits</h3>
        <p class="text-3xl font-black text-blue-900 mt-2">17</p>
      </div>
      <div class="card-soft p-5 bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-100">
        <h3 class="text-sm font-bold text-emerald-800 uppercase tracking-wide">Core Courses</h3>
        <p class="text-3xl font-black text-emerald-900 mt-2">4</p>
      </div>
      <div class="card-soft p-5 bg-gradient-to-br from-orange-50 to-amber-50 border-orange-100">
        <h3 class="text-sm font-bold text-orange-800 uppercase tracking-wide">Electives</h3>
        <p class="text-3xl font-black text-orange-900 mt-2">2</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Course List -->
      <div class="lg:col-span-2 space-y-4">
        <div v-for="course in registeredCourses" :key="course.code" class="card-soft p-5 hover:border-primary/30 transition-colors flex flex-col sm:flex-row sm:items-center gap-4">
          <div class="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary font-bold text-lg">
            {{ course.code.substring(0, 4) }}
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between mb-1">
              <h3 class="font-bold text-lg text-text truncate pr-4">{{ course.title }}</h3>
              <span class="inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-page border border-border">
                {{ course.credits }} Credits
              </span>
            </div>
            <p class="text-sm text-muted font-medium mb-3">Code: {{ course.code }} · Lecturer: {{ course.lecturer }}</p>
            <div class="flex items-center gap-2">
              <span class="inline-flex px-2.5 py-1 rounded bg-success-bg text-success text-[11px] font-bold uppercase">{{ course.status }}</span>
              <span class="inline-flex px-2.5 py-1 rounded bg-surface border border-border text-text text-[11px] font-bold uppercase">{{ course.type }}</span>
            </div>
          </div>
          <div class="flex sm:flex-col gap-2 shrink-0">
            <button class="px-4 py-2 bg-page hover:bg-border text-text rounded-lg text-sm font-semibold transition-colors flex-1 text-center">Classroom</button>
            <button class="px-4 py-2 bg-page hover:bg-border text-text rounded-lg text-sm font-semibold transition-colors flex-1 text-center">Syllabus</button>
          </div>
        </div>
      </div>

      <!-- Course Materials Sidebar -->
      <div class="space-y-6">
        <div class="card-soft p-5">
          <h2 class="font-bold text-lg text-text mb-4">Recent Materials</h2>
          <div class="space-y-3">
            <div v-for="(mat, idx) in courseMaterials" :key="idx" class="p-3 rounded-lg border border-border hover:bg-page transition-colors cursor-pointer group">
              <div class="flex gap-3">
                <div class="w-10 h-10 rounded-lg bg-surface flex items-center justify-center shadow-sm text-lg group-hover:scale-110 transition-transform">
                  {{ mat.type === 'PDF' ? '📄' : '📝' }}
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-[11px] font-bold text-primary uppercase">{{ mat.courseCode }}</p>
                  <p class="text-sm font-semibold text-text truncate mt-0.5">{{ mat.title }}</p>
                  <p class="text-xs text-muted mt-1">{{ mat.date }}</p>
                </div>
              </div>
            </div>
          </div>
          <button class="w-full mt-4 py-2 text-sm font-bold text-primary hover:bg-primary/5 rounded-lg transition-colors">
            View All Materials
          </button>
        </div>
      </div>
    </div>
  </div>
</template>