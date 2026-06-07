<script setup>
const student = {
  name: 'Kwame Asante',
  id: 'CS2025012',
  email: 'kasante@student.eleva.edu.gh',
  phone: '+233 55 123 4567',
  dob: '12 May 2003',
  gender: 'Male',
  nationality: 'Ghanaian',
  address: '15 Independence Ave, Accra',
  
  programme: 'BSc. Computer Science',
  department: 'Computer Science',
  faculty: 'Faculty of Science',
  level: '200',
  admissionYear: '2023',
  
  emergencyContact: {
    name: 'Mr. Emmanuel Asante',
    relation: 'Father',
    phone: '+233 24 987 6543',
    email: 'easante@example.com'
  }
}
</script>

<template>
  <div class="space-y-6 max-w-5xl mx-auto pb-10">
    <div>
      <h1 class="text-2xl font-bold text-text mb-1">My Profile</h1>
      <p class="text-muted font-medium">Manage your personal and academic information.</p>
    </div>

    <!-- Header Card -->
    <div class="card-soft overflow-hidden">
      <div class="h-32 bg-gradient-to-r from-primary to-accent-blue"></div>
      <div class="px-6 sm:px-10 pb-8 relative">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12 sm:-mt-16 mb-6">
          <div class="flex items-end gap-5">
            <div class="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl border-4 border-white bg-surface shadow-md flex items-center justify-center text-4xl font-bold text-primary">
              KA
            </div>
            <div class="pb-2">
              <h2 class="text-2xl font-black text-text">{{ student.name }}</h2>
              <p class="text-muted font-semibold">{{ student.id }}</p>
            </div>
          </div>
          <button class="px-4 py-2 border border-border text-sm font-bold text-text hover:bg-page rounded-lg transition-colors shadow-sm shrink-0">
            Edit Profile
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-12">
          
          <!-- Personal Info -->
          <div class="space-y-5">
            <h3 class="text-xs font-black text-muted uppercase tracking-widest border-b border-border pb-2">Personal Information</h3>
            <div class="space-y-3">
              <div>
                <p class="text-xs font-bold text-muted uppercase">Email Address</p>
                <p class="font-semibold text-text text-sm mt-0.5">{{ student.email }}</p>
              </div>
              <div>
                <p class="text-xs font-bold text-muted uppercase">Phone Number</p>
                <p class="font-semibold text-text text-sm mt-0.5">{{ student.phone }}</p>
              </div>
              <div>
                <p class="text-xs font-bold text-muted uppercase">Date of Birth</p>
                <p class="font-semibold text-text text-sm mt-0.5">{{ student.dob }}</p>
              </div>
              <div>
                <p class="text-xs font-bold text-muted uppercase">Gender & Nationality</p>
                <p class="font-semibold text-text text-sm mt-0.5">{{ student.gender }}, {{ student.nationality }}</p>
              </div>
              <div>
                <p class="text-xs font-bold text-muted uppercase">Home Address</p>
                <p class="font-semibold text-text text-sm mt-0.5">{{ student.address }}</p>
              </div>
            </div>
          </div>

          <!-- Academic Info -->
          <div class="space-y-5">
            <h3 class="text-xs font-black text-muted uppercase tracking-widest border-b border-border pb-2">Academic Profile</h3>
            <div class="space-y-3">
              <div>
                <p class="text-xs font-bold text-muted uppercase">Programme</p>
                <p class="font-semibold text-text text-sm mt-0.5">{{ student.programme }}</p>
              </div>
              <div>
                <p class="text-xs font-bold text-muted uppercase">Department</p>
                <p class="font-semibold text-text text-sm mt-0.5">{{ student.department }}</p>
              </div>
              <div>
                <p class="text-xs font-bold text-muted uppercase">Faculty</p>
                <p class="font-semibold text-text text-sm mt-0.5">{{ student.faculty }}</p>
              </div>
              <div>
                <p class="text-xs font-bold text-muted uppercase">Current Level</p>
                <p class="font-semibold text-text text-sm mt-0.5">Level {{ student.level }}</p>
              </div>
              <div>
                <p class="text-xs font-bold text-muted uppercase">Year of Admission</p>
                <p class="font-semibold text-text text-sm mt-0.5">{{ student.admissionYear }}</p>
              </div>
            </div>
          </div>

          <!-- Emergency Contact -->
          <div class="space-y-5">
            <h3 class="text-xs font-black text-muted uppercase tracking-widest border-b border-border pb-2">Emergency Contact</h3>
            <div class="space-y-3">
              <div>
                <p class="text-xs font-bold text-muted uppercase">Contact Name</p>
                <p class="font-semibold text-text text-sm mt-0.5">{{ student.emergencyContact.name }}</p>
              </div>
              <div>
                <p class="text-xs font-bold text-muted uppercase">Relationship</p>
                <p class="font-semibold text-text text-sm mt-0.5">{{ student.emergencyContact.relation }}</p>
              </div>
              <div>
                <p class="text-xs font-bold text-muted uppercase">Phone Number</p>
                <p class="font-semibold text-text text-sm mt-0.5">{{ student.emergencyContact.phone }}</p>
              </div>
              <div>
                <p class="text-xs font-bold text-muted uppercase">Email Address</p>
                <p class="font-semibold text-text text-sm mt-0.5">{{ student.emergencyContact.email }}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>