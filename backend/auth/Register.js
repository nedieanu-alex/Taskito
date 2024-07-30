import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/tasks', {
        title,
        description,
        status,
        priority,
        dueDate,
      });
      console.log('Task created successfully', response.data);
    } catch (error) {
      console.error('Task creation failed', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
      <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} placeholder="Status" required />
      <input type="text" value={priority} onChange={(e) => setPriority(e.target.value)} placeholder="Priority" required />
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
      <button type="submit">Create Task</button>
    </form>
  );
};

export default Register;
