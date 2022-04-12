import React from 'react'
import QuestionBlock from './QuestionBlock'

export default function QuizResult({quiz}) {
    return (
        <div className='container'>
            <div>
                <h1>{quiz.title}</h1>
                <h4>{quiz.instructions}</h4>
                <h6>{`Total Time : ${quiz.totalTime} mins`}</h6>
                <h6>{`Marks Obtained : ${quiz.marksObtained}`}</h6>
                <hr />
            </div>
            {
                quiz.questions.map((value,index)=>{
                    return (
                        <>
                            <QuestionBlock key={index} index={index} question={value}/>
                        </>
                    );
                })
            }
        </div>
    )
}
