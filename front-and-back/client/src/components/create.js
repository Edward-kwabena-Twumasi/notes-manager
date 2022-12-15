import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router";

export default function Create() {
  const [form, setForm] = useState({
    title: "",
    content: ""
  });
  const [noteTitles, setNoteTitles] = useState([]);

  const navigate = useNavigate();
   // Get all notes and extract their titles to prevent note title duplicates
   useEffect(() => {
    async function getNotes() {
      const response = await fetch(`http://localhost:5000/notes/`);

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const allnotes = await response.json();
      setNoteTitles(allnotes.map(note=>note.title.toLowerCase()));
      console.log(noteTitles)
    }

    getNotes();

    return; 
  }, [noteTitles]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newNote = { ...form };
    if (noteTitles.includes(form.title.toLocaleLowerCase())) {
      window.alert(`There is already a note with the title "${form.title}"`)
      return
    }

    await fetch("http://localhost:5000/note/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNote),
    })
    .catch(error => {
      window.alert(error);
      return;
    });

    setForm({ title: "", content: "" });
    navigate("/");
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <h5>Create New Note</h5>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={form.title}
            onChange={(e) => updateForm({ title: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
          rows="4"
          cols="60"
            type="text"
            className="form-control"
            id="content"
            value={form.content}
            onChange={(e) => updateForm({ content: e.target.value })}
          />
        </div>
        <div className="row form-group actions">
          <input
            type="submit"
            value="Add note"
            className="btn btn-primary"
          />
          <button className="btn ml-3" onClick={(e)=>{
            e.preventDefault();
            navigate(-1)}}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
