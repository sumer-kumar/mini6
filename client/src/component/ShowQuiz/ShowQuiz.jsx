import React, { useEffect, useState } from 'react'
import QuestionBlock from './QuestionBlock';

/**
 * this quiz object will be coming from api request
 */
import { quizData } from '../../constants';
import QuizResult from '../QuizResult/QuizResult';

export default function Quiz() {

    const [quiz, setQuiz] = useState({
        instructions: '',
        title: '',
        totalTime: 1000000,
        questions: []
    });
    const [seconds, setSeconds] = useState(quiz.totalTime * 60);

    useEffect(() => {
        setQuiz(quizData);
        setSeconds(quizData.totalTime*60);
    }, []);

    const select_option = (questionIndex, optionIndex) => {
        const newQuestion = quiz.questions;
        newQuestion[questionIndex].selectedIndex = optionIndex;
        setQuiz({ ...quiz, ['questions']: newQuestion });
    }

    //uncomment to set the timer
    var timer;
    useEffect(()=>{

        timer = setInterval(()=>{
            if(seconds-1<=0){
                onSubmit();
            }
            else
                setSeconds(seconds-1);
        },1000);
        
        return ()=>clearInterval(timer);
    });

    const [quizDone,setQuizDone] = useState(false);

    const onSubmit = ()=>{
        setQuiz({...quiz,['marksObtained']:calculateMarks()});
        clearInterval(timer);
        alert('result submitted');
        console.log(quiz.marksObtained);
        setQuizDone(true);
        /**
         * we will make a post request to the server to check and return the quiz with marks
         */
    }

    const calculateMarks = ()=>{
        let marks = 0;
        quiz.questions.forEach((value)=>{
            marks += value.selectedIndex!==undefined && value.selectedIndex===value.correctIndex?value.marks:0;
        });
        return marks;
    }

    return (
        <>
        {
            quizDone===true?<QuizResult quiz={quiz}/>:

        <div className='container'>
            <h3>{`Remaining Time : ${seconds} sec`}</h3>
            <h1>{quiz.title}</h1>
            <h4>{quiz.instructions}</h4>
            <h6>{`Total Time : ${quiz.totalTime} mins`}</h6>
            <hr />

            {
                quiz.questions.map((value, index) => {
                    return (
                        <div key={index}>
                            <QuestionBlock key={index} question={value} index={index} setQuiz={setQuiz} select_option={select_option} />
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
        }

        </>
    )
}
