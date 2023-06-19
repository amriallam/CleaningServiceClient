import { Component } from '@angular/core';
import { ResourseDetailsService} from '../../../core/services/resourse-details.service';

@Component({
  selector: 'app-resource-details',
  templateUrl: './resource-details.component.html',
  styleUrls: ['./resource-details.component.css']
})
export class ResourceDetailsComponent {
  id = window.location.pathname.split('/')[2];
  constructor(private resourseDetailsService: ResourseDetailsService) { }

  resourceDetails: any;
  resourceDetailsRating : any;
  getResourceDetails(id: string) {
    this.resourseDetailsService.getResourceDetails(id).subscribe((data) => {
      console.log(data.data);
      this.resourceDetails = data.data;
      this.resourceDetailsRating = data.data.averageRating;
      console.log(this.resourceDetailsRating);
    });
   
  }


  
    


  ngOnInit(): void {
    console.log(this.id);
    this.getResourceDetails(this.id);
    
  }

}
