import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Select2, Select2Data, Select2Option } from 'ng-select2-component';
import { ToastrService } from 'ngx-toastr';
import { Region } from 'src/app/core/Models/Region';
import { ServiceScheduleVM } from 'src/app/core/ViewModels/service-schedule-vm';
import { RegionService } from 'src/app/core/services/region.service';
import { ServiceService } from 'src/app/core/services/service.service';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css'],
})
export class SchedulerComponent implements AfterViewInit {
  loadingFlag: boolean = false;
  skeletonLoadingFlag: number = 0;
  SwitchForm: boolean = false;

  BookingForm: FormGroup = this.formBuilder.group({
    day: ['', [Validators.required]],
  });

  get day() {
    return this.BookingForm.controls['day'];
  }

  ServiceData: Select2Option[] = [];
  currentService: string = '';
  ServiceWarning: boolean = false;

  RegionData: Select2Option[] = [];
  currentLocation: string = '';
  LocationWarning: boolean = false;

  ScheduleItemDisabledFlag: boolean = true;

  shifts: Select2Data = [
    {
      label: '09:00 AM - 12:00 PM',
      value: '09:00-12:00',
    },
    {
      label: '12:00 PM - 3:00 PM',
      value: '12:00-15:00',
    },
    {
      label: '03:00 PM - 6:00 PM',
      value: '15:00-18:00',
    },
  ];

  schedules: Select2Option[] = [];
  currentShift: string = '';
  ShiftWarning: boolean = false;

  updateService(value: any) {
    if (value == '') {
      return;
    }
    this.ServiceWarning = false;
    this.currentService = value;
    this.updateScheduelsData();
  }

  updateLocation(value: any, LocationButton: HTMLButtonElement) {
    if (value == '') {
      return;
    }
    this.LocationWarning = false;
    this.currentLocation = value;
    LocationButton.disabled = false;
  }

  minDate: string = '';

  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router,
    private serviceService: ServiceService,
    private regionService: RegionService
  ) {
    this.minDate = new Date().toISOString().split('T')[0];
  }

  ngAfterViewInit(): void {
    this.regionService.getSystemRegions().subscribe({
      next: (e) => {
        if (e.data.length > 0) {
          this.RegionData = this.RegionToSelect2Option(e.data);
          this.skeletonLoadingFlag = 2;
        } else this.skeletonLoadingFlag = 1;
      },
      error: () => (this.skeletonLoadingFlag = 1),
    });
  }

  clearSchedules(schedulesSelect2Component: Select2) {
    schedulesSelect2Component.value = '';
    this.ScheduleItemDisabledFlag = true;
    this.schedules = [];
    this.updateScheduelsData();
  }

  updateScheduelsData() {
    if (this.currentService && this.currentLocation && this.day.value) {
      this.serviceService
        .GetAvailableSchedules(
          this.day.value,
          +this.currentService,
          +this.currentLocation
        )
        .subscribe({
          next: (e) => {
            if (e.data.length > 0) {
              this.schedules = e.data.map(({ startTime, endTime }) => ({
                label: `${startTime.substring(0, 5)} - ${endTime.substring(
                  0,
                  5
                )}`,
                value: startTime + '-' + endTime,
              }));
              this.ScheduleItemDisabledFlag = false;
            } else
              this.toastr.info(
                'Try to select another date',
                'No Schedules Available'
              );
          },
          error: () =>
            this.toastr.error(
              'Try refreshing the page',
              'Something went wrong'
            ),
        });
    }
  }

  updateSelectedSchedule(value: any) {
    this.currentShift = value;
    this.updateScheduelsData();
  }

  IsBookingFormValid() {
    return (
      this.currentService &&
      this.currentLocation &&
      this.day.value &&
      this.currentShift
    );
  }

  SubmitRegion(caller: Select2, LocationButton: HTMLButtonElement) {
    this.loadingFlag = true;
    this.serviceService
      .getAvailableServiceByRegion(+this.currentLocation)
      .subscribe(
        (e) => {
          if (e.data.length > 0) {
            this.ServiceData = this.ServicesToSelect2Option(e.data);
            this.SwitchForm = true;
          } else {
            this.RegionData.find(
              (region) => region.value == this.currentLocation
            )!.disabled = true;
            this.currentLocation = '';
            caller.value = '';
            this.toastr.warning(
              'Unfortunately, no services available for this region.'
            );
            LocationButton.disabled = true;
          }
          this.loadingFlag = false;
        },
        (error) => {
          this.loadingFlag = false; // Handle error case as well
          LocationButton.disabled = true;
        }
      );
  }

  SubmitBookingFilter() {
    if (!this.IsBookingFormValid()) return;
    console.log(this.currentShift)
    console.log(this.day)
    console.log(this.currentLocation)
    const dateSplit = this.currentShift.split('-');
    this.router.navigateByUrl(
      `resource?serviceId=1&date=${this.day.value}&from=${dateSplit[0]}&to=${dateSplit[1]}&&regionId=${this.currentLocation}`
    );
  }

  private FormatNgbDate(date: any) {
    const { year, month, day } = date;
    const formattedMonth = month.toString().padStart(2, '0');
    const formattedDay = day.toString().padStart(2, '0');
    return year + '-' + formattedMonth + '-' + formattedDay;
  }

  private RegionToSelect2Option(Regions: Region[]) {
    return Regions.map((region) => {
      return { value: region.id, label: region.name, disabled: false };
    });
  }

  private ServicesToSelect2Option(Services: ServiceScheduleVM[]) {
    return Services.map((Service) => {
      return { value: Service.id, label: Service.name };
    });
  }
  backToRegionForm() {
    this.SwitchForm = !this.SwitchForm;
    this.currentLocation = '';
  }
}
