import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Service } from 'src/app/core/Models/Service';
import { ServiceService } from 'src/app/core/services/service.service';
declare function backstretch(): any;
declare function animateHeadline(headline:string): any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit , OnInit{

  services !: Service[]
  constructor(private serviceService: ServiceService){}
  ngOnInit(): void {
    this.serviceService.getAll().subscribe(ser=> {
      this.services = ser.data
    });
  }
    ngAfterViewInit(): void {
    backstretch();
    animateHeadline('.cd-headline');



  }
}
