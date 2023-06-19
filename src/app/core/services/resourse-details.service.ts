import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResourseDetailsService {
  constructor(private http: HttpClient) {}

  getResourceDetails(id: string): Observable<any> {
    return this.http.get<any>(`https://localhost:7158/api/ResourceData/Resource/${id}`);
  } 
}
