import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Inject, Injectable, Injector, NgZone } from '@angular/core';
import { FeedbackService } from './feedback.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {

  constructor(@Inject(Injector) private readonly injector: Injector) { }

  private get toastService() {
    return this.injector.get(FeedbackService);
  }

  private get zone() {
    return this.injector.get(NgZone);
  }

  handleError(error: any) {

    if (!(error instanceof HttpErrorResponse)) {
      error = error.rejection; // get the error object
    }

    this.zone.run(()=>
      this.toastService.notifyUser(
        error?.status || '40X',
        error?.message || 'Undefined client error',
        error?.message == undefined ? 'Error from global error handler: Undefined' : 'Error from global error handler' + error.message
      )
    );
  }
}
