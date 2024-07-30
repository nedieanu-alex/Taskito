import React from 'react';

const TaskItem = ({ task }) => {
  return (
    <div className="bg-gray-100 p-4 rounded shadow-md mb-4">
      <h3 className="text-xl font-bold">{task.title}</h3>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>
      <p>Priority: {task.priority}</p>
      <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
    </div>
  );
};

export default TaskItem;
