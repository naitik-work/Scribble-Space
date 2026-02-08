import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
const App = () => {
  const [notes, setNotes] = useState([
    {
      title: "title",
      description: "descripition",
    },
    {
      title: "title",
      description: "descripition",
    },
    {
      title: "title",
      description: "descripition",
    },
    {
      title: "title",
      description: "descripition",
    },
  ]);

  function fetchNotes() {
    axios.get("http:localhost:3000/api/notes").then((res) => {
      setNotes(res.data.notes);
    });
  }

  //submit handler
  function handleSubmit(e) {
    e.preventDefault(); //page ko reload hone se rokega
    const {title, description} = e.target.elements;
    console.log(title.value,description.value);
    //creation of notes at the server from frontend using axios.
    axios.post("http:localhost:3000/api/notes", {
        title: title.value,
        description: description.value,
      })
      .then((res) => {
        console.log(res.data);
        fetchNotes();
      });
  }
  return (
    <div className="main">
      <div className="header">
        <h1>Scribble Space</h1>
        <form className="note-create-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Enter title" />
          <input type="text" placeholder="Enter description" />
          <button>Create note</button>
        </form>
      </div>
      <div className="notes">
        {notes.map((note, id) => {
          return (
            <div key={id} className="note">
              <h3>{note.title}</h3>
              <p>{note.description}</p>
              <button>Delete</button>
              <button>Update</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
