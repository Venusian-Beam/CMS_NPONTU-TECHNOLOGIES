# CMS UI Inspiration

## Purpose

This file captures the visual direction for the CMS frontend. Use it alongside `cms-frontend-architecture.md` and the relevant portal context file when designing pages, layouts, dashboards, and landing experiences.

The goal is a professional SaaS campus platform: credible enough for institution administrators, friendly enough for students, and polished enough to feel like a modern product rather than a traditional school management system.

## Core Visual Theme

Use a clean white-and-lavender SaaS theme inspired by the screenshots, with violet as the primary brand accent, soft blue/lavender surfaces, and small warm accent colors for charts, illustrations, and highlights.

Approximate color palette from the references:

```text
Primary violet:        #5B5CF6
Deep violet:           #4F46E5
Bright purple CTA:     #6C3BFF
Pink accent:           #F24BB8
Coral accent:          #FF7A59
Blue accent:           #4F7CFF
Sky soft accent:       #DDF0FF
Mint success:          #22C99A
Success background:    #DDFBEF
Danger red:            #FF5C75
Danger background:     #FFE7EC
Warning gold:          #F7B955
Main text:             #0F172A
Secondary text:        #64748B
Muted text:            #8A94A6
Page background:       #F7F8FC
Card background:       #FFFFFF
Soft panel background: #F3F5FA
Border color:          #E5E9F2
```

Usage rules:

- Use violet/purple for primary CTAs, active navigation, focus rings, and important icons.
- Use white cards on a very soft page background.
- Use pink, coral, blue, and mint only as accents in small UI elements, chart marks, badges, or illustrations.
- Use dark navy text for headings and slate text for supporting copy.
- Do not flood dashboards with purple. Purple is the signal color, not the background of every section.
- Tenant branding may override primary/secondary colors inside portals, but keep neutral surfaces, text, borders, and system status colors stable.

## Layout And Positioning Rules

Global sizing:

```text
Max content width:       1180px-1280px for landing pages
Portal page padding:     24px desktop, 16px tablet, 12px-16px mobile
Card radius:             8px-14px maximum
Card shadow:             soft, low-opacity, never heavy
Section spacing:         64px-96px landing, 24px-40px dashboards
Dashboard card height:   stable and compact, usually 92px-140px
Topbar height:           64px-76px
Sidebar width:           248px-280px desktop
```

Positioning principles:

- Landing hero: text on the left, major image/figure on the right, with CTAs below copy and trust badges below CTAs.
- Auth pages: form panel and visual panel should balance each other; do not stretch forms across the full screen.
- Dashboard pages: topbar first, navigation second, content header third, KPI/action row fourth, data panels below.
- Tables: keep table controls above the table, row actions at the right, and status badges near the relevant entity.
- Charts: place in large calm panels below KPI cards; do not crowd charts into tiny decorative cards unless they are mini sparklines.

Figure/image limits:

- Landing hero figure should occupy about 42%-52% of the desktop hero width.
- Auth visual panel should occupy about 45%-55% of the auth layout on desktop.
- Dashboard banner illustration should stay inside the banner, usually on the right side, and must not cover text or CTAs.
- Do not let character illustrations exceed the first viewport height or push key CTAs below the fold.
- On mobile, stack figures below text or hide decorative parts while preserving the main message and CTA.
- Decorative confetti, dots, sparkles, and floating shapes should be minimal: 3-8 small accents maximum in a hero area.

## Visual References

### Figma Case Study

Use this Figma community case study as the broad visual reference for spacing, page composition, dashboard polish, and UI rhythm:

```html
<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://embed.figma.com/design/hQopO2uNzv265dNu7tUfln/Campus-Management-System-%E2%80%93-Realistic-UI-UX-Case-Study--Community-?node-id=0-1&embed-host=share" allowfullscreen></iframe>
```

Direct embed source:

```text
https://embed.figma.com/design/hQopO2uNzv265dNu7tUfln/Campus-Management-System-%E2%80%93-Realistic-UI-UX-Case-Study--Community-?node-id=0-1&embed-host=share
```

### Landing Page Reference

![Landing page reference](c:/Users/essuo/Pictures/Screenshots/Screenshot%202026-06-06%20082028.png)

Use this reference for the public landing page direction:

- Clean white first viewport with a confident top navigation.
- Brand mark and product name visible immediately.
- Bold left-aligned headline with short supporting copy.
- Two CTAs: one primary, one secondary.
- Compact trust/value badges below the CTA row.
- Large warm student/community visual on the right.
- Soft background color accents, but not a heavy gradient-first design.

Layout positioning from the image:

- Header sits at the top with logo left, nav centered/right, and login/primary CTA on the far right.
- Hero content starts left at roughly 10%-12% from the viewport edge.
- Headline uses large, heavy, dark text with tight line height.
- Supporting copy is short and narrow, about 360px-460px wide.
- Primary CTA is a filled violet button; secondary CTA is a light/outlined button beside it.
- Trust badges are small icon+label groups in one row under the CTAs.
- The main figure is right-aligned, large, rounded/organic, and visually friendly.

