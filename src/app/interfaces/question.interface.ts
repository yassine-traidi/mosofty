import { Answer } from "./answer.interface";
import { Quiz } from "./quiz.interface";

export interface Question{
    id:number,
    content:string,
    link:string,
    answers:Answer[],
    quiz?:Quiz
}