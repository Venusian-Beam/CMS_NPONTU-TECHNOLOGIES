# Staff App Context

## Purpose

The Staff app is the portal for lecturers, tutors, and academic staff. It focuses on assigned courses, attendance, assessments, result entry, course materials, and communication with students.

Staff users must only see courses, students, and academic records assigned to them by the backend.

## Route Prefix

```text
/staff
```

## Layout

Use `StaffLayout` with:

- Tenant-branded sidebar
- Topbar with current academic session/semester when available
- Notifications and account menu
- Main content area optimized for repeated academic workflows

## Navigation

Primary navigation:

```text
Dashboard
My Courses
Attendance
Assessments
Results
Students
Messages
```

## Dashboard

Widgets:

- Assigned courses
- Upcoming classes
- Pending attendance
- Pending assessments
- Results awaiting submission
- Recent messages or announcements

## My Courses

Features:

- Assigned course list
- Course detail
- Course materials
- Course statistics
- Enrolled student list

Course cards or tables should show:

- Course code
- Course title
- Semester
- Department
- Enrolled count
- Status

## Attendance

Features:

- Mark attendance
- Edit attendance where backend permits
- Attendance history
- Attendance reports

Expected UX:

- Select course and session/date before marking.
- Show enrolled students in a dense checklist/table.
- Support statuses such as present, absent, and excused if backend supports them.
- Prevent accidental overwrite with confirmation when editing existing attendance.

## Assessments

Features:

- Create assignment
- Create quiz
- Upload assessment files
- View submissions where backend supports it

Assessment forms should clearly capture:

- Course
- Title
- Type
- Due date
- Instructions
- File attachment
- Score or weighting when applicable

## Results

Features:

- Grade entry
- Grade review
- Submit results
- View approval/publishing status

Expected behavior:

- Results are editable only before submission or approval, depending on backend rules.
- Show computed totals and grade previews when backend data allows.
- Clearly distinguish draft, submitted, approved, published, and locked states.
- Avoid client-side-only final grade authority. Backend remains source of truth.

## Students

Features:

- View assigned students
- Search/filter students within assigned courses
- Academic performance snapshots
- Attendance summary

Staff should not see unrelated students.

## Messages

Features:

- Student communication
- Course announcements
- Institution announcements read view

Message targeting should be limited to assigned courses/students unless backend permissions say otherwise.

## Permission Notes

Staff roles may include:

- lecturer
- tutor

Frontend must not infer broad access from staff role alone. Prefer backend-provided assigned-course data and permissions.
