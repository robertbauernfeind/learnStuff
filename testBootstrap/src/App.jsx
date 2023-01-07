import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import MDEditor from "@uiw/react-md-editor"

function App() {
  const  [value, setValue] = useState('# Hello, world!')

  return (
    <>
      <div className="container p-5 my-5">
        <h1>Bootstrap test page</h1>
        <p>This is some text</p>

        <div className='row'>
          <div className='col-sm p-3 bg-secondary text-white'>.col</div>
          <div className='col-sm p-3 bg-dark text-white'>.col</div>
          <div className='col-sm p-3 bg-secondary text-white'>.col</div>
        </div>

        <MDEditor
          value={value}
          onChange={setValue}
        />
        <MDEditor.Markdown source={value} />
      </div>

    </>
  )
}

export default App
