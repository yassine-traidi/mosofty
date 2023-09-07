import { Quiz } from "./quiz.interface";
import { User } from "./user.interface";

export interface Score{
    id:number,
    score:number,
    user:User,
    quiz:Quiz,
    date:Date,
}