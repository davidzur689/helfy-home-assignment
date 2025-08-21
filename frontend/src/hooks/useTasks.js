import { useCallback, useEffect, useState } from 'react'

export function useTasks() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const fetchTasks = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('http://localhost:4000/api/tasks')
      const data = await res.json()
      if (!res.ok) throw new Error(data?.message || 'Failed to fetch tasks')
      setTasks(Array.isArray(data) ? data : [])
    } catch (e) {
      setError(e.message || 'Network error while fetching tasks')
      setTasks([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchTasks() }, [fetchTasks])

  const createTask = useCallback(async (partial) => {
    setSubmitting(true)
    setSubmitError('')
    try {
      const res = await fetch('http://localhost:4000/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(partial),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.message || 'Failed to create')
      setTasks((prev) => [...prev, data])
      return { ok: true, data }
    } catch (e) {
      setSubmitError(e.message || 'Failed to create')
      return { ok: false, error: e }
    } finally {
      setSubmitting(false)
    }
  }, [])

  const updateTask = useCallback(async (id, partial) => {
    setSubmitting(true)
    setSubmitError('')
    try {
      const res = await fetch(`http://localhost:4000/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(partial),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.message || 'Failed to update')
      setTasks((prev) => prev.map((t) => (t.id === id ? data : t)))
      return { ok: true, data }
    } catch (e) {
      setSubmitError(e.message || 'Failed to update')
      return { ok: false, error: e }
    } finally {
      setSubmitting(false)
    }
  }, [])

  const toggleTask = useCallback(async (id) => {
    try {
      const res = await fetch(`http://localhost:4000/api/tasks/${id}/toggle`, { method: 'PATCH' })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.message || 'Failed to toggle')
      setTasks((prev) => prev.map((t) => (t.id === id ? data : t)))
      return { ok: true, data }
    } catch (e) {
      return { ok: false, error: e }
    }
  }, [])

  const deleteTask = useCallback(async (id) => {
    try {
      const res = await fetch(`http://localhost:4000/api/tasks/${id}`, { method: 'DELETE' })
      if (!res.ok && res.status !== 204) {
        const data = await res.json().catch(() => null)
        throw new Error(data?.message || 'Failed to delete')
      }
      setTasks((prev) => prev.filter((t) => t.id !== id))
      return { ok: true }
    } catch (e) {
      return { ok: false, error: e }
    }
  }, [])

  return {
    tasks,
    loading,
    error,
    submitting,
    submitError,
    fetchTasks,
    createTask,
    updateTask,
    toggleTask,
    deleteTask,
  }
}

export function useTaskFilter(initial = 'all') {
  const [filter, setFilter] = useState(initial)
  const apply = (tasks) => {
    if (!Array.isArray(tasks)) return []
    if (filter === 'completed') return tasks.filter((t) => t.completed)
    if (filter === 'pending') return tasks.filter((t) => !t.completed)
    return tasks
  }
  return { filter, setFilter, apply }
}



