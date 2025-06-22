import { Link } from 'react-router-dom'

const EditButton = ({ taskId }) => {
  return (
    <Link to={`/tasks/edit/${taskId}`} className="btn btn-secondary mb-2">
      Edit
    </Link>
  )
}

export default EditButton