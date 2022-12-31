import { useEffect, useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import ListItem from './ListItem';
import ToDo from './classes/ToDo';

function App() {  
  const [todos, setTodos] = useState<ToDo[]>(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos") as string) : [] as Array<string>)
  const inputRef = useRef<any>(null)

  const handleDelete = (e: any) => {
    const id: number = parseInt(e.target.value)
    const newTodos = todos.filter(val => val.id !== id)
    setTodos(newTodos)
  }

  const handleAdd = (e: any) => {
    const newToDo = new ToDo(todos.length + 1, inputRef.current.value, false)
    
    setTodos([...todos, newToDo])
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    console.log(todos);
    
  }, [todos])

  return (
    <div className="container p-5 my-5">
      <div className='row'>
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <h1>My ToDo-List</h1>
          <div className="row mt-5 mb-2">
            <div className="col-sm-8">
              <input ref={inputRef} type="text" className="form-control" />
            </div>
            <div className="col-sm-4">
              <button className="btn btn-primary float-end w-100"
                onClick={handleAdd}
              >Add</button>
            </div>
          </div>
          <ul className='list-group'>
            {todos.map((todo : ToDo) => (
              <ListItem key={todo.id} todo={todo} handleDelete={handleDelete} />
            ))}
          </ul>
        </div>
        <div className="col-sm-2"></div>
      </div>
    </div>
  )
}

export default App
