# CMS Frontend Architecture

## Purpose

The Campus Management System frontend is a Vue 3 multi-portal SaaS application for managing multiple educational institutions from one shared platform. It must support strict tenant-aware UX, role-based navigation, dynamic institution branding, responsive dashboards, and clean separation between shared infrastructure and portal-specific modules.

This file is the master context for frontend agents. Load it first, then load only the relevant portal or subsystem context file.

## Source Of Truth

- The frontend must align with the Laravel backend implementation guide and the CMS PRD.
- When the backend guide and PRD conflict, the backend guide wins.
- The frontend does not enforce data security by itself. Backend APIs own tenant isolation, authorization, and data validation.
- Frontend RBAC exists for route hygiene, navigation visibility, disabled states, and user experience.

## Tech Stack

- Vue 3
- Composition API
- `<script setup>`
- Pinia
- Vue Router
- Axios
- TailwindCSS
- Vite
- Headless accessible UI primitives where needed

Do not use Vue Options API. Keep API calls out of components. Components should call composables or services.

## Application Shape

Use one frontend repository with multiple Vite entrypoints:

```text
apps/
  super-admin/
  institution/
  staff/
  student/

src/
  shared/
    components/
    composables/
    layouts/
    router/
    services/
    stores/
    themes/
    utils/
```

Each portal owns its routes, pages, and portal layout. Shared infrastructure lives under `src/shared`.

## Portal Prefixes

```text
/login
/super-admin
/institution
/staff
/student
```

Role-to-portal mapping is defined in `routing-and-rbac.md`.

## Backend Integration Assumptions

The backend is Laravel 11+ using Sanctum SPA cookie authentication.

Core frontend API expectations:

```text
GET  /sanctum/csrf-cookie
POST /api/login
GET  /api/me
POST /api/logout
```

Axios must use `withCredentials: true`.

Expected login/session payload:

```json
{
  "user": {
    "id": "uuid",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "role": "institution_admin"
  },
  "tenant": {
    "id": "uuid",
    "name": "University of Ghana",
    "slug": "ug",
    "logo_url": "https://example.com/logo.png",
    "primary_color": "#003366",
    "secondary_color": "#FFD700",
    "status": "active"
  }
}
```

Super Admin users may have `tenant: null`.

## Shared State

Use Pinia stores for global state:

```text
authStore
brandingStore
tenantStore
permissionsStore
notificationStore
```

Feature data can use module stores only when it is reused across multiple pages or needs caching. Local page state is preferred for single-screen forms and tables.

## Service Layer

Create service modules for API communication:

```text
authService
tenantService
institutionService
studentService
academicService
staffService
financeService
reportService
notificationService
```

Components must not call Axios directly. Services own endpoints, request payloads, response normalization, and API error mapping.

## Design Direction

The UI should feel like a modern SaaS ERP platform, not a decorative school website.

Use:

- Dense but readable dashboards
- Restrained color usage
- Strong tables, filters, tabs, and forms
- Clear status badges
- Predictable side navigation
- Responsive layouts from 320px to large desktop
- Accessible dialogs, menus, and form controls

Avoid:

- Marketing-style hero sections inside the app
- Decorative gradients as the main visual language
- Hardcoded tenant colors
- Cards inside cards
- Client-only security assumptions

## Dynamic Branding

Tenant branding is global shared infrastructure. See `branding-system.md`.

All portal UI must consume CSS variables and Tailwind theme tokens. Do not hardcode institution brand colors in components.

## Accessibility

Target WCAG 2.1 AA.

Required frontend behavior:

- Keyboard navigable sidebars, menus, modals, tabs, and forms
- Visible focus states
- Form labels and validation messages
- Dialog focus trapping
- Safe contrast defaults for platform and tenant themes
- No layout-breaking text on mobile

## Agent Rules

- Load this master file first.
- Load only the portal or subsystem file needed for the task.
- Do not invent backend endpoints when contracts are missing. Add a documented assumption or ask for the backend contract.
- Keep shared components generic and portal-neutral.
- Keep portal-specific business logic inside that portal's module.
- Prefer conservative implementation aligned with the backend guide.
