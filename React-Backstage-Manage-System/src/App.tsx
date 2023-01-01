import React from 'react'
import { useRoutes } from 'react-router-dom'
import routes from '@/router'

const App: React.FC = () => {
  const outlet = useRoutes(routes)
  return (
    <div className="App">
      {outlet}
    </div>
  )
}

export default App
