# Task Manager

Simple todo app with React frontend + Express backend.

## Quick Start

Backend (port 4000):
```bash
cd backend && npm install && npm start
```

Frontend (port 5173):
```bash
cd frontend && npm install && npm run dev
```

## What it does

- Add/edit/delete tasks
- Mark tasks as complete/pending  
- Filter by status (all/completed/pending)
- Priority levels (low/medium/high)

## API

`GET /api/tasks` - get all tasks
`POST /api/tasks` - create task  
`PUT /api/tasks/:id` - update task
`DELETE /api/tasks/:id` - delete task
`PATCH /api/tasks/:id/toggle` - toggle completion

## Notes



- i added a dark mode toggle
- Data stored in memory (resets on restart)
- No database setup needed
- Basic styling, no external libs
- Built as monorepo for simplicity

Took about 2 hours for the front and 1.5 for backend and 0.5 hour for refactoring 4 hours in total to build this thing.
