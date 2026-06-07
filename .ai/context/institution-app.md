# Institution App Context

## Purpose

The Institution app is the operational portal for one tenant. Institution Admins and tenant-level administrative roles use it to configure academic structures, manage students and staff, operate finance workflows, publish communication, and run reports.

All data in this portal is tenant-scoped by the backend.

## Route Prefix

```text
/institution
```

## Layout

Use `InstitutionLayout` with:

- Tenant-branded sidebar
- Topbar with institution name/logo, notifications, and account menu
- Main content area
- Responsive mobile navigation

The tenant logo and colors come from the branding system.

## Navigation

Primary navigation:

```text
Dashboard
Admissions
Students
Staff
Academics
Finance
Communication
Reports
Settings
```

Navigation visibility should respect role permissions where known.

## Dashboard

Widgets:

- Student count
- Staff count
- Revenue summary
- Active courses
- Attendance overview
- Recent announcements
- Academic session status

Dashboard links should deep-link into the relevant module with useful filters when possible.

## Academics

Academic setup modules:

- Faculties
- Departments
- Programmes
- Academic sessions
- Semesters
- Courses
- Course offerings
- Lecturer assignments

Expected behavior:

- Tables with search, filters, and pagination
- Create/edit forms in modals or dedicated pages depending on complexity
- Status badges for active, archived, draft, or inactive records
- Clear handling of active academic session and semester

## Admissions

Features:

- Admission cycle overview
- Applicant management
- Application review
- Admission decisions
- Admission letters
- Enrollment handoff

Use lifecycle/status-driven UI. Avoid free-form actions when backend states are defined.

## Students

Screens:

```text
Student List
Student Details
Student Registration
Student Profile
Academic Records
Enrollment Status
```

Required behavior:

- Search by name, email, matric number, programme, department, level, and status when supported.
- Student detail should use tabs for profile, academics, finance, attendance, and documents.
- Student mutations must show clear success/error feedback.

## Staff

Features:

- Staff directory
- Lecturer profiles
- Course assignment
- Attendance oversight
- Performance tracking
- Role or department filters

Staff assignment flows must make the relationship between lecturer, course, semester, and department clear.

## Finance

Features:

- Fee structures
- Invoices
- Student payments
- Outstanding balances
- Manual payment recording where payment gateways are not ready
- Financial reports

Use careful confirmation for payment-affecting actions. Never hide backend errors in finance flows.

## Communication

Features:

- Announcements
- Notifications
- Email broadcasts
- SMS broadcast placeholders if backend support is deferred

Announcements should support targeting by global institution audience, programme, department, level, or course if backend contracts support those filters.

## Reports

Report categories:

- Enrollment reports
- Finance reports
- Academic reports
- Attendance reports

Report pages need loading states, date filters, export buttons when supported, and clear unavailable-state messages when backend endpoints are not yet available.

## Settings

Settings may include:

- Institution profile
- Branding preview
- Academic defaults
- User and role administration
- Notification preferences
- Module configuration

Do not let tenant admins edit lifecycle states reserved for Super Admin.

## Permission Notes

Institution-level roles can include:

- institution_admin
- registrar
- bursar
- finance_officer
- hod
- examination_officer
- hr_manager
- hostel_manager

Use backend-provided permissions when available. Fall back to documented role defaults only for navigation display.
