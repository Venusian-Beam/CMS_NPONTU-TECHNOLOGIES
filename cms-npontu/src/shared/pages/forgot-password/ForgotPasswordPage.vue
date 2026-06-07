<script setup>
import { ref } from 'vue'
import { useForm } from '@shared/composables/useForm'
import { useValidation } from '@shared/composables/useValidation'
import Button from '@shared/components/Button.vue'
import Input from '@shared/components/Input.vue'

const { required, email } = useValidation()
const success = ref(false)
const serverError = ref('')
const form = useForm({ email: '' })

async function handleSubmit() {
  serverError.value = ''
  if (!form.validate({ email: (v) => required(v, 'Email') || email(v) })) return
  form.submitting.value = true
  try { await new Promise((r) => setTimeout(r, 1500)); success.value = true }
  catch { serverError.value = 'Something went wrong. Please try again.' }
  finally { form.submitting.value = false }
}
</script>

<template>
  <div class="space-y-6">
    <div class="text-center"><h1 class="text-2xl font-bold text-text">Forgot password?</h1><p class="text-text-secondary text-sm mt-1.5">No worries. Enter your email and we'll send you a reset link.</p></div>
    <div v-if="success" class="bg-success-bg border border-success/20 text-success text-sm rounded-xl p-4 text-center font-medium">
      <p class="font-semibold">Check your email</p>
      <p class="mt-1 font-normal">If an account exists for {{ form.values.email }}, you'll receive a password reset link shortly.</p>
    </div>
    <div v-else-if="serverError" class="bg-danger-bg border border-danger/20 text-danger text-sm rounded-xl p-3.5 font-medium" role="alert">{{ serverError }}</div>
    <form v-if="!success" novalidate class="space-y-4" @submit.prevent="handleSubmit">
      <Input v-model="form.values.email" label="Email" type="email" placeholder="you@institution.edu" :error="form.errors.email" required autocomplete="email" />
      <Button type="submit" :loading="form.submitting.value" block size="lg">Send Reset Link</Button>
    </form>
    <p class="text-center text-sm"><router-link to="/login" class="text-primary hover:text-primary-hover font-medium transition-colors inline-flex items-center gap-1.5"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>Back to sign in</router-link></p>
  </div>
</template>
