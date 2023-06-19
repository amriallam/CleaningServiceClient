import { TestBed } from '@angular/core/testing';

import { ResourseDetailsService } from './resourse-details.service';

describe('ResourseDetailsService', () => {
  let service: ResourseDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResourseDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
