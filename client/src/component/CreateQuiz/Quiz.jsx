import React, { useState } from 'react'
import QuizAddQuestion from './QuizAddQuestion'
import QuizDetail from './QuizDetail'
import QuizQuestionBlock from './QuizQuestionBlock'

export default function Quiz() {

  const [quiz, setQuiz] = useState({
    title: "",
    instructions: "",
    totalTime: 10,
  });

  const [questions, setQuestions] = useState([]);

  const addToQuestions = (question) => {
    console.log(question);
    setQuestions([...questions, question]);
  }

  const deleteQuestion = (_question) => {
    console.log(_question);
    const newQuestions = questions.filter((value, _index) => {
      return value !== _question;
    })
    setQuestions(newQuestions);
  }

  const onSubmit = (e)=>{
    const finalQuiz = quiz;
    finalQuiz.questions = questions;
    console.log(finalQuiz);
    /**
     * Here we will make a post api request using axios to post the quiz 
     * and will take the authorization token from the local storage 
     * and return to the home screen of the user
     */
    
  }

  return (
    <div className='border'>
      <QuizDetail quiz={quiz} setQuiz={setQuiz} />
      <hr />
      <QuizAddQuestion quiz={quiz} setQuiz={setQuiz} addToQuestions={addToQuestions} />
      <hr />
      {
        questions.map((value, index) => {
          return (
            <div key={index}>
              <QuizQuestionBlock question={value} deleteQuestion={deleteQuestion} />
            </div>
          )
        })
      }  
      <div className="border border-light p-3 mb-4">

        <div className="text-center">
          <button type="button" onClick={onSubmit} className="btn btn-outline-primary">Submit Quiz</button>
        </div>

      </div>
    </div>
  )
}
