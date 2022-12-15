import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import "../components.css"


export default function Edit() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    created:"",
    updated:""
  });
  const [status,setStatus]=useState("")
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

      const note = await response.json();
      if (!note) {
        window.alert(`note with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm(note);
    }

    fetchData();

    return;
  }, [params.id, navigate]);




  // These methods will update the state properties.
  async function onFieldChange(value) {
     setStatus("Saving changes")
     setForm((prev) => {
      return { ...prev, ...value };
    });
    const editedNote = {
      title: form.title,
      content:form.content,
      created:form.created,
      updated:form.updated
      
    };

    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:5000/update/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedNote),
      headers: {
        'Content-Type': 'application/json'
      },
    });
  }

  function onDoneTyping(value){
    onFieldChange(value)
    setTimeout(() => {
      setStatus("Done saving")

    }, 600);
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedNote = {
      title: form.title,
      content:form.content,
      created:form.created,
      updated:form.updated
      
    };

    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:5000/update/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedNote),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    navigate("/");
  }

  // This following section will display the form that takes input from the user to update the data.
  return (
    <div>
      <h3>Update note</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Ttle: </label>
          <input
            type="text"
            className="form-control form"
            id="title"
            value={form.title}
            onChange={(e) => onFieldChange({ title: e.target.value })  }
            onKeyUp={(e)=>onDoneTyping({title: e.target.value })}
            
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content: </label>
          <textarea
           rows="4"
           cols="60"
            type="text"
            className="form-control"
            id="content"
            value={form.content}
            onChange={(e) => onFieldChange({ content: e.target.value })}
            onKeyUp={(e)=>onDoneTyping({ content: e.target.value })}/>
        </div>
        <br />
        <div className="form-group actions">
          <input
            type="submit"
            value="Update note"
            className="btn btn-primary"
          />
          <button className="btn ml-3" onClick={(e)=>{
            e.preventDefault();
            navigate(-1)}}>Cancel</button>
         </div>
      </form>
      <h5 className="m-2 text-danger">{status}</h5>
    </div>
  );
}
