import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseURI: string = "https://gorest.co.in/public/v2";

  constructor(private http: HttpClient) { }

  signIn(token: string) :Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  
    const httpOptions = { headers: headers };

    return this.http.get<any>(this.baseURI + "/users", httpOptions);
  }
}
