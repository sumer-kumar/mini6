import React, { useEffect, useState } from 'react'
import QuestionBlock from './QuestionBlock';
import { useNavigate, useParams } from 'react-router-dom';
/**
 * this quiz object will be coming from api request
 */

import { deleteQuizById, getQuizById, putQuizResult } from '../../service/quiz-service'
import QuizResult from '../QuizResult/QuizResult';
import { getCurrentUserId, isAuthenticated } from '../../service/user-service';
import Navbar from '../Home/Navbar';

export default function Quiz() {
    const navigate = useNavigate();
    const [currentUserId, setCurrentUserId] = useState();

    useEffect(() => {
        const check = async () => {
            const isAuth = await isAuthenticated();
            if (!isAuth) {
                navigate('/Entry');
            }
            const res = await getCurrentUserId();
            console.log(res);
            setCurrentUserId(res.data.currentUserId);
        }
        check();
    }, []);


    const [quiz, setQuiz] = useState({
        instructions: '',
        title: '',
        total_time: 1000000,
        questions: [],
        marksObtained: 0,
    });
    const [seconds, setSeconds] = useState();

    const { id } = useParams();

    useEffect(() => {

        const fetchQuiz = async () => {
            let response = await getQuizById(id);
            console.log(response);
            setQuiz(response.data);
            setSeconds(response.data.total_time * 60);
        }
        fetchQuiz();
    }, []);

    const select_option = (questionIndex, optionIndex) => {
        const newQuestion = quiz.questions;
        newQuestion[questionIndex].selectedIndex = optionIndex;
        setQuiz({ ...quiz, ['questions']: newQuestion });
    }

    //uncomment to set the timer
    var timer;
    useEffect(() => {

        timer = setInterval(() => {
            if (seconds - 1 <= 0) {
                onSubmit();
            }
            else
                setSeconds(seconds - 1);
        }, 1000);

        return () => clearInterval(timer);
    });

    const [quizDone, setQuizDone] = useState(false);

    const onSubmit = async () => {
        setQuiz({ ...quiz, ['marksObtained']: calculateMarks() });
        quiz.marksObtained = calculateMarks();
        clearInterval(timer);
        alert('result submitted');
        console.log('marks : ', calculateMarks());
        setQuizDone(true);
        const putResult = async () => {
            const res = await putQuizResult(calculateMarks(), quiz._id);
            console.log(res);
        }
        putResult();
    }

    const calculateMarks = () => {
        let marks = 0;
        quiz.questions.forEach((value) => {
            marks += value.selectedIndex !== undefined && value.selectedIndex === value.correct_index ? value.marks : 0;
        });
        return marks;
    }

    const onCLickDelete = async (e) => {

        const res = await deleteQuizById(quiz._id);
        if (res.status === 200)
            navigate('/');
        else
            alert('cannot delete');
    }


    return (
        <>
            {
                currentUserId !== undefined && quiz !== undefined && currentUserId === quiz.author._id ?
                    <>
                        <button onClick={onCLickDelete} className='btn btn-danger m-1' > Delete</button>
                    </>
                    : <></>
            }
            <Navbar />
            {
                quizDone === true ? <QuizResult quiz={quiz} /> :

                    <div className='container'>
                        <h3>{`Remaining Time : ${seconds} sec`}</h3>
                        <h1>{quiz.title}</h1>
                        <h4>{quiz.instructions}</h4>
                        <h6>{`Total Time : ${quiz.total_time} mins`}</h6>
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
