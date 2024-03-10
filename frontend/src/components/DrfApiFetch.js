import React, { useState, useEffect } from 'react';

const DrfApiFetch = () => {

  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelected] = useState([])
  const [id, setId] = useState(1)

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/tasks/', {method: 'GET'})
    .then(res => res.json())
    .then(data => {setTasks(data)})
  },[]);

  const getTask = () => {
    fetch(`http://127.0.0.1:8000/api/tasks/${id}/`, {method: 'GET'})
    .then(res => res.json())
    .then(data => {setSelected(data)})
  }

  const deleteTask = (id) => {
    fetch(`http://127.0.0.1:8000/api/tasks/${id}/`, {method: 'DELETE'})
    .then(() => {setTasks(tasks.filter(task => task.id !== id)); setSelected([]); setId('')})
  }

  return (
    <div>
      <ul>
        {
          tasks.map(task => <li key={task.id}>{task.title} {task.id}
          <button onClick={()=>deleteTask(task.id)}>
            <i className='fas fa-trash-alt'></i>
          </button>
          </li>)
        }
      </ul>

      Set id <br/>
      <input type='text' value={id} onChange={evt=>{setId(evt.target.value)}}/>
      <br/>
      <button type='button' onClick={()=>getTask()}>Get Task</button>
      
      <h3>{selectedTask.title} {selectedTask.id}</h3>
      
    </div>
  )
}

export default DrfApiFetch
