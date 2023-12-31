import { Injectable } from '@angular/core';

import { Service } from '../Models/Service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/environment';
import { ResponseModel } from '../Models/ResponseModel';
import { ServiceMetadata } from '../Models/ServiceMetadata';
import { Region } from '../Models/Region';
import { ServiceScheduleVM } from '../ViewModels/service-schedule-vm';
// import { ServiceMetadata } from '../Models/service-metadata';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<ResponseModel<Service[]>> {
    return this.httpClient.get<ResponseModel<Service[]>>(`${apiUrl}Service`);
  }
  getById(id: number): Observable<ResponseModel<Service>> {
    return this.httpClient.get<ResponseModel<Service>>(
      `${apiUrl}Service?Id=${id}`
    );
  }
  getMetadataById(id: number): Observable<ResponseModel<ServiceMetadata[]>> {
    return this.httpClient.get<ResponseModel<ServiceMetadata[]>>(
      `${apiUrl}ServiceMetadata?ServiceId=${id}`
    );
  }
  getAvailableServiceByRegion(
    regionId: number
  ): Observable<ResponseModel<ServiceScheduleVM[]>> {
    return this.httpClient.get<ResponseModel<ServiceScheduleVM[]>>(
      `${apiUrl}Service/region/${regionId}`
    );
  }
  GetAvailableSchedules(date: string, serviceId: number, regionId: number) {
    return this.httpClient.get<ResponseModel<{startTime:string,endTime:string}[]>>(
      `${apiUrl}Schedule/GetAvailableTimes?_day=${date}&_serviceId=${serviceId}&RegionId=${regionId}`
    );
  }
}
