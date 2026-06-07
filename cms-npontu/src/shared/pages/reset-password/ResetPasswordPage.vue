<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useForm } from '@shared/composables/useForm'
import { useValidation } from '@shared/composables/useValidation'
import Button from '@shared/components/Button.vue'
import Input from '@shared/components/Input.vue'

const route = useRoute(); const router = useRouter()
const { required, minLength, sameAs } = useValidation()
const success = ref(false); const serverError = ref('')
const form = useForm({ email: route.query.email || '', password: '', password_confirmation: '' })

async function handleSubmit() {
  serverError.value = ''
  const valid = form.validate({
    password: (v) => required(v, 'Password') || minLength(v, 8, 'Password'),
    password_confirmation: (v) => required(v, 'Confirm password') || sameAs(v, form.values.password),
  })
  if (!valid) return
  form.submitting.value = true
  try { await new Promise((r) => setTimeout(r, 1500)); success.value = true }
  catch { serverError.value = 'Something went wrong. Please try again.' }
  finally { form.submitting.value = false }
}
</script>

<template>
  <div class="space-y-6">
    <div v-if="success" class="text-center space-y-4 py-6">
      <div class="w-16 h-16 rounded-2xl bg-success-bg flex items-center justify-center mx-auto"><svg class="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg></div>
      <div><h2 class="text-lg font-bold text-text">Password reset!</h2><p class="text-sm text-text-secondary mt-1">Your password has been updated successfully.</p></div>
      <Button @click="router.push('/login')">Sign In</Button>
    </div>
    <template v-else>
      <div class="text-center"><h1 class="text-2xl font-bold text-text">Set new password</h1><p class="text-text-secondary text-sm mt-1.5">Choose a strong password you haven't used before.</p></div>
      <div v-if="serverError" class="bg-danger-bg border border-danger/20 text-danger text-sm rounded-xl p-3.5 font-medium" role="alert">{{ serverError }}</div>
      <form novalidate class="space-y-4" @submit.prevent="handleSubmit">
        <Input v-model="form.values.password" label="New Password" type="password" placeholder="Min. 8 characters" :error="form.errors.password" show-password-toggle required autocomplete="new-password" />
        <Input v-model="form.values.password_confirmation" label="Confirm New Password" type="password" placeholder="Re-enter new password" :error="form.errors.password_confirmation" show-password-toggle required autocomplete="new-password" />
        <Button type="submit" :loading="form.submitting.value" block size="lg">Reset Password</Button>
      </form>
    </template>
  </div>
</template>
