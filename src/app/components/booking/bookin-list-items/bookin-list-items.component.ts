import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Resource } from 'src/app/core/Models/Resource';
import { BookingService } from 'src/app/core/services/booking.service';
import { ResourceService } from 'src/app/core/services/resource.service';

@Component({
  selector: 'app-bookin-list-items',
  templateUrl: './bookin-list-items.component.html',
  styleUrls: ['./bookin-list-items.component.css']
})
export class BookinListItemsComponent {

  resourceIds :number[] =[1, 2, 3];
  resourceList :Resource[]=[];
  totalPrice : number =0;
  constructor(private resourceService: ResourceService,
    private location :Location, 
    private bookingService : BookingService){
      this.resourceIds = bookingService.selcetdResourceIds;
    }
  ngOnInit(){
    this.resourceIds.forEach(element => {
      this.resourceService.GetResouceById(+element).subscribe((res)=>{
        console.log(res.data)
        this.resourceList.push(res.data)  
        this.totalPrice += res.data.price;    
      });
    })

  }
  back(){
    this.location.back()
  }
}
