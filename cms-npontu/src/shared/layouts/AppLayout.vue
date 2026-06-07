<script setup>
import Topbar from './Topbar.vue'

const handleToggleSidebar = () => {
  // Sidebar toggle logic — placeholder for now
}
</script>

<template>
  <div class="flex flex-col min-h-screen bg-[#f5f5f9]">
    <Topbar @toggle-sidebar="handleToggleSidebar" />
    <main class="flex-1 overflow-y-auto p-6">
      <slot />
    </main>
  </div>
</template>