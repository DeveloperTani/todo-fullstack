import { useState, useEffect } from 'react';
import CategoryService from '../services/CategoryService';
import BackButton from './BackButton';

const TaskForm = ({ initialData = {}, onSubmit }) => {
  const [taskFormData, setTaskFormData] = useState({
    taskHeader: '',
    taskDescription: '',
    taskDeadline: '',
    categoryId: null,
    taskDone: false,
    ...initialData,
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    CategoryService.getAll().then((data) => setCategories(data));
  }, []);

  const handleChange = (field, value) => {
    setTaskFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(taskFormData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={taskFormData.taskHeader}
          onChange={(e) => handleChange('taskHeader', e.target.value)}
          required
        />
      </label>

      <label>
        Description:
        <textarea
          value={taskFormData.taskDescription}
          onChange={(e) => handleChange('taskDescription', e.target.value)}
        />
      </label>

      <label>
        Deadline:
        <input
          type="date"
          value={taskFormData.taskDeadline?.split('T')[0] || ''}
          onChange={(e) => handleChange('taskDeadline', e.target.value)}
        />
      </label>

      <label>
        Category:
        <select
          value={taskFormData.categoryId || ''}
          onChange={(e) => handleChange('categoryId', parseInt(e.target.value))}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.categoryId} value={category.categoryId}>
              {category.categoryName}
            </option>
          ))}
        </select>
      </label>

      <label>
        <input
          type="checkbox"
          checked={taskFormData.taskDone}
          onChange={(e) => handleChange('taskDone', e.target.checked)}
        />
        Completed
      </label>

      <button type="submit" className="btn btn-primary mb-1">
        {initialData.taskHeader ? 'Update Task' : 'Create Task'}
      </button>
      <BackButton />
    </form>
  );
};

export default TaskForm;








