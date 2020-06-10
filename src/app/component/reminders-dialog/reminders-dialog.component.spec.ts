import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemindersDialogComponent } from './reminders-dialog.component';

describe('RemindersDialogComponent', () => {
  let component: RemindersDialogComponent;
  let fixture: ComponentFixture<RemindersDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemindersDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemindersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
