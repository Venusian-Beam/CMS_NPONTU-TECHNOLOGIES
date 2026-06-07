<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Button from '@shared/components/Button.vue'
import FeaturesSection from './FeaturesSection.vue'
import TrustedInstitutionsSection from './TrustedInstitutionsSection.vue'
import FinalCTASection from './FinalCTASection.vue'

const router = useRouter()
const mobileOpen = ref(false)
const logoDataUrl = ref('')

function removeBg(imgSrc) {
  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data
      const threshold = 200
      for (let i = 0; i < data.length; i += 4) {
        if (data[i] > threshold && data[i + 1] > threshold && data[i + 2] > threshold) {
          data[i + 3] = 0
        }
      }
      ctx.putImageData(imageData, 0, 0)
      resolve(canvas.toDataURL('image/png'))
    }
    img.src = imgSrc
  })
}

onMounted(async () => {
  logoDataUrl.value = await removeBg('/images/logo.png')
})
</script>

<template>
  <div class="flex flex-col min-h-screen bg-white">
    <!-- Navigation -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-border/50">
      <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20 lg:h-[88px]">
        <router-link to="/" class="flex items-center h-full max-h-full">
          <img v-if="logoDataUrl" :src="logoDataUrl" alt="ELEVA" class="h-full w-auto object-contain" />
          <img v-else src="/images/logo.png" alt="ELEVA" class="h-full w-auto object-contain" />
        </router-link>

        <div class="hidden md:flex items-center gap-3">
          <Button variant="ghost" @click="router.push('/login')">Sign In</Button>
          <Button @click="router.push('/signup')">Request Demo</Button>
        </div>

        <button class="md:hidden p-2 text-text-secondary hover:text-text" @click="mobileOpen = !mobileOpen" aria-label="Menu">
          <svg v-if="!mobileOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
      <div v-if="mobileOpen" class="md:hidden border-t border-border/50 bg-white px-4 py-4 space-y-3">
        <hr class="border-border/50" />
        <Button variant="ghost" block @click="router.push('/login'); mobileOpen = false">Sign In</Button>
        <Button block @click="router.push('/signup'); mobileOpen = false">Request Demo</Button>
      </div>
    </header>

    <main class="flex-1">
      <!-- Hero Section -->
      <section class="relative pt-28 pb-16 lg:pt-36 lg:pb-20 overflow-hidden bg-white">
        <!-- Background texture layer -->
        <div class="absolute inset-0 pointer-events-none">
          <div class="absolute -top-48 -left-48 w-[600px] h-[600px] rounded-full" style="background: radial-gradient(circle, rgba(91,92,246,0.12) 0%, transparent 70%); filter: blur(80px);" />
          <div class="absolute -bottom-48 -right-48 w-[500px] h-[500px] rounded-full" style="background: radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%); filter: blur(80px);" />
          <div class="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full" style="background: radial-gradient(circle, rgba(14,165,233,0.06) 0%, transparent 70%); filter: blur(60px);" />
          <div class="absolute inset-0 opacity-[0.03]" style="background-image: radial-gradient(circle, #5B5CF6 1px, transparent 1px); background-size: 32px 32px;" />
          <div class="absolute inset-0 noise-texture" />
        </div>

        <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <!-- Left: text content -->
            <div class="lg:pl-4 space-y-6">
              <div>
                <h1 class="font-extrabold text-text tracking-tight text-balance" :style="{ fontSize: 'clamp(44px, 6vw, 80px)', fontWeight: 800, lineHeight: '0.95', letterSpacing: '-0.04em' }">
                  The Operating System for Modern Education
                </h1>
                <p class="mt-6 text-xl sm:text-2xl font-semibold text-text-secondary leading-relaxed max-w-[520px]">
                  <span class="logo-text" style="font-weight: 800;">
                    <span style="color: #5B5CF6;">E</span><span style="color: #5B5CF6;">l</span><span style="color: #5B5CF6;">e</span><span style="color: #5B5CF6;">v</span><span style="color: #F59E0B;">a</span>
                  </span> unifies admissions, academics, finance, staff management, and student self-service in one role-based platform with dynamic branding for every institution.
                </p>
              </div>
              <div class="flex flex-col sm:flex-row gap-3 pt-1">
                <Button size="lg" @click="router.push('/signup')">Request a Demo</Button>
                <Button variant="outline" size="lg" class="!border-[#F59E0B] !text-[#F59E0B] hover:!border-[#F59E0B] hover:!text-[#F59E0B]" @click="router.push('/login')">Explore Portals</Button>
              </div>
              <div class="flex flex-wrap gap-x-6 gap-y-2 pt-1">
                <span class="flex items-center gap-1.5 text-sm text-text-secondary">
                  <svg class="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" /></svg>
                  Multi-tenant
                </span>
                <span class="flex items-center gap-1.5 text-sm text-text-secondary">
                  <svg class="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" /></svg>
                  Role-based portals
                </span>
                <span class="flex items-center gap-1.5 text-sm text-text-secondary">
                  <svg class="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" /></svg>
                  Dynamic branding
                </span>
                <span class="flex items-center gap-1.5 text-sm text-text-secondary">
                  <svg class="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" /></svg>
                  SaaS ready
                </span>
              </div>
            </div>

            <!-- Right: student visual with floating cards -->
            <div class="relative lg:pl-4 flex items-center justify-center">
              <div class="w-full max-w-md relative">
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full" style="background: radial-gradient(circle, rgba(91,92,246,0.10) 0%, transparent 70%); filter: blur(50px);" />

                <!-- Floating analytics card -->
                <div class="absolute floating-card" style="top: -10px; right: -20px; z-index: 20;">
                  <div class="flex items-center gap-3 px-4 py-3 rounded-xl" style="background: rgba(255,255,255,0.75); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(226,232,240,0.6); box-shadow: 0 8px 32px rgba(15,23,42,0.08);">
                    <div class="w-9 h-9 rounded-lg flex items-center justify-center" style="background: rgba(91,92,246,0.12);">
                      <svg class="w-5 h-5" fill="none" stroke="#5B5CF6" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>
                    </div>
                    <div>
                      <p class="text-xs font-medium" style="color: #64748B;">Students</p>
                      <div class="flex items-center gap-2">
                        <span class="text-lg font-bold" style="color: #0F172A;">12,450</span>
                        <span class="text-xs font-semibold" style="color: #10B981;">↑ 24%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Floating notification -->
                <div class="absolute floating-card-delayed" style="top: 50%; right: -40px; z-index: 20;">
                  <div class="flex items-center gap-3 px-4 py-3 rounded-xl" style="background: rgba(255,255,255,0.75); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(226,232,240,0.6); box-shadow: 0 8px 32px rgba(15,23,42,0.08);">
                    <div class="w-9 h-9 rounded-lg flex items-center justify-center" style="background: rgba(16,185,129,0.12);">
                      <svg class="w-5 h-5" fill="none" stroke="#10B981" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
                    </div>
                    <div>
                      <p class="text-xs font-medium" style="color: #64748B;">New</p>
                      <p class="text-sm font-semibold" style="color: #0F172A;">Course Registration Open</p>
                    </div>
                  </div>
                </div>

                <!-- Floating attendance card -->
                <div class="absolute floating-card" style="bottom: 30px; left: -30px; z-index: 20;">
                  <div class="flex items-center gap-3 px-4 py-3 rounded-xl" style="background: rgba(255,255,255,0.75); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(226,232,240,0.6); box-shadow: 0 8px 32px rgba(15,23,42,0.08);">
                    <div class="w-9 h-9 rounded-lg flex items-center justify-center" style="background: rgba(14,165,233,0.12);">
                      <svg class="w-5 h-5" fill="none" stroke="#0EA5E9" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                    </div>
                    <div>
                      <p class="text-xs font-medium" style="color: #64748B;">Attendance</p>
                      <div class="flex items-center gap-2">
                        <span class="text-lg font-bold" style="color: #0F172A;">98.5%</span>
                        <span class="text-xs font-semibold" style="color: #10B981;">↑ 2.1%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="absolute top-4 right-6 w-14 h-14 rounded-full border-2 border-primary/20 pointer-events-none" />
                <div class="absolute top-12 right-20 w-3 h-3 rounded-full bg-primary/15 pointer-events-none" />
                <div class="absolute bottom-20 left-8 w-8 h-8 rounded-full border-2 border-primary/15 pointer-events-none" />
                <div class="absolute bottom-28 right-12 w-4 h-4 rounded-full bg-primary/20 pointer-events-none" />
                <div class="absolute top-1/3 -right-2 w-5 h-5 rounded-full bg-warning/20 pointer-events-none" />

                <svg class="absolute -top-4 -right-4 w-28 h-28 pointer-events-none" viewBox="0 0 100 100" fill="none">
                  <path d="M10 90 Q 30 30 90 10" stroke="#5B5CF6" stroke-width="1.5" stroke-dasharray="4 4" opacity="0.25" />
                </svg>

                <div class="absolute -top-2 left-10 flex gap-1.5 pointer-events-none">
                  <div class="w-1.5 h-1.5 rounded-full bg-primary/20" />
                  <div class="w-1.5 h-1.5 rounded-full bg-primary/10" />
                  <div class="w-1.5 h-1.5 rounded-full bg-primary/15" />
                </div>

                <svg class="absolute -bottom-6 left-1/2 -translate-x-1/2 w-48 h-8 pointer-events-none" viewBox="0 0 200 30" fill="none">
                  <path d="M10 20 Q 100 0 190 20" stroke="#5B5CF6" stroke-width="1" opacity="0.15" />
                </svg>

                <img src="https://res.cloudinary.com/dldj0gl3g/image/upload/e_background_removal/v1780740216/Download_premium_png_of_PNG_Footwear_standing_portrait_reading_transparent_background_about_student_cartoon_black_student_student_png_black_student_png_and_3d_student_12103184_ccnnph.png" alt="Student" class="w-full h-auto relative z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <TrustedInstitutionsSection />
    <FeaturesSection />
    <FinalCTASection />

    <!-- Footer -->
    <footer class="bg-white border-t border-border/50 py-14">
      <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div class="space-y-4">
            <div class="flex items-center gap-2.5">
              <img src="/images/logo.png" alt="ELEVA" class="h-14 w-auto" />
            </div>
            <p class="text-sm text-muted leading-relaxed max-w-xs">The Operating System for Modern Education</p>
          </div>
          <div><h4 class="font-medium text-text mb-4 text-sm">Platform</h4><ul class="space-y-2.5 text-sm text-muted"><li><a href="#" class="hover:text-text transition-colors">Features</a></li><li><a href="#" class="hover:text-text transition-colors">Pricing</a></li><li><a href="#" class="hover:text-text transition-colors">Security</a></li></ul></div>
          <div><h4 class="font-medium text-text mb-4 text-sm">Company</h4><ul class="space-y-2.5 text-sm text-muted"><li><a href="#" class="hover:text-text transition-colors">About</a></li><li><a href="#" class="hover:text-text transition-colors">Contact</a></li><li><a href="#" class="hover:text-text transition-colors">Privacy Policy</a></li></ul></div>
          <div><h4 class="font-medium text-text mb-4 text-sm">Contact</h4><ul class="space-y-2.5 text-sm text-muted"><li class="flex items-center gap-2"><svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> hello@eleva.com</li><li class="flex items-center gap-2"><svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg> Accra, Ghana</li></ul></div>
        </div>
        <div class="mt-12 pt-6 border-t border-border/50 text-center text-xs text-muted">&copy; {{ new Date().getFullYear() }} ELEVA. All rights reserved.</div>
      </div>
    </footer>
  </div>
</template>

<style>
.floating-card {
  animation: float 6s ease-in-out infinite;
}
.floating-card-delayed {
  animation: float 8s ease-in-out 2s infinite;
}
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
}
.noise-texture::after {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0.015;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 180px;
  pointer-events: none;
}
</style>
