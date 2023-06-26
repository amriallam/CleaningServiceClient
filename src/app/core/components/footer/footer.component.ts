import { Component } from '@angular/core';
import { Service } from '../../Models/Service';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  services !: Service[]
  constructor(private serviceService: ServiceService){}
  ngOnInit(): void {
    this.serviceService.getAll().subscribe(ser=> {
      this.services = ser.data
    });
  }
}
