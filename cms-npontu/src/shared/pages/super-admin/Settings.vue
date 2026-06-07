<script setup>
</script>

<template>
  <div class="space-y-6 max-w-5xl mx-auto pb-10">
    <div>
      <h1 class="text-2xl font-bold text-text mb-1">Global Settings</h1>
      <p class="text-muted font-medium">Configure platform-wide settings and integrations.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      
      <!-- Settings Navigation -->
      <div class="md:col-span-1 space-y-1">
        <button class="w-full text-left px-4 py-3 rounded-lg font-bold text-sm bg-gray-900 text-white shadow-sm transition-colors">Platform Config</button>
        <button class="w-full text-left px-4 py-3 rounded-lg font-bold text-sm text-muted hover:bg-page hover:text-text transition-colors">Payment Gateways</button>
        <button class="w-full text-left px-4 py-3 rounded-lg font-bold text-sm text-muted hover:bg-page hover:text-text transition-colors">Email & SMS</button>
        <button class="w-full text-left px-4 py-3 rounded-lg font-bold text-sm text-muted hover:bg-page hover:text-text transition-colors">Security & Backup</button>
      </div>

      <!-- Settings Content -->
      <div class="md:col-span-3 space-y-6">
        
        <div class="card-soft p-6 border-t-4 border-t-gray-900">
          <h2 class="font-bold text-lg text-text mb-6">Platform Configuration</h2>
          
          <div class="space-y-5">
            <div>
              <label class="block text-xs font-bold text-muted uppercase tracking-wider mb-1">Platform Name</label>
              <input type="text" value="CMS by Npontu Technologies" class="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-sm font-semibold outline-none focus:border-gray-900 transition-colors">
            </div>
            
            <div class="pt-4 border-t border-border">
              <h3 class="font-bold text-sm text-text mb-3">Maintenance Mode</h3>
              <div class="flex items-center justify-between p-4 border border-warning/30 bg-warning-bg/50 rounded-xl">
                <div>
                  <p class="font-bold text-text text-sm">Enable Global Maintenance Mode</p>
                  <p class="text-xs text-muted font-medium mt-1">This will lock out all users except Super Admins.</p>
                </div>
                <button class="relative inline-flex h-6 w-11 items-center rounded-full bg-border">
                  <span class="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-1"></span>
                </button>
              </div>
            </div>

            <div class="pt-4 border-t border-border">
              <h3 class="font-bold text-sm text-text mb-3">Default Language & Timezone</h3>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold text-muted uppercase tracking-wider mb-1">Language</label>
                  <select class="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-sm font-semibold outline-none focus:border-gray-900 transition-colors">
                    <option>English (US)</option>
                    <option>English (UK)</option>
                    <option>French</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-bold text-muted uppercase tracking-wider mb-1">Timezone</label>
                  <select class="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-sm font-semibold outline-none focus:border-gray-900 transition-colors">
                    <option>UTC (GMT+0)</option>
                    <option>Africa/Accra</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          <div class="mt-8 flex justify-end">
            <button class="px-6 py-2.5 bg-gray-900 hover:bg-black text-white rounded-xl font-bold shadow-panel transition-all">
              Save Configuration
            </button>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>
