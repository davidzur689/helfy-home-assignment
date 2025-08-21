export default function FilterBar({ filter, onChangeFilter, onAdd, isDarkMode, onToggleTheme }) {
  return <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
    <h1 style={{ margin: 0 }}>Task Manager App</h1>
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <button onClick={() => onChangeFilter('all')} disabled={filter === 'all'}>All</button>
      <button onClick={() => onChangeFilter('completed')} disabled={filter === 'completed'}>Completed</button>
      <button onClick={() => onChangeFilter('pending')} disabled={filter === 'pending'}>Pending</button>
      <button 
        onClick={onToggleTheme}
        style={{ 
          background: 'none', 
          border: '1px solid var(--border-color)', 
          borderRadius: 4,
          padding: '4px 8px',
          cursor: 'pointer',
          color: 'var(--text-color)'
        }}
      >
        {isDarkMode ? '☀️' : '🌙'}
      </button>
    </div>
    <div>
      <button onClick={onAdd}>Add Task</button>
    </div>
  </header>
}



