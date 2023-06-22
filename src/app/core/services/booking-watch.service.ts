import { Injectable } from '@angular/core';
import { ServiceService } from './service.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingWatchService {
  currentNoOfResources:number=0;
  maxNumberOfResources:number=0;
  LimitReached=new BehaviorSubject(false);

  constructor(private servicesService:ServiceService) { }

  GetMaxNumberOfResource(serviceId:number){
    this.servicesService.getMetadataById(serviceId).subscribe(e=>
      {
        this.maxNumberOfResources=e.data[0].noOfResources
        console.log(e)
      })
  }
  IncreateCurrentNumberOfResource(){
    this.currentNoOfResources++;
    if(this.currentNoOfResources==this.maxNumberOfResources)
      this.LimitReached.next(true);
  }
  DecreaseCurrentNumberOfResource(){
    this.currentNoOfResources--;
    this.LimitReached.next(false);
  }

}
