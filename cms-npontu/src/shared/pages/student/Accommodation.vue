<script setup>
const hasAccommodation = true

const roomDetails = {
  hostel: 'Valco Trust Hostel',
  block: 'Block A (Annex)',
  room: 'Room 204',
  bed: 'Bed 2',
  type: '4 in a room',
  status: 'Allocated',
  fee: 1500,
  paid: 1500,
  roommates: [
    { name: 'Emmanuel Ofori', level: '200', programme: 'BSc. Computer Science' },
    { name: 'David Mensah', level: '200', programme: 'BSc. Information Tech' },
    { name: 'Samuel Arthur', level: '300', programme: 'BSc. Computer Science' },
  ]
}

const history = [
  { year: '2024/2025', hostel: 'Evandy Hostel', room: 'Room 102' },
  { year: '2023/2024', hostel: 'Pentagon Hostel', room: 'Block C, Room 15' },
]
</script>

<template>
  <div class="space-y-6 max-w-7xl mx-auto pb-10">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-text mb-1">Accommodation</h1>
        <p class="text-muted font-medium">Manage your campus housing and hostel allocations.</p>
      </div>
      <button v-if="!hasAccommodation" class="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold shadow-panel transition-all">
        Apply for Hostel
      </button>
    </div>

    <div v-if="hasAccommodation" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Current Allocation -->
      <div class="lg:col-span-2 space-y-6">
        <div class="card-soft overflow-hidden">
          <div class="bg-gradient-to-r from-primary to-accent-blue p-6 text-white relative">
            <div class="absolute top-0 right-0 p-6 opacity-20 text-6xl">🏠</div>
            <div class="relative z-10">
              <span class="inline-block px-2.5 py-1 rounded bg-white/20 backdrop-blur-sm text-xs font-bold uppercase tracking-wider mb-3">
                {{ roomDetails.status }}
              </span>
              <h2 class="text-3xl font-black">{{ roomDetails.hostel }}</h2>
              <p class="text-white/80 font-medium text-lg mt-1">{{ roomDetails.block }} · {{ roomDetails.room }}</p>
            </div>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-6">
              <div>
                <p class="text-xs font-bold text-muted uppercase tracking-wider mb-1">Room Type</p>
                <p class="font-semibold text-text">{{ roomDetails.type }}</p>
              </div>
              <div>
                <p class="text-xs font-bold text-muted uppercase tracking-wider mb-1">Bed Number</p>
                <p class="font-semibold text-text">{{ roomDetails.bed }}</p>
              </div>
              <div>
                <p class="text-xs font-bold text-muted uppercase tracking-wider mb-1">Hostel Fee</p>
                <p class="font-semibold text-text">GH₵ {{ roomDetails.fee }}</p>
              </div>
              <div>
                <p class="text-xs font-bold text-muted uppercase tracking-wider mb-1">Payment Status</p>
                <p class="font-semibold text-success flex items-center gap-1">
                  <span class="w-1.5 h-1.5 rounded-full bg-success"></span> Fully Paid
                </p>
              </div>
            </div>
            <div class="flex gap-3">
              <button class="px-4 py-2 border border-border text-sm font-bold text-text hover:bg-page rounded-lg transition-colors">
                Report Issue
              </button>
              <button class="px-4 py-2 border border-border text-sm font-bold text-text hover:bg-page rounded-lg transition-colors">
                Request Change
              </button>
            </div>
          </div>
        </div>

        <div class="card-soft p-6">
          <h3 class="font-bold text-lg text-text mb-4">Roommates</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div v-for="(mate, idx) in roomDetails.roommates" :key="idx" class="flex items-center gap-3 p-3 border border-border rounded-xl">
              <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                {{ mate.name.charAt(0) }}
              </div>
              <div>
                <p class="font-bold text-sm text-text">{{ mate.name }}</p>
                <p class="text-xs font-medium text-muted">{{ mate.programme }} · L{{ mate.level }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- History Sidebar -->
      <div class="space-y-6">
        <div class="card-soft p-5">
          <h2 class="font-bold text-lg text-text mb-4">Allocation History</h2>
          <div class="space-y-4 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            <div v-for="(hist, idx) in history" :key="idx" class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div class="flex items-center justify-center w-5 h-5 rounded-full border-2 border-primary bg-white text-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
              <div class="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.25rem)] p-3 rounded-lg border border-border bg-page">
                <p class="font-bold text-xs text-primary mb-1">{{ hist.year }}</p>
                <p class="text-sm font-semibold text-text">{{ hist.hostel }}</p>
                <p class="text-xs text-muted">{{ hist.room }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>

    <!-- Empty State -->
    <div v-else class="card-soft p-10 flex flex-col items-center justify-center text-center">
      <div class="w-20 h-20 bg-page rounded-full flex items-center justify-center text-4xl mb-4 shadow-inner">
        🏨
      </div>
      <h2 class="text-xl font-bold text-text mb-2">No Room Allocated</h2>
      <p class="text-muted max-w-md mb-6">You currently do not have a hostel room allocated to you for this academic year. Applications are open.</p>
      <button class="px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold shadow-panel transition-all">
        Start Application
      </button>
    </div>

  </div>
</template>