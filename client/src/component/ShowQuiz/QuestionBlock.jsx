import React from 'react'
import "../../App.css";

export default function QuestionBlock({question,index,select_option}) {


    return (
    <div className='border rounded px-3 py-3 m-2' >
        <div className='row'>
            <div className='col-12'>
                <h4>{`${index+1}). ${question.question}`}</h4>
            </div>
        <div>
            {
                question.options.map((value,_index)=>{
                    return (
                        <div 
                        style={{'cursor':'pointer'}}
                        onClick={()=>select_option(index,_index)} className={`pt-2 ${question.selectedIndex!==undefined && question.selectedIndex===_index?'selected-option':'not-selected-option'}`} key={_index}>
                            <p>{`${_index+1}). ${value.option}`}</p>
                        </div>
                    )
                })
            }
        </div>

        </div>
    </div>
    )
}
