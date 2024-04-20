import './index.css'
import { useState, } from 'react'
import { Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from '../../firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import useTheme from '../../hooks/useTheme';
const SignUpPage = () => {
    const { theme, setCurrentTheme } = useTheme()
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [termCheck, setTermCheck] = useState(false)

    const navigate = useNavigate()
    const changeRadio = () => {
        setTermCheck(!termCheck)
    }

    const formValidation = async (e) => {

        e.preventDefault();

        const emailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        const nameRegExp = /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/
        const lNameRegExp = /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/


        // if (emailRegExp.test(email) && email.length) {
        //     console.log('valid email')
        // } else {
        //     console.log('invalid email')
        //     return
        // }

        if (email && emailRegExp.test(email) && email.length) {
            console.log('valid email')
        } else {
            console.log('invalid email')
            return
        }

        if (password && passwordRegExp.test(password) && password.length) {
            console.log('valid password')
        } else {
            console.log('invalid password')
            return
        }

        if (confirmPassword == password) {
            console.log('password equal')
        } else {
            console.log('password not matched')
            return
        }

        if (firstName && nameRegExp.test(firstName) && firstName?.length) {
            console.log('valid name')
        } else {
            console.log('invalid name')
            return
        }

        if (lastName && lNameRegExp.test(lastName) && lastName?.length) {
            console.log('valid name')
        } else {
            console.log('invalid name')
            return
        }

        // try {
        //     const collectionRef = collection(db, 'Users-Credentials');
        //     const querySnapshot = await getDocs(collectionRef);
        //     querySnapshot.forEach((doc) => {
        //         if((doc.data().Email) == email){
        //             alert(" This email already exist" )
        //         }
        //     });
        // } catch (error) {
        //     console.error("Error getting documents: ", error);
        // }

        // const userInfoGet = JSON.parse(localStorage.getItem("userInfo")) ?? []
        // const checkData = userInfoGet.filter((item) => item.email == email)
        // if (checkData.length) {
        //     alert('email already exist')
        //     return
        // }

        // console.log(userInfoGet)
        // localStorage.setItem("userInfo", JSON.stringify([...userInfoGet, {
        //     firstName: firstName || '',
        //     email: email || '',
        //     password: password || '',
        //     confirmPassword: confirmPassword || '',
        //     lastName: lastName || '',
        // }
        // ]))


        const auth = getAuth();



        // const newUser = {
        //     name: 'John Doe',
        //     email: 'john.doe@example.com',
        //     // Add other user data as needed
        // };

        // const usersCollection = collection(db, 'Users-Credentials');
        // const newDocRef = await addDoc(usersCollection, newUser);

        // console.log('New user added with ID:', newDocRef.id);
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                // Signed up 
                const user = userCredential.user;
                // ...
                try {
                    const docRef = await addDoc(collection(db, "Users-Credentials"), {
                        FirstName: firstName,
                        LastName: lastName,
                        Email: email,
                        Password: password,
                        type: "user"
                    });
                    console.log("Document written with ID: ", docRef);
                } catch (e) {
                    console.error("Error adding document: ", e);
                }

                console.log("User signed up:", userCredential.user.email);
                console.log('user provider data', user.providerData)
                navigate('/')
            }
            )
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });

    };

    const disabled = !firstName || !email || !lastName || !confirmPassword || !password || !termCheck



    return (
        <div className='sup-main' style={{
            backgroundColor: theme.primary
          }}>
            <div className='lps-sec'>
                <button
                    onClick={() => setCurrentTheme((prev) => (prev === 'light') ? 'dark' : 'light')}
                    className='toggles-btn'>Dark Mode</button>
            </div>
            <div className='sp-box'>
                <div className='sp-heading-div'>
                    <p className='sp-heading'>Register</p>
                    <p className='sp-heading-txt'>Lets get started with your new account</p>
                </div>
                <form className='sp-box-container' onSubmit={(e) => { formValidation(e) }}>
                    <label className='sp-label'>
                        <p className='sp-txt'>First Name</p>
                        <input className='sp-text-input' placeholder='First Name'
                            onChange={(e) => { setFirstName(e.target.value) }}
                        />
                    </label>
                    <label className='sp-label'>
                        <p className='sp-txt'>Last Name</p>
                        <input className='sp-text-input' placeholder='Last Name'
                            onChange={(e) => { setLastName(e.target.value) }}
                        />
                    </label>
                    <label className='sp-label'>
                        <p className='sp-txt'>Email</p>
                        <input className='sp-text-input' placeholder='Email'
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                    </label>
                    <label className='sp-label'>
                        <p className='sp-txt'>Password</p>
                        <input className='sp-text-input' placeholder='Password'
                            onChange={(e) => { setPassword(e.target.value) }}
                        />
                    </label>
                    <label className='sp-label'>
                        <p className='sp-txt'>Confirm Password</p>
                        <input className='sp-text-input' placeholder='Confirm Password'
                            onChange={(e) => { setConfirmPassword(e.target.value) }}
                        />
                    </label>
                    <label className='term-div'>
                        <div className='term-radio' >
                            <div className={`term-radio-check  ${termCheck == true ? 'term-radio-checked' : ''} `} onClick={() => { changeRadio() }}></div>
                        </div>
                        <p className='term'>Accept Terms & Conditions</p>
                    </label>
                    <button className={`${disabled ? 'sp-button-disabled' : 'sp-button'}`} disabled={disabled} >
                        <p className='sp-button-text'>
                            Sign Up
                        </p>
                    </button>
                </form>
                <p className='last-txt'>
                    Already have an account?
                    <Link to={'/'}>
                        <span className='span-last-txt'> Sign in</span>
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default SignUpPage