import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ServiceSchedule } from 'src/app/core/ViewModels/service-schedule';
declare function select2jquery(className:string): any;
@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements AfterViewInit {
  form: FormGroup;

  get day() { return this.form.controls['day'] }
  get startTime() { return this.form.controls['startTime'] }
  get endTime() { return this.form.controls['endTime'] }
  get service() { return this.form.controls['service'] }
  get location() { return this.form.controls['location'] }

  cities = [
    'Cairo',
    'Alexandria',
    'Giza',
    'Shubra El-Kheima',
    'Port Said',
    'Suez',
    'Luxor',
    'Aswan',
    'Tanta',
    'Mansoura',
    'Damietta',
    'Zagazig',
    'Asyut',
    'Ismailia',
    'Fayoum',
    'Beni Suef',
    'Sohag',
    'Shibin El Kom',
    'Banha',
    'Arish'
  ];

  availableServices: ServiceSchedule[] = [{ id: 1, name: 'Office Cleaning' }, { id: 2, name: 'Kitchen Cleaning' }, {id:3,name:'Car Cleaning'}, {id:4,name:'Factory Cleaning'}]
  minDate: NgbDateStruct

  constructor(private formBuilder: FormBuilder,private router:Router) {
    let today = new Date().toISOString().split('T')[0].split('-');
    this.minDate = { year: +today[0], month: +today[1], day: +today[2] };
    this.form = this.formBuilder.group({
      day: ['', [Validators.required]],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required,]],
      service: ['', [Validators.required]],
      location: ['', [Validators.required]]
    });
  }
  ngAfterViewInit(): void {
    select2jquery('.select2jquery');
  }

  onSubmit() {
    if(this.form.valid) {
      this.router.navigateByUrl(`resource?serviceId=1&date=${this.FormatNgbDate(this.day.value)}&from=${this.startTime.value}:00&to=${this.endTime.value}:00`);
    }
  }

  private FormatNgbDate(date:any){
    const { year, month, day } = date;
      const formattedMonth = month.toString().padStart(2, '0');
      const formattedDay = day.toString().padStart(2, '0');
      return year+'-'+formattedMonth+'-'+formattedDay;
  }

}
