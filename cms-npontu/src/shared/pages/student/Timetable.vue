<script setup>
const timetable = [
  { time: '08:00 AM - 10:00 AM', monday: { course: 'COSC201', room: 'Room A12' }, tuesday: null, wednesday: { course: 'MATH203', room: 'Room B04' }, thursday: null, friday: { course: 'COSC205', room: 'Lab 3' } },
  { time: '10:00 AM - 12:00 PM', monday: { course: 'MATH201', room: 'Room B02' }, tuesday: { course: 'STAT201', room: 'Room C10' }, wednesday: null, thursday: { course: 'COSC201', room: 'Room A12' }, friday: null },
  { time: '12:00 PM - 01:00 PM', monday: { type: 'Break' }, tuesday: { type: 'Break' }, wednesday: { type: 'Break' }, thursday: { type: 'Break' }, friday: { type: 'Break' } },
  { time: '01:00 PM - 03:00 PM', monday: null, tuesday: { course: 'FREN101', room: 'Room D01' }, wednesday: { course: 'COSC205', room: 'Lab 3' }, thursday: null, friday: { course: 'MATH203', room: 'Room B04' } },
]
</script>

<template>
  <div class="space-y-6 max-w-7xl mx-auto pb-10">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-text mb-1">Timetable</h1>
        <p class="text-muted font-medium">Your weekly class schedule for the active semester.</p>
      </div>
      <div class="flex gap-2">
        <button class="px-4 py-2 bg-surface border border-border hover:bg-page text-text rounded-lg font-bold shadow-sm transition-colors">
          Download PDF
        </button>
      </div>
    </div>

    <div class="card-soft overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-soft border-b border-border text-text">
            <tr>
              <th class="p-4 text-center border-r border-border font-bold w-40">Time</th>
              <th class="p-4 text-center border-r border-border font-bold">Monday</th>
              <th class="p-4 text-center border-r border-border font-bold">Tuesday</th>
              <th class="p-4 text-center border-r border-border font-bold">Wednesday</th>
              <th class="p-4 text-center border-r border-border font-bold">Thursday</th>
              <th class="p-4 text-center font-bold">Friday</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border">
            <tr v-for="(row, idx) in timetable" :key="idx" class="hover:bg-page transition-colors">
              <td class="p-4 text-center font-semibold text-muted border-r border-border whitespace-nowrap">{{ row.time }}</td>
              
              <template v-for="day in ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']" :key="day">
                <td class="p-3 border-r border-border text-center h-24 last:border-r-0">
                  <div v-if="row[day]" :class="row[day].type === 'Break' ? 'bg-surface border border-dashed border-border py-2 px-3 rounded-lg text-muted font-medium inline-block w-full' : 'bg-primary/10 border border-primary/20 p-3 rounded-xl shadow-sm text-left hover:shadow-md transition-shadow cursor-pointer h-full flex flex-col justify-center'">
                    <template v-if="row[day].type !== 'Break'">
                      <p class="font-bold text-primary mb-1">{{ row[day].course }}</p>
                      <p class="text-xs font-medium text-text">{{ row[day].room }}</p>
                    </template>
                    <template v-else>
                      Break
                    </template>
                  </div>
                </td>
              </template>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>