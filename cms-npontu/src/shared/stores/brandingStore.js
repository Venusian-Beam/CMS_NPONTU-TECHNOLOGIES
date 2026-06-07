import { defineStore } from 'pinia'
import { ref } from 'vue'

const DEFAULT_BRANDING = {
  primary: '#5C67F7',
  'primary-hover': '#434FE2',
  'primary-light': '#ECF3FB',
  secondary: '#F0B323',
  'primary-contrast': '#ffffff',
  'secondary-contrast': '#111827',
  surface: '#ffffff',
  page: '#F9FAFC',
  sidebar: '#ffffff',
  topbar: '#1F2020',
  border: '#E2E6F1',
  text: '#1F2020',
  'text-secondary': '#3C3C3C',
  muted: '#9F9F9F',
  success: '#10b981',
  'success-bg': '#E8FAF5',
  warning: '#f59e0b',
  'warning-bg': '#FFF8E1',
  danger: '#ef4444',
  'danger-bg': '#FFECEC',
  info: '#3b82f6',
  'info-bg': '#E8F0FE',
}

export const useBrandingStore = defineStore('branding', () => {
  const tenant = ref(null)

  function setCSSVariable(name, value) {
    document.documentElement.style.setProperty(`--color-${name}`, value)
  }

  function applyBranding(variables) {
    Object.entries(variables).forEach(([key, value]) => {
      setCSSVariable(key, value)
    })
  }

  function applyPlatformDefaults() {
    applyBranding(DEFAULT_BRANDING)
  }

  function setTenantBranding(tenantData) {
    if (!tenantData) {
      applyPlatformDefaults()
      tenant.value = null
      return
    }
    tenant.value = tenantData
    const colors = {
      primary: tenantData.primary_color || DEFAULT_BRANDING.primary,
      secondary: tenantData.secondary_color || DEFAULT_BRANDING.secondary,
    }
    colors['primary-contrast'] = getContrastColor(colors.primary)
    colors['secondary-contrast'] = getContrastColor(colors.secondary)
    applyBranding({ ...DEFAULT_BRANDING, ...colors })
    try {
      localStorage.setItem('cms_branding', JSON.stringify(tenantData))
    } catch {}
  }

  function loadCachedBranding() {
    try {
      const cached = localStorage.getItem('cms_branding')
      if (cached) {
        const data = JSON.parse(cached)
        setTenantBranding(data)
        return data
      }
    } catch {}
    applyPlatformDefaults()
    return null
  }

  function clearBranding() {
    applyPlatformDefaults()
    tenant.value = null
    try {
      localStorage.removeItem('cms_branding')
    } catch {}
  }

  return {
    tenant,
    applyBranding,
    applyPlatformDefaults,
    setTenantBranding,
    loadCachedBranding,
    clearBranding,
  }
})

function getContrastColor(hex) {
  if (!hex) return '#ffffff'
  const c = hex.replace('#', '')
  const r = parseInt(c.substring(0, 2), 16)
  const g = parseInt(c.substring(2, 4), 16)
  const b = parseInt(c.substring(4, 6), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5 ? '#1F2020' : '#ffffff'
}
