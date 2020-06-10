import {Component, OnDestroy, OnInit} from '@angular/core';
import {IReminderNewForm} from "../../interfaces/reminder.form";
import {BaseForm} from "../../utilities/base-form";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {BehaviorSubject, ReplaySubject, Subject} from "rxjs";
import {ICity} from "../../interfaces/city.interface";
import {CITY_LIST} from "../../static/city.list";
import {debounceTime, distinctUntilChanged, takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-new-reminder-form',
  templateUrl: './new-reminder-form.component.html',
  styleUrls: ['./new-reminder-form.component.scss']
})
export class NewReminderFormComponent implements OnInit, OnDestroy {

  private readonly destroySubject: Subject<boolean>;

  private newFormControls: IReminderNewForm;
  public newForm: BaseForm<IReminderNewForm, IReminderNewForm>;

  //city control
  private cityListInitial: BehaviorSubject<ICity[]>;
  public citySearchControl: FormControl;
  public cityListBeh: BehaviorSubject<ICity[]>;

  constructor(
    private _fb: FormBuilder,
  ) {
    this.destroySubject = new Subject<boolean>();
  }

  ngOnInit(): void {

    this.newFormControls = {
      text: {val: null, validators: [Validators.required,Validators.maxLength(30)]},
      date: {val: null, validators: [Validators.required]},
      city: {val: null, validators: [Validators.required]},
      color: {val: null, validators: [Validators.required]}
    };

    //new reminder form init
    this.newForm = new BaseForm<IReminderNewForm, IReminderNewForm>
    (this._fb, this.newFormControls, this.destroySubject);

    //city search
    this.cityListInitial = new BehaviorSubject<ICity[]>(CITY_LIST);
    this.citySearchControl = new FormControl();
    this.cityListBeh = new BehaviorSubject<ICity[]>(CITY_LIST);
    this.trackCitySearch();

    this.newForm.form.valueChanges.subscribe(()=>{
      console.log(this.newForm.form);
    });

  }

  ngOnDestroy(): void {
    this.destroySubject.next(true);
  }

  private trackCitySearch() {
    this.citySearchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroySubject)
      )
      .subscribe((val: string) => {
        if(!val){
          this.cityListBeh.next(this.cityListInitial.getValue());
          return;
        }
        const cityList = this.cityListInitial.getValue();
        const filteredArray = cityList.filter((res)=> res.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        this.cityListBeh.next(filteredArray);
      });
  }

  //add reminder
  public addReminder(){

  }

}
