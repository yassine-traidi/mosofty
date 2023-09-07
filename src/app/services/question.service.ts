import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../interfaces/question.interface';
import { Answer } from '../interfaces/answer.interface';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  baseUrl='http://localhost:8080/questions';

  constructor(private http:HttpClient) { }
  
  //get questions
  public getQuestions():Observable<Question[]>{
    return this.http.get<Question[]>(`${this.baseUrl}/getAll`);
  }

  //get answers of question
  public getAnswers(id:number):Observable<Answer[]>{
    return this.http.get<Answer[]>(`${this.baseUrl}/${id}/getAnswers`);
  }

  
}
