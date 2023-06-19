import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListResourceComponent } from './list-resource.component';

describe('ListResourceComponent', () => {
  let component: ListResourceComponent;
  let fixture: ComponentFixture<ListResourceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListResourceComponent]
    });
    fixture = TestBed.createComponent(ListResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
