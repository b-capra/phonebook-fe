import './App.css';
import Form from './component/Form'
import Filter from './component/Filter'
import List from './component/List'
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
      <Form onSubmit={addPerson} 
        name={newName} chngName={handleNameInput}
        num={newNum} chngNum={handleNumInput} />
      <h2>Current Numbers:</h2>
      <Filter term={searchTerm} search={searchCurrentNames} />
      <List persons={personsShown} />
    </div>
  )
}

export default App;
