const Note = ({ note, toggleImportance }) => {
  const label = note.important ? "make not important" : "important";

  return (
    <div>
      <li className="note">
        {note.content}{" "}
        <button onClick={() => toggleImportance(note.id)}>{label}</button>
      </li>
    </div>
  );
};

export default Note;
