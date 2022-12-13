import Person from './Person'

const List = ({persons, remove}) => {
  const handleRemoval = (id) => {
    const person = persons.filter(person => person.id === id)
    if (window.confirm(`Are you sure you want to remove ${person[0].name} from the phonebook?`)) {
      remove(id)
    }
  }

  return (
    <ul>
      {persons.map(person =>
        <Person 
          key={person.id}
          person={person}
          remove={() => handleRemoval(person.id)}
        />
      )}
    </ul>
  )
}

export default List