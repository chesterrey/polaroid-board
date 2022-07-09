import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import PolaroidList from './PolaroidList'
import PolaroidDetail from './PolaroidDetail'
const Board = () => {
  return (
    <section className='board'>
        <Router>
          <Routes>
            <Route path='' exact element={<PolaroidList/>}/>
            <Route path='polaroid/:id' element={<PolaroidDetail/>}/>
          </Routes>
        </Router>
    </section>
  )
}

export default Board

//remove <PolardForm/> [x]

