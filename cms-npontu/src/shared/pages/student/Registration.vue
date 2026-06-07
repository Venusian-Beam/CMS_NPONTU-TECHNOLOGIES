<script setup>
import { ref, computed } from 'vue'

const currentStep = ref(1)

const availableCourses = [
  { code: 'COSC201', title: 'Social & Ethical Issues in CS', credits: 3, type: 'Core', selected: true, required: true },
  { code: 'MATH203', title: 'Engineering Mathematics', credits: 3, type: 'Core', selected: true, required: true },
  { code: 'COSC205', title: 'Database Systems', credits: 3, type: 'Core', selected: true, required: true },
  { code: 'MATH201', title: 'Linear Algebra', credits: 3, type: 'Core', selected: true, required: true },
  { code: 'STAT201', title: 'Probability & Statistics', credits: 3, type: 'Elective', selected: false, required: false },
  { code: 'FREN101', title: 'Introduction to French', credits: 2, type: 'Elective', selected: false, required: false },
  { code: 'ECON101', title: 'Intro to Economics', credits: 3, type: 'Elective', selected: false, required: false },
]

const toggleCourse = (course) => {
  if (!course.required) {
    course.selected = !course.selected
  }
}

const totalSelectedCredits = computed(() => {
  return availableCourses.filter(c => c.selected).reduce((sum, c) => sum + c.credits, 0)
})

const submitRegistration = () => {
  currentStep.value = 3
}
</script>

<template>
  <div class="space-y-6 max-w-5xl mx-auto pb-10">
    <div>
      <h1 class="text-2xl font-bold text-text mb-1">Course Registration</h1>
      <p class="text-muted font-medium">Register for your courses for the 2025/2026 Semester 2 academic session.</p>
    </div>

    <!-- Progress Stepper -->
    <div class="card-soft p-6 mb-6">
      <div class="flex items-center justify-between relative">
        <div class="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-border rounded-full z-0"></div>
        <div class="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary rounded-full z-0 transition-all duration-500" :style="{ width: ((currentStep - 1) / 2) * 100 + '%' }"></div>
        
        <div class="relative z-10 flex flex-col items-center gap-2">
          <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors" :class="currentStep >= 1 ? 'bg-primary text-white' : 'bg-surface border-2 border-border text-muted'">1</div>
          <span class="text-xs font-bold uppercase tracking-wider" :class="currentStep >= 1 ? 'text-primary' : 'text-muted'">Select Courses</span>
        </div>
        <div class="relative z-10 flex flex-col items-center gap-2">
          <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors" :class="currentStep >= 2 ? 'bg-primary text-white' : 'bg-surface border-2 border-border text-muted'">2</div>
          <span class="text-xs font-bold uppercase tracking-wider" :class="currentStep >= 2 ? 'text-primary' : 'text-muted'">Review</span>
        </div>
        <div class="relative z-10 flex flex-col items-center gap-2">
          <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors" :class="currentStep >= 3 ? 'bg-primary text-white' : 'bg-surface border-2 border-border text-muted'">3</div>
          <span class="text-xs font-bold uppercase tracking-wider" :class="currentStep >= 3 ? 'text-primary' : 'text-muted'">Confirm</span>
        </div>
      </div>
    </div>

    <!-- Step 1: Selection -->
    <div v-if="currentStep === 1" class="space-y-6">
      <div class="card-soft overflow-hidden">
        <div class="p-5 border-b border-border flex justify-between items-center bg-page">
          <h2 class="font-bold text-lg text-text">Available Courses</h2>
          <div class="px-3 py-1 bg-primary/10 text-primary rounded-lg font-bold text-sm">
            {{ totalSelectedCredits }} / 21 Credits
          </div>
        </div>
        <div class="divide-y divide-border">
          <div v-for="course in availableCourses" :key="course.code" 
               class="p-4 flex items-center gap-4 transition-colors"
               :class="{'bg-primary/5': course.selected, 'hover:bg-page': !course.required}"
               @click="toggleCourse(course)"
               :style="{ cursor: course.required ? 'default' : 'pointer' }">
            
            <div class="shrink-0">
              <div class="w-6 h-6 rounded border-2 flex items-center justify-center transition-colors"
                   :class="course.selected ? 'bg-primary border-primary' : 'border-muted'">
                <svg v-if="course.selected" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
            
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <span class="font-black text-text">{{ course.code }}</span>
                <span class="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider" 
                      :class="course.type === 'Core' ? 'bg-danger-bg text-danger' : 'bg-info-bg text-info'">
                  {{ course.type }}
                </span>
                <span v-if="course.required" class="text-[10px] font-bold text-muted uppercase">Required</span>
              </div>
              <p class="text-sm font-medium text-text mt-0.5">{{ course.title }}</p>
            </div>
            
            <div class="text-right">
              <span class="text-sm font-bold text-muted">{{ course.credits }} Cr.</span>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-end">
        <button @click="currentStep = 2" class="px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold shadow-panel transition-all">
          Proceed to Review →
        </button>
      </div>
    </div>

    <!-- Step 2: Review -->
    <div v-if="currentStep === 2" class="space-y-6">
      <div class="card-soft p-8 text-center bg-white border-primary/20 shadow-md relative overflow-hidden">
        <div class="absolute inset-0 bg-primary/5"></div>
        <div class="relative z-10">
          <h2 class="text-xl font-black text-text mb-2">Review Your Selection</h2>
          <p class="text-muted font-medium mb-6">Please verify that these are the courses you intend to register for.</p>
          
          <div class="inline-flex gap-8 mb-8 p-4 bg-white rounded-xl shadow-sm border border-border">
            <div>
              <p class="text-xs font-bold text-muted uppercase tracking-wider">Courses</p>
              <p class="text-2xl font-black text-text">{{ availableCourses.filter(c => c.selected).length }}</p>
            </div>
            <div class="w-px bg-border"></div>
            <div>
              <p class="text-xs font-bold text-muted uppercase tracking-wider">Total Credits</p>
              <p class="text-2xl font-black text-primary">{{ totalSelectedCredits }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-between">
        <button @click="currentStep = 1" class="px-6 py-3 border border-border text-text rounded-xl font-bold hover:bg-page transition-all">
          ← Back to Edit
        </button>
        <button @click="submitRegistration" class="px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold shadow-panel transition-all">
          Confirm Registration
        </button>
      </div>
    </div>

    <!-- Step 3: Success -->
    <div v-if="currentStep === 3" class="space-y-6">
      <div class="card-soft p-12 text-center flex flex-col items-center">
        <div class="w-20 h-20 bg-success-bg rounded-full flex items-center justify-center text-success text-4xl mb-6 shadow-inner">
          ✓
        </div>
        <h2 class="text-2xl font-black text-text mb-2">Registration Successful</h2>
        <p class="text-muted font-medium mb-8 max-w-md">Your courses for the 2025/2026 Semester 2 have been successfully registered.</p>
        
        <div class="flex gap-4">
          <router-link to="/student/courses" class="px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold shadow-panel transition-all">
            View My Courses
          </router-link>
          <button class="px-6 py-3 border border-border text-text hover:bg-page rounded-xl font-bold transition-all shadow-sm">
            Print Slip
          </button>
        </div>
      </div>
    </div>

  </div>
</template>