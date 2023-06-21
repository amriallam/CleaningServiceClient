import { Injectable } from '@angular/core';
import { apiUrl } from 'src/environment';
import { ResponseModel } from '../Models/ResponseModel';
import { Observable } from 'rxjs';
import { Faq } from '../Models/faq';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FaqService {

  constructor(private httpClient: HttpClient) { }

  getAllFAQ(): Observable<ResponseModel<Faq[]>> {
    return this.httpClient.get<ResponseModel<Faq[]>>(apiUrl + "faq");
  }

}
