import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReminderFormComponent } from './edit-reminder-form.component';

describe('EditReminderFormComponent', () => {
  let component: EditReminderFormComponent;
  let fixture: ComponentFixture<EditReminderFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditReminderFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditReminderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
