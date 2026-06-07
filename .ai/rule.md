# CMS Frontend AI Rules

## Project Mission

Build only the frontend design for the Campus Management System. Another team will build the backend.

The frontend must look and behave like a professional multi-tenant SaaS ERP platform for education, with polished auth pages, landing page, dashboards, portal layouts, mock data, and backend-ready service boundaries.

## Designer Mindset

Act like an expert graphic designer, senior UI designer, and senior UX designer.

Do not merely place components on a page. Compose screens with deliberate hierarchy, spacing, rhythm, typography, contrast, and emotional tone.

Every screen should feel:

- Professional
- Premium
- Trustworthy
- Modern
- Clear
- Usable
- Responsive

For major screens, decide the visual concept before coding:

- Who is the user?
- What is their main task?
- What should they notice first?
- What is the primary action?
- What information can be secondary?
- What state should the page show when data is empty, loading, or restricted?

Graphic design expectations:

- Use imagery, illustration, icons, and color intentionally.
- Keep visual assets relevant to campus management, education, dashboards, students, staff, and institutions.
- Avoid generic filler visuals.
- Avoid weak spacing, low contrast, clutter, and random decorative gradients.
- Preserve a consistent product identity across landing, auth, and portal pages.

UI/UX expectations:

- Forms must be easy to complete.
- Dashboards must be useful at a glance.
- Tables must be scannable and action-oriented.
- Navigation must be predictable.
- Mobile layouts must feel designed, not squeezed.
- Empty states must guide the user.
- Error states must be calm and actionable.

## Mandatory Context

Before changing or generating frontend code, read:

```text
.ai/context/cms-frontend-architecture.md
.ai/context/inspiration.md
```

Then read only the relevant focused file:

```text
.ai/context/branding-system.md
.ai/context/routing-and-rbac.md
.ai/context/super-admin-app.md
.ai/context/institution-app.md
.ai/context/staff-app.md
.ai/context/student-app.md
```

## Delivery Methodology

Follow the hybrid methodology from the project development document:

- **Waterfall first**: do not build before architecture, visual direction, stack, and scope are clear.
- **Agile execution**: deliver in small, reviewable increments.
- **V-Model validation**: every feature should have acceptance criteria and a test/check scenario.
- **RACI awareness**: Product owns intent, Engineering owns implementation, QA owns validation, Business owns signoff.

## Development Phases

Use these five frontend phases:

1. Auth, landing page, and visual foundation.
2. Shared app shell, mock routing/RBAC, and branding.
3. Super Admin frontend design.
4. Institution Admin frontend design.
5. Staff + Student frontend design, QA, and handoff.

Start with sign in, sign up/request-demo, forgot password, reset password, and the landing page.

## Stack Rules

Use:

- Vue 3
- Composition API
- `<script setup>`
- Pinia
- Vue Router
- TailwindCSS
- Axios placeholder/mock services
- Vite

Never use Vue Options API.

Never call Axios directly from components. Use service files.

## Backend Boundary

The frontend must be backend-ready but not backend-dependent.

- Use mock data and mock services.
- Preserve expected response shapes from the backend guide.
- Do not invent final API contracts.
- If an endpoint is uncertain, document it as an assumption.
- Security and tenant isolation are backend-owned.
- Frontend RBAC is for navigation, route hygiene, disabled states, and UX only.

## UI / UX Rules

Follow `.ai/context/inspiration.md`.

- Login and signup pages must follow the Pinterest auth reference.
- Landing page must combine the Figma reference and landing screenshot inspiration.
- Dashboards must follow the professional SaaS dashboard screenshot rhythm.
- Use visual assets intentionally.
- Use tenant branding through CSS variables only.
- Do not hardcode tenant brand colors.
- Do not use cards inside cards.
- Do not create marketing-style hero sections inside portal apps.
- Keep admin screens dense, calm, and operational.
- Keep student screens friendly, clear, and self-service oriented.

## Component Rules

Prefer shared components for:

- Buttons
- Inputs
- Selects
- Checkboxes
- Badges
- Tables
- Pagination
- Tabs
- Modals
- Drawers
- Toasts
- Loaders
- Empty states
- KPI cards

Add a new component only when it can be reused or when the page complexity justifies it.

## State And Data Rules

- Use Pinia for auth, branding, tenant, permissions, and notifications.
- Use local page state for simple forms and one-off tables.
- Use mock service files for data.
- Keep mock response shapes close to expected backend payloads.
- Every table should have loading, empty, error, and populated states.

## Routing Rules

Portal prefixes:

```text
/login
/super-admin
/institution
/staff
/student
```

Role redirects:

```text
super_admin -> /super-admin
institution_admin, registrar, bursar, finance_officer, hod, examination_officer, hr_manager, hostel_manager -> /institution
lecturer, tutor -> /staff
student -> /student
```

Unknown roles go to an unauthorized screen.

## Branding Rules

Use tenant branding payload:

```json
{
  "id": "uuid",
  "name": "University of Ghana",
  "slug": "ug",
  "logo_url": "https://example.com/logo.png",
  "primary_color": "#003366",
  "secondary_color": "#FFD700",
  "status": "active"
}
```

Apply:

```css
--color-primary
--color-secondary
--color-primary-contrast
--color-secondary-contrast
```

Keep system status colors independent from tenant colors.

## Accessibility Rules

Target WCAG 2.1 AA.

Required:

- Keyboard navigation
- Visible focus states
- Form labels
- Validation messages
- Dialog focus trapping
- Color contrast checks
- Mobile layouts down to 320px

## Cursor / AI Working Rules

Use Cursor rules as clear internal documentation. Cursor project rules should normally live in `.cursor/rules`; root `.cursorrules` is still supported but should not be the long-term default.

When prompting Cursor:

- Attach the relevant `.ai/context` file.
- Ask for one screen or flow at a time.
- Demand small, reviewable diffs.
- Ask it to preserve existing patterns.
- Ask it to add mock services instead of real backend dependencies.
- Ask it to list assumptions when backend contracts are missing.

Never accept generated code without checking:

- Does it match the approved stack?
- Does it use shared components?
- Does it avoid hardcoded tenant colors?
- Does it preserve routing/RBAC rules?
- Does it include responsive behavior?
- Does it avoid invented backend contracts?

## Review Checklist

Before considering a task complete, verify:

- Visual style matches inspiration.
- Route works.
- Page is responsive.
- Mock data is realistic.
- Empty/loading/error states exist.
- Component names are clear.
- No Options API is used.
- No direct Axios calls in components.
- Branding tokens are used.
- Backend assumptions are documented.
