import React, { useState, useEffect } from 'react';
import './App.css';
import QuestionCard from './QuestionCard';
import {QuestionType} from "./quizTypes";
import {quizService} from "./Services/quizApi";

function QuizApp() {
  const difficulties = ["easy","medium","hard"]          // Values for Dropdown Menu
  const numOfQuestions = ["5","10","15"];                // Values for Dropdown Menu
  const [difficulty , setDifficulty] = useState("easy"); // State for selecting difficulty from dropdown
  const [questions , setQuestions] = useState("5");      // State for selecting number of questions from dropdown
  const [url , setUrl] = useState("");                   // state for setting up URL for Data Fetching 
  const [quiz , setQuiz] = useState<QuestionType[]>([]); // State for data fetched
  let [nextQuestion , setNextQuestion] = useState(0)     // state for showing next question 
  let [score , setScore] = useState(0);                  // state for storing scores.
  const [showResult,setShowResult] = useState(false)     // state for showing results at the end of quiz
  const [loading , setLoading] = useState(false)         // state for showing loading screen while data fetch

 // Handler for setting up difficulty from dropdown  
  const difficultyHandler = (event:React.ChangeEvent<HTMLSelectElement>) => {
    setDifficulty(event.target.value) 
  }  

// Handler for setting up amount of questions from dropdown  
  const numOfQuestionsHandler = (event:React.ChangeEvent<HTMLSelectElement>)=>{
    setQuestions(event.target.value) 
  }
  
  // Handler for submitting options of difficulty and number of question
  const optionSubmitHandler = (event:React.ChangeEvent<EventTarget>)=>{
    event.preventDefault();
    if(difficulty&&questions) {
      setUrl(`https://opentdb.com/api.php?amount=${questions}&difficulty=${difficulty}&type=multiple`)
    }
    setLoading(true);
  }

// useEffect for fetching data
    useEffect(()=>{
    async function quizData(){
      const questions:QuestionType[] = await quizService(url);
      setQuiz(questions)
      setLoading(false)
    }
    quizData()
  },[url])

// Handler for submitting answers of each question  
const submitHandler = (e:React.FormEvent<EventTarget>,selectedAnswer:string) => {
  const currentQuestion:QuestionType =  quiz[nextQuestion];  
  if(selectedAnswer ===  currentQuestion.correct_answer){
    setScore(++score)
  }
  if(nextQuestion !== quiz.length -1){
    e.preventDefault();
    setNextQuestion(++nextQuestion)   
  }
  else {
    setShowResult(true)
  }
}

  if(loading){
    return (
      <div>
        <h2 className="loading"> Please wait. Quiz is loading... </h2>
      </div>
    )
  }
  if(quiz.length) {
    return(
      <div>
        <QuestionCard
          question = {quiz[nextQuestion].question}
          options = {quiz[nextQuestion].options}
          callback = {submitHandler}
        />
      </div>
    ) 
  }
if(showResult){
  return(
    <div>
        <h1> You had completed the quiz.</h1>
        <h2> Your score is {score} out of {quiz.length}</h2>
        <div className="try-again">
        <button className="btn" onClick={()=>{
          setShowResult(!showResult)
          setNextQuestion(0)
          setScore(0)}}> 
          Try Again 
          </button>
        </div>
     </div> 
  )
}
 return (
      <div className="quiz-app">
        <h1 className="heading"> Quiz Application </h1>
          <div className="home-page"> 
            <form onSubmit={optionSubmitHandler}>
            <div className="difficulty-container">
              <p> Select difficulty </p> 
              <select className="select-css" 
              onChange={difficultyHandler} 
              value={difficulty}>
                {difficulties.map((difficulty,index)=>{
                  return <option key={index} value={difficulty}> {difficulty} </option>
                })}
              </select>
            </div>
            <div>
              <p>Select number of questions </p> 
              <select className="select-css" onChange={numOfQuestionsHandler}>
                {numOfQuestions.map((num,index) =>{
                  return <option key={index} value={num}> {num} </option>
                })} 
              </select>
            </div>
            <input className="btn" type="submit" value="Proceed" />
            </form>          
          </div>
      </div>
      ); 
        }

export default QuizApp;

