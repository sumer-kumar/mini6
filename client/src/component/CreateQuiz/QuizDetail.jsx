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
                    <label htmlFor="totalTime" className="form-label">totalTime</label>
                    <input type="number" className="form-control"
                    id="totalTime"
                    placeholder='totalTime'
                    name="totalTime"
                    value={params.quiz.totalTime}
                    onChange={handleInputs}
                    />
                </div>
  
            </form>
        </div>
      </>
    )
}
