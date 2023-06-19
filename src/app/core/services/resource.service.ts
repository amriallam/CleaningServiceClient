import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../Models/ResponseModel';
import { Room } from '../Models/Room';
import { apiUrl } from '../../../environment';
import { Resource } from '../Models/Resource';
import { ResourceData } from '../Models/ResourceData';
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
  GetResourcesDataByResouceTypeId(ResourceTypeId: number): Observable<ResponseModel<ResourceData>> {
    return this.http.get<ResponseModel<ResourceData>>(apiUrl + "ResourceData/Type/" + ResourceTypeId)
  }

  GetResouceDataById(id: number): Observable<ResponseModel<ResourceData>> {
    return this.http.get<ResponseModel<ResourceData>>(apiUrl + "Resource/" + id)
  }


  GetResourcesByResouceTypeId(ResourceTypeId: number): Observable<ResponseModel<Resource>> {
    return this.http.get<ResponseModel<Resource>>(apiUrl + "Resource/ResourceType/" + ResourceTypeId)
  }

  //Fixed Backend
  GetResouceById(id: number): Observable<ResponseModel<Resource>> {
    return this.http.get<ResponseModel<Resource>>(apiUrl + "Resource/" + id)
  }

  //Fixed Backend
  GetRoomScheduleById(id: number): Observable<ResponseModel<Room>> {
    return this.http.get<ResponseModel<Room>>(apiUrl + "Schedule/" + id)
  }

  GetAvailableResources(serviceId: string, date: string, from: string, to: string){
    const sId = Number(serviceId)
    return this.http.get<Resource[]>(apiUrl + `Schedule/GetAvailableResources?_day=${date}&_serviceId=${sId}&_startTime=${from}&_endTime=${to}`);
  }

}
