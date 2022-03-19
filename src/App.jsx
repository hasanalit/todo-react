
import { useState } from 'react';
import './App.css';

function App() {

  const [todo, setTodo] = useState(JSON.parse(window.localStorage.getItem("todos")) || [])

  const addTodo = (e) => {

    let newTodo = {
      id: new Date().getTime(),
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


  return (
    <>

    <input onKeyPress={e => addTodo(e)} type="text" placeholder='type...' />


    {
      todo?.map(t => {
        return(
          <li key={t?.id}>
            {t?.content}
            <button onClick={() => deleteTodo(t?.id)}>x</button>
            </li>
        )
      })
    }

    </>
  );
}

export default App;
