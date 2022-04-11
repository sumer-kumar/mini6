import React, { useEffect, useState } from 'react'
import QuestionBlock from './QuestionBlock';

/**
 * this quiz object will be coming from api request
 */
const quizData =
{
    "title": "General Quiz",
    "instructions": "attempt quiz fast",
    "totalTime": 10,
    "questions": [
        {
            "question": "who is the prime minister of india?",
            "options": [
                {
                    "option": "1). narendra modi",
                },
                {
                    "option": "2). rahul gandhi",
                },
                {
                    "option": "3). pratibha patil ",
                },
                {
                    "option": "4). yogi adityanath",
                }
            ],
            "marks": 1,
            'correctIndex': 0
        },
        {
            "question": "capital of india?",
            "options": [
                {
                    "option": "1). new delhi",
                },
                {
                    "option": "2). bihar",
                },
                {
                    "option": "3). mumbai",
                },
                {
                    "option": "4). kolkata",
                }
            ],
            "marks": 1,
            'correctIndex': 0,
        }
    ]
}

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

    const onSubmit = ()=>{
        console.log(quiz);
        clearInterval(timer);
        alert('result submitted');
        /**
         * we will make a post request to the server to check and return the quiz with marks
         */
    }

    return (
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
                            <QuestionBlock question={value} index={index} setQuiz={setQuiz} select_option={select_option} />
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
