import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReminderFormComponent } from './new-reminder-form.component';

describe('NewReminderFormComponent', () => {
  let component: NewReminderFormComponent;
  let fixture: ComponentFixture<NewReminderFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewReminderFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewReminderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
