import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent {
  form: FormGroup;
  get day(){return this.form.controls['day']}
  get startTime(){return this.form.controls['startTime']}
  get endTime(){return this.form.controls['endTime']}
  get location(){return this.form.controls['location']}

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      day: ['', [Validators.required]],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required,]],
      location: ['',[Validators.required]]
    });
  }

  onSubmit() {
    console.log(this.form.value);
  }

}
