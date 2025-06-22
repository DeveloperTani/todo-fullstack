import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import TaskService from '../services/TaskService'
import '../styles/List.css'

import BackButton from '../components/BackButton'
import EditButton from '../components/EditButton'
import DeleteButton from '../components/DeleteButton'

const CategoryDetail = () => {
  const { categoryId } = useParams()
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    TaskService.getByCategory(categoryId).then(data => setTasks(data))
  }, [categoryId])

  return (
    <div>
      <div className="category-header">
        <h2>Tasks in this Category</h2>
      </div>

      {tasks?.length > 0 ? (
        <div className="task-list">
          {tasks.map((t) => {
            const isDone = t.taskDone
            const isOverdue = new Date(t.taskDeadline) < new Date() && !isDone
            const linkColor = isDone ? 'green' : isOverdue ? 'red' : 'yellow'

            return (
              <div key={t.taskId} className="task-item">
                <div className="task-actions">
                  <EditButton taskId={t.taskId} />
                  <DeleteButton taskId={t.taskId} />
                </div>

                <div className="task-item-header">
                  <Link to={`/tasks/${t.taskId}`} className="task-link" style={{ color: linkColor }}>
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
        <p>No tasks in this category.</p>
      )}

      <div>
        <BackButton />
      </div>
    </div>
  )
}

export default CategoryDetail