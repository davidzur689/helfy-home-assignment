import { useState, useEffect } from 'react'

export default function TaskForm({ initialTask, onSubmit, onCancel, submitting = false, error = '' }) {
  const isEdit = Boolean(initialTask)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [completed, setCompleted] = useState(false)
  const [priority, setPriority] = useState('medium')

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title || '')
      setDescription(initialTask.description || '')
      setCompleted(Boolean(initialTask.completed))
      setPriority(initialTask.priority || 'medium')
    } else {
      setTitle('')
      setDescription('')
      setCompleted(false)
      setPriority('medium')
    }
  }, [initialTask])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (typeof onSubmit === 'function') {
      onSubmit({ title, description, completed, priority })
    }
  }

  return <div>
    <h3>{isEdit ? 'Edit task' : 'Add a new task'}</h3>
    <form onSubmit={handleSubmit}>
      <label>Title</label>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} disabled={submitting} />
      <label>Description</label>
      <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} disabled={submitting} />
      <label>Priority</label>
      <select value={priority} onChange={(e) => setPriority(e.target.value)} disabled={submitting}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <label>Completed</label>
      <input type="checkbox" checked={completed} onChange={(e) => setCompleted(e.target.checked)} disabled={submitting} />
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <button type="submit" disabled={submitting}>{submitting ? (isEdit ? 'Saving…' : 'Adding…') : (isEdit ? 'Save' : 'Add')}</button>
        {onCancel && <button type="button" onClick={onCancel} disabled={submitting}>Cancel</button>}
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  </div>
}



