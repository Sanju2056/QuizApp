
import './App.css'
import SignUpPage from './Pages/SignUpPage'
import LoginPage from './Pages/LogInPage'
import Quiz from './Pages/Quiz'
import StartPage from './Pages/StartPage'
import ScoreSheet from './Pages/ScoreSheet'
import { Route, Routes } from 'react-router-dom'
import { createContext,useState } from 'react'

const userSession = createContext();
function App() {
  const [currentUser,setCurrentUser]= useState()
  
  return (
    <div className='App'>
      <userSession.Provider value={{currentUser,setCurrentUser}}>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/signUpPage' element={<SignUpPage />} />
          <Route path='/quiz' element={<Quiz />} />
          <Route path='/startPage' element={<StartPage />} />
          <Route path='/scoreSheet' element={<ScoreSheet />} />
        </Routes>
      </userSession.Provider>
    </div>
  )
}

// export default App
export {userSession,App}
