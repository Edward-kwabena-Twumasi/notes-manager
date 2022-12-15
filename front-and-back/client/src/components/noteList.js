import React, { useEffect, useState,useRef } from "react";
import { Link } from "react-router-dom";

const Note = (props) => (
  <tr>
    <td>{props.note.title}</td>
    <td>{props.note.content}</td>
    <td>
      <Link className="btn btn-link" to={`/edit/${props.note._id}`}>Edit</Link> |
      <Link className="btn btn-link" to={`/view/${props.note._id}`}>View</Link> |
      <button className="btn btn-link"
        onClick={() => {
          props.deleteNote(props.note._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default function NoteList() {
  const searchBox=useRef();
  const [notes, setNotes] = useState([]);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getNotes() {
      const response = await fetch(`http://localhost:5000/notes/`);

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const allnotes = await response.json();
      setNotes(allnotes);
    }

    getNotes();

    return; 
  }, [notes.length]);

  // This method will delete a record
  async function deleteNote(id) {
    await fetch(`http://localhost:5000/delete/${id}`, {
      method: "DELETE"
    });

    const newNotes = notes.filter((el) => el._id !== id);
    setNotes(newNotes);
  }
  
  const filterNotes=()=>{
    setNotes(notes.filter(note=>note.title.toLowerCase().includes(searchBox.current.value.toLowerCase())))
  }

  // This method will map out the notes on the table
  function noteList() {
    return notes.map((note) => {
      return (
        <Note
          note={note}
          deleteNote={() => deleteNote(note._id)}
          key={note._id}
        />
      );
    });
  }

  // This following section will display the table with the records of individuals.
  return (
    <div>
      <h3>All todos</h3>
      <div>
       <input ref={searchBox} className={'search w-100'} onChange={filterNotes} placeholder="Search Todo"></input> 
      </div>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Content</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{noteList()}</tbody>
      </table>
    </div>
  );
}
