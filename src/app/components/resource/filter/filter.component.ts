import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {


  @Output() filtersChanged = new EventEmitter<any>();

  resourceNameFilter: string = '';
   priceFilter: number | null = null;

  rateFilter: number | null = null;



  applyFilters() {
    const filters = {
      resourceName: this.resourceNameFilter,
      price: this.priceFilter,
      rate: this.rateFilter
    };
    this.filtersChanged.emit(filters);
  }
  positiveNumberValidator: ValidatorFn = (control: AbstractControl) => {
    const value = control.value;
    if (value && value <= 0) {
      return { positiveNumber: true };
    }
    return null;
  };

}
