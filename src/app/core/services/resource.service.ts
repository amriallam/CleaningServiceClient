import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../Models/ResponseModel';
import { apiUrl } from '../../../environment';
import { Resource } from '../Models/Resource';
import { ResponseModelObject } from '../Models/ResponseModelObject';
import { Time } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor(private http: HttpClient) { }

  GetAllMinified(): Observable<ResponseModel<Resource>> {
    return this.http.get<ResponseModel<Resource>>(apiUrl + "Resource")
  }

  //Fixed Backend
  // GetResourcesDataByResouceTypeId(ResourceTypeId: number): Observable<ResponseModel<ResourceData>> {
  //   return this.http.get<ResponseModel<ResourceData>>(apiUrl + "ResourceData/Type/" + ResourceTypeId)
  // }

  // GetResouceDataById(id: number): Observable<ResponseModel<ResourceData>> {
  //   return this.http.get<ResponseModel<ResourceData>>(apiUrl + "Resource/" + id)
  // }


  GetResourcesByResouceTypeId(ResourceTypeId: number): Observable<ResponseModel<Resource>> {
    return this.http.get<ResponseModel<Resource>>(apiUrl + "Resource/ResourceType/" + ResourceTypeId)
  }

  //Fixed Backend
  GetResouceById(id: number): Observable<ResponseModelObject<Resource>> {
    return this.http.get<ResponseModelObject<Resource>>(apiUrl + "Resource/" + id)
  }

  //Fixed Backend
  // GetRoomScheduleById(id: number): Observable<ResponseModelObject<Room>> {
  //   return this.http.get<ResponseModelObject<Room>>(apiUrl + "Schedule/" + id)
  // }

  GetAvailableResources(serviceId: number, date: string, from: string, to: string){
    const sId = Number(serviceId)
    return this.http.get<Resource[]>(apiUrl + `Schedule/GetAvailableResources?_day=${date}&_serviceId=${sId}&_startTime=${from}&_endTime=${to}`);
  }

}
