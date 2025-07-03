import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Web Crawler</h1>
      <Dashboard />
    </div>
  )
}

export default App
