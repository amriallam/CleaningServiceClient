import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAvailableResourceComponent } from './list-available-resource.component';

describe('ListAvailableResourceComponent', () => {
  let component: ListAvailableResourceComponent;
  let fixture: ComponentFixture<ListAvailableResourceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListAvailableResourceComponent]
    });
    fixture = TestBed.createComponent(ListAvailableResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
