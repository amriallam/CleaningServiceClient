import { Component } from '@angular/core';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Service } from 'src/app/core/Models/Service';
import { ServiceService } from 'src/app/core/services/service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  services: Service[] = [];
  model: NgbDateStruct;

  constructor(private serviceService: ServiceService,private calendar: NgbCalendar) {
    this.model={year:0,month:0,day:0}
  }
  ngOnInit() {
    this.serviceService.getAll().subscribe((res) => {
      this.services = res.data;
    })
  }

}
