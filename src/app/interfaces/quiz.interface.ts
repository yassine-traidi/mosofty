import { Question } from "./question.interface";

export interface Quiz{
    id:number,
    description:string,
    questions:Question[],
}