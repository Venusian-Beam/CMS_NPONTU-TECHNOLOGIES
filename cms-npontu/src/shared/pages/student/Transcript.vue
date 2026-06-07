<script setup>
const studentInfo = {
  name: 'Kwame Asante',
  id: 'CS2025012',
  programme: 'BSc. Computer Science',
  admissionYear: '2023',
  currentLevel: '200',
  faculty: 'Faculty of Science',
}

const transcriptData = [
  {
    level: '100', semester: '1',
    creditsTaken: 15, creditsEarned: 15, gpa: 3.20, cgpa: 3.20,
    courses: [
      { code: 'COSC101', title: 'Intro to Computer Science', credits: 3, grade: 'B+' },
      { code: 'MATH101', title: 'Calculus I', credits: 3, grade: 'B' },
      { code: 'UGRC110', title: 'Academic Writing I', credits: 3, grade: 'A-' },
      { code: 'PHYS101', title: 'General Physics I', credits: 3, grade: 'C+' },
      { code: 'STAT101', title: 'Intro to Statistics', credits: 3, grade: 'A' },
    ]
  },
  {
    level: '100', semester: '2',
    creditsTaken: 16, creditsEarned: 16, gpa: 3.35, cgpa: 3.28,
    courses: [
      { code: 'COSC102', title: 'Programming I (C++)', credits: 4, grade: 'A' },
      { code: 'MATH102', title: 'Calculus II', credits: 3, grade: 'B+' },
      { code: 'UGRC150', title: 'Critical Thinking', credits: 3, grade: 'A-' },
      { code: 'PHYS102', title: 'General Physics II', credits: 3, grade: 'B' },
      { code: 'ELEC102', title: 'Basic Electronics', credits: 3, grade: 'B-' },
    ]
  },
  {
    level: '200', semester: '1',
    creditsTaken: 15, creditsEarned: 15, gpa: 3.50, cgpa: 3.35,
    courses: [
      { code: 'COSC201', title: 'Data Structures & Algorithms', credits: 3, grade: 'A' },
      { code: 'COSC203', title: 'Computer Architecture', credits: 3, grade: 'B+' },
      { code: 'MATH201', title: 'Linear Algebra', credits: 3, grade: 'B' },
      { code: 'UGRC210', title: 'Academic Writing II', credits: 3, grade: 'A' },
      { code: 'STAT201', title: 'Probability I', credits: 3, grade: 'A-' },
    ]
  }
]
</script>

