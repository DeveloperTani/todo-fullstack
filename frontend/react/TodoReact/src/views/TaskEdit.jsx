import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import TaskForm from '../components/TaskForm'
import TaskService from '../services/TaskService'

const EditTask = () => {
  const { taskId } = useParams()
  const navigate = useNavigate()
  const [taskData, setTaskData] = useState(null)

  useEffect(() => {
    TaskService.getById(taskId).then((data) => {
      setTaskData({
        taskHeader: data.taskHeader,
        taskDescription: data.taskDescription,
        taskDeadline: data.taskDeadline ? data.taskDeadline.split('T')[0] : '',
        categoryId: data.category?.categoryId || null,
        taskDone: data.taskDone,
        taskId: data.taskId,
      })
    })
  }, [taskId])

  const handleUpdate = (updatedTask) => {
    TaskService.update(taskId, updatedTask).then(() => {
      navigate('/tasks')
    })
  }

  return taskData ? (
    <TaskForm initialData={taskData} onSubmit={handleUpdate} />
  ) : (
    <p>Loading task data...</p>
  )
}

export default EditTask