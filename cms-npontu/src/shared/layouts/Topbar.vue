<script setup>
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// User info
const user = {
  name: 'Kwame Asante',
  level: 'Level 200',
  initials: 'KA',
  avatar: null,
}

// Search
const searchQuery = ref('')
const searchFocused = ref(false)

// Theme toggle
const isDarkMode = ref(false)
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
}

// Notifications
const notificationCount = ref(3)

// User menu
const userMenuOpen = ref(false)
const toggleUserMenu = () => {
  userMenuOpen.value = !userMenuOpen.value
}

// Sidebar toggle (emit to parent)
const emit = defineEmits(['toggle-sidebar'])
const toggleSidebar = () => {
  emit('toggle-sidebar')
}

// Navigation items
const navItems = [
  { label: 'Dashboard', icon: 'heroicons:squares-2x2', route: '/student/dashboard' },
  { label: 'Registration', icon: 'heroicons:clipboard-document-check', route: '/student/registration' },
  { label: 'My Courses', icon: 'heroicons:book-open', route: '/student/courses' },
  { label: 'Timetable', icon: 'heroicons:calendar-days', route: '/student/timetable' },
  { label: 'Attendance', icon: 'heroicons:check-badge', route: '/student/attendance' },
  { label: 'Results', icon: 'heroicons:chart-bar', route: '/student/results' },
  { label: 'Payments', icon: 'heroicons:credit-card', route: '/student/payments' },
  { label: 'Accommodation', icon: 'heroicons:home-modern', route: '/student/accommodation' },
  { label: 'Transcript', icon: 'heroicons:document-text', route: '/student/transcript' },
  { label: 'Announcements', icon: 'heroicons:megaphone', route: '/student/announcements' },
]

// Active nav detection
const isActive = (path) => route.path === path

// Scroll nav (for overflow)
const navScrollRef = ref(null)
const scrollNav = (direction) => {
  if (navScrollRef.value) {
    navScrollRef.value.scrollBy({ left: direction * 200, behavior: 'smooth' })
  }
}
</script>

<template>
  <header class="topbar-wrap">
    <!-- ═══════════════ TOP BAR ═══════════════ -->
    <div class="topbar">
      <!-- LEFT: Logo + Hamburger + Search -->
      <div class="topbar-left">
        <!-- Logo -->
        <div class="logo-box">
          <img src="/images/logo.png" alt="ELEVA" class="logo-img" />
        </div>

        <!-- Hamburger / Sidebar toggle -->
        <button class="icon-btn" @click="toggleSidebar" aria-label="Toggle sidebar">
          <Icon icon="heroicons:bars-3" width="20" />
        </button>

        <!-- Search -->
        <div class="search-box" :class="{ 'search-focused': searchFocused }">
          <Icon
            icon="heroicons:magnifying-glass"
            width="16"
            class="search-icon"
          />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search courses, results, payments..."
            class="search-input"
            @focus="searchFocused = true"
            @blur="searchFocused = false"
          />
          <kbd class="search-kbd">⌘K</kbd>
        </div>
      </div>

      <!-- RIGHT: Theme + Fullscreen + Notifications + Profile -->
      <div class="topbar-right">
        <!-- Theme Toggle -->
        <button
          class="icon-btn"
          @click="toggleTheme"
          aria-label="Toggle theme"
        >
          <Icon
            :icon="isDarkMode ? 'heroicons:sun' : 'heroicons:moon'"
            width="18"
          />
        </button>

        <!-- Fullscreen -->
        <button class="icon-btn" aria-label="Fullscreen">
          <Icon icon="heroicons:arrows-pointing-out" width="18" />
        </button>

        <!-- Notifications -->
        <button class="icon-btn icon-btn-notif" aria-label="Notifications">
          <Icon icon="heroicons:bell" width="18" />
          <span v-if="notificationCount > 0" class="notif-badge">
            {{ notificationCount > 9 ? '9+' : notificationCount }}
          </span>
        </button>

        <!-- Divider -->
        <div class="topbar-divider"></div>

        <!-- User Profile -->
        <button
          class="user-profile"
          @click="toggleUserMenu"
          :class="{ 'user-profile-open': userMenuOpen }"
        >
          <div class="user-avatar">
            <img v-if="user.avatar" :src="user.avatar" :alt="user.name" />
            <span v-else>{{ user.initials }}</span>
            <span class="user-status-dot"></span>
          </div>
          <div class="user-info">
            <p class="user-name">{{ user.name }}</p>
            <p class="user-level">{{ user.level }}</p>
          </div>
          <Icon
            icon="heroicons:chevron-down"
            width="14"
            class="user-chevron"
          />
        </button>
      </div>
    </div>

    <!-- ═══════════════ NAVIGATION BAR ═══════════════ -->
    <div class="navbar">
      <button class="nav-scroll-btn nav-scroll-left" @click="scrollNav(-1)">
        <Icon icon="heroicons:chevron-left" width="14" />
      </button>

      <nav class="nav-scroll" ref="navScrollRef">
        <router-link
          v-for="(item, i) in navItems"
          :key="i"
          :to="item.route"
          class="nav-item"
          :class="{ 'nav-active': isActive(item.route) }"
        >
          <span class="nav-item-icon">
            <Icon :icon="item.icon" width="16" />
          </span>
          <span class="nav-item-label">{{ item.label }}</span>
          <span v-if="isActive(item.route)" class="nav-active-indicator"></span>
        </router-link>
      </nav>

      <button class="nav-scroll-btn nav-scroll-right" @click="scrollNav(1)">
        <Icon icon="heroicons:chevron-right" width="14" />
      </button>
    </div>
  </header>
