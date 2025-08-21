export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const priorityColor = {
    low: '#4caf50',
    medium: '#ff9800',
    high: '#f44336',
  }[task.priority] || '#888'

  const created = task.createdAt ? new Date(task.createdAt).toLocaleString() : ''

  return <div style={{ border: '1px solid #333', borderRadius: 8, padding: 12, background: '#1e1e1e' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h3 style={{ margin: 0 }}>{task.title}</h3>
      <span style={{ background: priorityColor, color: '#111', borderRadius: 12, padding: '2px 8px', fontSize: 12, fontWeight: 700 }}>{task.priority}</span>
    </div>
    <p style={{ margin: '8px 0' }}>{task.description}</p>
    <p style={{ margin: '8px 0', color: task.completed ? '#4caf50' : '#ccc' }}>{task.completed ? 'Completed' : 'Pending'}</p>
    {created && <p style={{ margin: '8px 0', fontSize: 12, color: '#aaa' }}>{created}</p>}
    <div style={{ display: 'flex', gap: 8 }}>
      <button onClick={onToggle}>{task.completed ? 'Mark Pending' : 'Mark Done'}</button>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete} style={{ color: '#f44336' }}>Delete</button>
    </div>
  </div>
}



