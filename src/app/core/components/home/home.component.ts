import { AfterViewInit, Component } from '@angular/core';
import { Service } from 'src/app/core/Models/Service';
import { ServiceService } from 'src/app/core/services/service.service';
import { BookingWatchService } from '../../services/booking-watch.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
declare function backstretch(): any;
declare function initHeadline(): any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
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
export class HomeComponent implements AfterViewInit {
  // services: Service[] = [];
  // model: NgbDateStruct;
  Status:boolean=false;
  constructor(readonly watchService: BookingWatchService) {
    this.watchService.LimitReached.subscribe(LimitReachedStatus=>this.Status=LimitReachedStatus)
    // this.model={year:0,month:0,day:0}
  }
  ngAfterViewInit(): void {
    backstretch();
    initHeadline();
  }
}
