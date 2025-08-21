import express from 'express'
import cors from 'cors'

const tasks = []
let nextId = 1


const isValidPriority = (value) => ['low', 'medium', 'high'].includes(value)

function validateCreatePayload(body) {
  const errors = []
  if (typeof body.title !== 'string' || body.title.trim().length === 0) {
    errors.push('title must be a non-empty string')
  }
  if (typeof body.description !== 'string' || body.description.trim().length === 0) {
    errors.push('description must be a non-empty string')
  }
  if (body.completed !== undefined && typeof body.completed !== 'boolean') {
    errors.push('completed must be a boolean when provided')
  }
  if (body.priority !== undefined && !isValidPriority(body.priority)) {
    errors.push("priority must be one of: 'low', 'medium', 'high'")
  }
  return errors
}

function validatePutPayload(body) {
  const errors = []
  if (typeof body.title !== 'string' || body.title.trim().length === 0) {
    errors.push('title must be a non-empty string')
  }
  if (typeof body.description !== 'string' || body.description.trim().length === 0) {
    errors.push('description must be a non-empty string')
  }
  if (typeof body.completed !== 'boolean') {
    errors.push('completed must be a boolean')
  }
  if (!isValidPriority(body.priority)) {
    errors.push("priority must be one of: 'low', 'medium', 'high'")
  }
  return errors
}

function findTaskIndexById(id) {
  return tasks.findIndex((t) => t.id === id)
}

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Health route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' })
})

// GET /api/tasks - Get all tasks
app.get('/api/tasks', (req, res) => {
  res.status(200).json(tasks)
})

// POST /api/tasks - Create a new task
app.post('/api/tasks', (req, res) => {
  const body = req.body || {}
  const errors = validateCreatePayload(body)
  if (errors.length > 0) {
    return res.status(400).json({ message: 'Validation error', errors })
  }

  const task = {
    id: nextId++,
    title: body.title.trim(),
    description: body.description.trim(),
    completed: typeof body.completed === 'boolean' ? body.completed : false,
    createdAt: new Date(),
    priority: body.priority && isValidPriority(body.priority) ? body.priority : 'medium',
  }

  tasks.push(task)
  res.status(201).json(task)
})

// PUT /api/tasks/:id - Update a task (full update)
app.put('/api/tasks/:id', (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ message: 'id must be a positive integer' })
  }

  const index = findTaskIndexById(id)
  if (index === -1) {
    return res.status(404).json({ message: 'Task not found' })
  }

  const errors = validatePutPayload(req.body || {})
  if (errors.length > 0) {
    return res.status(400).json({ message: 'Validation error', errors })
  }

  const existing = tasks[index]
  const updated = {
    id: existing.id,
    title: req.body.title.trim(),
    description: req.body.description.trim(),
    completed: req.body.completed,
    createdAt: existing.createdAt,
    priority: req.body.priority,
  }

  tasks[index] = updated
  res.status(200).json(updated)
})


app.delete('/api/tasks/:id', (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ message: 'id must be a positive integer' })
  }

  const index = findTaskIndexById(id)
  if (index === -1) {
    return res.status(404).json({ message: 'Task not found' })
  }

  tasks.splice(index, 1)
  res.status(204).send()
})


app.patch('/api/tasks/:id/toggle', (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ message: 'id must be a positive integer' })
  }

  const index = findTaskIndexById(id)
  if (index === -1) {
    return res.status(404).json({ message: 'Task not found' })
  }

  tasks[index].completed = !tasks[index].completed
  res.status(200).json(tasks[index])
})


app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})



app.use((err, req, res, next) => {
  const status = err.status || 500
  res.status(status).json({ message: err.message || 'Internal Server Error' })
})

const PORT = 4000
app.listen(PORT, () => {
 
  console.log(`API server listening on http://localhost:${PORT}`)
})



