export default function FilterBar({ filter, onChangeFilter, onAdd }) {
  return <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
    <h1 style={{ margin: 0 }}>Task Manager App</h1>
    <div style={{ display: 'flex', gap: 8 }}>
      <button onClick={() => onChangeFilter('all')} disabled={filter === 'all'}>All</button>
      <button onClick={() => onChangeFilter('completed')} disabled={filter === 'completed'}>Completed</button>
      <button onClick={() => onChangeFilter('pending')} disabled={filter === 'pending'}>Pending</button>
    </div>
    <div>
      <button onClick={onAdd}>Add Task</button>
    </div>
  </header>
}



