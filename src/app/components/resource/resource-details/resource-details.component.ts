import { Component, AfterViewInit } from '@angular/core';
import { ResourseDetailsService} from '../../../core/services/resourse-details.service';
declare function startSlideshow(imageUrls: string[]): any;
declare function animateHeadline(headline:string): any;

@Component({
  selector: 'app-resource-details',
  templateUrl: './resource-details.component.html',
  styleUrls: ['./resource-details.component.css']
})
export class ResourceDetailsComponent implements AfterViewInit {
  id = window.location.pathname.split('/')[2];
  resId : any;
  constructor(private resourseDetailsService: ResourseDetailsService) {}

  resourceDetails: any;

  getResourceDetails(id: string) {
    this.resourseDetailsService.getResourceDetails(id).subscribe((data) => {
      console.log(data.data);
      this.resourceDetails = data.data;
    });

  }

  imageUrls = [
    "../../assets/images/slideshow/afro-woman-cleaning-window-with-rag-home.jpg",
    "../../assets/images/slideshow/afro-woman-holding-bucket-with-cleaning-items.jpg",
    "../../assets/images/slideshow/unrecognizable-cleaner-walking-into-hotel-room-with-tools-detergents.jpg"
  ];

  ngOnInit(): void {
    // console.log(this.id);
    this.getResourceDetails(this.resId);

  }

  ngAfterViewInit(): void {
    // backstretchV2(this.imageUrls);
    startSlideshow(this.imageUrls);
    animateHeadline('.cd-headline');
  }
}
