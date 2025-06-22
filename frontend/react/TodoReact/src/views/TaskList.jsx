import '../styles/App.css'
import '../styles/List.css'
import React, { useState, useEffect } from 'react'
import TaskService from '../services/TaskService'
import { Link } from 'react-router-dom'
import BackButton from '../components/BackButton'
import EditButton from '../components/EditButton'
import DeleteButton from '../components/DeleteButton'

const TaskList = () => {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    TaskService.getAll().then((data) => {
      setTasks(data)
    })
  }, [])

  return (
    <div>
      <div className="page-header">
        <h2>Task List</h2>
      </div>

      <Link to="/tasks/create" className="btn btn-primary mb-2">
        Add New Task
      </Link>
      <BackButton />

      {tasks && tasks.length > 0 ? (
        <div className="task-list">
          {tasks.map((t) => {
            const isTaskDone = t.taskDone
            const isTaskMissed = new Date(t.taskDeadline) < new Date() && !isTaskDone

            const taskLinkColor = isTaskDone
              ? 'green'
              : isTaskMissed
              ? 'red'
              : 'yellow'

            return (
              <div key={t.taskId} className="task-item">
                <div className="task-actions">
                  <EditButton taskId={t.taskId} />
                  <DeleteButton taskId={t.taskId} />
                </div>

                <div className="task-item-header">
                  <Link
                    to={`/tasks/${t.taskId}`}
                    className="task-link"
                    style={{ color: taskLinkColor }}
                  >
                    <h4>{t.taskHeader}</h4>
                  </Link>
                </div>

                <div className="task-details">
                  {t.taskDescription && <p>{t.taskDescription}</p>}
                  {t.taskDeadline && <p>Deadline: {t.taskDeadline}</p>}
                  {t.taskDone && <span className="task-completed">Completed</span>}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <p>No tasks available.</p>
      )}
    </div>
  )
}

export default TaskList