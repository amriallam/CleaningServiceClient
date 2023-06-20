import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Select2Data } from 'ng-select2-component';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})

export class SchedulerComponent {

  form: FormGroup;
  get day() { return this.form.controls['day'] }
  get startTime() { return this.form.controls['startTime'] }
  get endTime() { return this.form.controls['endTime'] }

  LocationData: Select2Data;
  currentLocation: string = "";
  LocationWarning: boolean = false;

  ServiceData: Select2Data;
  currentService: string = "";
  ServiceWarning: boolean = false;

  minDate: NgbDateStruct;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    let today = new Date().toISOString().split('T')[0].split('-');
    this.minDate = { year: +today[0], month: +today[1], day: +today[2] };
    this.form = this.formBuilder.group({
      day: ['', [Validators.required]],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required,]],
    });
    this.LocationData = [
      {
        label: 'Alexandria',
        options: [
          { value: 'Alexandria', label: 'Alexandria' },
          { value: 'Girga', label: 'Girga' },
          { value: 'Rosetta', label: 'Rosetta' },
        ],
      },
      {
        label: 'Gharbia',
        options: [
          { value: 'Tanta', label: 'Tanta' },
          { value: 'El-Mahla', label: 'El-Mahla' },
        ],
      },
      {
        label: 'Suez',
        options: [
          { value: 'Port Said', label: 'Port Said' },
          { value: 'Ismailia', label: 'Ismailia' },
          { value: 'El-Arish', label: 'El-Arish' },
        ],
      },
      {
        label: 'Luxor',
        options: [
          { value: 'Luxor', label: 'Luxor' },
          { value: 'Esna', label: 'Esna' },
          { value: 'Armant', label: 'Armant' },
        ],
      },
      {
        label: 'Cairo',
        options: [
          { value: 'Giza', label: 'Giza' },
          { value: 'Shubra El-Kheima', label: 'Shubra El-Kheima' },
        ],
      },
    ];
    this.ServiceData = [
      {
        label: '',
        options: [
          { value: '1', label: 'Kitchen Cleaning' },
          { value: '2', label: 'Car Cleaning' },
          { value: '3', label: 'Factory Cleaning' },
          { value: '4', label: 'Office Cleaning' }
        ],
      },
    ]
  }

  updateService(value: any) {
    if (value == "") { return; }
    this.ServiceWarning = false;
    this.currentService = value;
  }

  updateLocation(value: any) {
    if (value == "") { return; }
    this.LocationWarning = false;
    this.currentLocation = value;
  }

  IsFormValid() {
    if (this.currentLocation == '' || this.currentService == '' || this.form.invalid) return false;
    return true;
  }

  onSubmit() {
    if (this.currentLocation == '') this.LocationWarning = true;
    if (this.currentService == '') this.ServiceWarning = true;
    if (!this.IsFormValid()) return;
    this.router.navigateByUrl(`resource?serviceId=1&date=${this.FormatNgbDate(this.day.value)}&from=${this.startTime.value}:00&to=${this.endTime.value}:00`);
  }

  private FormatNgbDate(date: any) {
    const { year, month, day } = date;
    const formattedMonth = month.toString().padStart(2, '0');
    const formattedDay = day.toString().padStart(2, '0');
    return year + '-' + formattedMonth + '-' + formattedDay;
  }

}
