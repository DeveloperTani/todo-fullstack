import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import TaskService from '../services/TaskService'

import BackButton from '../components/BackButton'
import EditButton from '../components/EditButton'
import DeleteButton from '../components/DeleteButton'
import '../styles/List.css'

const TaskDetail = () => {
  const { taskId } = useParams()
  const [task, setTask] = useState(null)

  // Fetch task data by ID on mount or when taskId changes
  useEffect(() => {
    TaskService.getById(taskId).then(data => setTask(data))
  }, [taskId])

  if (!task) return <p>Loading task details...</p>

  const isTaskMissed = new Date(task.taskDeadline) < new Date() && !task.taskDone
  const statusColor = task.taskDone ? "green" : isTaskMissed ? "red" : "yellow"
  const statusText = task.taskDone ? "Completed" : isTaskMissed ? "Missed" : "Pending"

  return (
    <div className="task-detail">
      <div className="task-detail-header">
        <h2>{task.taskHeader}</h2>
      </div>

      <div className="task-detail-body">
        <p><strong>Description:</strong> {task.taskDescription || "No description"}</p>
        <p><strong>Deadline:</strong> {task.taskDeadline}</p>
        <p><strong>Category:</strong> {task.category?.categoryName || "No category"}</p>
        <p>
          <strong>Status:</strong>{" "}
          <span style={{ color: statusColor }}>{statusText}</span>
        </p>
      </div>

      <div className="task-actions">
        <EditButton taskId={task.taskId} />
        <DeleteButton taskId={task.taskId} />
        <BackButton />
      </div>
    </div>
  )
}

export default TaskDetail