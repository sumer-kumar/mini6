import React from 'react'
import "../../App.css";

export default function QuestionBlock({question,index}) {

    let isCorrect = false;

    if(question.selectedIndex!==undefined && question.selectedIndex===question.correctIndex){
        isCorrect=true;
    }

    return (
    <div className='border rounded px-3 py-3 m-2' >
        <div className='row'>
            <div className='col-12'>
                <h4>{`${index+1}). ${question.question}`}</h4>
                <h6>{question.selectedIndex!==undefined && question.selectedIndex===question.correctIndex?`Marks +${question.marks}`:'Marks +0'}</h6>
            </div>
        <div>
            {
                question.options.map((value,_index)=>{
                    let res='';

                    if(isCorrect===true)
                    {
                        if(_index===question.selectedIndex)
                        {
                            res = 'selected-option'
                        }
                        else{
                            res = 'not-selected-option'
                        }
                    }
                    else{
                        if(_index===question.selectedIndex){
                            res = 'wrong-selected-option'
                        }
                        else if(_index===question.correctIndex){
                            res = 'selected-option'
                        }
                        else{
                            res = 'not-selected-option'
                        }
                    }

                    return (
                        <div 
                        style={{'cursor':'pointer'}}
                        className={`pt-2 ${res}`} key={_index}>
                            <p>{value.option}</p>
                        </div>
                    )
                })
            }
        </div>

        </div>
    </div>
    )
}
