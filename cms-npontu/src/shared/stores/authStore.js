import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authService } from '@shared/services/authService'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const tenant = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const isAuthenticated = computed(() => !!user.value)
  const userRole = computed(() => user.value?.role ?? null)

  const portalMap = {
    super_admin: '/super-admin',
    institution_admin: '/institution',
    registrar: '/institution',
    bursar: '/institution',
    finance_officer: '/institution',
    hod: '/institution',
    examination_officer: '/institution',
    hr_manager: '/institution',
    hostel_manager: '/institution',
    lecturer: '/staff',
    tutor: '/staff',
    student: '/student',
  }

  const defaultRoute = computed(() => {
    if (!userRole.value) return '/login'
    return portalMap[userRole.value] ?? '/unauthorized'
  })

  async function login(credentials) {
    loading.value = true
    error.value = null
    try {
      const data = await authService.login(credentials)
      user.value = data.user
      tenant.value = data.tenant ?? null
      return { user: data.user, tenant: data.tenant }
    } catch (err) {
      error.value = err.response?.data?.message || err.message || 'Login failed'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  async function fetchUser() {
    loading.value = true
    try {
      const data = await authService.me()
      user.value = data.user
      tenant.value = data.tenant ?? null
      return data
    } catch (err) {
      user.value = null
      tenant.value = null
      throw err
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    try {
      await authService.logout()
    } finally {
      user.value = null
      tenant.value = null
    }
  }

  function clearAuth() {
    user.value = null
    tenant.value = null
    error.value = null
  }

  return {
    user,
    tenant,
    loading,
    error,
    isAuthenticated,
    userRole,
    defaultRoute,
    portalMap,
    login,
    fetchUser,
    logout,
    clearAuth,
  }
})
