import { Component, OnInit } from '@angular/core';
import { Resource } from 'src/app/core/Models/Resource';
import { ResourceService } from 'src/app/core/services/resource.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit{
  constructor(private resourceService:ResourceService){}
  Resources:Resource[]=[];
  ngOnInit(): void {
    this.resourceService.GetTopResources(8).subscribe(e=>this.Resources=e.data.filter(e=>e.resourceTypeId==4))
  }
}
