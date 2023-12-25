import React from "react"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
export default function Sidebar(props) {
    const [noteDates, setNoteDates] = React.useState({});

    React.useEffect(() => {
        // Initialize noteDates state based on local storage or notes array
        const storedNoteDates = JSON.parse(localStorage.getItem('noteDates')) || {};
        const validNoteDates = {};
    
        for (const noteId in storedNoteDates) {
          const storedDate = storedNoteDates[noteId];
          const parsedDate = new Date(storedDate);
    
          // Check if the parsedDate is a valid date
          if (!isNaN(parsedDate.getTime())) {
            validNoteDates[noteId] = parsedDate;
          }
        }
    
        setNoteDates(validNoteDates);
      }, []);

  React.useEffect(() => {
    // Save noteDates state to local storage whenever it changes
    localStorage.setItem('noteDates', JSON.stringify(noteDates));
  }, [noteDates]);

  const handleDateChange = (date, noteId) => {
    setNoteDates((prevNoteDates) => ({
      ...prevNoteDates,
      [noteId]: date,
    }));
  };
    const noteElements = props.notes.map((note) => (
        <div key={note.id}>
            <div
                
                className={`title ${
                    note.id === props.currentNote.id ? "selected-note" : ""
                }`}
                onClick={() => props.setCurrentNoteId(note.id)}
            >
                <h4 className="text-snippet">{note.body.split("\n")[0]}</h4>
                <button 
                    className="delete-btn"
                    onClick={(event) => props.deleteNote(event, note.id)}
                >
                    <i className="gg-trash trash-icon"></i>
                </button>
                <DatePicker
              selected={noteDates[note.id]}
              onChange={(date) => handleDateChange(date, note.id)}
              dateFormat="MMMM d, yyyy"
              customInput={
                <div>
                  <span style={{ color: '#aaa' }}></span>
                  <input
                    placeholder="Enter date"
                    style={{
                        width: '80%', // Adjust the percentage as needed
                        maxWidth: '150px', // Set a maximum width if necessary
                        backgroundColor : 'lightblue'
                      }}
                      value={noteDates[note.id] ? noteDates[note.id].toLocaleDateString() : ''}
                  /> 
                </div>
              }
            />
            </div>
        </div>
    ))

    return (
        <section className="pane sidebar">
            <div className="sidebar--header">
                <h3>Notes</h3>
                <button className="new-note" onClick={props.newNote}>+</button>
                
               
     
        
      
            </div>
            {noteElements}
        </section>
    )
}
