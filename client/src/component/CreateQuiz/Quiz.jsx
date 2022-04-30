import React, { useEffect, useState } from 'react'
import { createQuiz } from '../../service/quiz-service';
import QuizAddQuestion from './QuizAddQuestion'
import QuizDetail from './QuizDetail'
import QuizQuestionBlock from './QuizQuestionBlock'
import { useNavigate } from 'react-router-dom'
import { isAuthenticated } from '../../service/user-service';
import Navbar from '../Home/Navbar';

export default function Quiz() {

  const [quiz, setQuiz] = useState({
    title: "",
    instructions: "",
    total_time: 10,
  });

  

  const navigate = useNavigate();
  useEffect(() => {
    const check = async () => {
      const isAuth = await isAuthenticated();
      if (!isAuth) {
        navigate('/Entry');
      }
    }
    check();
  },[]);
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

  const onSubmit = async (e) => {
    const finalQuiz = quiz;
    finalQuiz.questions = questions;
    console.log(finalQuiz);

    let response = await createQuiz(finalQuiz);
    console.log(response);

    if (response.status === 200) {
      alert('success');
      navigate("/");
    } else {
      alert('something went wrong');
    }

    /**
     * Here we will make a post api request using axios to post the quiz 
     * and will take the authorization token from the local storage 
     * and return to the home screen of the user
     */
  }


  return (
    <>
      <Navbar />
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
    </>
  )
}
