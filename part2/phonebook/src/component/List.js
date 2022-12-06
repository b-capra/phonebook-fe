import Person from './Person'

const List = ({persons}) => {
  return (
    <ul>
      {persons.map(person => <Person key={person.name} person={person} />)}
    </ul>
  )
}

export default List