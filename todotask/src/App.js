import React from 'react'

import logo from './logo.svg';

import './App.css';
import { useState } from 'react';

function App() {
  const [todotask, settTodotask] = React.useState([]);

  const [todotasklist, setTodotasklist] = React.useState("");


React.useEffect(() => {
  const temp = localStorage.getItem("todotask")
  const loadedtodotask = JSON.parse(temp)

  if(loadedtodotask) {
    settTodotask(loadedtodotask)
  }
}, [])

React.useEffect(() => {
  const temp =JSON.stringify(todotask)
  localStorage.setItem("todotask", temp)
},[todotask])

  function handleSubmit(e) {
    e.preventDefault()
    
    const newToDO = {
      id:new Date().getTime(),
      text:todotasklist,
      completed: false,

    }
    settTodotask([...todotask].concat(newToDO))
    setTodotasklist("") 

  }
  function deleteToDo(id)
  {
    const updatedTODO = [...todotask].filter((todotasklist)=> todotasklist.id !== id)
    settTodotask(updatedTODO)
  }

  function saveTask(id) {
    const updatedTODO = [...todotask].map((todotasklist) => {
      if (todotasklist.id == id){
        todotasklist.completed = !todotasklist.completed
      }
      return todotasklist
    })
    setTodotasklist(updatedTODO)
  }
  return (
    <div className="App">
      <div>
        <h2 className="header_block">
          ToDoList
        </h2>
      </div>
      <div className="todoform">
     <form onSubmit={handleSubmit}>
       <input type="text" onChange={(e) => setTodotasklist(e.target.value)} value={todotasklist}/>
       <button type="submit" className="margin_left" >Add Task</button>

     </form>
     </div>

     {todotask.map((todotasklist)=> <div className="todo_item" key={todotasklist.id}>
       <div>{todotasklist.text}</div>
       <button className="button_delete" onClick={()=> deleteToDo(todotasklist.id)}>Delete Task</button>
       <input type="checkbox" onChange={() => saveTask(todotasklist.id)} checked={todotasklist.completed} />

    </div>)}
    </div>
  );
}

export default App;