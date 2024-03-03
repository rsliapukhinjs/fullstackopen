import React from "react";

const Form = ({
  onAddPerson,
  newName,
  onNameInput,
  newNumber,
  onNumberInput,
}) => {
  return (
    <div>
      <h2>Add new number</h2>
      <form onSubmit={onAddPerson}>
        <div>
          Name: <input value={newName} onChange={onNameInput} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={onNumberInput} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
