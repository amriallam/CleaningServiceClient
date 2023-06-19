import { AfterViewInit, Component } from '@angular/core';
import { Service } from 'src/app/core/Models/Service';
import { ServiceService } from 'src/app/core/services/service.service';
declare function backstretch(): any;
declare function initHeadline(): any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    backstretch();
    initHeadline();
  }
}
