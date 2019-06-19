import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Ploki = ({ title, author, url, likes, lisaaja, id, onClick, poista, katsoja }) => {
  const [visible] = useState(lisaaja === katsoja ? '' : 'none')
  const plokyTyyli = {
    marginBottom: 5
  }

  const deleteStyle = {
    display: visible
  }

  const [showExtra, setShowExtra] = useState(false)
  const naytaExtra = { display: showExtra ? '' : 'none' }

  return (
    <div className='ploki' style={plokyTyyli} >
      <div className='basicInfo' onClick={() => setShowExtra(!showExtra)}>{title} {author}</div>
      <div className='extraInfo' style={naytaExtra}>
        <div>{url}</div>
        <div>Tykkäävät: {likes}</div>
        <div>Tallentanut: {lisaaja}</div>
        <button id={id} onClick={onClick}>Tykkään!</button>
        <button style={deleteStyle} id={'delete-' + id} onClick={poista}>Poista!</button>
      </div>
    </div>
  )
}

Ploki.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  lisaaja: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  poista: PropTypes.func.isRequired,
  katsoja: PropTypes.string.isRequired
}

export default Ploki