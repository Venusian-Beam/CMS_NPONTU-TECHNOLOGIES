import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'landing',
    component: () => import('@shared/pages/landing/LandingPage.vue'),
  },
  {
    path: '/',
    component: () => import('@shared/layouts/AuthLayout.vue'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@shared/pages/login/LoginPage.vue'),
      },
      {
        path: 'signup',
        name: 'signup',
        component: () => import('@shared/pages/signup/SignupPage.vue'),
      },
      {
        path: 'forgot-password',
        name: 'forgot-password',
        component: () => import('@shared/pages/forgot-password/ForgotPasswordPage.vue'),
      },
      {
        path: 'reset-password',
        name: 'reset-password',
        component: () => import('@shared/pages/reset-password/ResetPasswordPage.vue'),
      },
    ],
  },
  {
    path: '/super-admin',
    component: () => import('@shared/layouts/SuperAdminLayout.vue'),
    children: [
      { path: '', name: 'super-admin-dashboard', component: () => import('@shared/pages/super-admin/Dashboard.vue') },
      { path: 'institutions', name: 'super-admin-institutions', component: () => import('@shared/pages/super-admin/Institutions.vue') },
      { path: 'subscriptions', name: 'super-admin-subscriptions', component: () => import('@shared/pages/super-admin/Subscriptions.vue') },
      { path: 'users', name: 'super-admin-users', component: () => import('@shared/pages/super-admin/Users.vue') },
      { path: 'analytics', name: 'super-admin-analytics', component: () => import('@shared/pages/super-admin/Analytics.vue') },
      { path: 'audit-log', name: 'super-admin-audit-log', component: () => import('@shared/pages/super-admin/AuditLog.vue') },
    ],
  },
  {
    path: '/institution',
    component: () => import('@shared/layouts/InstitutionLayout.vue'),
    children: [
      { path: '', name: 'institution-dashboard', component: () => import('@shared/pages/institution/Dashboard.vue') },
      { path: 'admissions', name: 'institution-admissions', component: () => import('@shared/pages/institution/Admissions.vue') },
      { path: 'students', name: 'institution-students', component: () => import('@shared/pages/institution/Students.vue') },
      { path: 'staff', name: 'institution-staff', component: () => import('@shared/pages/institution/Staff.vue') },
      { path: 'academics', name: 'institution-academics', component: () => import('@shared/pages/institution/Academics.vue') },
      { path: 'finance', name: 'institution-finance', component: () => import('@shared/pages/institution/Finance.vue') },
      { path: 'communication', name: 'institution-communication', component: () => import('@shared/pages/institution/Communication.vue') },
      { path: 'reports', name: 'institution-reports', component: () => import('@shared/pages/institution/Reports.vue') },
      { path: 'settings', name: 'institution-settings', component: () => import('@shared/pages/institution/Settings.vue') },
    ],
  },
  {
    path: '/staff',
    component: () => import('@shared/layouts/StaffLayout.vue'),
    children: [
      { path: '', name: 'staff-dashboard', component: () => import('@shared/pages/staff/Dashboard.vue') },
      { path: 'courses', name: 'staff-courses', component: () => import('@shared/pages/staff/Courses.vue') },
      { path: 'attendance', name: 'staff-attendance', component: () => import('@shared/pages/staff/Attendance.vue') },
      { path: 'assessments', name: 'staff-assessments', component: () => import('@shared/pages/staff/Assessments.vue') },
      { path: 'results', name: 'staff-results', component: () => import('@shared/pages/staff/Results.vue') },
      { path: 'students', name: 'staff-students', component: () => import('@shared/pages/staff/Students.vue') },
      { path: 'messages', name: 'staff-messages', component: () => import('@shared/pages/staff/Messages.vue') },
    ],
  },
  {
    path: '/student',
    component: () => import('@shared/layouts/StudentLayout.vue'),
    children: [
      { path: '', name: 'student-dashboard', component: () => import('@shared/pages/student/Dashboard.vue') },
      { path: 'registration', name: 'student-registration', component: () => import('@shared/pages/student/Registration.vue') },
      { path: 'courses', name: 'student-courses', component: () => import('@shared/pages/student/Courses.vue') },
      { path: 'timetable', name: 'student-timetable', component: () => import('@shared/pages/student/Timetable.vue') },
      { path: 'attendance', name: 'student-attendance', component: () => import('@shared/pages/student/Attendance.vue') },
      { path: 'results', name: 'student-results', component: () => import('@shared/pages/student/Results.vue') },
      { path: 'payments', name: 'student-payments', component: () => import('@shared/pages/student/Payments.vue') },
      { path: 'accommodation', name: 'student-accommodation', component: () => import('@shared/pages/student/Accommodation.vue') },
      { path: 'transcript', name: 'student-transcript', component: () => import('@shared/pages/student/Transcript.vue') },
      { path: 'announcements', name: 'student-announcements', component: () => import('@shared/pages/student/Announcements.vue') },
      { path: 'profile', name: 'student-profile', component: () => import('@shared/pages/student/Profile.vue') },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0, behavior: 'smooth' }
  },
})

export default router
