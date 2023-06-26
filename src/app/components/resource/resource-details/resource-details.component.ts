import { Component, AfterViewInit } from '@angular/core';
import { ResourseDetailsService} from '../../../core/services/resourse-details.service';
declare function startSlideshow(imageUrls: string[]): any;
declare function animateHeadline(headline:string): any;
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-resource-details',
  templateUrl: './resource-details.component.html',
  styleUrls: ['./resource-details.component.css'],
})
export class ResourceDetailsComponent implements AfterViewInit {
  id = window.location.pathname.split('/')[2];
  imageuri!: string;
  resId : any;

  constructor(private resourseDetailsService: ResourseDetailsService,
    private modalService: NgbModal,
    ) {}

  resourceDetails: any;

    closeModal() {
    this.modalService.dismissAll();
    }

  getResourceDetails(id: string) {
    this.resourseDetailsService.getResourceDetails(id).subscribe((data) => {
      // console.log("Resource")
      // console.log(data.data.images[0].uri)
      // console.log(data.data);
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
    // startSlideshow(this.imageUrls);
    animateHeadline('.cd-headline');
  }
}
