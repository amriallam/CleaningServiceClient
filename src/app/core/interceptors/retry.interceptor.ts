import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class RetryInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(req).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        return this.handleError(error);
      })
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 0) {
      // this.toastr.error("Please try again later", "Service is under maintenance");
    } else {
      this.toastr.error(error.error, `Error Code ${error.status}`);
    }
    return throwError(() => new Error('Something bad happened. Please try again later.'));
  }

}
