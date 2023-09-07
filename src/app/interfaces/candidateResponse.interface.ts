import { Answer } from "./answer.interface";
import { Quiz } from "./quiz.interface";
import { User } from "./user.interface";

export interface CandidateResponse{
    id:number,
    user:User,
    answers:Answer[],
    quiz:Quiz,
}