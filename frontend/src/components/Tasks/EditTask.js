import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditTask = ({ taskId, onTaskUpdated, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/tasks/${taskId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const task = response.data;
        setTitle(task.title);
        setDescription(task.description);
        setStatus(task.status);
        setPriority(task.priority);
        setDueDate(task.dueDate.substring(0, 10));
      } catch (error) {
        console.error('Failed to fetch task', error);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/tasks/${taskId}`, {
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
      onTaskUpdated();
    } catch (error) {
      console.error('Failed to update task', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
      <select value={status} onChange={(e) => setStatus(e.target.value)} required>
        <option value="Todo">Todo</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      <input type="text" value={priority} onChange={(e) => setPriority(e.target.value)} placeholder="Priority" required />
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
      <button type="submit">Update Task</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default EditTask;
