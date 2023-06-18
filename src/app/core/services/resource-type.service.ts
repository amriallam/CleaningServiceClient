import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../Models/ResponseModel';
import { apiUrl } from 'src/environment';
import { ResourceType } from '../Models/ResourceType';


@Injectable({
  providedIn: 'root'
})
export class ResourceTypeService {

  constructor(private http: HttpClient) { }

  GetAll(): Observable<ResponseModel<ResourceType>> {
    return this.http.get<ResponseModel<ResourceType>>(apiUrl + "ResourceType")
  }
  GetResouceTypeById(ResourceTypeId: number): Observable<ResponseModel<ResourceType>> {
    return this.http.get<ResponseModel<ResourceType>>(apiUrl + "ResourceType/" + ResourceTypeId)
  }

}
