import {QuizType , QuestionType} from "../quizTypes";

const shuffleArray = (array:any[]) => 
    [...array].sort(()=>Math.random() - 0.5)


export const quizService = async (url:string) => {
    const res = await fetch(url);
    const {results} = await res.json()
    const quiz:QuestionType[] = results.map((questionObj: QuizType)=>{
        return {
            question: questionObj.question,
            answer: questionObj.correct_answer,
            correct_answer: questionObj.correct_answer,
            options: shuffleArray(questionObj.incorrect_answers.concat(questionObj.correct_answer)),     
        }
    }) 
    return quiz
}
