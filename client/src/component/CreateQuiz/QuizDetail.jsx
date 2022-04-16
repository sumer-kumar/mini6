import React from 'react'

export default function QuizDetail(params) {

  const handleInputs = (e)=>{
    params.setQuiz({...params.quiz,[e.target.name]:e.target.value})
  }

  return (
      <>
      <div>
        <h1>QUIZ DETAILS</h1>
      </div>
          <div className='container mt-5'>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label .form-inline">Title</label>
                    <input type="text" className="form-control .form-inline"
                    id="title"
                    placeholder='title'
                    name="title"
                    value={params.quiz.title}
                    onChange={handleInputs}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="instructions" className="form-label">Instructions</label>
                    <textarea className="form-control"
                    id="instructions"
                    placeholder='instructions'
                    name="instructions"
                    value={params.quiz.instructions}
                    onChange={handleInputs}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="total_time" className="form-label">total_time</label>
                    <input type="number" className="form-control"
                    id="total_time"
                    placeholder='total_time'
                    name="total_time"
                    value={params.quiz.total_time}
                    onChange={handleInputs}
                    />
                </div>
  
            </form>
        </div>
      </>
    )
}