<template>
  <div class="space-y-6 max-w-7xl mx-auto pb-10">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-text mb-1">Academic Transcript</h1>
        <p class="text-muted font-medium">Your complete unofficial academic record.</p>
      </div>
      <div class="flex gap-3">
        <button class="px-4 py-2 bg-surface border border-border hover:bg-page text-text rounded-lg font-bold shadow-sm transition-colors">
          Download Unofficial
        </button>
        <button class="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg font-bold shadow-sm transition-colors">
          Request Official
        </button>
      </div>
    </div>

    <div class="card-soft overflow-hidden p-8 bg-white" style="box-shadow: 0 4px 24px -4px rgba(0,0,0,0.05);">
      
      <!-- Transcript Header -->
      <div class="border-b-2 border-primary pb-6 mb-6 flex items-start justify-between">
        <div>
          <h2 class="text-xl font-black text-text uppercase tracking-wide">ELEVA University</h2>
          <p class="text-sm font-semibold text-muted mt-1">Student Academic Record (Unofficial)</p>
        </div>
        <div class="text-right">
          <p class="text-xs font-bold text-muted uppercase">Print Date</p>
          <p class="text-sm font-semibold text-text">Oct 14, 2025</p>
        </div>
      </div>

      <!-- Student Details -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <div class="grid grid-cols-3 gap-2 text-sm mb-2">
            <span class="font-bold text-muted">Name:</span>
            <span class="col-span-2 font-bold text-text">{{ studentInfo.name }}</span>
          </div>
          <div class="grid grid-cols-3 gap-2 text-sm mb-2">
            <span class="font-bold text-muted">Student ID:</span>
            <span class="col-span-2 font-bold text-text">{{ studentInfo.id }}</span>
          </div>
          <div class="grid grid-cols-3 gap-2 text-sm">
            <span class="font-bold text-muted">Faculty:</span>
            <span class="col-span-2 font-bold text-text">{{ studentInfo.faculty }}</span>
          </div>
        </div>
        <div>
          <div class="grid grid-cols-3 gap-2 text-sm mb-2">
            <span class="font-bold text-muted">Programme:</span>
            <span class="col-span-2 font-bold text-text">{{ studentInfo.programme }}</span>
          </div>
          <div class="grid grid-cols-3 gap-2 text-sm mb-2">
            <span class="font-bold text-muted">Admitted:</span>
            <span class="col-span-2 font-bold text-text">{{ studentInfo.admissionYear }}</span>
          </div>
          <div class="grid grid-cols-3 gap-2 text-sm">
            <span class="font-bold text-muted">Current Level:</span>
            <span class="col-span-2 font-bold text-text">Level {{ studentInfo.currentLevel }}</span>
          </div>
        </div>
      </div>

      <!-- Semesters -->
      <div class="space-y-8">
        <div v-for="(sem, idx) in transcriptData" :key="idx">
          <div class="bg-page py-2 px-4 border-l-4 border-l-primary mb-3">
            <h3 class="font-bold text-sm text-text uppercase tracking-wider">Level {{ sem.level }} - Semester {{ sem.semester }}</h3>
          </div>
          
          <table class="w-full text-sm mb-3">
            <thead>
              <tr class="border-b border-border">
                <th class="py-2 text-left font-bold text-muted w-24">Code</th>
                <th class="py-2 text-left font-bold text-muted">Course Title</th>
                <th class="py-2 text-center font-bold text-muted w-16">Cr.</th>
                <th class="py-2 text-center font-bold text-muted w-16">Grade</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border border-b border-border">
              <tr v-for="course in sem.courses" :key="course.code">
                <td class="py-2 font-semibold text-text">{{ course.code }}</td>
                <td class="py-2 font-medium text-text">{{ course.title }}</td>
                <td class="py-2 text-center font-semibold text-muted">{{ course.credits }}</td>
                <td class="py-2 text-center font-bold text-text">{{ course.grade }}</td>
              </tr>
            </tbody>
          </table>

          <div class="flex flex-wrap justify-end gap-x-8 gap-y-2 text-xs">
            <p><span class="font-bold text-muted">Cr. Taken:</span> <span class="font-bold text-text">{{ sem.creditsTaken }}</span></p>
            <p><span class="font-bold text-muted">Cr. Earned:</span> <span class="font-bold text-text">{{ sem.creditsEarned }}</span></p>
            <p><span class="font-bold text-muted">Sem GPA:</span> <span class="font-black text-primary">{{ sem.gpa.toFixed(2) }}</span></p>
            <p><span class="font-bold text-muted">Cum. GPA:</span> <span class="font-black text-primary">{{ sem.cgpa.toFixed(2) }}</span></p>
          </div>
        </div>
      </div>
      
      <!-- Footer Summary -->
      <div class="mt-12 pt-6 border-t-2 border-border flex justify-end">
        <div class="bg-primary/5 p-4 rounded-xl border border-primary/20 min-w-[250px]">
          <h3 class="text-sm font-bold text-primary uppercase tracking-wide mb-3">Final Status</h3>
          <div class="flex justify-between mb-1">
            <span class="text-sm font-bold text-muted">Total Credits Earned</span>
            <span class="text-sm font-bold text-text">46</span>
          </div>
          <div class="flex justify-between items-end">
            <span class="text-sm font-bold text-muted">Current CGPA</span>
            <span class="text-2xl font-black text-primary">3.35</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>