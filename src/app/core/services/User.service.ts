import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,of } from 'rxjs';
import { apiUrl } from 'src/environment'
import {User} from '../Models/UserModel';
import { ResponseModel } from '../Models/ResponseModel';


@Injectable({
  providedIn: 'root'
})
export class UserService{
    constructor(private http: HttpClient) { }

    GetUserById(id:string): Observable<ResponseModel<User>> {
      return this.http.get<ResponseModel<User>>(apiUrl + "Account/GetUser/"+id)
    }
    EditUser(user: User): Observable<ResponseModel<User>> {
      return this.http.patch<ResponseModel<User>>(apiUrl + "Account/"+ user.id , user)
    }
}
