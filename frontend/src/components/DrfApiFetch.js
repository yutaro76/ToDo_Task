import React, { useState, useEffect } from 'react';

const DrfApiFetch = () => {

  const [tasks, setTasks] = useState([])
  const [selectedTask, setSelected] = useState([])
  const [editedTask, setEditedTask] = useState({id:'', title:''})
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

  const newTask = (task) => {
    const data = {
      title: task.title
    }
    fetch('http://127.0.0.1:8000/api/tasks/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {setTasks([...tasks, data]); setEditedTask({id:'', title:''})})
  }

  const editTask = (task) => {
    fetch(`http://127.0.0.1:8000/api/tasks/${task.id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    .then(res => res.json())
    .then(updatedTask => {setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
      setEditedTask({id:'', title:''})
    })
  }

  const handleInputChange = () => evt => {
    const value = evt.target.value
    const name = evt.target.name
    setEditedTask({...editedTask, [name]:value})
  }

  return (
    <div>
      <ul>
        {
          tasks.map(task => <li key={task.id}>{task.title} {task.id}
          <button onClick={()=>deleteTask(task.id)}>
            <i className='fas fa-trash-alt'></i>
          </button>
          <button onClick={()=>setEditedTask(task)}>
            <i className='fas fa-pen'></i>
          </button>
          </li>)
        }
      </ul>

      Set id <br/>
      <input type='text' value={id} onChange={evt=>{setId(evt.target.value)}}/>
      <br/>
      <button type='button' onClick={()=>getTask()}>Get Task</button>
      
      <h3>{selectedTask.title} {selectedTask.id}</h3>

      <input type='text' name='title'
      value = {editedTask.title}
      onChange={handleInputChange()}
      placeholder='New Task?'
      required/>

      { editedTask.id?
      <button onClick={()=>editTask(editedTask)}>Update</button> :
      <button onClick={()=>newTask(editedTask)}>Create</button> }
      
    </div>
  )
}

export default DrfApiFetch
