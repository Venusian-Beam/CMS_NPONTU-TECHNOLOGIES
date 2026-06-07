<script setup>
import Sidebar from './Sidebar.vue'
import Topbar from './Topbar.vue'
</script>

<template>
  <div class="flex h-screen bg-page">
    <Sidebar />
    <div class="flex-1 flex flex-col overflow-hidden">
      <Topbar />
      <main class="flex-1 overflow-y-auto p-4 lg:p-6">
        <slot />
      </main>
    </div>
  </div>
</template>