import { useNavigate } from 'react-router-dom'
import TaskForm from '../components/TaskForm' 
import TaskService from '../services/TaskService'

const CreateTask = () => {
  const navigate = useNavigate()

  const handleCreate = (newTask) => {
    TaskService.create(newTask).then(() => {
      navigate('/tasks');
    })
  }

  return <TaskForm onSubmit={handleCreate} /> 
}

export default CreateTask