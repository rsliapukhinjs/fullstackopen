import React from "react";

const Numbers = ({ personsToShow, onDelete }) => {
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map((person) => (
          <li key={person.name}>
            {person.name} {person.number}{" "}
            <button onClick={() => onDelete(person)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Numbers;
