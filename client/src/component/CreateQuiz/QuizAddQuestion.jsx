import React, { useEffect, useState } from 'react'
import QuizQuestionDisplay from './QuizQuestionDisplay';

export default function QuizAddQuestion(params) {

  const [question, setQuestion] = useState("");
  const [option, setOption] = useState({
    option: '',
    isCorrect: 'false',
  })
  const [options, setOptions] = useState([]);

  const [marks, setMarks] = useState(1);

  const [correct_index,setcorrect_index] = useState(0);
  
  const handlecorrect_index = (e)=>{
      setcorrect_index(e.target.value-1)      
  }

  const handleQuestion = (e) => {
    setQuestion(e.target.value);
  }

  const handleOption = (e) => {
    setOption({ option: e.target.value, isCorrect: false });
  }

  const addQuestion = ()=>{
    options[correct_index].isCorrect=true;
    const finalQuestion = {
      question:question,
      options:options,
      marks:marks,
      correct_index:correct_index,
    }
    params.addToQuestions(finalQuestion);
  }

  const AddToQuiz = ()=>{
    if(correct_index<0 || correct_index>=options.length)
    {
      alert('choose a valid correct option !!');
    }
    else{
      addQuestion();
      setQuestion('');
      setOption({
        option: '',
        isCorrect: 'false',
      })
      setOptions([])
      setMarks(1);
      setcorrect_index(0);
    }
  }

  const addOption = () => {
    option.option = `${option.option}`;
    options.push(option);
    setOption({ option: "", isCorrect: false });
  }

  const deleteOption = (_option) => {
    console.log('hey');
    const data = options.filter((_value) => {
      return _value !== _option;
    })
    setOptions(data);
  }

  const handleInputsMarks = (e) => {
    if(e.target.value<0)
      setMarks(1);
    else
      setMarks(e.target.value);
  }

  const handleOnKeyDown = (e) => {
    if (e.key === 'Enter') {
      addOption();
    }
  }

  return (
    <>
      <div>
        <h1>ADD QUESTIONS</h1>
      </div>

      <div className='container mt-2'>
          <div className="mb-3">
            <label htmlFor="question" className="form-label">question</label>
            <textarea className="form-control"
              id="question"
              placeholder='question'
              name="question"
              value={question}
              onChange={handleQuestion}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='option' className='form-label'>add option</label>
            <input type="text" className='form-control'
              id='option'
              placeholder='option'
              name='option'
              value={option.option}
              onChange={handleOption}
              onKeyDown={handleOnKeyDown}
            />
          </div>
          <div>
            <input type="button"
              value="add option"
              onClick={addOption}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="marks" className="form-label">Marks</label>
            <input type="number" className="form-control"
              id="marks"
              placeholder='marks'
              name="marks"
              value={marks}
              onChange={handleInputsMarks}
              min={1}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="correct_index" className="form-label">correct Index</label>
            <input type="number" className="form-control"
              id="correct_index"
              placeholder='correct_index'
              name="correct_index"
              value={correct_index+1}
              onChange={handlecorrect_index}
            />
          </div>
          <div>
            <button onClick={AddToQuiz}>Add To Quiz</button>
          </div>
      </div>

      <QuizQuestionDisplay question={question} options={options} deleteOption={deleteOption}/>
    </>
  )
}
