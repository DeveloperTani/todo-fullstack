import taskmanager from '../assets/taskmanager.jpg'

const Welcome = () => {
  return (
    <div className="welcome">
      <h1 className="welcome">Welcome to Taskmaster</h1>
      <img src={taskmanager} alt="Task Manager" className="welcomeimg" />
    </div>
  )
}

export default Welcome