import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth, User } from '../library/types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginUrl = "http://localhost:3000/auth/login";

  constructor(
    private http: HttpClient
  ) { }
  
  loginUser(auth: Auth): Observable<User>{
    return this.http.post<User>(this.loginUrl, auth);
  }
  
}
