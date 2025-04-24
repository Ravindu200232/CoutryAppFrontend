
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

import { Login } from './page/Login'
import { Signup } from './page/Signup'
import { HomePage } from './page/HomaPage'
import toast, { Toaster } from "react-hot-toast";



function App() {
  


  return (
   
   
    <BrowserRouter>
    <Toaster position="top-right" />
    <Routes path="/">

    <Route path='/*' element={<HomePage/>}/>
    
    <Route path='/login' element={<Login/>}/>
    <Route path='/signup' element={<Signup/>}/>
    </Routes>
    </BrowserRouter>

    
   
  )
}

export default App
