import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Score } from '../interfaces/score.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  baseUrl='http://localhost:8080/scores';

  constructor(private http:HttpClient) { }

  //save score
  public saveScore(score:Score):Observable<Score>{
    return this.http.post<Score>(`${this.baseUrl}/add`,score);
  }
}
