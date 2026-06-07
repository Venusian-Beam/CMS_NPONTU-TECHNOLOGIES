<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const isSignIn = computed(() => route.name === 'login')

function toggleMode() {
  router.push(isSignIn.value ? '/signup' : '/login')
}

// Logo bg removal
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

// Form
const name = ref('')
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const submitting = ref(false)

async function handleSubmit() {
  if (!email.value || !password.value || (!isSignIn.value && !name.value)) return
  submitting.value = true
  try {
    router.push('/student')
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-white select-none">
    <!-- Outer Container -->
    <div
      class="flex relative"
      style="width: 92vw; height: 88vh; background: #FAFAFD; border-radius: 24px; box-shadow: 0px 20px 60px rgba(0,0,0,0.08); overflow: hidden;"
    >
      <!-- ============================================================ -->
      <!-- LEFT PANEL — Brand Experience                                 -->
      <!-- ============================================================ -->
      <div class="w-1/2 flex items-center justify-center relative overflow-hidden" style="background: #FAFAFD;">
        <!-- Decorative arcs -->
        <div class="absolute top-0 left-0 pointer-events-none" style="width: 500px; height: 500px;">
          <svg width="500" height="500" viewBox="0 0 500 500" fill="none">
            <path d="M 0 450 A 450 450 0 0 1 450 0" stroke="#7C3AED" stroke-width="1" opacity="0.1" />
          </svg>
        </div>
        <div class="absolute bottom-0 left-0 pointer-events-none" style="width: 500px; height: 500px;">
          <svg width="500" height="500" viewBox="0 0 500 500" fill="none">
            <path d="M 0 50 A 450 450 0 0 0 450 500" stroke="#7C3AED" stroke-width="1" opacity="0.1" />
          </svg>
        </div>

        <!-- Floating particles -->
        <div class="absolute rounded-full pointer-events-none particle" style="width: 8px; height: 8px; top: 18%; left: 15%; background: #4F46E5; opacity: 0.5;"></div>
        <div class="absolute rounded-full pointer-events-none particle" style="width: 12px; height: 12px; top: 72%; left: 22%; background: #06B6D4; opacity: 0.4;"></div>
        <div class="absolute rounded-full pointer-events-none particle" style="width: 16px; height: 16px; top: 25%; left: 78%; background: #0EA5E9; opacity: 0.45;"></div>
        <div class="absolute rounded-full pointer-events-none particle" style="width: 10px; height: 10px; top: 68%; left: 75%; background: #F59E0B; opacity: 0.55;"></div>
        <div class="absolute rounded-full pointer-events-none particle" style="width: 6px; height: 6px; top: 45%; left: 40%; background: #7C3AED; opacity: 0.5;"></div>
        <div class="absolute rounded-full pointer-events-none particle" style="width: 14px; height: 14px; top: 80%; left: 50%; background: #0EA5E9; opacity: 0.35;"></div>
        <div class="absolute rounded-full pointer-events-none particle" style="width: 9px; height: 9px; top: 12%; left: 55%; background: #4F46E5; opacity: 0.6;"></div>

        <!-- Logo — the hero -->
        <div class="flex items-center justify-center floating-logo" style="width: 40%; max-height: 45%;">
          <img
            v-if="logoDataUrl"
            :src="logoDataUrl"
            alt="ELEVA"
            class="w-full h-full object-contain"
            style="filter: drop-shadow(0 30px 50px rgba(91,61,245,0.15));"
          />
          <img
            v-else
            src="/images/logo.png"
            alt="ELEVA"
            class="w-full h-full object-contain"
            style="filter: drop-shadow(0 30px 50px rgba(91,61,245,0.15));"
          />
        </div>
      </div>

      <!-- ============================================================ -->
      <!-- CENTER DIVIDER                                               -->
      <!-- ============================================================ -->
      <div style="width: 1px; background: #ECECF2; opacity: 0.6;"></div>

      <!-- ============================================================ -->
      <!-- RIGHT PANEL — Authentication Form                            -->
      <!-- ============================================================ -->
      <div class="w-1/2 flex items-center justify-center overflow-y-auto" style="background: #FAFAFD;">
        <div class="w-full px-8 lg:px-12" style="max-width: 480px;">

          <!-- Header -->
          <div class="text-center mb-9">
            <h1 style="font-size: 56px; font-weight: 700; color: #0B1026; letter-spacing: -0.03em; line-height: 1.05;">
              {{ isSignIn ? 'Welcome Back' : 'Create Account' }}
            </h1>
            <p class="mt-3 text-base leading-relaxed mx-auto" style="color: #6B7280; max-width: 320px;">
              {{ isSignIn ? 'Sign in to continue your ELEVA journey.' : 'Join ELEVA and transform the way your institution operates.' }}
            </p>
          </div>

          <!-- Social Auth Row -->
          <div class="flex gap-3 mb-7">
            <button class="flex-1 flex items-center justify-center gap-2.5 text-sm font-medium transition-all duration-200 hover:shadow-md hover:-translate-y-0.5" style="height: 64px; border-radius: 16px; background: #FFFFFF; box-shadow: 0 8px 20px rgba(0,0,0,0.04); color: #374151; border: none;">
              <svg style="width: 20px; height: 20px;" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Google
            </button>
            <button class="flex-1 flex items-center justify-center gap-2.5 text-sm font-medium transition-all duration-200 hover:shadow-md hover:-translate-y-0.5" style="height: 64px; border-radius: 16px; background: #FFFFFF; box-shadow: 0 8px 20px rgba(0,0,0,0.04); color: #374151; border: none;">
              <svg style="width: 20px; height: 20px;" viewBox="0 0 24 24"><rect x="2" y="2" width="9.3" height="9.3" rx="0.5" fill="#F25022"/><rect x="12.7" y="2" width="9.3" height="9.3" rx="0.5" fill="#7FBA00"/><rect x="2" y="12.7" width="9.3" height="9.3" rx="0.5" fill="#00A4EF"/><rect x="12.7" y="12.7" width="9.3" height="9.3" rx="0.5" fill="#FFB900"/></svg>
              Microsoft
            </button>
            <button class="flex-1 flex items-center justify-center gap-2.5 text-sm font-medium transition-all duration-200 hover:shadow-md hover:-translate-y-0.5" style="height: 64px; border-radius: 16px; background: #FFFFFF; box-shadow: 0 8px 20px rgba(0,0,0,0.04); color: #374151; border: none;">
              <svg style="width: 20px; height: 20px;" viewBox="0 0 24 24"><path fill="currentColor" d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
              Apple
            </button>
          </div>

          <!-- Divider -->
          <div class="flex items-center gap-5 mb-8">
            <div class="flex-1 h-px" style="background: #DADCE6;"></div>
            <span class="text-xs font-medium tracking-wide uppercase whitespace-nowrap" style="color: #9CA3AF;">{{ isSignIn ? 'or sign in with email' : 'or sign up with email' }}</span>
            <div class="flex-1 h-px" style="background: #DADCE6;"></div>
          </div>

          <!-- Form -->
          <form novalidate class="space-y-4" @submit.prevent="handleSubmit">
            <!-- Full Name (signup) -->
            <div v-if="!isSignIn" class="relative">
              <div class="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none" style="color: #9CA3AF;">
                <svg class="w-[20px] h-[20px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
              </div>
              <input
                v-model="name"
                type="text"
                placeholder="Full Name"
                autocomplete="name"
                class="w-full outline-none transition-all duration-200 text-base font-medium"
                style="height: 72px; border-radius: 20px; padding-left: 56px; padding-right: 20px; background: #FFFFFF; box-shadow: 8px 8px 20px rgba(0,0,0,0.04), -8px -8px 20px rgba(255,255,255,1); color: #0B1026; border: 1.5px solid transparent;"
                @focus="$event.target.style.borderColor = '#7C3AED'"
                @blur="$event.target.style.borderColor = 'transparent'"
              />
            </div>

            <!-- Email Address -->
            <div class="relative">
              <div class="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none" style="color: #9CA3AF;">
                <svg class="w-[20px] h-[20px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </div>
              <input
                v-model="email"
                type="email"
                placeholder="Email Address"
                autocomplete="email"
                class="w-full outline-none transition-all duration-200 text-base font-medium"
                style="height: 72px; border-radius: 20px; padding-left: 56px; padding-right: 20px; background: #FFFFFF; box-shadow: 8px 8px 20px rgba(0,0,0,0.04), -8px -8px 20px rgba(255,255,255,1); color: #0B1026; border: 1.5px solid transparent;"
                @focus="$event.target.style.borderColor = '#7C3AED'"
                @blur="$event.target.style.borderColor = 'transparent'"
              />
            </div>

            <!-- Password -->
            <div class="relative">
              <div class="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none" style="color: #9CA3AF;">
                <svg class="w-[20px] h-[20px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
              </div>
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Password"
                autocomplete="current-password"
                class="w-full outline-none transition-all duration-200 text-base font-medium"
                style="height: 72px; border-radius: 20px; padding-left: 56px; padding-right: 56px; background: #FFFFFF; box-shadow: 8px 8px 20px rgba(0,0,0,0.04), -8px -8px 20px rgba(255,255,255,1); color: #0B1026; border: 1.5px solid transparent;"
                @focus="$event.target.style.borderColor = '#7C3AED'"
                @blur="$event.target.style.borderColor = 'transparent'"
              />
              <button type="button" class="absolute right-5 top-1/2 -translate-y-1/2 transition-colors" style="color: #9CA3AF;" @click="showPassword = !showPassword">
                <svg v-if="!showPassword" class="w-[20px] h-[20px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                <svg v-else class="w-[20px] h-[20px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/></svg>
              </button>
            </div>

            <!-- Forgot password -->
            <div v-if="isSignIn" class="flex justify-end">
              <router-link to="/forgot-password" class="text-sm font-medium transition-colors hover:opacity-80" style="color: #7C3AED;">
                Forgot password?
              </router-link>
            </div>

            <!-- CTA -->
            <button
              type="submit"
              :disabled="submitting"
              class="auth-cta w-full text-white font-bold tracking-tight flex items-center justify-center gap-2.5 transition-all duration-300"
              style="height: 72px; border-radius: 100px; background: linear-gradient(90deg, #6C5CE7, #5B6CFF); border: none; box-shadow: 0 4px 24px rgba(91,61,245,0.25); font-size: 17px;"
            >
              <span v-if="!submitting">
                {{ isSignIn ? 'Sign In' : 'Create Account' }} →
              </span>
              <span v-else class="flex items-center gap-2">
                <span class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Processing...
              </span>
            </button>
          </form>

          <!-- Footer -->
          <div class="mt-7 text-center space-y-4">
            <p class="text-sm" style="color: #6B7280;">
              <template v-if="isSignIn">
                Don't have an account?
                <router-link to="/signup" class="font-semibold transition-colors hover:opacity-80" style="color: #5B3DF5;">Create one</router-link>
              </template>
              <template v-else>
                Already have an account?
                <router-link to="/login" class="font-semibold transition-colors hover:opacity-80" style="color: #5B3DF5;">Sign In</router-link>
              </template>
            </p>

            <div class="flex items-center justify-center gap-2 text-xs" style="color: #9CA3AF;">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
              <span>Your data is secure with us.</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ============================================================ -->
      <!-- CENTER FLOATING TOGGLE BUTTON                                 -->
      <!-- ============================================================ -->
      <button
        @click="toggleMode"
        class="toggle-btn absolute z-20 flex items-center justify-center rounded-full transition-all duration-500 ease-out group"
        :title="isSignIn ? 'Switch to Sign Up' : 'Switch to Sign In'"
        style="width: 72px; height: 72px; left: 50%; top: 50%; transform: translate(-50%, -50%); background: #FFFFFF; box-shadow: 0 12px 30px rgba(0,0,0,0.08); border: 1px solid rgba(0,0,0,0.04);"
      >
        <span class="text-lg font-bold tracking-tight" style="color: #9CA3AF; letter-spacing: -0.04em;">
          <span class="inline-block transition-transform duration-400 ease-out group-hover:-translate-x-0.5">←</span>
          <span class="mx-1" style="color: #D1D5DB;">/</span>
          <span class="inline-block transition-transform duration-400 ease-out group-hover:translate-x-0.5">→</span>
        </span>
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Logo float */
.floating-logo {
  animation: logo-float 6s ease-in-out infinite;
}
@keyframes logo-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* CTA hover */
.auth-cta:hover {
  transform: translateY(-3px);
  box-shadow: 0 20px 40px rgba(91,61,245,0.25) !important;
}
.auth-cta:active {
  transform: translateY(0);
  box-shadow: 0 8px 24px rgba(91,61,245,0.15) !important;
}

/* Toggle button hover */
.toggle-btn:hover {
  box-shadow: 0 16px 40px rgba(0,0,0,0.12) !important;
  transform: translate(-50%, -50%) translateY(-2px) !important;
}

/* Focus glow shadow */
input:focus {
  box-shadow: 8px 8px 20px rgba(0,0,0,0.04), -8px -8px 20px rgba(255,255,255,1), 0 0 0 3px rgba(124,58,237,0.08) !important;
}

/* Particle floats */
.particle {
  animation: particle-drift 10s ease-in-out infinite alternate;
}
.particle:nth-child(1) { animation-duration: 9s; animation-delay: 0s; }
.particle:nth-child(2) { animation-duration: 11s; animation-delay: 1.2s; }
.particle:nth-child(3) { animation-duration: 8s; animation-delay: 2.5s; }
.particle:nth-child(4) { animation-duration: 12s; animation-delay: 0.6s; }
.particle:nth-child(5) { animation-duration: 7s; animation-delay: 3s; }
.particle:nth-child(6) { animation-duration: 10s; animation-delay: 1.8s; }
.particle:nth-child(7) { animation-duration: 9.5s; animation-delay: 0.3s; }

@keyframes particle-drift {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(15px, -12px) scale(1.2); }
}
</style>
