import React, { useEffect, useState } from "react";
import axios from "axios"


const Filter = ({searchValue, handleSearch}) => (
  <div>
    Filter shown with{" "}
    <input value={searchValue} onChange={handleSearch}></input>
  </div>
)

const PersonForm = ({newName, handleNewName, newNumber, handleNewNumber, addPerson}) => (
  <form>
    <div>
      name: <input value={newName} onChange={handleNewName} />
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNewNumber} />
    </div>
    <div>
      <button type="submit" onClick={addPerson}>
        Add
      </button>
    </div>
  </form>
)

const Persons = ({isFiltered, persons, searchValue}) => (
  <div>
    {isFiltered
      ? persons
          .filter((person) => person.name.includes(searchValue))
          .map((person) => (
            <div key={person.key}>
              {person.name} : {person.number}
            </div>
          ))
      : persons.map((person) => (
          <div key={person.key}>
            {person.name} : {person.number}
          </div>
        ))}
  </div>
)

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [isFiltered, showFiltered] = useState(false)

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons(response.data))
  }, []
  )

    const handleNewName = (event) => {
      setNewName(event.target.value)
    }

    const handleNewNumber = (event) => {
      setNewNumber(event.target.value)
    }
  
    const addPerson = (event) => {
      event.preventDefault() //prevent reload 
    
      //Creates an array of the names in the phonebook and the checks if the newName is in there
      if (persons.map((person) => person.name).includes(newName)) { alert(`${newName} is already added to phonebook`) }
      else {
        console.log("submit", newName)
        const personObject = {
          name: newName,
          number: newNumber,
          key: persons.length + 1,
        }
        setPersons(persons.concat(personObject))
        setNewName("")
        setNewNumber('')
      }
    }
  
    const handleSearch = (event) => {
    
      setSearchValue(event.target.value)
      console.log(searchValue)
      showFiltered(searchValue !== '' ? true : false)
    }
    

    return (
      <div>
        <h2>Phonebook</h2>

        <Filter searchValue={searchValue} handleSearch={handleSearch} />
      
        <h3>Add a new Number</h3>

        <PersonForm newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber} addPerson={addPerson} />
      
        <h3>Numbers</h3>

        <Persons isFiltered={isFiltered} persons={persons} searchValue={searchValue} />
      </div>
    )
  }

export default App;
