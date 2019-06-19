import React from 'react'

const IlmoitusVirhe = ({ tieto }) => {
  const ilmoitusStyle = {
    backgroundColor:'red',
    color: 'white',
    fontStyle: 'bold',
    fontSize: 15,
    borderRadius: 5,
    padding: 15,
    marginBottom: 10
  }

  if (tieto === '') {
    return null
  }

  return (
    <div style={ilmoitusStyle}>
      {tieto}
    </div>
  )
}

export default IlmoitusVirhe