import { AfterViewInit, Component } from '@angular/core';
declare function backstretch(): any;
declare function animateHeadline(): any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    backstretch();
    animateHeadline();
  }
}
