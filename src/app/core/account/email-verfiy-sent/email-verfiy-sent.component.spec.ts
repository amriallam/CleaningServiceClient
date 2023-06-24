import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailVerfiySentComponent } from './email-verfiy-sent.component';

describe('EmailVerfiySentComponent', () => {
  let component: EmailVerfiySentComponent;
  let fixture: ComponentFixture<EmailVerfiySentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailVerfiySentComponent]
    });
    fixture = TestBed.createComponent(EmailVerfiySentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
