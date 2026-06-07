import { ref, reactive, computed } from 'vue'

export function useForm(initial = {}) {
  const values = reactive({ ...initial })
  const errors = reactive({})
  const submitting = ref(false)
  const submitted = ref(false)

  const hasErrors = computed(() => Object.keys(errors).length > 0)

  function setFieldValue(field, value) {
    values[field] = value
    if (errors[field]) delete errors[field]
  }

  function setErrors(err) {
    Object.assign(errors, err)
  }

  function clearErrors() {
    Object.keys(errors).forEach((k) => delete errors[k])
  }

  function reset(data) {
    Object.keys(values).forEach((k) => delete values[k])
    if (data) Object.assign(values, data)
    clearErrors()
    submitted.value = false
  }

  function validate(rules) {
    clearErrors()
    let valid = true
    for (const [field, ruleFn] of Object.entries(rules)) {
      const msg = ruleFn(values[field], values)
      if (msg) {
        errors[field] = msg
        valid = false
      }
    }
    return valid
  }

  return {
    values,
    errors,
    submitting,
    submitted,
    hasErrors,
    setFieldValue,
    setErrors,
    clearErrors,
    reset,
    validate,
  }
}
