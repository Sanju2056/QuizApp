
import './App.css'
import HomePage from './Pages/HomePage'
import SignUpPage from './Pages/SignUpPage'
import LoginPage from './Pages/LogInPage'
import Quiz from './Pages/Quiz'
import Header from './Pages/Header'
import Footer from './Pages/Footer'
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
          <Route path='/header' element={<Header />} />
          <Route path='/signUpPage' element={<SignUpPage />} />
          <Route path='/quiz' element={<Quiz />} />
          <Route path='/homePage' element={<HomePage />} />
          <Route path='/footer' element={<Footer />} />
          <Route path='/startPage' element={<StartPage />} />
          <Route path='/scoreSheet' element={<ScoreSheet />} />
        </Routes>
      </userSession.Provider>
    </div>
  )
}

// export default App
export {userSession,App}
