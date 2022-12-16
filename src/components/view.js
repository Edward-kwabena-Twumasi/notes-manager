import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "../components.css"



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
      const response = await fetch(`https://notes-backend-gf28.onrender.com/note/${params.id.toString()}`);

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
    <div className="note-card p-15">
      <h3 className="note-title m-3">{note.title}</h3>
      <p className="note-body m-3">{note.content}</p>
      <div className="row m-3 timestamps">
        <h5>Created on : {note.created}  </h5>
        <h5 className="ml-4"> Last update on : {note.updated} </h5>

      </div>
      <div className="row m-3 actions">
       <Link className="btn btn-link" to={`/edit/${note._id}`}>Edit</Link> 
       <button className="btn ml-3" onClick={(e)=>{
            e.preventDefault();
            navigate(-1)}}>Back</button>
      </div>
      
    </div>
  );
}
