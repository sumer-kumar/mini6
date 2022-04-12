import React from 'react'

export default function QuizQuestionBlock(params) {

  const myStyle = {
    border:'2px solid black'
  };

  return (
    <div style={myStyle} className='container mt-2 mb-2'>
      <h5>{params.question.question}</h5>
      <h6>{`(Marks : ${params.question.marks})`}</h6>
      <button onClick={()=>{params.deleteQuestion(params.question)}}>Delete</button>
      {
        params.question.options.map((option,index)=>{
          return <p key={index}>{`${index+1}). ${option.option}${option.isCorrect?' (correct)':''}`}</p>
        })
      }
    </div>
  )
}
