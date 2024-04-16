import { useState } from 'react'
import './index.css'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../firebase'
const AdminPage = () => {
  const [question, setQuestion] = useState()
  const [option1, setOption1] = useState()
  const [option2, setOption2] = useState()
  const [option3, setOption3] = useState()
  const [option4, setOption4] = useState()
  const [correctOption, setCorrectOption] = useState()
  const QuizDetails = [{
    Question: question,
    Options: [option1, option2, option3, option4],
    CorrectOption: correctOption
  }]
  const SubmitForm = async (e) => {
    e.preventDefault();
    [...QuizDetails, {
      Question: question,
      Options: [option1, option2, option3, option4],
      CorrectOption: correctOption
    }]
    // if(JSON.stringify(QuizDetails))
    const options = QuizDetails[0].Options
    const CorrectOption = QuizDetails[0].CorrectOption
    console.log(options)
    console.log(CorrectOption)
    if (options.indexOf(CorrectOption) !== -1) {
      console.log("Options matched")
      try{
        const docRef = await addDoc(collection(db, "QuestionArray"), {
          Question: question,
          Options: [option1, option2, option3, option4],
          CorrectOption: correctOption
        });
        console.log("Document written with ID:",docRef);
        alert("Question added successfully!")
      }
      catch(e){
        console.log("Error adding document",e)
      }
    }
    else {
     alert("No correct Option is provided")
    }
    
  }
  return (
    <div className="admin-page">
      <form className="admin-form" onSubmit={(e) => { SubmitForm(e) }}>
        <label className="admin-question-title">Question?</label>
        <input className="admin-question-field" onChange={(e) => { setQuestion(e.target.value) }}></input>
        <div className='options-container'>
          <label className='options-label'>Option1:</label>
          <input className='options-input' onChange={(e) => { setOption1(e.target.value) }} />
          <label className='options-label'>Option2:</label>
          <input className='options-input' onChange={(e) => { setOption2(e.target.value) }} />
          <label className='options-label'>Option3:</label>
          <input className='options-input' onChange={(e) => { setOption3(e.target.value) }} />
          <label className='options-label'>Option4:</label>
          <input className='options-input' onChange={(e) => { setOption4(e.target.value) }} />
          <label className='options-label'>Correct Option:</label>
          <input className='options-input' onChange={(e) => { setCorrectOption(e.target.value) }} />
        </div>
        <button className='admin-submit-btn'>Submit</button>
      </form>
    </div>
  )
}

export default AdminPage