# Student App Context

## Purpose

The Student app is the self-service portal for enrolled students. It gives students access to their own academic records, course registration, results, fees, announcements, profile, and accommodation information.

Student users must only see their own records. Backend APIs enforce this.

## Route Prefix

```text
/student
```

## Layout

Use `StudentLayout` with:

- Tenant-branded navigation
- Mobile-first responsive structure
- Topbar with institution identity, notifications, and account menu
- Clear student status and active semester context where available

## Navigation

Primary navigation:

```text
Dashboard
Course Registration
My Courses
Timetable
Attendance
Results
Payments
Accommodation
Transcript
Announcements
Profile
```

## Dashboard

Widgets:

- Registered courses
- Outstanding fees
- GPA summary
- Latest results
- Announcements
- Registration window status
- Attendance summary

Dashboard should help students complete the most urgent self-service actions quickly.

## Course Registration

Features:

- Browse available courses
- Register courses
- Drop courses
- View registration summary

Expected validation feedback:

- Course is full
- Prerequisite not satisfied
- Schedule conflict detected
- Registration window closed
- Credit load outside allowed range
- Duplicate course registration

Backend owns validation. Frontend should display clear errors and prevent obvious duplicate interactions.

## My Courses

Read-only view of currently registered courses.

Display:

- Course code
- Course title
- Credits
- Department
- Lecturer
- Enrollment capacity when available
- Status
- Course materials link when available

## Timetable

Read-only schedule for the active semester.

Display:

- Day
- Time
- Course code
- Course title
- Venue
- Lecturer

If no courses are registered, show an empty state that links to course registration when registration is open.

## Attendance

Read-only attendance summary.

Display:

- Course
- Sessions held
- Sessions attended
- Attendance percentage
- Per-session status when available

Students cannot modify attendance.

## Results

Read-only results view.

Display:

- Semester tabs
- CA score
- Exam score
- Total score
- Grade
- GPA
- Grade scale legend

States:

- Semester in progress
- Results published
- Locked

Only published backend results should show final grades.

## Payments

Features:

- Fee summary
- Outstanding balance
- Payment history
- Pay Now action if gateway is available
- Receipt download if backend supports it

Payment flows must show clear loading, success, failure, and retry states. Do not fake successful payment without backend confirmation.

## Accommodation

Read-only hostel/allocation information.

Display:

- Hostel
- Room number
- Room type
- Floor
- Allocation date
- Roommates
- Accommodation fee
- Payment status

If no allocation exists, show a simple unavailable state.

## Transcript

Read-only historical academic record.

Display:

- Cumulative GPA
- Total credits earned
- Per-semester breakdown
- Download PDF action if backend supports it

Historical grades are immutable from the student portal.

## Announcements

Display published notices relevant to the student:

- Institution-wide notices
- Programme notices
- Course notices

Sort newest first. Use read/unread state only when backend supports it.

## Profile

Features:

- Personal information
- Contact details
- Password change
- Account status

Only expose fields that backend allows students to edit.
