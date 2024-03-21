import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { catchError, of } from 'rxjs';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule]
})
export class LoginComponent {

  apiToken = "";

  constructor(private AuthService: AuthService, private feedback: FeedbackService, private router: Router) { }

  login(e:any){
    e.preventDefault();
    if(this.apiToken.length <= 0) {this.feedback.notifyUser("401", "The API token is empty. Try again.", "User passed in a empty token");}
    
    this.AuthService.signIn(this.apiToken)
    .pipe(
      catchError((error) => {
        this.apiToken = "";
        this.feedback.notifyUser(error.status, "The API token is no good. Try again.", error.message);
        
        return of(null); 
      })
    )
    .subscribe((data) => {
      if(this.apiToken.length > 0 && data) {
        this.feedback.notifyUser(data.status, "User logged in", "Hurray, token was accepted!")
        sessionStorage.setItem("api_token", this.apiToken);
        this.router.navigate(['add-user']);
      } else {
        //Token is no good.
        this.apiToken = "";
      }
    })
  }
}
