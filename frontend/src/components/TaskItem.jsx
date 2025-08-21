export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const priorityColor = {
    low: '#4caf50',
    medium: '#ff9800',
    high: '#f44336',
  }[task.priority] || '#888'

  const created = task.createdAt ? new Date(task.createdAt).toLocaleString() : ''

  return <div style={{ 
    border: '1px solid var(--border-color)', 
    borderRadius: 8, 
    padding: 12, 
    background: 'var(--card-bg)',
    transition: 'all 0.3s ease'
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h3 style={{ margin: 0, color: 'var(--text-color)' }}>{task.title}</h3>
      <span style={{ 
        background: priorityColor, 
        color: '#111', 
        borderRadius: 12, 
        padding: '2px 8px', 
        fontSize: 12, 
        fontWeight: 700 
      }}>{task.priority}</span>
    </div>
    <p style={{ margin: '8px 0', color: 'var(--text-color)' }}>{task.description}</p>
    <p style={{ margin: '8px 0', color: task.completed ? '#4caf50' : 'var(--text-color)' }}>
      {task.completed ? 'Completed' : 'Pending'}
    </p>
    {created && <p style={{ margin: '8px 0', fontSize: 12, color: 'var(--text-color)', opacity: 0.7 }}>{created}</p>}
    <div style={{ display: 'flex', gap: 8 }}>
      <button onClick={onToggle} style={{ 
        background: 'var(--bg-color)', 
        color: 'var(--text-color)', 
        border: '1px solid var(--border-color)',
        borderRadius: 4,
        padding: '4px 8px',
        cursor: 'pointer'
      }}>
        {task.completed ? 'Mark Pending' : 'Mark Done'}
      </button>
      <button onClick={onEdit} style={{ 
        background: 'var(--bg-color)', 
        color: 'var(--text-color)', 
        border: '1px solid var(--border-color)',
        borderRadius: 4,
        padding: '4px 8px',
        cursor: 'pointer'
      }}>
        Edit
      </button>
      <button onClick={onDelete} style={{ 
        color: '#f44336', 
        background: 'var(--bg-color)', 
        border: '1px solid var(--border-color)',
        borderRadius: 4,
        padding: '4px 8px',
        cursor: 'pointer'
      }}>
        Delete
      </button>
    </div>
  </div>
}



