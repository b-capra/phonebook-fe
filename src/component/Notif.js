import './Notif.css'

const Notification = ({message, error}) => {
  if (message === null) {
    return null
  }

  const boxStyling = {
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    margin: '10px'
  }

  if (error) {
    boxStyling.color = 'red'
  } else {
    boxStyling.color = 'green'
  }

  return (
    <div style={boxStyling}>
      {message}
    </div>
  )
}

export default Notification