import './styles/App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import { Nav } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'

import Welcome from './views/Welcome.jsx'
import TaskList from './views/TaskList'
import CategoryList from './views/CategoryList'
import CategoryDetail from './views/CategoryDetail'
import TaskDetail from './views/TaskDetail'
import CreateTask from './views/TaskCreate.jsx'
import EditTask from './views/TaskEdit.jsx'

const App = () => {
  return (
    <div className="App">
      <Router>
        {/* Navigation Bar */}
        <Navbar bg="dark" variant="dark" fixed="top">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">Frontpage</Nav.Link>
            <Nav.Link as={Link} to="/tasks">All Tasks</Nav.Link>
            <Nav.Link as={Link} to="/categories">Tasks by Category</Nav.Link>
          </Nav>
        </Navbar>

        {/* Route Definitions */}
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/tasks/create" element={<CreateTask />} />
          <Route path="/tasks/edit/:taskId" element={<EditTask />} />
          <Route path="/tasks/:taskId" element={<TaskDetail />} />
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/categories/:categoryId" element={<CategoryDetail />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
