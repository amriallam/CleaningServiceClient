/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ClientBookingService } from './ClientBooking.service';

describe('Service: ClientBooking', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientBookingService]
    });
  });

  it('should ...', inject([ClientBookingService], (service: ClientBookingService) => {
    expect(service).toBeTruthy();
  }));
});
