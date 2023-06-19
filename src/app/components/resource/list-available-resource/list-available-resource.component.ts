
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Resource } from 'src/app/core/Models/Resource';
import { BookingWatchService } from 'src/app/core/services/booking-watch.service';
import { BookingService } from 'src/app/core/services/booking.service';
import { ResourceService } from 'src/app/core/services/resource.service';

@Component({
  selector: 'app-list-available-resource',
  templateUrl: './list-available-resource.component.html',
  styleUrls: ['./list-available-resource.component.css'],
  animations: [
    trigger('slideDown', [
      state('true', style({
        transform: 'translateY(0)',
        opacity: 1
      })),
      transition('void => *', [
        style({
          transform: 'translateY(100%)',
          opacity: 0
        }),
        animate('0.3s ease-in-out')
      ])
    ]),
    trigger('slideUp', [
      state('true', style({
        transform: 'translateY(0)',
        opacity: 1
      })),
      transition('* => void', [
        animate('0.3s ease-in-out', style({
          transform: 'translateY(100%)',
          opacity: 0
        }))
      ])
    ])
  ]
})
export class ListAvailableResourceComponent {
  availableResources: Resource[] = [];
  serviceId!: number;
  date!: string;
  from!: string;
  to!:string;

  counter: number = 0;
  selectedResources: any[] = [];
  selectdedResIds : number[] = [];

  status: boolean = false;
  constructor(private resourceService: ResourceService,
              private route: ActivatedRoute,
              readonly watchService: BookingWatchService,
              private bookingService: BookingService,
              private router: Router){
      this.route.queryParams.subscribe(params => {
        this.serviceId = params['serviceId'];
        this.date = params['date'];
        this.from = params['from'];
        this.to = params['to'];
      });

      watchService.GetMaxNumberOfResource(this.serviceId)
      this.watchService.LimitReached.subscribe(LimitReachedStatus=>{
        this.status=LimitReachedStatus;
      });

  }

  isSelectionDisabled(res: any): boolean {
    return this.selectedResources.includes(res);
  }

  ngOnInit() {
    this.resourceService.GetAvailableResources(this.serviceId, this.date, this.from, this.to).subscribe(res=> {
      this.availableResources = res;
    });
  }

  isResourceSelected(res: any): boolean {
    return this.selectedResources.includes(res);
  }

  selectResource(res: any) {
    const index = this.selectedResources.indexOf(res);
    if (index > -1) {
      this.selectedResources.splice(index, 1);
      this.watchService.DecreaseCurrentNumberOfResource();
    } else {
      this.selectedResources.push(res);
      this.watchService.IncreateCurrentNumberOfResource();
    }
  }

  book(){

    // console.log(this.selectedResources)
    this.selectedResources.forEach(res => {
      this.selectdedResIds.push(res.id);
    });
    // console.log(this.selectdedResIds)
    this.bookingService.AddBookingDetails(this.selectdedResIds, this.date, this.from, this.to)
    console.log("Booking")
    this.router.navigate(['booking/bookingList']);
  }

}
