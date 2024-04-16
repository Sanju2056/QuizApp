import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../firebase'
import './index.css'
import home from '/home.png'

const ScoreSheet = () => {
    const [timeRecords, setTimeRecords] = useState([])
    const fetchFrmFb = async () =>{
        const fireBaseData = await getDocs(collection(db, "User-Credential"))
        fireBaseData.docs.forEach(async (document) => {
          console.log(document.data())
          const TimeArray =  document.data().Time
          TimeArray.forEach((TimeArrayDetail)=>{
              console.log(TimeArrayDetail.Score,TimeArrayDetail.TimeTaken)
          })
          console.log(TimeArray)        
      })
    }
    useEffect( () => {
        fetchFrmFb()
    }, [])
    
        // function BestResult(arr) {
        //     let highScore = 0;
        //     let bestTime = []
        //     for (let i = 0; i < arr.length; i++) {
        //         if (arr[i].score > highScore) {
        //             highScore = arr[i].score
        //             bestTime = arr[i].time
        //             console.log(arr[i].time.s)
        //         }
        //     }
        //     let newHighScore = highScore
        //     let newHighTime = {
        //         "h": 60,
        //         "m": 60,
        //         "s": 60,
        //         "ms": 1000
        //     }
        //     for (let j = 0; j < arr.length; j++) {
        //         if (arr[j].score == newHighScore) {
        //             // console.log('1st')
        //             if ((arr[j].time.h <= newHighTime.h) && (arr[j].time.m <= newHighTime.m) && (arr[j].time.s <= newHighTime.s) && (arr[j].time.ms <= newHighTime.ms)) {

        //                 // console.log('2nd')
        //                 newHighTime.h = arr[j].time.h,
        //                     newHighTime.m = arr[j].time.m,
        //                     newHighTime.s = arr[j].time.s,
        //                     newHighTime.ms = arr[j].time.ms
        //                 // console.log(newHighTime.s, 'jdf')
        //                 // console.log(newHighTime.ms, 'jdf')
        //             }
        //             // console.log('3rd')
        //         }
        //         // console.log('last')
        //     }

        //     console.log(newHighScore)
        //     const bestRecord = {}
        //     bestRecord.time = newHighTime,
        //         bestRecord.score = highScore
        //     console.log(bestRecord)
        // }

        useEffect(() => {
        const data = JSON.parse(localStorage.getItem("userInfo"))
        console.log(data)
        function getMs(time) {
            return (time.h * 3600 * 1000) + (time.m * 60 * 1000) + (time.s * 1000) + time.ms
        }

        function BestResult(arr) {
            let highestScore;
            arr.forEach((item) => {
                console.log("new times",item);
                
                if (highestScore) {
                    highestScore = item.score > highestScore ? item.score : highestScore
                } else {
                    highestScore = item.score
                }
            })

            let highestScoreRecords = arr.filter((item) => item.score == highestScore)
            let timeReocords = highestScoreRecords.map((item) => getMs(item.time))
            return highestScoreRecords.filter((item) => getMs(item.time) === Math.min(...timeReocords))[0]
        }

        function BestDisplayRec(newRec){
            console.log(newRec)
            const sortedUserData = newRec.sort((a, b) => {
                if (a.time.score !== b.time.score) {
                  return b.time.score - a.time.score; // Sort by score in descending order
                } else {
                  // If scores are equal, sort by time in ascending order
                  return a.time.ms - b.time.ms || a.time.s - b.time.s || a.time.m - b.time.m || a.time.h - b.time.h;
                }
              });
              
              return sortedUserData
        }
        
        const userDetails = data.map((item) => {
            console.log("time",item.time);
            
            return {...item,time:BestResult(item.time) }
        })
        console.log(userDetails)
        // const ScoreBestDetails = userDetails.map((item) => {
        //     console.log(item)
        //     return BestDisplayRec(item)
        // })
        const Scorehe =  BestDisplayRec(userDetails)
        setTimeRecords(Scorehe)
        console.log(timeRecords)
      console.log(Scorehe)
    }, [])



    // function ConvertTime(time) {
    //     return (time.h * 60 * 60 * 1000 + time.m * 60 * 1000 + time.s * 1000 + time.ms)
    // }
    // console.log(time)
    // const scoreSort = item.time.map((t) => {
    //     // console.log(t.score)
    //     return t.score
    // })
    // const maxScore = Math.max(...scoreSort)
    // console.log(scoreSort)
    // console.log(maxScore)
    // TimeArray.push({
    //     fullName: item.firstName + "" + item.lastName,
    //     time: item.time.filter((t) => ConvertTime(t.time) === Math.min(...time))[0],
    //     // score : item.time.map((t) =>t.score === maxScore )
    // })
    // function CompareScore() {
    //     let topScore = TimeArray[0].time.score
    //     // console.log(topScore)
    //     for (let i = 0; i < TimeArray.length; i++) {
    //         if (TimeArray[i].time.score > topScore) {
    //             topScore = TimeArray[i].time.score
    //         }
    //     }
    //     return topScore

    // }
    // console.log(CompareScore())

    // console.log(TimeArray)


    return (
        <div className='sb-main'>
            <div className='sb-container'>
                <p className='title-txt-sb'>Scoreboard</p>
                <p className='title-txt-sb1'>List of top 10 players</p>
                <div className='score-headings'>
                    <div className='score-div'>
                        <p className='score-txt'>Rank</p>
                    </div>
                    <div className='score-div'>
                        <p className='score-txt'>Player Name</p>
                    </div>
                    <div className='score-div'>
                        <p className='score-txt'>Time</p>
                    </div>
                    <div className='score-div'>
                        <p className='score-txt'>Score</p>
                    </div>
                </div>
                <div className='info-div'>
                    {
                        timeRecords.map((item,ind) => {
                            return (
                                <div className='score-headings1'>
                                    <div className='score-div1'>
                                        <p className='score-txt1'>{ind}</p>
                                    </div>
                                    <div className='score-div1'>
                                        <p className='score-txt1'>{item.email}</p>
                                    </div>
                                    <div className='score-div1'>
                                        <p className='score-txt1'>{item.time.time.h}hr</p>
                                        <p className='score-txt1'>{item.time.time.m}m</p>
                                        <p className='score-txt1'>{item.time.time.s}s</p>
                                        <p className='score-txt1'>{item.time.time.ms}ms</p>
                                    </div>
                                    <div className='score-div1'>
                                        <p className='score-txt1'>{item.time.score}</p>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
                <Link to={'/startPage'} >
                    <button className='sb-btn'>
                        <img
                            src={home}
                            height={"35px"}
                            width={"35px"}
                        />
                        <p className='sb-btn-txt'>Home</p>
                    </button>
                </Link>
            </div>

        </div>
    )
}

export default ScoreSheet