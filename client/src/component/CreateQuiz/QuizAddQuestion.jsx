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

  const [correctIndex,setCorrectIndex] = useState(0);
  
  const handleCorrectIndex = (e)=>{
      setCorrectIndex(e.target.value-1)      
  }

  const handleQuestion = (e) => {
    setQuestion(e.target.value);
  }

  const handleOption = (e) => {
    setOption({ option: e.target.value, isCorrect: false });
  }

  const addQuestion = ()=>{
    options[correctIndex].isCorrect=true;
    const finalQuestion = {
      question:question,
      options:options,
      marks:marks,
      correctIndex:correctIndex,
    }
    params.addToQuestions(finalQuestion);
  }

  const AddToQuiz = ()=>{
    if(correctIndex<0 || correctIndex>=options.length)
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
      setCorrectIndex(0);
    }
  }

  const addOption = () => {
    option.option = `${options.length + 1}). ${option.option}`;
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
            <label htmlFor="correctIndex" className="form-label">correct Index</label>
            <input type="number" className="form-control"
              id="correctIndex"
              placeholder='correctIndex'
              name="correctIndex"
              value={correctIndex+1}
              onChange={handleCorrectIndex}
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
