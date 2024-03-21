import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private toastr: ToastrService) { }

  notifyUser(statusCode: string, message: string, logMessage: string) {
    if(statusCode.startsWith("20")) {
      console.log(logMessage);
      this.toastr.success(message, "Success");
    } else {
      console.log(logMessage);
      this.toastr.error(message, "Ohh no!");
    }
  }
}
