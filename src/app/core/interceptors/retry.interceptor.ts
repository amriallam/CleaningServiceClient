import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, retry, tap, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class RetryInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService) {}

  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
  //   return next.handle(req).pipe(
  //     tap((data: any) => {
  //       // show toast from ngx-toastr
  //       this.toastr.success('Registration Successful', 'Welcome');
  //     }),

  //     catchError((error: HttpErrorResponse) => {
  //       return this.handleError(error);
  //     })
  //   );
  // }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {

      // Only intercept the POST requests to 'baseUrl'
      return next.handle(req).pipe(
        tap((data: any) => {
          // show toast from ngx-toastr
        }),
        catchError((error: HttpErrorResponse) => {
          return this.handleError(error);
        })
      );

  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if(error.status === 200){
      this.toastr.success('Operation Successful', 'Done');
    }
    if (error.status === 400) {
      this.toastr.error('Please try again later', error.error[0].description);
    } else if (error.status === 0) {
      this.toastr.error(
        'Please try again later',
        'Service is under maintenance'
      );
    } else {
      console.log('An error occurred:', error.error);
    }
    return throwError(
      () => new Error('Something bad happened. Please try again later.')
    );
  }
}
