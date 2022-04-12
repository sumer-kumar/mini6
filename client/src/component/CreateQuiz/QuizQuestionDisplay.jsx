import React, { useEffect } from 'react'

export default function QuizQuestionDisplay(params) {

    useEffect(()=>{
        
    },[params.options]);

  return (
    <>
    <div className='container'>
        <h6>{params.question}</h6>
    {
        params.options.map((value,index)=>{
            return (
                <div key={value.option}>
                <div>
                    <p>{`${index+1}). ${value.option}${value.isCorrect?' (correct)':''}`}</p>
                </div>
                <button onClick={()=>{params.deleteOption(value)}}>Delete this option</button>
                <hr/>
                </div>
            )
        })
    }
    </div>


    </>
  )
}
