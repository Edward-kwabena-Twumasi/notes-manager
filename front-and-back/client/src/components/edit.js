import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
  const [form, setForm] = useState({
    title: "",
    content: ""
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
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedNote = {
      title: form.title,
      content: form.content
      
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
            className="form-control"
            id="title"
            value={form.title}
            onChange={(e) => updateForm({ title: e.target.value })}
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
            onChange={(e) => updateForm({ content: e.target.value })}
          />
        </div>
        <br />
        <div className="form-group">
          <input
            type="submit"
            value="Update note"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
