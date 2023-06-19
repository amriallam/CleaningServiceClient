import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookinListItemsComponent } from './bookin-list-items.component';

describe('BookinListItemsComponent', () => {
  let component: BookinListItemsComponent;
  let fixture: ComponentFixture<BookinListItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookinListItemsComponent]
    });
    fixture = TestBed.createComponent(BookinListItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
