import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from 'src/app/shared/components/login/login.component';
// import { ResourceTypeService } from '../../services/resource-type.service';
// import { ResourceType } from '../../Models/ResourceType';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']

})

export class HeaderComponent {
  languages = [
    { name: "Arabic", value: 'ar' },
    { name: "English", value: 'en' }
  ]
  selectedLanguage: string = "en";

  updateSelectedLanguage(value: string) {
    this.selectedLanguage = value;
  }

  checkIfLoggedIn() {
    return localStorage.getItem('userBookingAppToken');
  }
  logout() {
    localStorage.removeItem('userBookingAppToken');
  }

  // resourceTypes: ResourceType[] = [];

  constructor() { }


  // ngOnInit(): void {
  //   this.resourceTypeService.GetAll().subscribe(data =>
  //     this.resourceTypes = data.data
  //   )
  // }
}
