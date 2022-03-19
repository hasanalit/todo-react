
import { useState } from 'react';
import './App.css';

function App() {

  const [todo, setTodo] = useState(JSON.parse(window.localStorage.getItem("todos")) || [])

  const addTodo = (e) => {

    let newTodo = {
      id: new Date().getTime(),
      isCompleted: false,
      content: e.target.value,
    }

    if(e.code === "Enter"){
      setTodo([newTodo, ...todo])

      window.localStorage.setItem("todos", JSON.stringify([newTodo, ...todo]))

      e.target.value = null
    }
  }

  const deleteTodo = (id) => {
    let filteredTodo = todo.filter(todo => todo.id !== id)
    setTodo(filteredTodo)

    window.localStorage.setItem("todos", JSON.stringify(filteredTodo))
  }

  const selectTodo = (id) => {
    let fineded = todo.find(t => t.id === id)
    fineded.isCompleted = !fineded.isCompleted

    setTodo([...todo])

    window.localStorage.setItem("todos", JSON.stringify([...todo]))
  }


  return (
    <>

    <input onKeyPress={e => addTodo(e)} type="text" placeholder='type...' />


    {
      todo?.map(t => {
        return(
          <li key={t?.id}>
            <input defaultChecked={t.isCompleted} onChange={() => selectTodo(t.id)} type="checkbox"/>
            <span style={{textDecoration: t.isCompleted && "line-through"}}>{t?.content}</span>
            <button onClick={() => deleteTodo(t?.id)}>x</button>
          </li>
        )
      })
    }

    </>
  );
}

export default App;
