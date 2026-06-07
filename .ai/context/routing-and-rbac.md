# Routing And RBAC Context

## Purpose

This file defines frontend routing, role-to-portal mapping, route guards, tenant status handling, and navigation visibility.

The backend is the source of truth for authorization. Frontend RBAC improves user experience but must not be treated as security enforcement.

## Route Prefixes

```text
/login
/super-admin
/institution
/staff
/student
```

Each portal owns its own route tree and layout.

## Role To Portal Mapping

```text
super_admin -> /super-admin

institution_admin -> /institution
registrar -> /institution
bursar -> /institution
finance_officer -> /institution
hod -> /institution
examination_officer -> /institution
hr_manager -> /institution
hostel_manager -> /institution

lecturer -> /staff
tutor -> /staff

student -> /student
```

If a role is unknown, redirect to an unauthorized screen and log the role value for debugging.

## Auth Guard

Authenticated portal routes require a valid session.

Guard behavior:

1. If auth store has a hydrated user, continue.
2. Otherwise call `GET /api/me`.
3. If `/api/me` succeeds, store user and tenant, apply branding, continue.
4. If `/api/me` fails with 401, clear state and redirect to `/login`.

## Guest Guard

The login route should redirect authenticated users to their role's default portal.

If `/api/me` is still loading, show a neutral loading state.

## Role Guard

Portal route trees must check that the authenticated user's role belongs to that portal.

Examples:

- A student visiting `/super-admin` redirects to unauthorized or their own `/student` dashboard.
- A lecturer visiting `/institution` redirects to `/staff`.
- A Super Admin has no tenant and should not enter tenant portals unless impersonation is explicitly supported by backend.

## Permission Checks

Use backend-provided permissions when available.

Permission checks should control:

- Navigation item visibility
- Action button visibility
- Disabled states
- Empty-state messaging
- Route access for feature pages

Permission checks must not be the only protection for mutations. Backend must reject unauthorized requests.

## Tenant Status Behavior

Tenant statuses:

```text
provisioned
active
suspended
archived
deactivated
```

Suggested frontend behavior:

- `provisioned`: allow login and initial setup screens only when backend allows it.
- `active`: allow normal portal access.
- `suspended`: allow read-only mode if backend supports it; disable write actions and show a suspension banner.
- `archived`: show export/history-only access if backend supports it; otherwise show access restricted.
- `deactivated`: block tenant portal access and show access disabled.

Backend responses decide final behavior. The frontend should display clear banners and disabled states based on session payload and API errors.

## Navigation Visibility

Navigation should be generated from route metadata:

```text
label
icon
path
requiredRoles
requiredPermissions
portal
```

Do not duplicate navigation definitions across layouts when a shared route/nav config can be used safely.

## Error Routes

Include shared error views:

```text
/unauthorized
/not-found
/session-expired
/tenant-restricted
```

Error views should be portal-aware when rendered inside a portal layout.

## Login Redirect Flow

After successful login:

1. Store user.
2. Store tenant if present.
3. Apply branding.
4. Resolve destination from role.
5. Redirect.

If user attempted a protected route first, redirect there only if the route is valid for that user's role and tenant status.

## Agent Rules

- Do not add a new role without updating role-to-portal mapping.
- Do not invent permissions. Use backend names when known.
- Do not rely on hidden buttons for security.
- Keep redirect behavior deterministic and easy to test.
