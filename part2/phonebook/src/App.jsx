import { useState, useEffect } from "react";

import personService from "./services/persons";

import Filter from "./components/Filter";
import Form from "./components/Form";
import Numbers from "./components/Numbers";
import Message from "./components/Message";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [messageStyle, setMessageStyle] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleAddOrUpdate = (e) => {
    e.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    const duplicates = duplicatesCheck();

    if (duplicates.length > 0) {
      const confirmReplace = window.confirm(
        `${duplicates[0].name} is already in the phonebook. Replace the old number?`
      );

      if (confirmReplace) {
        personService
          .update(duplicates[0].id, newPerson)
          .then((changedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== duplicates[0].id ? person : changedPerson
              )
            );
            setNewName("");
            setNewNumber("");
            messageUpdate(
              `Updated number for ${changedPerson.name}`,
              "success"
            );
          });
      }
    } else {
      personService.create(newPerson).then((createdPerson) => {
        setPersons(persons.concat(createdPerson));
        setNewName("");
        setNewNumber("");
        messageUpdate(`Added number for ${createdPerson.name}`, "success");
      });
    }
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

  const handleDelete = (personObj) => {
    const confirmDelete = window.confirm(`Delete ${personObj.name}?`);

    if (confirmDelete) {
      personService
        .remove(personObj.id)
        .then((response) => {
          setPersons(persons.filter((person) => person.id !== personObj.id));
        })
        .catch((error) => {
          messageUpdate(
            `Information for ${personObj.name} is already deleted`,
            "error"
          );
        });
    }
  };

  // Helpers
  const duplicatesCheck = () => {
    return persons.filter(
      (p) => p.name.toLowerCase() === newName.toLowerCase()
    );
  };

  const messageUpdate = (message, style) => {
    setMessage(message);
    setMessageStyle(style);

    setTimeout(() => {
      setMessage(null);
      setMessageStyle(null);
    }, 3000);
  };

  const personsToShow = filter
    ? persons.filter((person) => person.name.toLowerCase().includes(filter))
    : persons;

  return (
    <div>
      <h1>Phonebook</h1>
      <Message message={message} style={messageStyle} />
      <Filter filter={filter} onFilter={handleFilter} />
      <Form
        onAddPerson={handleAddOrUpdate}
        newName={newName}
        onNameInput={handleNameInput}
        newNumber={newNumber}
        onNumberInput={handleNumberInput}
      />
      <Numbers personsToShow={personsToShow} onDelete={handleDelete} />
    </div>
  );
};

export default App;
