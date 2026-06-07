<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useForm } from '@shared/composables/useForm'
import { useValidation } from '@shared/composables/useValidation'
import Button from '@shared/components/Button.vue'
import Input from '@shared/components/Input.vue'
import Select from '@shared/components/Select.vue'

const router = useRouter()
const { required, email, phone, minLength, sameAs } = useValidation()
const success = ref(false)
const serverError = ref('')

const institutionTypes = [
  { value: 'university', label: 'University' }, { value: 'polytechnic', label: 'Polytechnic' },
  { value: 'college', label: 'College' }, { value: 'high_school', label: 'High School' }, { value: 'other', label: 'Other' },
]

const form = useForm({
  institution_name: '', institution_type: '', admin_name: '', admin_email: '', admin_phone: '',
  password: '', password_confirmation: '', agree_terms: false,
})

async function handleSubmit() {
  serverError.value = ''
  const valid = form.validate({
    institution_name: (v) => required(v, 'Institution name'), institution_type: (v) => required(v, 'Institution type'),
    admin_name: (v) => required(v, 'Full name'), admin_email: (v) => required(v, 'Email') || email(v),
    admin_phone: (v) => phone(v), password: (v) => required(v, 'Password') || minLength(v, 8, 'Password'),
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
      <div><h2 class="text-lg font-bold text-text">Request received!</h2><p class="text-sm text-text-secondary mt-1">We'll review your information and get back to you within 24 hours.</p></div>
      <Button variant="outline" @click="router.push('/')">Back to Home</Button>
    </div>
    <template v-else>
      <div class="text-center"><h1 class="text-2xl font-bold text-text">Get started</h1><p class="text-text-secondary text-sm mt-1.5">Fill in your details to request a demo</p></div>
      <div v-if="serverError" class="bg-danger-bg border border-danger/20 text-danger text-sm rounded-xl p-3.5 font-medium" role="alert">{{ serverError }}</div>
      <form novalidate class="space-y-4" @submit.prevent="handleSubmit">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input v-model="form.values.institution_name" label="Institution Name" placeholder="e.g. University of Ghana" :error="form.errors.institution_name" required />
          <Select v-model="form.values.institution_type" label="Institution Type" :options="institutionTypes" :error="form.errors.institution_type" required />
        </div>
        <hr class="border-border/50" />
        <Input v-model="form.values.admin_name" label="Your Full Name" placeholder="Jane Doe" :error="form.errors.admin_name" required />
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input v-model="form.values.admin_email" label="Work Email" type="email" placeholder="jane@institution.edu" :error="form.errors.admin_email" required />
          <Input v-model="form.values.admin_phone" label="Phone Number" type="tel" placeholder="+233 XX XXX XXXX" :error="form.errors.admin_phone" />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input v-model="form.values.password" label="Create Password" type="password" placeholder="Min. 8 characters" :error="form.errors.password" show-password-toggle required />
          <Input v-model="form.values.password_confirmation" label="Confirm Password" type="password" placeholder="Re-enter password" :error="form.errors.password_confirmation" show-password-toggle required />
        </div>
        <label class="flex items-start gap-2.5 cursor-pointer group">
          <input v-model="form.values.agree_terms" type="checkbox" class="mt-0.5 h-4 w-4 rounded border-border text-primary focus:ring-[3px] focus:ring-primary/15" />
          <span class="text-sm text-text-secondary group-hover:text-text transition-colors">I agree to the <a href="#" class="text-primary hover:text-primary-hover font-medium">Terms of Service</a> and <a href="#" class="text-primary hover:text-primary-hover font-medium">Privacy Policy</a></span>
        </label>
        <Button type="submit" :loading="form.submitting.value" block size="lg" :disabled="!form.values.agree_terms">Submit Request</Button>
      </form>
      <p class="text-center text-sm text-text-secondary">Already have an account? <router-link to="/login" class="text-primary hover:text-primary-hover font-medium transition-colors">Sign In</router-link></p>
    </template>
  </div>
</template>
