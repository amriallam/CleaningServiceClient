import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../Models/ResponseModel';
import { apiUrl } from '../../../environment';
import { Resource } from '../Models/Resource';
import { Time } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor(private http: HttpClient) { }

  GetAllMinified(): Observable<ResponseModel<Resource>> {
    return this.http.get<ResponseModel<Resource>>(apiUrl + "Resource")
  }

  GetResouceById(id: number): Observable<ResponseModel<Resource>> {
    return this.http.get<ResponseModel<Resource>>(apiUrl + "Resource/" + id)
  }

  GetAvailableResources(serviceId: number, date: string, from: string, to: string, regionId: number): Observable<ResponseModel<Resource[]>> {
    const sId = Number(serviceId)
    const regId = Number(regionId);
    return this.http.get<ResponseModel<Resource[]>>(apiUrl + `Schedule/GetAvailableResources?_day=${date}&_serviceId=${sId}&_startTime=${from}&_endTime=${to}&RegionId=${regId}`);
  }

  GetTopResources(NoOfResources: number=100):Observable<ResponseModel<Resource>>{
    return this.http.get<ResponseModel<Resource>>(apiUrl + `Resource?PageSize=${NoOfResources}`);
  }

}
