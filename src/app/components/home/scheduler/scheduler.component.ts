import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Select2, Select2Data, Select2Option } from 'ng-select2-component';
import { ToastrService } from 'ngx-toastr';
import { Region } from 'src/app/core/Models/Region';
import { ServiceScheduleVM } from 'src/app/core/ViewModels/service-schedule-vm';
import { RegionService } from 'src/app/core/services/region.service';
import { ServiceService } from 'src/app/core/services/service.service';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})

export class SchedulerComponent implements AfterViewInit {
  loadingFlag:boolean = false;
  skeletonLoadingFlag:number=0;
  SwitchForm: boolean = false;
  BookingForm: FormGroup = this.formBuilder.group({
    day: ['', [Validators.required]],
    startTime: ['', [Validators.required]],
    endTime: ['', [Validators.required,]],
  });

  get day() { return this.BookingForm.controls['day'] }
  get startTime() { return this.BookingForm.controls['startTime'] }
  get endTime() { return this.BookingForm.controls['endTime'] }


  ServiceData: Select2Option[] = [];
  currentService: string = "";
  ServiceWarning: boolean = false;

  RegionData: Select2Option[] = [];
  currentLocation: string = "";
  LocationWarning: boolean = false;

  updateService(value: any) {
    if (value == "") { return; }
    this.ServiceWarning = false;
    this.currentService = value;
  }

  updateLocation(value: any,LocationButton:HTMLButtonElement) {
    if (value == "") { return; }
    this.LocationWarning = false;
    this.currentLocation = value;
    LocationButton.disabled = false;
  }

  minDate: NgbDateStruct;

  constructor(private toastr:ToastrService,private formBuilder: FormBuilder, private router: Router, private serviceService: ServiceService, private regionService: RegionService) {
    let today = new Date().toISOString().split('T')[0].split('-');
    this.minDate = { year: +today[0], month: +today[1], day: +today[2] };
  }

  ngAfterViewInit(): void {
    this.regionService.getSystemRegions().subscribe(
      e =>{
        if(e.data.length > 0){
        this.RegionData =this.RegionToSelect2Option(e.data)
        this.skeletonLoadingFlag = 2;
        }
        else  this.skeletonLoadingFlag = 1;
      }
    )
  }

  IsBookingFormValid() {
    if (this.currentService == '' || this.BookingForm.invalid) return false;
    return true;
  }

  SubmitRegion(caller: Select2,LocationButton:HTMLButtonElement) {
    this.loadingFlag = true;
    this.serviceService.getAvailableServiceByRegion(+this.currentLocation).subscribe(
      e => {
        if (e.data.length > 0) {
          this.ServiceData = this.ServicesToSelect2Option(e.data);
          this.SwitchForm = true;
        } else {
          this.RegionData.find(region => region.value == this.currentLocation)!.disabled = true;
          this.currentLocation = '';
          caller.value = '';
          this.toastr.warning("Unfortunately, no services available for this region.");
          LocationButton.disabled=true;
        }
        this.loadingFlag = false;
      },
      error => {
        this.loadingFlag = false; // Handle error case as well
        LocationButton.disabled=true;
      }
    );
  }


  SubmitBookingFilter() {
    if (this.currentService == '') this.ServiceWarning = true;
    if (!this.IsBookingFormValid()) return;
    this.router.navigateByUrl(`resource?serviceId=1&date=${this.FormatNgbDate(this.day.value)}&from=${this.startTime.value}:00&to=${this.endTime.value}:00&&regionId=${this.currentLocation}`);
  }

  private FormatNgbDate(date: any) {
    const { year, month, day } = date;
    const formattedMonth = month.toString().padStart(2, '0');
    const formattedDay = day.toString().padStart(2, '0');
    return year + '-' + formattedMonth + '-' + formattedDay;
  }

  private RegionToSelect2Option(Regions: Region[]) {
    return Regions.map(region => {
      return { value: region.id, label: region.name,disabled:false }
    })
  }

  private ServicesToSelect2Option(Services: ServiceScheduleVM[]) {
    return Services.map(Service => {
      return { value: Service.id, label: Service.name }
    })
  }
  backToRegionForm(){
    this.SwitchForm=!this.SwitchForm;
    this.currentLocation='';
  }

}
