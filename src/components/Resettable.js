import React from 'react'

const Resettable = ({ type, value, onChange, reset }) => {
  return (
    <div>
      <input type={type} value={value} onChange={onChange} />
      <button onClick={reset}>Tyhjennä</button>
    </div>
  )
}

export default Resettable