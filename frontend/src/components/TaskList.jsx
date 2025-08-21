import TaskItem from './TaskItem'

export default function TaskList({ tasks = [], onToggle, onEdit, onDelete }) {
  return <div style={{ display: 'grid', gap: 12 }}>
    {Array.isArray(tasks) && tasks.map((task) => (
      <TaskItem key={task.id} task={task} onToggle={() => onToggle?.(task.id)} onEdit={() => onEdit?.(task)} onDelete={() => onDelete?.(task.id)} />
    ))}
  </div>
}



