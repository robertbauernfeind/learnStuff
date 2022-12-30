import { useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [todos, setTodos] = useState(["asd", "qwe", "zxc"])
  const inputRef = useRef<any>(null)

  const handleDelete = (e: any) => {
    const newTodos = []
    for (let i = 0; i < todos.length; i++) i != e.target.value && newTodos.push(todos[i])

    setTodos(newTodos)
  }

  const handleAdd = (e: any) => {
    setTodos([...todos, inputRef.current.value])
  }

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
            {todos.map((todo, index) => (
              <li className="list-group-item" key={index}>
                {todo}
                <button value={index} className="btn btn-danger float-end"
                  onClick={handleDelete}
                >X</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-sm-2"></div>
      </div>
    </div>
  )
}

export default App
