import { useState, useEffect } from 'react'
import { MainContainer } from './containers/MainContainer'
import { HeaderContainer } from './containers/HeaderContainer'
import { AboutMe } from './components/AboutMe'

const App = () => {

  // Declare Boolean state for aboutMe Pop up
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="App">
      <HeaderContainer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <MainContainer/>
      {isOpen && <AboutMe/>}
    </div>
  )
}

export default App
