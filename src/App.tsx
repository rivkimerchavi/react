import { RouterProvider } from 'react-router-dom';
import { MyRouter } from './MyRouter';
import { useState } from 'react';

function App() {
 

  return (
    <RouterProvider router={MyRouter} />
  );
}

export default App;
