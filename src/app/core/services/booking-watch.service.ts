import { Injectable } from '@angular/core';
import { ServiceService } from './service.service';
import { BehaviorSubject, Observable, Subject, map, max } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingWatchService {
  currentNoOfResources:number=0;
  maxNumberOfResources:number=0;
  LimitReached=new BehaviorSubject(false);

  constructor(private servicesService:ServiceService) { }

  // GetMaxNumberOfResource(serviceId:number){
  //   this.servicesService.getMetadataById(serviceId).subscribe(e=>
  //   {
  //     this.maxNumberOfResources=e.data[0].noOfResources
  //
  //   })

  // }

  GetMaxNumberOfResource(serviceId: number): Observable<number> {
    return this.servicesService.getMetadataById(serviceId).pipe(
      map(e => {
        this.maxNumberOfResources = e.data[0].noOfResources;
        console.log("from service")
        console.log(e)
        return this.maxNumberOfResources;
      })
    );
  }

  IncreateCurrentNumberOfResource(){
    this.currentNoOfResources++;
    if(this.currentNoOfResources==this.maxNumberOfResources)
      this.LimitReached.next(true);
      console.log(this.maxNumberOfResources)
  }

  DecreaseCurrentNumberOfResource(){
    this.currentNoOfResources--;
    this.LimitReached.next(false);
    console.log(this.maxNumberOfResources)
  }

}
