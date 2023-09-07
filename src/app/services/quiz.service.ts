import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quiz } from '../interfaces/quiz.interface';
import { Question } from '../interfaces/question.interface';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  baseUrl='http://localhost:8080/quizzes';

  constructor(private http:HttpClient) { }

  //get quizzes
  public getQuizzes():Observable<Quiz[]>{
    return this.http.get<Quiz[]>(`${this.baseUrl}/getAll`);
  }

  //get questions of quiz
  public getQuestionsOfQuiz(id:number):Observable<Question[]>{
    return this.http.get<Question[]>(`${this.baseUrl}/${id}/getQuestions`);
  }

  //get quiz by ID
  public getQuizById(id:number):Observable<Quiz>{
    return this.http.get<Quiz>(`${this.baseUrl}/get/${id}`);
  }

  
}
