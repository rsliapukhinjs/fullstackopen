import { useState } from "react";

import Note from "./components/Note";

const App = ({ data }) => {
  const [notes, setNotes] = useState(data);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  const addNote = (e) => {
    e.preventDefault();

    const noteObj = {
      id: notes.length + 1,
      content: newNote,
      important: Math.random() > 0.5,
    };

    setNotes(notes.concat(noteObj));
    setNewNote("");
  };

  const handleNoteChange = (e) => {
    setNewNote(e.target.value);
  };

  const notesToShow = showAll ? notes : notes.filter((n) => n.important);

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note note={note} key={note.id} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input type="text" value={newNote} onChange={handleNoteChange} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default App;
