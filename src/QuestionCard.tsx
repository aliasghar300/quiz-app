import { QuestionPropType } from "./quizTypes";
import React, { useState } from 'react'


const decodeString = (str:any) => {
    const textArea = document.createElement("textarea")
    textArea.innerHTML = str
    return textArea.value
  }

const QuestionCard: React.FC<QuestionPropType> = ({question,options,callback}) => { 

    let [selectedAnswer,setSelectedAnswer] = useState("");
    const answerHandler = (event:any) => {
        setSelectedAnswer(event.target.value)
    }
    return (
        <div>        
        <h1 className="heading"> Quiz Application </h1>
            <div className="question-card">
                <div className="question-container">
                    <h3> Question: {decodeString(question)} </h3>
                </div>
                <div className="options-container">
                <form onSubmit={(e)=>{callback(e,selectedAnswer)}}>
                    {options.map((opt,index)=>{
                        return (
                            <div key={index}>
                                <label>
                                    {decodeString(opt)}
                                    <input 
                                    type="radio" 
                                    name="opt" 
                                    value={opt}
                                    required
                                    checked={opt === selectedAnswer}
                                    onChange={answerHandler}
                                    />
                                </label>
                            </div>)})}
                        <input className="btn" type="submit"></input>
                </form>
            </div>
        </div>
        </div>
    )
}

export default QuestionCard