
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Resource } from 'src/app/core/Models/Resource';
import { ResourceService } from 'src/app/core/services/resource.service';

@Component({
  selector: 'app-list-available-resource',
  templateUrl: './list-available-resource.component.html',
  styleUrls: ['./list-available-resource.component.css']
})
export class ListAvailableResourceComponent {
  availableResources: Resource[] = [];
  serviceId!: string;
  date!: string;
  from!: string;
  to!:string;

  constructor(private resourceService: ResourceService,
              private route: ActivatedRoute){
      this.route.queryParams.subscribe(params => {
        this.serviceId = params['serviceId'];
        this.date = params['date'];
        this.from = params['from'];
        this.to = params['to'];
      });

  }
  ngOnInit() {
    this.resourceService.GetAvailableResources(this.serviceId, this.date, this.from, this.to).subscribe(res=> {
      this.availableResources = res;
    });
  }

  loadResources(){
  }

}
