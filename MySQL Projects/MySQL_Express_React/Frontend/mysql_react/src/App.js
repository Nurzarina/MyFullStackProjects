import React from 'react'
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import StudentDisplay from './StudentDisplay'
import AddStudent from './AddStudent'
import UpdateStudent from './UpdateStudent'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<StudentDisplay />} />
          <Route path='/create' element={<AddStudent />} />
          <Route path='/update/:id' element={<UpdateStudent />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App

