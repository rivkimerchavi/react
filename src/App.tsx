import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home'
import { RouterProvider } from 'react-router-dom'
import { MyRouter } from './MyRouter'

function App() {


  return (
    <>
 
<RouterProvider router={MyRouter}/>
    </>
  )
}

export default App
