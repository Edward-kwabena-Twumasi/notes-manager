import React, { useEffect, useState,useRef } from "react";
import { Link,NavLink } from "react-router-dom";

const Note = (props) => (
  <tr>
    <td>{props.note.title}</td>
    <td>{props.note.content}</td>
    <td>{props.note.created}</td>
    <td>{props.note.updated}</td>
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
  const [query, setQuery] = useState("");

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
    <div>
      <div className="row container-fluid mb-4 w-90">
      <h3>My notes</h3>
      <NavLink className="nav-link" to="/create">
                New Note
      </NavLink>
      </div>
      
      <div>
      <input ref={searchBox} className={'search w-100'} onChange={filterNotes} placeholder="Search Todo"></input> 
      </div>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Content</th>
            <th>Created</th>
            <th>Updated</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{noteList()}</tbody>
      </table>
    </div>
  );
}
