import { Answer } from "./answer.interface";

export interface User{
    id:number,
    username:string,
    email:string,
    phone:string,
    answers:Answer[];
}