CMS landing page adaptation:

- The headline should communicate institutional operations and campus lifecycle management, not social networking.
- Replace playful community copy with SaaS education value: onboarding institutions, managing academics, finance, staff, students, and reports.
- Keep the emotional warmth of students and campus life, but balance it with administrative credibility.
- First viewport should show the product identity strongly and hint at dashboard/product UI below the fold.
- Suggested CMS hero composition: left copy and CTA, right group of students/admins or a campus-life image, with a small product dashboard preview peeking from the lower section.
- Keep the hero mostly white with a very subtle lavender or blue tint. Avoid dark hero backgrounds.

### Dashboard Reference

![Dashboard reference](c:/Users/essuo/Pictures/Screenshots/Screenshot%20(19).png)

Use this reference for portal dashboard composition:

- Slim utility topbar with search and action icons.
- Horizontal or sidebar module navigation with clear active states.
- Soft page background with white content surfaces.
- Breadcrumb and page title near the content start.
- Prominent action banner for the page's main workflow.
- Compact KPI cards with icons, deltas, and small chart accents.
- Larger analytical panels below KPI cards.
- Data tables with crisp columns, status badges, and row actions.

Layout positioning from the image:

- Top utility area has logo/menu left, search near the left-center, and icon buttons/profile on the right.
- Module navigation sits below the utility topbar with small icons and labels.
- Content begins with breadcrumb, page title, and short subtitle.
- First content row combines one larger action banner on the left with several smaller KPI cards to the right.
- Lower content uses a two-column rhythm: a table panel on one side and a larger statistics/chart panel on the other.
- White cards sit on a pale gray-lavender page background with generous gutters.
- Cards use light shadows and subtle borders, not heavy outlines.

Dashboard color behavior:

- Action banner may use a stronger violet/blue fill, but only one such banner should appear per view.
- KPI cards stay white with colored icons, small colored deltas, and optional mini sparklines.
- Positive deltas use mint green; negative deltas use red/pink.
- Charts can use violet, pink, blue, and coral, but keep chart backgrounds white or very light.

CMS dashboard adaptation:

- Super Admin dashboards should emphasize tenant health, revenue, provisioning, and activity.
- Institution dashboards should emphasize students, staff, academic sessions, finance, attendance, and reports.
- Staff dashboards should emphasize assigned courses, attendance, pending assessments, and results.
- Student dashboards should emphasize registered courses, outstanding fees, GPA/results, timetable, and announcements.

### Login And Signup Reference

Use this Pinterest embed as the exact visual reference for the frontend login and signup pages:

```html
<iframe src="https://assets.pinterest.com/ext/embed.html?id=1031183645931291993" height="295" width="345" frameborder="0" scrolling="no" ></iframe>
```

Direct embed source:

```text
https://assets.pinterest.com/ext/embed.html?id=1031183645931291993
```

Auth page adaptation:

- Login and signup pages should follow this reference closely for layout, spacing, and overall mood.
- Keep the auth experience polished, minimal, and welcoming.
- Use a strong visual panel or illustration area paired with a clean form panel.
- Forms should feel modern and premium, with clear labels, password visibility controls, validation states, and accessible focus styles.
- The global login page should use platform branding before the user is identified.
- After login, tenant branding is applied only when the backend returns the tenant payload.
- Signup should be treated as a lead/request/onboarding flow unless the backend explicitly supports public self-registration.
- Avoid cluttering auth pages with dashboard navigation or portal sidebars.

Auth layout specification:

- Use a split layout on desktop: visual/brand panel on one side and form panel on the other.
- Keep the form width between 380px and 460px.
- Center the form vertically, but keep enough top breathing room for the brand.
- Use rounded input fields, soft borders, clear labels, and visible validation.
- Primary submit button should be full width and violet.
- Secondary links should be small, calm, and clearly clickable.
- On mobile, stack into a single-column form-first layout and reduce or simplify the visual panel.
- Do not include portal sidebars, dashboard nav, or dense content on auth pages.

## Product Personality

The visual personality should combine:

- Trustworthy: suitable for institutional decision-makers.
- Modern: feels like SaaS ERP, not legacy school software.
- Warm: uses human campus imagery where appropriate.
- Efficient: supports repeated administrative workflows.
- Tenant-aware: branding adapts without losing usability.

Avoid making every page playful. Student-facing pages can be warmer. Admin-facing pages should be calmer, denser, and more operational.

## Landing Page Direction

The landing page should be the only place with a hero-style first impression.

Recommended structure:

```text
Top Navigation
Hero
Product Dashboard Preview
Portal Highlights
Core Modules
Multi-Tenant / Branding Section
Security / RBAC Section
Call To Action
Footer
```

Hero requirements:

- Use a real or generated campus/student/admin visual as the primary image.
- Do not use an abstract SVG illustration as the main hero image.
- Keep hero text outside cards.
- Show a hint of the next section on both desktop and mobile.
- Include a product UI preview or dashboard strip below the hero to connect the marketing page to the actual app.

