# Branding System Context

## Purpose

The CMS frontend must dynamically apply each institution's brand after login and on session hydration. This allows University of Ghana, KNUST, Ashesi, or any other tenant to use the same frontend code while seeing their own name, logo, and colors.

## Branding Source

Branding comes from the backend tenant payload returned by:

```text
POST /api/login
GET  /api/me
```

Expected tenant payload:

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

Super Admin sessions may have no tenant. In that case, use platform branding.

## CSS Variables

Apply tenant branding through CSS variables on `document.documentElement`.

Required variables:

```css
:root {
  --color-primary: #1F4788;
  --color-secondary: #F0B323;
  --color-primary-contrast: #ffffff;
  --color-secondary-contrast: #111827;
}
```

Optional semantic variables:

```css
:root {
  --color-surface: #ffffff;
  --color-page: #f8fafc;
  --color-border: #e5e7eb;
  --color-text: #111827;
  --color-muted: #6b7280;
}
```

## Tailwind Mapping

Tailwind should map brand colors to CSS variables:

```js
theme: {
  extend: {
    colors: {
      primary: 'var(--color-primary)',
      secondary: 'var(--color-secondary)',
      'primary-contrast': 'var(--color-primary-contrast)',
      'secondary-contrast': 'var(--color-secondary-contrast)'
    }
  }
}
```

Components should use classes such as:

```text
bg-primary
text-primary
border-primary
text-primary-contrast
```

Do not hardcode tenant brand colors in components.

## Branding Store

Use a shared `brandingStore`.

Responsibilities:

- Save current tenant branding
- Apply CSS variables
- Restore branding from localStorage on refresh
- Clear branding on logout
- Fall back to platform defaults when tenant branding is missing

Suggested actions:

```text
setTenantBranding(tenant)
loadCachedBranding()
applyBranding()
clearBranding()
```

## Hydration Order

To avoid a flash of unbranded UI:

1. Initialize Pinia.
2. Load cached branding.
3. Apply CSS variables.
4. Mount the Vue app.
5. Call `/api/me`.
6. Replace cached branding with fresh backend branding.

## Login Page Behavior

The login page is global. Before the user is identified, use platform branding, not tenant branding.

After successful login:

- Store user and tenant.
- Apply tenant branding if tenant exists.
- Redirect to the correct portal for the user's role.

## Logo Behavior

Use tenant `logo_url` in portal sidebars, topbars, and compact headers.

Fallback order:

```text
tenant logo_url
tenant initials
platform logo
```

Always provide alt text using tenant name when available.

## Contrast And Accessibility

Tenant colors can be unsafe. The frontend must avoid unreadable UI.

Rules:

- Compute or choose contrast text color for primary and secondary colors.
- Keep destructive, warning, success, and info colors independent from tenant branding.
- Preserve visible focus states even when tenant color is dark or light.
- Do not use tenant color as the only signal for status.
- Test at least two extreme branding examples: navy/gold and bright green/yellow.

## Agent Rules

- Any new shared component must consume theme tokens rather than hardcoded tenant colors.
- Portal-specific components may use semantic system colors for status and alerts.
- If backend omits branding, use platform defaults and do not block login.
