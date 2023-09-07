import { Question } from "./question.interface";

export interface Answer {
    id?:number,
    content:string,
    value:boolean,
    question:Question,
    question_id:number;
    selected:boolean;
}