Suggested hero tone:

```text
Run every campus operation from one tenant-aware platform.
```

Supporting copy should mention:

- Multi-tenant institution management
- Admissions, academics, finance, staff, and student self-service
- Dynamic branding and role-based portals

CTA pattern:

- Primary: `Request Demo` or `Start Setup`
- Secondary: `Explore Portals`

Landing page description:

The landing page should open with a confident, bright SaaS hero. The top navigation should feel light and precise, with a compact logo, a few navigation links, login, and a strong violet CTA. The hero should use a large dark headline on the left, short practical copy, and two CTAs. The right side should show a warm campus/student visual or a refined generated figure group. Beneath the hero, introduce a dashboard/product preview so the page quickly shifts from emotion to credibility.

The rest of the landing page should be modular and professional: portal cards, feature bands, tenant branding explanation, security/RBAC section, and final CTA. Use white sections and pale lavender/gray bands. Do not turn every section into a floating card.

## Dashboard Design Direction

Dashboards must be practical working screens.

Use:

- Page title and short subtitle
- KPI strip with 3-5 cards
- One highlighted action or status banner when useful
- Main chart/report panel
- Secondary table or activity panel
- Clear empty/loading/error states

KPI cards should include:

- Icon
- Label
- Main value
- Trend or status
- Optional mini chart accent

Do not overuse saturated colors. Tenant primary color should guide accents, not flood the whole page.

Dashboard page description:

Portal dashboards should feel like working control rooms. The user should immediately see where they are, what needs attention, and what action to take next. Use a slim topbar, clear navigation, breadcrumb/title, KPI cards, one optional action banner, and lower data panels. Dashboards should be scannable in under 10 seconds.

Avoid oversized decorative heroes inside dashboards. If a dashboard includes an illustration, place it inside one bounded action banner and keep it secondary to the user's workflow.

## Layout Principles

- Prefer stable, predictable layouts over decorative complexity.
- Use side navigation for portal apps unless a specific page benefits from horizontal navigation.
- Keep topbars slim and useful: search, notifications, quick actions, profile.
- Page sections should be full-width bands or normal content areas, not nested card stacks.
- Cards are for repeated items, stats, modals, and framed tools.
- Tables should feel first-class, with filters and actions designed clearly.

## Color And Branding Guidance

- Tenant primary color is used for active navigation, key CTAs, selected states, and small accents.
- Tenant secondary color is used sparingly for highlights and complementary accents.
- System status colors remain stable across tenants:
  - Success
  - Warning
  - Danger
  - Info
- Always preserve readable contrast, even with difficult tenant colors.

Recommended default CSS variables:

```css
:root {
  --color-primary: #5B5CF6;
  --color-secondary: #F24BB8;
  --color-primary-contrast: #FFFFFF;
  --color-secondary-contrast: #FFFFFF;
  --color-page: #F7F8FC;
  --color-surface: #FFFFFF;
  --color-soft: #F3F5FA;
  --color-border: #E5E9F2;
  --color-text: #0F172A;
  --color-muted: #64748B;
  --color-success: #22C99A;
  --color-danger: #FF5C75;
  --color-warning: #F7B955;
  --color-info: #4F7CFF;
}
```

Agents may adjust exact values slightly for implementation, but the overall look should remain white, soft, violet-led, and professionally colorful.

## Imagery Guidance

Use visual assets intentionally:

- Landing page: campus, students, staff, or product dashboard preview.
- Super Admin: platform metrics, tenant/network metaphors, dashboard UI.
- Institution Admin: academic operations, reports, student/staff management.
- Staff: teaching, courses, attendance, assessments.
- Student: learning, timetable, results, payments, announcements.

Avoid generic dark stock photos, blurred backgrounds, or decorative images that do not communicate the product.

## Component Inspiration

Preferred UI patterns:

- Icon buttons for common utilities.
- Segmented controls for view switches.
- Tabs for detail pages.
- Drawers for quick detail views.
- Modals for focused create/edit actions.
- Multi-step wizard for institution provisioning.
- Dense tables for admin modules.
- Status badges for lifecycle and approval states.
- Toasts for short feedback.
- Persistent banners for tenant status restrictions or impersonation.

## Portal-Specific Tone

Super Admin:

- Executive and operational.
- Strong tables, analytics, auditability, and lifecycle actions.

Institution:

- Administrative and workflow-focused.
- Academic structure, people management, finance, and reporting should be easy to scan.

Staff:

- Task-oriented and fast.
- Course context, attendance marking, result entry, and submissions should minimize clicks.

Student:

- Friendly and self-service oriented.
- Prioritize clarity, deadlines, fees, registration status, and results.

## Agent Rules

- Load this file when designing landing pages, dashboards, layouts, or visual systems.
- Combine the friendly landing-page warmth with the dashboard reference's professional SaaS structure.
- Keep portal screens usable before decorative.
- Do not copy unrelated product labels from references.
- Do not let tenant colors damage accessibility.
- When building a real page, include responsive states for mobile, tablet, and desktop.
