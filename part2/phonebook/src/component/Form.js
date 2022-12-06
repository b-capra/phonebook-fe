const Form = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>Name: <input value={props.name} onChange={props.chngName}/></div>
      <div>Number: <input value={props.num} onChange={props.chngNum} /></div>
      <div><button tybe='submit'>Add</button></div>
    </form>
  )
}

export default Form