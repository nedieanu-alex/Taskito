import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/tasks', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Failed to fetch tasks', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Task deleted successfully');
      fetchTasks();
    } catch (error) {
      console.error('Failed to delete task', error);
    }
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
  };

  const handleTaskUpdated = () => {
    setEditingTask(null);
    fetchTasks();
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Tasks</h2>
      <TaskForm fetchTasks={fetchTasks} />
      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        tasks.map((task) => (
          <div key={task._id} className="task-item">
            <TaskItem task={task} />
            <button onClick={() => handleEditClick(task)} className="ml-2 px-4 py-2 bg-yellow-500 text-white rounded">
              Edit
            </button>
            <button onClick={() => deleteTask(task._id)} className="ml-2 px-4 py-2 bg-red-500 text-white rounded">
              Delete
            </button>
          </div>
        ))
      )}
      {editingTask && (
        <TaskForm
          task={editingTask}
          fetchTasks={fetchTasks}
          onCancel={() => setEditingTask(null)}
        />
      )}
    </div>
  );
};

export default TaskList;
