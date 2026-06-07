# CMS NPONTU TECHNOLOGIES

ELEVA - The Operating System for Modern Education

A multi-tenant SaaS platform for institution management, featuring role-based portals for Super Admin, Institution Admin, Staff, and Students.

## Features

- **Super Admin Portal** - Tenant health, revenue, provisioning, activity monitoring
- **Institution Dashboard** - Admissions, academics, finance, staff, and student management  
- **Staff Portal** - Course management, attendance, assessments, results
- **Student Portal** - Course registration, fees, GPA/results, timetable, announcements

## Tech Stack

- **Framework**: Vue 3 with Composition API
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **State Management**: Pinia
- **Routing**: Vue Router

## Project Structure

```
cms-npontu/
├── src/
│   ├── shared/
│   │   ├── components/    # Reusable UI components
│   │   ├── layouts/       # Layout templates
│   │   ├── pages/         # Route pages
│   │   ├── services/      # API services
│   │   ├── stores/        # State management
│   │   └── router/        # Vue Router config
│   ├── App.vue           # Root component
│   └── main.js           # Entry point
├── index.html
├── package.json
└── vite.config.js
```

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## License

MIT
