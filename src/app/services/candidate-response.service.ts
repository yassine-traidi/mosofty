import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CandidateResponse } from '../interfaces/candidateResponse.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidateResponseService {

  baseUrl='http://localhost:8080/candidateResponses';

  constructor(private http:HttpClient) { }

  //save candidate response
  public saveCandidateResponse(candidateResponse:CandidateResponse):Observable<CandidateResponse>{
    return this.http.post<CandidateResponse>(`${this.baseUrl}/add`,candidateResponse);
  }
}
