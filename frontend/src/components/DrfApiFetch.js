import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DrfApiFetch = () => {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/tasks/', {method: 'GET'})
    .then(res => res.json())
    .then(data => {setTasks(data)})
  },[]);

  return (
    <div>
      <ul>
        {
          tasks.map(task => <li key={task.id}>{task.title} {task.id}</li>)
        }
      </ul>
    </div>
  )
}

export default DrfApiFetch
