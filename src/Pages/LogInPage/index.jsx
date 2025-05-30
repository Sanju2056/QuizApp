import './index.css'
import { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { userSession } from '../../App';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { db } from '../../firebase';
import useTheme from '../../hooks/useTheme';

const LoginPage = () => {
  const { theme, setCurrentTheme } = useTheme()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const { currentUser, setCurrentUser } = useContext(userSession)
  console.log(currentUser)

  const navigate = useNavigate()

  const auth = getAuth();



  const handleSubmit = (e) => {
    navigate('/startPage')
    e.preventDefault()
  }
  //   {
  //   console.log('he')
  //   signInWithEmailAndPassword(auth, email, password)
  //     .then(async (userCredential) => {
  //       // Signed in 
  //       const user = userCredential.user;
  //       console.log(user)
  //       setCurrentUser(user.email)
  //       console.log(currentUser)
  //       const q = query(collection(db, "Users-Credentials"), where("Email", "==", user.email));
  //       const fireBaseData = await getDocs(q);
  //       // console.log(fireBaseData.docs)
  //       fireBaseData.docs.forEach(async (document) => {
  //         const TimeArray = document.data()
  //         console.log(TimeArray)
  //         // ...
  //         navigate('/startPage')
  //       })

  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       if (errorCode == 'auth/invalid-credential') {
  //         alert("Email doesn't exist ")
  //       }
  //       console.log(errorCode, errorMessage)

  //     });
  //   e.preventDefault()
  //   // console.log(email, password)
  //   // const data = JSON.parse(localStorage.getItem("userInfo"))
  //   // console.log(data)
  //   // const filteredData = data.filter((item) => item.email == email && item.password == password)
  //   // if (email == '' && password == '') {
  //   //   alert('Enter Email and Password')
  //   // }
  //   // else if (filteredData.length == 0) {
  //   //   alert('User Doesnt exist ')
  //   // }
  //   // else {
  //   //   localStorage.setItem('currentUser', email)
  //   //   setCurrentUser(email)
  //   //   navigate('/quiz')
  //   //   console.log(currentUser)
  //   // }
  // }



  useEffect(() => {
    console.log(currentUser)

  }, [currentUser])




  return (
    <div style={{
      backgroundColor: theme.primary
    }} className='lp-main'>
      {/* <div className='lp-sec'>
        <button
          onClick={() => setCurrentTheme((prev) => (prev === 'light') ? 'dark' : 'light')}
          className='toggle-btn'>Dark Mode</button>
      </div> */}
      <div className='lp-box'>
        <div className='lg-title-div'>
          <p className='lg-title'>Login</p>
          <p className='lg-title-txt'>Enter your credential to access your account</p>
        </div>
        <form className='lg-form-div-container' onSubmit={(e) => { handleSubmit(e) }}>
          <label className='lg-form-div'>
            <p className='lg-form-text'>Email</p>
            <input className='lg-form-input' placeholder='UserName'
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
          </label>
          <label className='lg-form-div'>
            <p className='lg-form-text'>Password</p>
            <input className='lg-form-input' placeholder='Password' type='password'
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
          </label>
          <button className='lg-button'>
            {/* <Link to={'/startPage'}> */}
            <p className='lg-button-text'>Log in</p>
            {/* </Link> */}
          </button>
        </form>
        {/* <button className='lg-button'>
          <p className='lg-button-text'>Log in with Google</p>
        </button> */}
        <p className='lg-new'>Register new account?
          <Link to={'/signUpPage'}>
            <span className='lg-span-new-id'>Sign up</span>
          </Link>

        </p>

      </div>

    </div>
  )
}

export default LoginPage