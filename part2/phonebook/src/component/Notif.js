import './Notif.css'

const Notification = ({message}) => {
  if (message === null) {
    return null
  }

  const boxStyling = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    margin: '10px'
  }

  return (
    <div style={boxStyling}>
      {message}
    </div>
  )
}

export default Notification