import React from "react";

export type QuizType = {
    category: string
    correct_answer: string
    difficulty: string
    incorrect_answers: string[]
    question: string
    type: string
}

export type QuestionType = {
    question: string
    answer: string
    options: string[]
    correct_answer: string
}

export type QuestionPropType = {
    question: string
    options: string[]
    callback: (e:React.FormEvent<EventTarget>,selectedAnswer:string)=> void
}
