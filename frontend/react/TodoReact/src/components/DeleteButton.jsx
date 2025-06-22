import React from 'react'
import TaskService from '../services/TaskService'

const DeleteButton = ({ taskId }) => {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      TaskService.remove(taskId)
        .then(() => {
          window.location.href = '/tasks'
        })
        .catch((error) => {
          console.error('Error deleting task:', error);
          alert('An error occurred while deleting the task.')
        })
    }
  }

  return <button onClick={handleDelete} className="btn btn-danger">Delete</button>
}

export default DeleteButton