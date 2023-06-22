import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,of } from 'rxjs';
import { apiUrl } from 'src/environment'
import {User} from '../Models/UserModel';
import { ResponseModelObject } from '../Models/ResponseModelObject';


@Injectable({
  providedIn: 'root'
})
export class UserService{
    constructor(private http: HttpClient) { }

    GetUserById(id:string): Observable<ResponseModelObject<User>> {
      return this.http.get<ResponseModelObject<User>>(apiUrl + "Account/"+id)
    }
    EditUser(user: User): Observable<ResponseModelObject<User>> {
      return this.http.patch<ResponseModelObject<User>>(apiUrl + "Account/"+ user.id , user)
    }
}
