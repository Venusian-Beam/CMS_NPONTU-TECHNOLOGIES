# Super Admin App Context

## Purpose

The Super Admin app is the platform operator console. It manages institutions, subscriptions, global users, analytics, audit logs, and platform activity across all tenants.

Super Admin scope is global. It is tenant governance focused, not day-to-day academic management.

## Route Prefix

```text
/super-admin
```

## Layout

Use a dedicated `SuperAdminLayout` with:

- Sidebar navigation
- Topbar with global search, notifications, and account menu
- Main content area
- Toast notification outlet
- Optional notification center drawer

The layout should be information-dense and operational. Avoid marketing page patterns.

## Navigation

Primary navigation:

```text
Dashboard
Institutions
Subscriptions & Billing
Users
Analytics & Reports
Audit Log
Activity Feed
Settings
```

## Dashboard

Dashboard widgets:

- Institution summary by status
- Platform totals
- Revenue snapshot
- Recent activity preview
- New institutions this month
- Attention list for overdue/suspended/setup-incomplete tenants

Dashboard interactions:

- Clicking institution status cards links to a filtered institutions table.
- Clicking overdue revenue links to filtered subscriptions.
- Global search accepts institution name, admin email, or tenant slug.

## Institutions

Institution list columns:

- Institution name with logo
- Slug
- Type
- Status
- Plan
- Student count
- Last active timestamp
- Actions

Required table behavior:

- Search
- Sort
- Filter by type, status, and plan
- Pagination
- Loading, error, and empty states

## Create Institution Wizard

The Create Institution flow is a multi-step wizard.

Steps:

```text
1. Basic Info
2. Branding
3. Subscription
4. Admin Account
5. Review & Provision
```

Required fields by step:

- Basic Info: name, slug, type, country, state, address, email, phone, website
- Branding: logo, primary color, secondary color
- Subscription: plan, billing cycle, optional trial end date
- Admin Account: full name, email, optional phone, password mode
- Review: full summary and final provision action

Behavior:

- Validate slug uniqueness when backend endpoint is available.
- Show logo preview immediately.
- Apply selected colors to a preview panel.
- Disable final provision until required steps are valid.
- Show setup-incomplete warning if backend returns partial provisioning state.

## Institution Detail

Use tabs:

```text
Overview
Subscription
Admin Accounts
Audit History
```

Key actions:

- Activate
- Suspend
- Restore
- Archive
- Deactivate
- Reset admin password
- Add admin
- Impersonate admin, if backend supports it

Destructive lifecycle actions require confirmation. Deactivation requires typed confirmation using `DEACTIVATE`.

## Subscriptions & Billing

Screens:

- Subscription list
- Subscription detail
- Plan management
- Invoice history
- Payment tracking
- Overdue management

Status examples:

```text
Active
Trial
Overdue
Suspended
```

## Users

Screens:

- Global user directory
- Super Admin team
- Institution admin management
- Login activity
- Account locking and unlocking
- Password reset actions

## Analytics & Reports

Include cross-tenant reporting views:

- Platform growth
- Institution analytics
- Revenue analytics
- Student counts
- Usage metrics
- Export actions where backend supports them

## Audit Log

Audit logs are immutable records of Super Admin and platform actions.

Required behavior:

- Search
- Filter by actor, tenant, action type, and date
- View before/after diffs when provided
- Export when backend supports it

## Activity Feed

Live or periodically refreshed event stream for:

- Tenant provisioning
- Suspensions/restorations
- Payment events
- Login/security events
- Setup warnings

## Security UX

The PRD requires strong Super Admin security, including MFA. If backend MFA is unavailable for v1, reserve UI states for OTP verification and session timeout warnings without inventing unsupported API behavior.
