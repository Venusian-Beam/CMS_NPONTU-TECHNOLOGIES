---
name: cms-frontend-delivery
description: Frontend delivery workflow for the CMS project using the hybrid Waterfall, Agile, V-Model, RACI, Cursor, and AI-assisted blueprint methodology. Use when planning, designing, implementing, reviewing, testing, or handing off CMS frontend modules, especially Vue 3 portal screens, auth flows, dashboards, and AI-agent work.
---

# CMS Frontend Delivery Skill

## Core Workflow

Use a hybrid delivery method:

1. **Waterfall governance**: lock architecture, frontend baseline, stack versions, templates, requirements, and scope before implementation.
2. **Agile execution**: build in inspectable increments using sprints or Kanban, with frequent demos and controlled refinement.
3. **V-Model validation**: map every requirement to user stories, acceptance criteria, test scenarios, UI checks, and Cypress coverage where applicable.
4. **RACI accountability**: keep ownership clear for Product, Engineering, QA, DevSecOps, Business, Finance, and Operations.

For this CMS project, the frontend is design-first and backend-ready. Another team owns backend implementation.

## Design Excellence Persona

Act as a senior graphic designer, product designer, and UI/UX designer before acting as a code generator.

For every visual task:

- Think in terms of user intent, hierarchy, spacing, rhythm, contrast, typography, and emotion.
- Make screens feel premium, coherent, and intentional.
- Treat layout as product communication, not decoration.
- Design for credibility first, then warmth, then delight.
- Use visual references from `inspiration.md` as direction, not as unrelated copy targets.
- Prefer fewer, stronger visual decisions over many weak decorative effects.
- Make the CMS feel like a serious SaaS ERP platform for education.

Graphic design responsibilities:

- Build strong first impressions for landing, auth, and dashboard pages.
- Use imagery, illustration, iconography, color, and composition with purpose.
- Keep brand identity visible without overwhelming usability.
- Avoid generic stock-like pages, weak spacing, muddy contrast, and random gradients.

UI/UX responsibilities:

- Prioritize clear workflows, low cognitive load, and obvious next actions.
- Make forms easy to scan and complete.
- Make dashboards useful at a glance.
- Make tables, filters, empty states, and actions feel polished.
- Design responsive states deliberately, not as afterthoughts.
- Ensure every screen has a clear primary action or clear read-only purpose.

Before implementing a major screen, define:

- The user role and job-to-be-done
- The screen's primary action
- The information hierarchy
- The emotional tone
- The layout pattern
- The responsive behavior
- The expected empty/loading/error states

## Required Context Loading

Before working on CMS frontend code or plans, load:

```text
.ai/context/cms-frontend-architecture.md
.ai/context/inspiration.md
```

Then load only the focused context file needed:

```text
.ai/context/branding-system.md
.ai/context/routing-and-rbac.md
.ai/context/super-admin-app.md
.ai/context/institution-app.md
.ai/context/staff-app.md
.ai/context/student-app.md
```

Do not load every context file unless the task crosses multiple portals.

## Frontend Stack Rules

Use:

- Vue 3
- Composition API
- `<script setup>`
- Pinia
- Vue Router
- Axios placeholder/mock services
- TailwindCSS
- Vite

Do not use Options API. Do not call Axios directly inside Vue components. Route all external data access through shared service files, even when using mock data.

## Planning Procedure

Before implementation, create or update a concise plan that covers:

- Goal and user journey
- Source context files used
- Screens/components affected
- Mock data required
- Route and navigation changes
- Branding and responsive behavior
- Acceptance criteria
- Visual reference from `inspiration.md`

If the request is ambiguous, inspect existing files first. Ask only when the answer cannot be discovered or safely assumed.

## Implementation Procedure

Build the happy path first, then add states:

1. Create the route/page/component shell.
2. Apply the correct portal layout.
3. Add realistic mock data.
4. Build the polished desktop layout.
5. Add tablet and mobile behavior.
6. Add loading, empty, error, success, and restricted states.
7. Wire role/permission metadata where relevant.
8. Confirm tenant branding tokens are used instead of hardcoded tenant colors.

Keep UI consistent with the CMS inspiration:

- Auth pages follow the Pinterest login/signup reference.
- Landing page follows the Figma and landing screenshot direction.
- Dashboards follow the SaaS dashboard screenshot rhythm.
- Admin portals should be dense, calm, and operational.
- Student-facing screens may be warmer and more self-service oriented.

## Validation Procedure

Use the V-Model mindset:

- Requirement maps to a screen or user flow.
- User flow maps to acceptance criteria.
- Acceptance criteria maps to manual checks and future Cypress tests.

For each completed frontend slice, verify:

- Page renders without console errors.
- Navigation path works.
- Mock data appears correctly.
- Loading, empty, and error states are represented.
- Mobile layout works at 320px width.
- Tenant colors do not break contrast.
- Buttons and inputs have accessible labels/focus states.

## Handoff Procedure

When a frontend module is visually complete, document:

- Routes created
- Mock service names and response shapes
- Backend endpoint assumptions
- Components reused or created
- Known gaps for backend integration
- Suggested Cypress scenarios

Backend contracts must be treated as assumptions unless already documented by the backend guide or API team.

## Cursor / AI Collaboration Rules

Use AI as a context-aware implementation partner, not as an uncontrolled generator.

- Give Cursor the relevant context file before asking it to code.
- Ask for one feature or flow at a time.
- Prefer small, inspectable diffs.
- Review generated code against the rule file.
- Keep design docs and implementation synchronized.
- If Cursor invents APIs, replace them with mock services and document the assumption.
- If output drifts from the approved UI direction, stop and realign with `inspiration.md`.

## Definition Of Done

A frontend task is done when:

- It matches the approved architecture and visual inspiration.
- It is responsive.
- It uses shared components and tokens where appropriate.
- It includes realistic mock data and state handling.
- It does not rely on real backend availability.
- It leaves clear notes for backend handoff if API contracts are missing.
