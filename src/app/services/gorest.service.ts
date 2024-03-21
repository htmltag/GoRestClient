import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class GorestService {
  baseURI: string = "https://gorest.co.in/public/v2";

  constructor(private http: HttpClient) { }

  addUser(user: User): Observable<any> {
    const httpOptions = { headers: this.getHeader() };

    return this.http.post<User>(this.baseURI + "/users", user, httpOptions);
  }

  private getHeader(): HttpHeaders {
    const token = sessionStorage.getItem("api_token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  
    return headers; 
  }
}
