import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="container p-5 my-5">
        <h1>My First Bootstrap Page</h1>
        <p>This is some text</p>

        <div className='row'>
          <div className='col-sm p-3 bg-secondary text-white'>.col</div>
          <div className='col-sm p-3 bg-dark text-white'>.col</div>
          <div className='col-sm p-3 bg-secondary text-white'>.col</div>
        </div>
      </div>

    </>
  )
}

export default App
