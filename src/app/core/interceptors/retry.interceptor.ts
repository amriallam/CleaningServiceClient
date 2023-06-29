import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, catchError, throwError, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class RetryInterceptor implements HttpInterceptor {
  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    let modifiedReq = req;

    if (req.method === 'GET' && (!req.params.has('Page') || !req.params.has('PageSize'))) {
      const updatedParams = new HttpParams()
        .set('Page', '1')
        .set('PageSize', '10');

      modifiedReq = req.clone({ params: updatedParams });
    }

    return next.handle(modifiedReq).pipe(
      tap((data: any) => {
        console.log(data);
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400) {
          this.toastr.error(
            error.error.data[0].description,
            'Please try again later'
          );
        } else {
          // Redirect to the maintenance page
          // this.router.navigateByUrl('/maintenance');
        }
        return throwError(error);
      })
    );
  }
}

// if (req.url === 'https://localhost:7158/api/Account/register') {
//     return next.handle(req);
//   } else {
//     // Only intercept the POST requests to 'baseUrl'
//     return next.handle(req).pipe(
//       tap((data: any) => {
//         // show toast from ngx-toastr
//         console.log(data);
//       }),
//       catchError((error: HttpErrorResponse) => {
//         return this.handleError(error);
//       })
//     );
//   }

// constructor(private toastr: ToastrService, private router: Router) {}

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

// intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
//   // if requrest has a url of https://localhost:7158/api/Account/register dont intercept
//   if (req.url === 'https://localhost:7158/api/Account/register') {
//     return next.handle(req);
//   } else {
//     // Only intercept the POST requests to 'baseUrl'
//     return next.handle(req).pipe(
//       tap((data: any) => {
//         // show toast from ngx-toastr
//         console.log(data);
//       }),
//       catchError((error: HttpErrorResponse) => {
//         return this.handleError(error);
//       })
//     );
//   }
//}

// private handleError(error: HttpErrorResponse): Observable<never> {
//   if (error.status === 200) {
//     // this.toastr.success('Operation Successful', 'Done');
//     // this.router.navigate(['/email-sent']);
//   }
//   if (error.status === 400) {
//     this.toastr.error('Please try again later', error.error[0].description);

//     // console.log('An error occurred:', error.error);
//   } else if (error.status === 0) {
//     this.toastr.error(
//       'Please try again later',
//       'Service is under maintenance'
//     );
//     // console.log('An error occurred:', error.error);
//   } else {
//     console.log('An error occurred:', error.error);

//     // ! commented out to avoid error
//     // this.toastr.error(error.message, `Error Code ${error.status}`);
//     // console.error(`Backend returned code ${error.status}, body was:`, error.error);
//   }
//   return throwError(
//     () => new Error('Something bad happened. Please try again later.')
//   );
//}

// }
