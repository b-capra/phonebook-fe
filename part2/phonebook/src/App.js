import {useState, useEffect} from 'react'
import dataService from './services/phonebook'
import Form from './component/Form'
import Filter from './component/Filter'
import List from './component/List'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    dataService
      .getAll()
      .then(initialList => setPersons(initialList))
  }, [])

  const handleNameInput = (event) => setNewName(event.target.value)
  const handleNumInput = (event) => setNewNum(event.target.value)
  const searchCurrentNames = (event) => setSearchTerm(event.target.value)

  const confirmUpdate = () => {return window.confirm(`${newName} is already added to the phonebook. Would you like to update their number?`)}

  const checkForExisting = () => {
    let alreadyExists = false

    for (const person of persons) {
      if (person.name === newName) {alreadyExists = true}
      if (alreadyExists) {
        if (confirmUpdate()) {updateNumber(person.id)}
        break
      }
    }

    return alreadyExists
  }

  const updateNumber = id => {
    const person = persons.find(p => p.id === id)
    const updatedPerson = {...person, number: newNum}

    dataService
      .update(id, updatedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
      })
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (checkForExisting()) return

    const newPerson = {
      name: newName,
      number: newNum
    }

    dataService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNum('')
      })
  }

  const personsShown = persons.filter(person => 
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const removePerson = (id) => {
    dataService
      .remove(id)
      .then(setPersons(persons.filter(person => person.id !== id)))
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>New Additions:</h2>
      <Form onSubmit={addPerson} 
        name={newName} chngName={handleNameInput}
        num={newNum} chngNum={handleNumInput} />
      <h2>Current Numbers:</h2>
      <Filter term={searchTerm} search={searchCurrentNames} />
      <List persons={personsShown} remove={removePerson} />
    </div>
  )
}

export default App;
