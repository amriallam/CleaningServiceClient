import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'HotelApp';
  private maintenanceRoutes: string[] = ['/maintenance'];
  constructor(private router: Router) {}
  disableHeaderFooter(){
    return this.maintenanceRoutes.includes(this.router.url);
  }
}
