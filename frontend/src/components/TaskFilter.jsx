import { useMemo, useState } from 'react'
import TaskList from './TaskList'
import TaskForm from './TaskForm'
import FilterBar from './FilterBar'
import { useTaskFilter, useTasks } from '../hooks/useTasks'

export default function TaskFilter() {
  const { tasks, loading, error, submitting, submitError, createTask, updateTask, toggleTask, deleteTask } = useTasks()
  const { filter, setFilter, apply } = useTaskFilter('all')
  const [showForm, setShowForm] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  const filteredTasks = useMemo(() => apply(tasks), [apply, tasks])

  const handleCreate = async (partial) => {
    const res = await createTask(partial)
    if (res.ok) setShowForm(false)
  }

  const handleUpdate = async (id, partial) => {
    const res = await updateTask(id, partial)
    if (res.ok) { setEditingTask(null); setShowForm(false) }
  }

  const handleToggle = async (id) => {
    const res = await toggleTask(id)
    if (!res.ok) alert(res.error?.message || 'Toggle failed')
  }

  const handleDelete = async (id) => {
    const res = await deleteTask(id)
    if (!res.ok) alert(res.error?.message || 'Delete failed')
  }

  return <div>
    <FilterBar filter={filter} onChangeFilter={setFilter} onAdd={() => { setEditingTask(null); setShowForm(true) }} />

    {showForm && (
      <TaskForm
        initialTask={editingTask}
        onSubmit={(payload) => editingTask ? handleUpdate(editingTask.id, payload) : handleCreate(payload)}
        onCancel={() => { setShowForm(false); setEditingTask(null) }}
        submitting={submitting}
        error={submitError}
      />
    )}

    {loading && <p>Loading…</p>}
    {error && <p style={{ color: 'red' }}>{error}</p>}
    {!loading && !error && (
      <TaskList
        tasks={filteredTasks}
        onToggle={handleToggle}
        onEdit={(task) => { setEditingTask(task); setShowForm(true) }}
        onDelete={handleDelete}
      />
    )}
  </div>
}



