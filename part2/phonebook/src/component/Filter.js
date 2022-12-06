const Filter = ({term, search}) => {
  return (
    <div>Search: <input value={term} onChange={search} /></div>
  )
}

export default Filter
