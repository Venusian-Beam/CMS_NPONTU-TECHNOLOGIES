<script setup>
</script>

<template>
  <div class="space-y-6 max-w-5xl mx-auto pb-10">
    <div>
      <h1 class="text-2xl font-bold text-text mb-1">System Settings</h1>
      <p class="text-muted font-medium">Configure global application preferences.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      
      <!-- Settings Navigation -->
      <div class="md:col-span-1 space-y-1">
        <button class="w-full text-left px-4 py-3 rounded-lg font-bold text-sm bg-primary/10 text-primary transition-colors">General Profile</button>
        <button class="w-full text-left px-4 py-3 rounded-lg font-bold text-sm text-muted hover:bg-page hover:text-text transition-colors">Security</button>
        <button class="w-full text-left px-4 py-3 rounded-lg font-bold text-sm text-muted hover:bg-page hover:text-text transition-colors">Integrations</button>
        <button class="w-full text-left px-4 py-3 rounded-lg font-bold text-sm text-muted hover:bg-page hover:text-text transition-colors">Notifications</button>
      </div>

      <!-- Settings Content -->
      <div class="md:col-span-3 space-y-6">
        
        <div class="card-soft p-6">
          <h2 class="font-bold text-lg text-text mb-6">Institution Profile</h2>
          
          <div class="flex items-center gap-6 mb-8">
            <div class="w-24 h-24 rounded-2xl bg-surface border-2 border-dashed border-border flex items-center justify-center text-4xl text-muted">
              📷
            </div>
            <div>
              <p class="font-bold text-text mb-1">Institution Logo</p>
              <p class="text-xs text-muted mb-3 max-w-xs">Upload a high-res logo to be displayed on portals and official documents. Max 2MB.</p>
              <button class="px-4 py-2 border border-border rounded-lg text-sm font-bold text-text hover:bg-page transition-colors shadow-sm">Choose File</button>
            </div>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-xs font-bold text-muted uppercase tracking-wider mb-1">Institution Name</label>
              <input type="text" value="ELEVA University" class="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-sm font-semibold outline-none focus:border-primary transition-colors">
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-muted uppercase tracking-wider mb-1">Short Name / Abbreviation</label>
                <input type="text" value="EU" class="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-sm font-semibold outline-none focus:border-primary transition-colors">
              </div>
              <div>
                <label class="block text-xs font-bold text-muted uppercase tracking-wider mb-1">Established Year</label>
                <input type="text" value="2005" class="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-sm font-semibold outline-none focus:border-primary transition-colors">
              </div>
            </div>
            <div>
              <label class="block text-xs font-bold text-muted uppercase tracking-wider mb-1">Contact Email</label>
              <input type="email" value="info@eleva.edu.gh" class="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-sm font-semibold outline-none focus:border-primary transition-colors">
            </div>
          </div>
          
          <div class="mt-8 flex justify-end">
            <button class="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold shadow-panel transition-all">
              Save Changes
            </button>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>