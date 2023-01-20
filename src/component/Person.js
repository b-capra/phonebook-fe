const Person = ({person, remove}) => {
  return (
    <li>
      {person.name}: {person.number}
      <button
        style={{display: "none"}} // Temporarily disables delete function
        onClick={remove}
      >
        Remove
      </button>
    </li>
  )
}

export default Person