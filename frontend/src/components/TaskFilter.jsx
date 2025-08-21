import { useMemo, useState, useEffect } from 'react'
import TaskList from './TaskList'
import TaskForm from './TaskForm'
import FilterBar from './FilterBar'
import Modal from './Modal'
import { useTaskFilter, useTasks } from '../hooks/useTasks'

export default function TaskFilter() {
  const { tasks, loading, error, submitting, submitError, createTask, updateTask, toggleTask, deleteTask } = useTasks()
  const { filter, setFilter, apply } = useTaskFilter('all')
  const [showForm, setShowForm] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      setIsDarkMode(true)
      document.documentElement.setAttribute('data-theme', 'dark')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDarkMode
    setIsDarkMode(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light')
    localStorage.setItem('theme', newTheme ? 'dark' : 'light')
  }

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
    <FilterBar 
      filter={filter} 
      onChangeFilter={setFilter} 
      onAdd={() => { setEditingTask(null); setShowForm(true) }}
      isDarkMode={isDarkMode}
      onToggleTheme={toggleTheme}
    />

    <Modal isOpen={showForm} onClose={() => { setShowForm(false); setEditingTask(null) }}>
      <TaskForm
        initialTask={editingTask}
        onSubmit={(payload) => editingTask ? handleUpdate(editingTask.id, payload) : handleCreate(payload)}
        onCancel={() => { setShowForm(false); setEditingTask(null) }}
        submitting={submitting}
        error={submitError}
      />
    </Modal>

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



