import React from "react"
import App1 from './App1'
import App2 from './App2'
export default function Appy() {
    const[showTodoList,setShowTodoList] = React.useState(false)
    return (
        <div className="notepadt">
        <button className="button-78" onClick={() => setShowTodoList(!showTodoList)}>
          {showTodoList ? <div className="text">Show To-Do</div> : <div className="text">Show Notes</div>}
        </button>

        {showTodoList ? <App2 /> : <App1 />}
      </div>
    )
}