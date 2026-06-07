<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@shared/stores/authStore'
import { useBrandingStore } from '@shared/stores/brandingStore'
import { useForm } from '@shared/composables/useForm'
import { useValidation } from '@shared/composables/useValidation'
import Button from '@shared/components/Button.vue'
import Input from '@shared/components/Input.vue'
import Checkbox from '@shared/components/Checkbox.vue'

const router = useRouter()
const authStore = useAuthStore()
const brandingStore = useBrandingStore()
const { required, email } = useValidation()

const serverError = ref('')
const form = useForm({ email: '', password: '', remember: false })

async function handleSubmit() {
  serverError.value = ''
  const valid = form.validate({
    email: (v) => required(v, 'Email') || email(v),
    password: (v) => required(v, 'Password'),
  })
  if (!valid) return
  form.submitting.value = true
  try {
    const data = await authStore.login({ email: form.values.email, password: form.values.password })
    if (data.tenant) brandingStore.setTenantBranding(data.tenant)
    router.push(authStore.defaultRoute)
  } catch (err) {
    serverError.value = typeof err === 'string' ? err : 'Invalid email or password. Please try again.'
  } finally {
    form.submitting.value = false
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-text">Welcome back</h1>
      <p class="text-text-secondary text-sm mt-1.5">Sign in to your ELEVA account</p>
    </div>

    <div v-if="serverError" class="bg-danger-bg border border-danger/20 text-danger text-sm rounded-xl p-3.5 font-medium" role="alert">{{ serverError }}</div>

    <!-- Social login buttons -->
    <div class="grid grid-cols-2 gap-2.5">
      <button type="button" class="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-white hover:bg-soft transition-all text-sm font-medium text-text-secondary hover:text-text">
        <svg class="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
        Google
      </button>
      <button type="button" class="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-white hover:bg-soft transition-all text-sm font-medium text-text-secondary hover:text-text">
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
        Facebook
      </button>
    </div>

    <div class="relative">
      <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-border" /></div>
      <div class="relative flex justify-center text-xs"><span class="bg-white px-2 text-muted font-medium">or continue with email</span></div>
    </div>

    <form novalidate class="space-y-4" @submit.prevent="handleSubmit">
      <Input v-model="form.values.email" label="Email" type="email" placeholder="you@institution.edu" :error="form.errors.email" required autocomplete="email" />
      <div class="space-y-1">
        <Input v-model="form.values.password" label="Password" type="password" placeholder="Enter your password" :error="form.errors.password" required show-password-toggle autocomplete="current-password" />
        <div class="flex justify-end">
          <router-link to="/forgot-password" class="text-xs text-primary hover:text-primary-hover font-medium transition-colors">Forgot password?</router-link>
        </div>
      </div>
      <div class="flex items-center justify-between">
        <Checkbox v-model="form.values.remember" label="Remember me" />
      </div>
      <Button type="submit" :loading="form.submitting.value" block size="lg">Sign In</Button>
    </form>

    <p class="text-center text-sm text-text-secondary">
      Don't have an account? <router-link to="/signup" class="text-primary hover:text-primary-hover font-medium transition-colors">Request a demo</router-link>
    </p>

    <div class="relative">
      <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-border" /></div>
      <div class="relative flex justify-center text-xs"><span class="bg-white px-2 text-muted font-medium">Quick Demo</span></div>
    </div>

    <div class="grid grid-cols-2 gap-2 text-xs">
      <button type="button" class="p-2.5 rounded-xl border border-border/50 bg-soft hover:bg-primary-light hover:border-primary/30 transition-all text-text-secondary hover:text-primary font-medium" @click="form.values.email = 'admin@ug.edu.gh'; form.values.password = 'password'">Institution Admin</button>
      <button type="button" class="p-2.5 rounded-xl border border-border/50 bg-soft hover:bg-primary-light hover:border-primary/30 transition-all text-text-secondary hover:text-primary font-medium" @click="form.values.email = 'lecturer@ug.edu.gh'; form.values.password = 'password'">Lecturer</button>
      <button type="button" class="p-2.5 rounded-xl border border-border/50 bg-soft hover:bg-primary-light hover:border-primary/30 transition-all text-text-secondary hover:text-primary font-medium" @click="form.values.email = 'student@ug.edu.gh'; form.values.password = 'password'">Student</button>
      <button type="button" class="p-2.5 rounded-xl border border-border/50 bg-soft hover:bg-primary-light hover:border-primary/30 transition-all text-text-secondary hover:text-primary font-medium" @click="form.values.email = 'super@npontu.com'; form.values.password = 'password'">Super Admin</button>
    </div>
  </div>
</template>
