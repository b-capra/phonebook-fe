import './App.css';
import Person from './component/Person'
import {useState} from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {name: 'Arto Hellas', number: '738-1375-4953'},
    {name: 'Ada Lovelace', number: '248-137-8543'},
    {name: 'Dan Abramov', number: '497-942-4955'}
  ])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const handleNameInput = (event) => setNewName(event.target.value)
  const handleNumInput = (event) => setNewNum(event.target.value)
  const searchCurrentNames = (event) => setSearchTerm(event.target.value)

  const checkForDuplicate = () => {
    let isDuplicate = false
    persons.forEach((person) => {
      if (person.name === newName) {
        isDuplicate = true
      }
    })
    if (isDuplicate) {
      alert(`${newName} is already added to the phonebook`)
    }
    return isDuplicate
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (checkForDuplicate()) return
      
    const newPerson = {
      name: newName,
      number: newNum
    }

    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNum('')
  }

  const personsShown = persons.filter(person => 
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>New Additions:</h2>
      <form onSubmit={addPerson}>
        <div>Name: <input value={newName} onChange={handleNameInput} /></div>
        <div>Number: <input value={newNum} onChange={handleNumInput} /></div>
        <div><button type='submit'>Add</button></div>
      </form>
      <h2>Current Numbers:</h2>
      <div>Search: <input value={searchTerm} onChange={searchCurrentNames} /> </div>
      <ul>
        {personsShown.map(person => <Person key={person.name} person={person} />)}
      </ul>
    </div>
  )
}

export default App;
