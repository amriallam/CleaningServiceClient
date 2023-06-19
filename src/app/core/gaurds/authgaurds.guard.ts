import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthgaurdsGuard implements CanActivate {
  constructor(private AuthService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree
    | any
    | AuthService {
    if (this.AuthService.isLoggedIn()) {
      return true;
    } else {


      return false;
    }
  }
}
      // Swal.fire({
      //   title: 'Please Login First',
      //   icon: 'warning',
      //   showCancelButton: true,
      //   confirmButtonText: 'Login',
      // }).then(result => {
      //   if (result.isConfirmed) {
      //     this.router.navigate(['/login']);
      //   }else{
      //     this.router.navigate(['/']);
      //   }
      // })
