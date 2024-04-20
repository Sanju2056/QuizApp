import './index.css'
import { quiz } from '../../../Constants'
import { useState, useEffect, useMemo, useContext } from 'react'
import play from '/play.png'
import { Link } from 'react-router-dom'
import { userSession } from '../../App';
import { getAuth, signOut } from "firebase/auth";
import { collection, addDoc, getDocs, updateDoc, doc, query, where } from "firebase/firestore";
import { db } from '../../firebase'
import useTheme from '../../hooks/useTheme'
import { useNavigate } from 'react-router-dom'


const Quiz = () => {
    const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });
    const [interv, setInterv] = useState();
    const [status, setStatus] = useState(0);
    const { currentUser, setCurrentUser } = useContext(userSession)
    const [questionArray, setQuestionArray] = useState([])
    const navigate = useNavigate()

    // Get question from firebase
    const questionRef = async () => {
        const quizInfo = await getDocs(collection(db, "QuestionArray"))
        const quizArray = (quizInfo.docs.map(doc => doc.data()))
        setQuestionArray(quizArray)
    }
    useEffect(() => {
        console.log('hello')
        console.log(currentUser, "current User")
        questionRef()
        console.log(questionArray)
    }, [currentUser])
    // Not started = 0
    // started = 1
    // stopped = 2

    const start = useMemo(() => () => {
        run();
        setStatus(1);
        setInterv(setInterval(run, 10));
    }, []);

    var updatedMs = time.ms, updatedS = time.s, updatedM = time.m, updatedH = time.h;

    const run = () => {
        if (updatedM === 60) {
            updatedH++;
            updatedM = 0;
        }
        if (updatedS === 60) {
            updatedM++;
            updatedS = 0;
        }
        if (updatedMs === 100) {
            updatedS++;
            updatedMs = 0;
        }
        updatedMs++;
        return setTime({ ms: updatedMs, s: updatedS, m: updatedM, h: updatedH });
    };



    // UPDATE TIME AND SCORE OF USER IN DB
    // const querySnapshot = await getDocs(query(datas, where("Email", "==", currentUser)));
    // console.log(querySnapshot)
    // console.log(datas.docs, "datas doc")
    // const filteredDataFrmFb = datas.docs.forEach(async (document: any) => {
    //     //   document.data().filter((value)=> value.data().Email == currentUser)
    //     // const filteredDataFrmFb ={document.data().filter=(value)=>{console.log(value)}}
    //     console.log(document.data(), "document")
    //     console.log(`${document.id} =>`, document.data().Email);
    //     console.log(document.data().Email, currentUser)

    // yaha filter use garerw jun email rw current user same xa tesko value return grna ani tesma balla push grna 
    // if (document.data().Email == currentUser) {
    //     console.log('current user')
    //     let timeRecord = document.data().Time;
    //     console.log('timerecord',timeRecord)
    //     if (timeRecord?.length) {
    //         timeRecord.push({
    //             Score: score,
    //             TimeTaken: time
    //         })
    //     }
    //     else {
    //         timeRecord = []
    //         timeRecord.push({
    //             Score: score,
    //             TimeTaken: time
    //         })
    //     }
    //     try {
    //         const docRef = await updateDoc(doc(db, "PlayersScoreInfo", document.id), {
    //             Email: currentUser,
    //             Time: timeRecord
    //         });
    //         console.log("Successfully updated ");
    //     } catch (e) {
    //         console.error("Error adding document: ", e);
    //     }

    // }
    // else {
    //     console.log('not current user')
    //     addNewUser()
    // }

    // })
    const updateTimeOfUser = async (MatchingUser) => {
        console.log(MatchingUser)
        let timeRecord = MatchingUser[0].Time;
        console.log('time record', timeRecord)
        if (timeRecord?.length) {
            timeRecord.push({
                Score: score,
                TimeTaken: time
            })
            console.log("time record if part")
        }
        else {
            timeRecord = []
            timeRecord.push({
                Score: score,
                TimeTaken: time
            })
            console.log("time record else part")
        }
        try {
            await updateDoc(doc(db, "PlayersScoreInfo", MatchingUser[0].id), {
                Time: timeRecord
            });
            console.log("Successfully updated ");
        } catch (e) {
            console.error("Error adding document: ", e);
        }


    }
    const addNewUser = async () => {
        try {
            const docRef = await addDoc(collection(db, "PlayersScoreInfo"), {
                Email: currentUser,
                Time: [{
                    Score: score,
                    TimeTaken: time
                }]
            });
            console.log("Document written with ID: ", docRef.id);
            console.log("successful to fb ");

        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    const stop = async () => {
        console.log(currentUser);
        clearInterval(interv);
        setStatus(2);
        // ADD NEW USER IN DB
        console.log(time)
        const userCredentialCollection = collection(db, "PlayersScoreInfo")
        const querySnapshot = await getDocs(query(userCredentialCollection, where("Email", "==", currentUser)));
        console.log(querySnapshot)
        // window.alert(querySnapshot.empty.toString())
        if (querySnapshot.empty) {
            // window.alert("empty firebase")
            addNewUser()
            console.log("first call to fb");
        }
        else {
            const MatchingUser = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            console.log("Update function call part");
            updateTimeOfUser(MatchingUser);
        }
    };

    // FOR LOCAL STORAGE
    // const data = JSON.parse(localStorage.getItem("userInfo"))
    // //filteredData array ma auxa , tarw  condition true vaye paxi auta matra value return hunxa ani [O] gryo vane tyo array direct object ma convert hunxa ani sajilo hunxa 
    // const filteredData = data.filter((value) => value.email == currentUser)[0]
    // console.log(filteredData)
    // //time vanne naya key value set gareko 
    // if (filteredData?.time?.length) {
    //     filteredData.time.push({ "time": time, "score": score })
    // } else {
    //     filteredData.time = []
    //     filteredData.time.push({ "time": time, "score": score })
    // }
    //time vanne value lai local storage ma save gareko
    // localStorage.setItem("userInfo", JSON.stringify(data))
    // const datas = JSON.parse(localStorage.getItem("userInfo"))
    // console.log(datas.map((value) => { console.log(value) }))

    const reset = () => {
        clearInterval(interv);
        setStatus(0);
        setTime({ ms: 0, s: 0, m: 0, h: 0 })
    };


    const [currentIndex, setCurrentIndex] = useState(0)
    const [score, setScore] = useState(0)
    const [showScore, setShowScore] = useState(false)
    const [selectedOption, setSelectedOption] = useState('')
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [qstnCount, setQstnCount] = useState(1)

    // Load Next Question
    const updateNextQuestion = () => {
        if (currentIndex < questionArray.length - 1) {
            // Selected Option is correct or not
            // Option Selected or not 
            if (selectedOption === '') {
                alert('Select an Option')
            }

            else {
                if (selectedOption === questionArray[currentIndex].CorrectOption) {
                    setScore((prev) => {
                        return prev + 1
                    })
                    console.log(score)
                }
                setCurrentIndex((prev) => {
                    return prev + 1
                })
                setSelectedOption('')
                setQstnCount(qstnCount + 1)
            }

        }
        else {
            // Rendering Questions or Showing Score
            setShowScore(true)
            stop()
        }
    }

    // Load Previous Question
    const updatePrevQuestion = () => {
        setCurrentIndex((prev) => {

            // At initial state disable next button
            if (currentIndex <= 0) {
                return prev = 0;
                setQstnCount(0)
            }
            else {
                return prev - 1
                setQstnCount(qstnCount - 1)
            }
        })


    }

    // Selected Option
    const checkOptions = (item) => {
        setSelectedOption(item)
        console.log(item)
        // if(currentIndex == quiz.length){
        //     stop()
        // }
    }

    // Restart Quiz after completing all question
    const restartQuiz = () => {
        setCurrentIndex(0);
        setScore(0);
        setShowScore(false)
        setQstnCount(1)
        reset()
        navigate('/quiz')
    }

    // Function to shuffle options
    const shuffleOptions = (options) => {
        const shuffled = [...options];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    useEffect(() => {
        // Shuffle options when currentIndex changes
        if (currentIndex < questionArray.length) {
            const options = [...questionArray[currentIndex].Options];
            const shuffledUseEffect = shuffleOptions(options);
            setShuffledOptions(shuffledUseEffect);
        }
    }, [currentIndex, questionArray]);

    useEffect(() => {
        let interval = setInterval(run, 10)
        setInterv(interval)
        return () => {
            console.log('check stop')
            clearInterval(interval)
        }
    }, [])

    const LogOut = () => {
        setCurrentUser()
        localStorage.removeItem('currentUser')
        const auth = getAuth();
        signOut(auth).then(() => {
            navigate('/')
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
            console.log(error)
        });
    }

    const { theme, setCurrentTheme } = useTheme()


    return (
        <div className="quiz-main" style={{
            backgroundColor: theme.primary
        }} >
            <div className='lpss-sec'>
                <button
                    onClick={() => setCurrentTheme((prev) => (prev === 'light') ? 'dark' : 'light')}
                    className='toggless-btn'>Dark Mode</button>
            </div>

            {
                !showScore ? <div className="quiz-container">
                    <div style={{ width: "100%", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <div className='quiz-top'>
                            <div className='quiz-timer-div'>
                                <div className='quiz-timer-sub-div'>
                                    <p className='quiz-timer-time'>{(time.h >= 10) ? time.h : "0" + time.h}</p>
                                    <p className='quiz-timer-txt'>Hr</p>
                                </div>
                                <div className='quiz-timer-sub-div'>
                                    <p className='quiz-timer-time'>{(time.m >= 10) ? time.m : "0" + time.m}</p>
                                    <p className='quiz-timer-txt'>Min</p>
                                </div>
                                <div className='quiz-timer-sub-div'>
                                    <p className='quiz-timer-time'>{(time.s >= 10) ? time.s : "0" + time.s}</p>
                                    <p className='quiz-timer-txt'>Sec</p>
                                </div>
                            </div>
                            <p className='quiz-top-txt'>
                                {qstnCount}/{questionArray.length}
                            </p>
                        </div>
                        <div className="quiz-question">
                            <p className='question-text'>Q{qstnCount}. {questionArray[currentIndex]?.Question}</p>
                        </div>
                        <div className="quiz-options-div">
                            <div className="quiz-options-box">
                                {
                                    shuffledOptions?.map((item, index) => {
                                        return (
                                            <div className={`options ${selectedOption === item ? 'clicked' : ''}`} key={index} onClick={() => { checkOptions(item) }}>
                                                <p className='options-text'>{item}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className='quiz-buttons-container' >
                        {/* disabled={currentIndex === 0} */}
                        <button className='quiz-button' style={{
                            backgroundColor: theme.primary
                        }} onClick={() => { updatePrevQuestion() }} ><p className='quiz-button-text' >Prev</p></button>
                        {/* disabled={currentIndex === quiz.length-1} */}
                        <button className='quiz-button' style={{
                            backgroundColor: theme.primary
                        }} onClick={() => { updateNextQuestion() }} ><p className='quiz-button-text'>Next</p></button>
                    </div>


                </div> : (<div className='score-box'
                    style={{
                        backgroundColor: theme.primary
                    }}
                >

                    <p className='scb-title'>Congratulations! </p>
                    <p className='scb-txt1'>You have done a great job </p>
                    <p className='scb-txt1'>Your Timing is {time.h} hrs {time.m} min {time.s} sec</p>
                    <p className='scb-txt2'>Score</p>
                    <p className='scb-txt3'>{score}/{questionArray.length}</p>
                    <button className='quiz-button-restart' onClick={() => { restartQuiz() }}>
                        <img
                            src={play}
                            height={"50px"}
                            width={"50px"}
                        />
                        <p className='quiz-button-text-sb'>Play Again</p>
                    </button>
                    <div className='share-btn'>
                        <button className='logOut-btn' onClick={() => { LogOut() }}>
                            Log Out
                        </button>
                        <button className='logOut-btn' onClick={() => { navigate('/scoreSheet') }}>
                            ScoreBoard
                        </button>
                    </div>
                </div>)
            }
        </div >
    )
}

export default Quiz