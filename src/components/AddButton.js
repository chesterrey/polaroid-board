import React from 'react'
import {useNavigate} from 'react-router-dom'

const AddButton = () => {

  const navigate = useNavigate();

  const handleClick = () =>{
    navigate('new')
  }

  return (
    <img alt='add-btn' className='add-btn' src='static/images/add-btn.png' onClick={handleClick}/>
  )
}

export default AddButton