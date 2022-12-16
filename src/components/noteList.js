import React, { useEffect, useState,useRef } from "react";
import { Link,NavLink } from "react-router-dom";
import "../components.css"

const Note = (props) => (
  <>
  <div className="note-card w-90">
    <h1 className="note-title mb-3">{props.note.title}</h1>
    <p className="note-body">{props.note.content}</p>
    <div className="row timestamps">
      <h5>C : {props.note.created}</h5>
      <h5>U : {props.note.updated}</h5>
    </div>
    <div className="row w-1oo actions">
      <Link className="btn btn-link" to={`/edit/${props.note._id}`}>Edit</Link> .
      <Link className="btn btn-link" to={`/view/${props.note._id}`}>View</Link> .
      <button className="btn btn-link"
        onClick={() => {
          props.deleteNote(props.note._id);
        }}>
        Delete
      </button>
    </div>
  </div>
  </>
);

export default function NoteList() {
  const searchBox=useRef();
  const [notes, setNotes] = useState([]);
  const [query, setQuery] = useState("");

  // This method fetches the records from the database.
  useEffect(() => {
    async function getNotes() {
      const response = await fetch(`http://localhost:5000/notes/`);

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return <h1>Cant fetch data. Check network connection</h1>;
      }

      const allnotes = await response.json();
      setNotes(allnotes.filter(note=>note.title.toLowerCase().includes(query)));
    }

    getNotes();

    return; 
  }, [notes.length,query]);

  // This method will delete a record
  async function deleteNote(id) {
    await fetch(`http://localhost:5000/delete/${id}`, {
      method: "DELETE"
    });

    const newNotes = notes.filter((el) => el._id !== id);
    setNotes(newNotes);
  }
  
  const filterNotes=()=>{
    setQuery(searchBox.current.value.toLowerCase())
  }

  // This method will map out the notes on the table
  function noteList() {
    if (notes.length<0) {
      return <h3>You available notes</h3>
    }
    return  notes.map((note) => {
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
    <div className="container-fluid w-100 notes-page">
      <div className="row page-header mb-4 w-90">
      <h3>My notes</h3>
      <NavLink className="nav-link" to="/create">
                New Note
      </NavLink>
      </div>
      
      <div>
        <input ref={searchBox} className={'search w-100'} onChange={filterNotes} placeholder="Search Todo"></input> 
      </div>
      <div className="notes">
        {noteList()}
      </div>
      
    </div>
  );
}
