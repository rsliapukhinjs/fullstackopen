import { useState, useEffect } from "react";
import axios from "axios";

import Filter from "./components/Filter";
import Form from "./components/Form";
import Numbers from "./components/Numbers";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const duplicatesCheck = () => {
    return (
      persons.filter((p) => p.name.toLowerCase() === newName.toLowerCase())
        .length > 0
    );
  };

  const handleAddPerson = (e) => {
    e.preventDefault();

    const duplicates = duplicatesCheck();
    if (duplicates) {
      alert(`${newName} is already in the phonebook`);
      return;
    }

    setPersons(
      persons.concat({
        name: newName,
        number: newNumber,
      })
    );
    setNewName("");
    setNewNumber("");
  };

  const handleNameInput = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberInput = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const personsToShow = filter
    ? persons.filter((p) => p.name.toLowerCase().includes(filter))
    : persons;

  return (
    <div>
      <h1>Phonebook</h1>

      <Filter filter={filter} onFilter={handleFilter} />
      <Form
        onAddPerson={handleAddPerson}
        newName={newName}
        onNameInput={handleNameInput}
        newNumber={newNumber}
        onNumberInput={handleNumberInput}
      />
      <Numbers personsToShow={personsToShow} />
    </div>
  );
};

export default App;
