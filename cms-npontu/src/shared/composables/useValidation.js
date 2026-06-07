export function useValidation() {
  function required(value, label = 'This field') {
    if (value === null || value === undefined || value === '') {
      return `${label} is required`
    }
    return ''
  }

  function email(value) {
    if (!value) return ''
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(value) ? '' : 'Please enter a valid email address'
  }

  function minLength(value, min, label = 'This field') {
    if (!value || value.length < min) {
      return `${label} must be at least ${min} characters`
    }
    return ''
  }

  function sameAs(value, otherValue, label = 'Passwords') {
    if (value !== otherValue) {
      return `${label} do not match`
    }
    return ''
  }

  function phone(value) {
    if (!value) return ''
    const re = /^[\d\s+\-()]{7,}$/
    return re.test(value) ? '' : 'Please enter a valid phone number'
  }

  return { required, email, minLength, sameAs, phone }
}
