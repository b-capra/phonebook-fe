import {useState, useEffect} from 'react'
import axios from 'axios'
import Form from './component/Form'
import Filter from './component/Filter'
import List from './component/List'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  }, [])

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

    axios
      .post('http://localhost:3001/persons', newPerson)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNum('')
      })
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
