import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Resource } from 'src/app/core/Models/Resource';
import { BookingWatchService } from 'src/app/core/services/booking-watch.service';
import { BookingService } from 'src/app/core/services/booking.service';
import { ResourceService } from 'src/app/core/services/resource.service';
import { ResourceDetailsComponent } from '../resource-details/resource-details.component';

@Component({
  selector: 'app-list-available-resource',
  templateUrl: './list-available-resource.component.html',
  styleUrls: ['./list-available-resource.component.css'],
  animations: [
    trigger('slideDown', [
      state(
        'true',
        style({
          transform: 'translateY(0)',
          opacity: 1,
        })
      ),
      transition('void => *', [
        style({
          transform: 'translateY(100%)',
          opacity: 0,
        }),
        animate('0.3s ease-in-out'),
      ]),
    ]),
    trigger('slideUp', [
      state(
        'true',
        style({
          transform: 'translateY(0)',
          opacity: 1,
        })
      ),
      transition('* => void', [
        animate(
          '0.3s ease-in-out',
          style({
            transform: 'translateY(100%)',
            opacity: 0,
          })
        ),
      ]),
    ]),
  ],
})
export class ListAvailableResourceComponent {
  availableResources: Resource[] = [];
  filteredResources: Resource[] = [];
  serviceId!: number;
  date!: string;
  from!: string;
  to!: string;

  counter: number = 0;
  selectedResources: any[] = [];
  selectdedResIds: number[] = [];
  status: boolean  ;


  constructor(private resourceService: ResourceService,
    private route: ActivatedRoute,
    readonly watchService: BookingWatchService,
    private bookingService: BookingService,
    private router: Router,
    private modal: NgbModal,) {

    this.status = false;
    this.route.queryParams.subscribe((params) => {
      this.serviceId = params['serviceId'];
      this.date = params['date'];
      this.from = params['from'];
      this.to = params['to'];
    });

    watchService.GetMaxNumberOfResource(this.serviceId)
    this.watchService.LimitReached.subscribe(LimitReachedStatus => {
      this.status = LimitReachedStatus;
      console.log(this.status);
    });
  }

  ngOnInit() {
    this.resourceService.GetAvailableResources(this.serviceId, this.date, this.from, this.to).subscribe(res => {
      this.availableResources = res;
    });
  }

  isSelectionDisabled(res: any): boolean {
    if (this.isResourceSelected(res)) {
      return false;
    } else {
      return this.selectedResources.length >= this.noOfResources;
    }
  }
  isResourceSelected(res: any): boolean {
    // return this.selectedResources.includes(res);
    return res.selected;
  }

  selectResource(res: any) {
    const index = this.selectedResources.indexOf(res);
    if (index > -1) {
      this.selectedResources.splice(index, 1);
      this.watchService.DecreaseCurrentNumberOfResource();
      this.totalPrice -= res.price;
    } else {
      this.selectedResources.push(res);
      this.watchService.IncreateCurrentNumberOfResource();
      this.totalPrice += res.price;
    }
    res.selected = !res.selected;
    if(this.selectedResources.length == this.noOfResources)
      this.status = true
    else{
     this.status = false;
    }
  }


  book() {
    this.selectedResources.forEach((res) => {
      this.selectdedResIds.push(res.id);
      this.selectedResNames.push(res.name);
    });

    this.bookingService.AddBookingDetails(
      this.selectdedResIds,
      this.selectedResNames,
      this.date,
      this.from,
      this.to,
      this.serviceId,
      this.totalPrice
    );

    this.router.navigate(['booking/bookingList'], {
      queryParams: {
        selectedResources: JSON.stringify(this.selectedResources),
        totalPrice: this.totalPrice
      }
    });
    this.bookingService.AddBookingDetails(this.selectdedResIds, this.date, this.from, this.to)
    this.router.navigateByUrl('booking/bookingList');
  }

  openModal(Resource: Resource) {
    const modelRef = this.modal.open(ResourceDetailsComponent, {
      centered: true,
    });
    modelRef.componentInstance.resId = Resource.id;
  }

  
}
