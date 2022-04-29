import React, { useEffect } from 'react'
import QuestionBlock from './QuestionBlock'
import Review from '../Review/Review'
import { putQuizResult } from '../../service/quiz-service';

export default function QuizResult({ quiz }) {

    return (
        <div className='container'>
            <div>
                <h1>{quiz.title}</h1>
                <h4>{quiz.instructions}</h4>
                <h6>{`Total Time : ${quiz.total_time} mins`}</h6>
                <h6>{`Marks Obtained : ${quiz.marksObtained}`}</h6>
                <hr />
            </div>
            {
                quiz.questions.map((value, index) => {
                    return (
                        <>
                            <QuestionBlock key={index} index={index} question={value} />
                        </>
                    );
                })
            }
            <Review reviewId={quiz.reviews} />
        </div>
    )
}
