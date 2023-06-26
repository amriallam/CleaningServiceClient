import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(
    private http: HttpClient,
    private ToastrService: ToastrService,
    private router: Router
  ) {}
  baseUrl = 'https://localhost:7158/api/Account/register';

  // public register(
  //   email: string,
  //   firstName: string,
  //   userName: string,
  //   lastName: string,
  //   password: string
  // ): Observable<any> {
  //   return this.http
  //     .post<any>(this.baseUrl, {
  //       email,
  //       firstName,
  //       userName,
  //       lastName,
  //       password,
  //     })
  //     .pipe(
  //       tap((data: any) => {
  //         // show toast from ngx-toast
  //         // setTimeout(() => {
  //         // this.router.navigate(['/email-sent']);
  //         // }, 2000);
  //       }),
        
  //       catchError((error: HttpErrorResponse) => {
  //         if (error.status === 400) {
  //           // this.ToastrService.error(
  //           //   'Please try again later',
  //           //   error.error[0].description
  //           // );
  //         } else {
  //           console.log(error)
  //           this.ToastrService.error(
  //             'Please try again later',
  //             error.error[0].description
  //           ); // Redirect to maintenance page
  //         }
  //         return throwError(error);
  //       })
        

        
  //     );
  // }
  public register(
    email: string,
    firstName: string,
    userName: string,
    lastName: string,
    password: string
  ): Observable<any> {
    return this.http.post<any>(this.baseUrl, { email , 
      firstName,
      userName,
      lastName,
      password
    }).pipe(
      tap((data: any) => {
        console.log(data)
        this.ToastrService.success(
          'success',
          'Registration Successful'
        );
        setTimeout(() => {
          this.router.navigate(['/email-sent']);
        }
        , 2000);
      
    }),


      catchError((error: HttpErrorResponse) => {
        if(error){
          console.log(error)
          console.log(error.status)
          console.log(error.error)
        }
       if (error.status === 400) {
         console.log(error)
        this.ToastrService.error(
          'Please try again later',
          'username or email already exists'
        );
      } else {
        console.log(error)
        this.ToastrService.error(
          'Please try again later',
          'username or email already exists'

        ); // Redirect to maintenance page

      }

      return 'error'

      })
    );
  }



}
