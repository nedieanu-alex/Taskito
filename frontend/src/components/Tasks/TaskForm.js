import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskForm = ({ task, fetchTasks, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
      setPriority(task.priority);
      setDueDate(task.dueDate.substring(0, 10));
    } else {
      setTitle('');
      setDescription('');
      setStatus('Todo');
      setPriority('');
      setDueDate('');
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (task) {
        await axios.put(`http://localhost:5000/api/tasks/${task._id}`, {
          title,
          description,
          status,
          priority,
          dueDate,
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('Task updated successfully');
      } else {
        await axios.post('http://localhost:5000/api/tasks', {
          title,
          description,
          status,
          priority,
          dueDate,
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('Task created successfully');
      }
      fetchTasks();
      if (onCancel) {
        onCancel();
      }
    } catch (error) {
      console.error('Failed to submit task', error);
    }
  };

  // return (
  //   <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md mb-4">
  //     <select
  //       value={priority}
  //       onChange={(e) => setPriority(e.target.value)}
  //       className="mb-2 p-2 border rounded w-full"
  //     >
  //       <option value="Low">Low</option>
  //       <option value="Medium">Medium</option>
  //       <option value="High">High</option>
  //     </select>
  //     <input
  //       type="date"
  //       value={dueDate}
  //       onChange={(e) => setDueDate(e.target.value)}
  //       className="mb-2 p-2 border rounded w-full"
  //     />
  //     <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded w-full hover:bg-blue-700">
  //       Add Task
  //     </button>
  //   </form>
  // );

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md mb-4">
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required className="mb-2 p-2 border rounded w-full" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required className="mb-2 p-2 border rounded w-full"></textarea>
      <select value={status} onChange={(e) => setStatus(e.target.value)} required className="mb-2 p-2 border rounded w-full">
        <option value="Todo">Todo</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      <select  value={priority} onChange={(e) => setPriority(e.target.value)} className="mb-2 p-2 border rounded w-full" >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="mb-2 p-2 border rounded w-full" />
      <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">{task ? 'Update Task' : 'Add Task'}</button>
      {onCancel && (
        <button type="button" onClick={onCancel} className="ml-2 px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
      )}
    </form>
  );
};

export default TaskForm;
