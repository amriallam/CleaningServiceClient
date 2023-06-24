import { Injectable } from '@angular/core';
import { apiUrl } from 'src/environment';
import { ResponseModel } from '../Models/ResponseModel';
import { Observable } from 'rxjs';
import { Faq } from '../Models/faq';
import { HttpClient } from '@angular/common/http';
import { FaqCategory } from '../Models/faqCategory';
@Injectable({
  providedIn: 'root'
})
export class FaqService {

  constructor(private httpClient: HttpClient) { }

  getAllFAQ(): Observable<ResponseModel<FaqCategory>> {
    return this.httpClient.get<ResponseModel<FaqCategory>>(apiUrl + "FAQCategory");
  }

}
