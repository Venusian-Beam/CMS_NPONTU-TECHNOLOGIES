<script setup>
import { ref } from 'vue'
import AuthPanel from './AuthPanel.vue'
import SignInForm from './SignInForm.vue'
import SignUpForm from './SignUpForm.vue'

const isSignIn = ref(true)

function toggleMode() {
  isSignIn.value = !isSignIn.value
}
</script>

<template>
  <div class="min-h-screen w-full flex items-center justify-center bg-page p-4" style="height: 100vh;">
    <div
      class="relative w-full max-w-[1200px] h-[700px] bg-white rounded-[32px] shadow-[0_30px_80px_rgba(15,23,42,.12)] overflow-hidden"
      style="background-color: var(--color-surface);"
    >
      <AuthPanel
        :is-active="isSignIn"
        @switch="toggleMode"
      >
        <template #branding>
          <div class="h-full w-full flex flex-col items-center justify-center p-12 text-white relative overflow-hidden"
               style="background: linear-gradient(135deg, var(--color-primary) 0%, #7C3AED 50%, #8B5CF6 100%);">
            <!-- Decorative circles -->
            <div class="absolute inset-0 pointer-events-none overflow-hidden">
              <div class="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
              <div class="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-white/10 blur-3xl"></div>
              <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-white/20"></div>
            </div>

            <div class="relative z-10 flex flex-col items-center text-center space-y-6">
              <!-- Logo -->
              <div class="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <span class="text-2xl font-bold">E</span>
              </div>

              <!-- Heading -->
              <transition name="heading" mode="out-in">
                <h1 v-if="isSignIn" key="signin" class="text-4xl font-extrabold leading-tight">Welcome Back</h1>
                <h1 v-else key="signup" class="text-4xl font-extrabold leading-tight">Join ELEVA</h1>
              </transition>

              <!-- Description -->
              <transition name="description" mode="out-in">
                <p v-if="isSignIn" key="signin" class="text-lg max-w-xs opacity-90">
                  Access your institution's digital ecosystem.
                </p>
                <p v-else key="signup" class="text-lg max-w-xs opacity-90">
                  Create your institution account and get started.
                </p>
              </transition>

              <!-- Switch button -->
              <button
                @click="$emit('switch')"
                class="mt-4 px-8 py-3 rounded-xl bg-white/20 text-white font-semibold hover:bg-white/30 transition-colors backdrop-blur-sm"
              >
                {{ isSignIn ? 'Sign Up' : 'Sign In' }}
              </button>
            </div>
          </div>
        </template>

        <template #form>
          <div class="h-full w-full flex items-center justify-center p-12 overflow-auto">
            <transition name="form" mode="out-in">
              <SignInForm v-if="isSignIn" key="signin" />
              <SignUpForm v-else key="signup" />
            </transition>
          </div>
        </template>
      </AuthPanel>
    </div>
  </div>
</template>

<style scoped>
/* Transition classes */
.heading-enter-active,
.heading-leave-active,
.description-enter-active,
.description-leave-active {
  transition: all 400ms cubic-bezier(0.22,1,0.36,1);
}
.heading-enter-from,
.heading-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.description-enter-from,
.description-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
.form-enter-active,
.form-leave-active {
  transition: all 600ms cubic-bezier(0.22,1,0.36,1);
}
.form-enter-from,
.form-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>