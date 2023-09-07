import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl='http://localhost:8080/users';

  constructor(private http:HttpClient) { }

  //save user
  public saveUser(user:User):Observable<User>{
    return this.http.post<User>(`${this.baseUrl}/add`,user);
  }

  //


}