</template>

<style scoped>
/* ═══════════════════════════════════════════════════════════════════════════
   WRAPPER
   ═══════════════════════════════════════════════════════════════════════════ */
.topbar-wrap {
  position: sticky;
  top: 0;
  z-index: 100;
  background: white;
  border-bottom: 1px solid #f1f5f9;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
}

/* ═══════════════════════════════════════════════════════════════════════════
   TOP BAR
   ═══════════════════════════════════════════════════════════════════════════ */
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  gap: 16px;
  min-height: 64px;
}

/* ── LEFT SECTION ─────────────────────────────────────────────────────── */
.topbar-left {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
}

/* Logo */
.logo-box {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
}

.logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* Icon button (hamburger, theme, etc) */
.icon-btn {
  position: relative;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: transparent;
  border: 1px solid #f1f5f9;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.icon-btn:hover {
  background: #f8fafc;
  border-color: #e2e8f0;
  color: #ec4899;
  transform: translateY(-1px);
}

.icon-btn:active {
  transform: translateY(0);
}

/* Search */
.search-box {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  max-width: 420px;
  height: 40px;
  padding: 0 14px;
  background: #f8fafc;
  border: 1px solid #f1f5f9;
  border-radius: 12px;
  transition: all 0.25s ease;
}

.search-box:hover {
  background: white;
  border-color: #e2e8f0;
}

.search-focused {
  background: white !important;
  border-color: #ec4899 !important;
  box-shadow:
    0 0 0 4px rgba(236, 72, 153, 0.08),
    0 4px 12px rgba(236, 72, 153, 0.08);
}

.search-icon {
  color: #94a3b8;
  flex-shrink: 0;
  transition: color 0.2s;
}

.search-focused .search-icon {
  color: #ec4899;
}

.search-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-size: 13px;
  font-weight: 500;
  color: #0f172a;
  font-family: inherit;
}

.search-input::placeholder {
  color: #94a3b8;
  font-weight: 500;
}

.search-kbd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 22px;
  padding: 0 7px;
  font-size: 10px;
  font-weight: 700;
  color: #64748b;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-family: 'SF Mono', Monaco, monospace;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
}

