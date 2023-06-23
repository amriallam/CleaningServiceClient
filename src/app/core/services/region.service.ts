import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from 'src/environment';
import { ResponseModel } from '../Models/ResponseModel';
import { Region } from '../Models/Region';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  constructor(private http:HttpClient) { }

  getSystemRegions():Observable<ResponseModel<Region>> {
      return this.http.get<ResponseModel<Region>>(apiUrl+'region');
    }
}
