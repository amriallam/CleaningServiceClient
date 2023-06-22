import { Injectable } from '@angular/core';

import { Service } from '../Models/Service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/environment'
import { ResponseModel } from '../Models/ResponseModel';
import { ServiceMetadata } from '../Models/ServiceMetadata';
// import { ServiceMetadata } from '../Models/service-metadata';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<ResponseModel<Service>> {
    return this.httpClient.get<ResponseModel<Service>>(`${apiUrl}Service`)
  }
  getAllById(id: number): Observable<ResponseModel<Service>> {
    return this.httpClient.get<ResponseModel<Service>>(`${apiUrl}Service?Id=${id}`)
  }
  getMetadataById(id: number): Observable<ResponseModel<ServiceMetadata>> {
    return this.httpClient.get<ResponseModel<ServiceMetadata>>(`${apiUrl}ServiceMetadata?ServiceId=${id}`)
  }

}
