import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
interface City {
  name: string;
  code: string;
}
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  From: Date | undefined;
  To: Date | undefined;
  cities: City[] | undefined;

  filterForm: FormGroup;

  selectedCity: City | undefined;

  constructor(private formBuilder: FormBuilder){
    this.filterForm = this.formBuilder.group({
      From : [Date.now],
      To: [Date.now ],
      Rigion : ['' , Validators.required]
    })
  }
  ngOnInit() {
      this.cities = [
          { name: 'New York', code: 'NY' },
          { name: 'Rome', code: 'RM' },
          { name: 'London', code: 'LDN' },
          { name: 'Istanbul', code: 'IST' },
          { name: 'Paris', code: 'PRS' }
      ];

  }

  submit(){
    if(!this.filterForm.valid)
    {
      return;
    }    
    
  }
  getControl(fullName: any) {
    return this.filterForm?.get(fullName);
  }
}