/* ── RIGHT SECTION ────────────────────────────────────────────────────── */
.topbar-right {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

/* Notification badge */
.icon-btn-notif {
  position: relative;
}

.notif-badge {
  position: absolute;
  top: -3px;
  right: -3px;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  background: linear-gradient(135deg, #ec4899, #f43f5e);
  color: white;
  font-size: 9px;
  font-weight: 800;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
  box-shadow: 0 2px 6px rgba(236, 72, 153, 0.4);
  animation: badge-bounce 2s ease-in-out infinite;
}

@keyframes badge-bounce {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

/* Divider */
.topbar-divider {
  width: 1px;
  height: 28px;
  background: #f1f5f9;
  margin: 0 4px;
}

/* User Profile */
.user-profile {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px 12px 5px 5px;
  background: #f8fafc;
  border: 1px solid #f1f5f9;
  border-radius: 100px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.user-profile:hover {
  background: white;
  border-color: #e2e8f0;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.06);
}

.user-profile-open {
  background: white;
  border-color: #ec4899;
  box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.08);
}

.user-avatar {
  position: relative;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #f472b6, #ec4899);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: -0.3px;
  flex-shrink: 0;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 2px 6px rgba(236, 72, 153, 0.2);
}

.user-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.user-status-dot {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #22c55e;
  border: 2px solid white;
  box-shadow: 0 0 4px rgba(34, 197, 94, 0.4);
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 1.2;
}

.user-name {
  font-size: 12px;
  font-weight: 700;
  color: #0f172a;
  white-space: nowrap;
}

.user-level {
  font-size: 10px;
  font-weight: 500;
  color: #94a3b8;
  margin-top: 1px;
}

.user-chevron {
  color: #94a3b8;
  transition: transform 0.2s;
}

.user-profile-open .user-chevron {
  transform: rotate(180deg);
  color: #ec4899;
}

/* ═══════════════════════════════════════════════════════════════════════════
   NAVIGATION BAR
   ═══════════════════════════════════════════════════════════════════════════ */
.navbar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 24px;
  border-top: 1px solid #f1f5f9;
  background: white;
  height: 52px;
}

/* Scroll buttons */
.nav-scroll-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: white;
  border: 1px solid #e2e8f0;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.06);
}

.nav-scroll-btn:hover {
  background: #ec4899;
  border-color: #ec4899;
  color: white;
  transform: translateY(-50%) scale(1.05);
}

.nav-scroll-left {
  left: 12px;
}

.nav-scroll-right {
  right: 12px;
}

/* Scrollable nav */
.nav-scroll {
  display: flex;
  align-items: center;
  gap: 4px;
  width: 100%;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: 8px 32px;
  mask-image: linear-gradient(to right, transparent 0, black 24px, black calc(100% - 24px), transparent 100%);
  -webkit-mask-image: linear-gradient(to right, transparent 0, black 24px, black calc(100% - 24px), transparent 100%);
}

.nav-scroll::-webkit-scrollbar {
  display: none;
}

/* Nav item */
.nav-item {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  color: #64748b;
  text-decoration: none;
  white-space: nowrap;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.nav-item:hover {
  background: #f8fafc;
  color: #ec4899;
}

.nav-item-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  transition: transform 0.2s ease;
}

.nav-item:hover .nav-item-icon {
  transform: scale(1.1);
}

.nav-item-label {
  letter-spacing: -0.1px;
}

/* Active state */
.nav-active {
  background: linear-gradient(135deg, rgba(236, 72, 153, 0.08), rgba(244, 114, 182, 0.05));
  color: #ec4899 !important;
}

.nav-active .nav-item-icon {
  color: #ec4899;
}

.nav-active-indicator {
  position: absolute;
  bottom: -9px;
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 3px;
  background: linear-gradient(90deg, #ec4899, #f472b6);
  border-radius: 100px 100px 0 0;
  box-shadow: 0 -2px 8px rgba(236, 72, 153, 0.4);
}

/* ═══════════════════════════════════════════════════════════════════════════
   RESPONSIVE
   ═══════════════════════════════════════════════════════════════════════════ */
@media (max-width: 1024px) {
  .topbar {
    padding: 10px 16px;
  }
  .navbar {
    padding: 0 16px;
  }
  .user-info {
    display: none;
  }
  .user-profile {
    padding: 5px;
  }
}

@media (max-width: 640px) {
  .search-box {
    max-width: none;
  }
  .search-kbd {
    display: none;
  }
  .topbar-divider {
    display: none;
  }
}
</style>
