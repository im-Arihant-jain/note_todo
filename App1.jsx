import React from "react"
import TodoList from "./components/TodoList"
import Editor from "./components/Editor"
import Split from "react-split"
import { nanoid } from "nanoid"

export default function App() {
    
    const [todo, setTodo] = React.useState(
        () => JSON.parse(localStorage.getItem("todo")) || []
    )
    const [currentTodoId, setCurrentTodoId] = React.useState(
        (todo[0]?.id) || ""
    )
    
    const currentNote = 
    todo.find(todo => todo.id === currentTodoId) 
        || todo[0]

    React.useEffect(() => {
        localStorage.setItem("todo", JSON.stringify(todo))
    }, [todo])

    function createNewNote() {
        const newNote = {
            id: nanoid(),
            body: "# Add your Todo's here"
        }
        setTodo(prevNotes => [newNote, ...prevNotes])
        setCurrentTodoId(newNote.id)
    }

    function updateNote(text) {
        setTodo(oldNotes => {
            const newArray = []
            for (let i = 0; i < oldNotes.length; i++) {
                const oldNote = oldNotes[i]
                if (oldNote.id === currentTodoId) {
                    // Put the most recently-modified note at the top
                    newArray.unshift({ ...oldNote, body: text })
                } else {
                    newArray.push(oldNote)
                }
            }
            return newArray
        })
    }

    function deleteNote(event, noteId) {
        event.stopPropagation()
        setTodo(oldNotes => oldNotes.filter(note => note.id !== noteId))
    }

    return (
        <main>
            
            {
                 
                todo.length > 0
                    ?
                    <Split
                        sizes={[30, 70]}
                        direction="horizontal"
                        className="split"
                    >
                        <TodoList
                            notes={todo}
                            currentNote={currentNote}
                            setCurrentNoteId={setCurrentTodoId}
                            newNote={createNewNote}
                            deleteNote={deleteNote}
                        />
                        
                            <Editor
                                currentNote={currentNote}
                                updateNote={updateNote}
                            />
                        
                    </Split>
                    :
                    <div className="no-notes">
                        <h1>You have no To-dos</h1>
                        <button
                            className="first-note"
                            onClick={createNewNote}
                        >
                            Create one now
                </button>
                    </div>

            }
        </main>
    )
}
