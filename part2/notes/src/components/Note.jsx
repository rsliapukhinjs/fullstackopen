const Note = ({ note, toggleImportance }) => {
  const label = note.important ? "make not important" : "important";

  return (
    <div>
      <p>
        {note.content}{" "}
        <button onClick={() => toggleImportance(note.id)}>{label}</button>
      </p>
    </div>
  );
};

export default Note;
