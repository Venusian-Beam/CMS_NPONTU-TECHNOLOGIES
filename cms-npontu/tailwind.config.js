/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: 'var(--color-primary)', hover: 'var(--color-primary-hover)', light: 'var(--color-primary-light)', subtle: 'var(--color-primary-subtle)' },
        secondary: 'var(--color-secondary)',
        'accent-blue': 'var(--color-accent-blue)',
        'accent-coral': 'var(--color-accent-coral)',
        'accent-mint': 'var(--color-accent-mint)',
        'primary-contrast': 'var(--color-primary-contrast)',
        'secondary-contrast': 'var(--color-secondary-contrast)',
        surface: 'var(--color-surface)',
        page: 'var(--color-page)',
        soft: 'var(--color-soft)',
        border: 'var(--color-border)',
        text: { DEFAULT: 'var(--color-text)', secondary: 'var(--color-text-secondary)' },
        muted: 'var(--color-muted)',
        success: { DEFAULT: 'var(--color-success)', bg: 'var(--color-success-bg)' },
        danger: { DEFAULT: 'var(--color-danger)', bg: 'var(--color-danger-bg)' },
        warning: { DEFAULT: 'var(--color-warning)', bg: 'var(--color-warning-bg)' },
        info: { DEFAULT: 'var(--color-info)', bg: 'var(--color-info-bg)' },
        brand: { orange: '#F59E0B', blue: '#0EA5E9', green: '#10B981' },
      },
      fontFamily: { sans: ['Nunito', 'Montserrat', 'system-ui', '-apple-system', 'sans-serif'] },
      boxShadow: {
        soft: '0 1px 3px 0 rgba(0,0,0,0.04), 0 1px 2px -1px rgba(0,0,0,0.06)',
        card: '0 2px 8px 0 rgba(0,0,0,0.04), 0 1px 3px -1px rgba(0,0,0,0.03)',
        panel: '0 8px 24px 0 rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
}
