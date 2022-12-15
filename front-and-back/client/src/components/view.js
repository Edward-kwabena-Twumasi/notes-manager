import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";


export default function View() {
  const [note, setNote] = useState({
    title: "",
    content: "",
    created:"",
    updated:""
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(`http://localhost:5000/note/${params.id.toString()}`);

      if (!response.ok) {
        const message = `An error has occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const freshnote = await response.json();
      if (!freshnote) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }

      setNote(freshnote);
    }

    fetchData();

    return;
  }, [params.id, navigate]);



  // This following section will display the form that takes input from the user to update the data.
  return (
    <div className="view-note p-15">
      <h3 className="note-title m-3">{note.title}</h3>
      <p className="note-content m-3">{note.content}</p>
      <div className="row m-3">
        <h5>Created on : {note.created}  </h5>
        <h5 className="ml-4"> Last update on : {note.updated} </h5>

      </div>
      <div className="row m-3"></div>
      <Link className="btn btn-link" to={`/edit/${note._id}`}>Edit</Link> 
      
    </div>
  );
}
