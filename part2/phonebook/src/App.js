import './App.css';
import Person from './component/Person'
import {useState} from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '123-456-7890'
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')

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

  const handleNameInput = (event) => {
    setNewName(event.target.value)
  }

  const handleNumInput = (event) => {
    setNewNum(event.target.value)
  }

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

  return (
    <div>
      <h1>Phonebook</h1>
      <form onSubmit={addPerson}>
        <div>Name: <input value={newName} onChange={handleNameInput} /></div>
        <div>Number: <input value={newNum} onChange={handleNumInput} /></div>
        <div><button type='submit'>Add</button></div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => <Person key={person.name} person={person} />)}
      </ul>
    </div>
  )
}

export default App;
