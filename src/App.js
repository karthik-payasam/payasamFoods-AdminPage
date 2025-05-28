import React from 'react'
import Router from './Router'
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <div>
      <Router />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

export default App