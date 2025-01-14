import React from "react"
import { BrowserRouter, createBrowserRouter, Route, Routes } from "react-router"
import AppLayout from "./components/AppLayout"
import Home from "./components/Home"
import LogIn from "./components/LogIn"
import Avatar from "./components/Avatar"
import UpDate from "./components/UpDate"


export const MyRouter = createBrowserRouter([
 {
    path:'/',
    element:<AppLayout/>,
    errorElement:<>error element</>,
    children: [
      
      { path: 'Avatar', element: <Avatar /> },
      
      { path: 'UpDate', element: <UpDate/> },
      {
         path: '/', element: <Home/>,
     }

   ]
}
])