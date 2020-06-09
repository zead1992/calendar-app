import {Component, OnDestroy, OnInit} from '@angular/core';
import {IReminderNewForm} from "../../interfaces/reminder.form";
import {BaseForm} from "../../utilities/base-form";
import {FormBuilder, Validators} from "@angular/forms";
import {Subject} from "rxjs";

@Component({
  selector: 'app-new-reminder-form',
  templateUrl: './new-reminder-form.component.html',
  styleUrls: ['./new-reminder-form.component.scss']
})
export class NewReminderFormComponent implements OnInit, OnDestroy {

  private readonly destroySubject: Subject<boolean>;

  private newFormControls: IReminderNewForm;
  public newForm: BaseForm<IReminderNewForm, IReminderNewForm>;

  constructor(
    private _fb: FormBuilder,
  ) {
    this.destroySubject = new Subject<boolean>();
  }

  ngOnInit(): void {
    this.newFormControls = {
      text: {val: null, validators: [Validators.required]},
      date: {val: null, validators: [Validators.required]},
      city: {val: null, validators: [Validators.required]},
      color:{val:null,validators:[Validators.required]}
    };

    this.newForm = new BaseForm<IReminderNewForm, IReminderNewForm>
    (this._fb, this.newFormControls, this.destroySubject);

  }

  ngOnDestroy(): void {
    this.destroySubject.next(true);
  }

}
