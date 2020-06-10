import {Component, OnDestroy, OnInit} from '@angular/core';
import {IReminderNew, IReminderNewForm} from "../../interfaces/reminder.form";
import {BaseForm} from "../../utilities/base-form";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {BehaviorSubject, ReplaySubject, Subject} from "rxjs";
import {ICity} from "../../interfaces/city.interface";
import {CITY_LIST} from "../../static/city.list";
import {debounceTime, distinctUntilChanged, takeUntil, tap} from "rxjs/operators";
import {WeatherService} from "../../services/weather.service";
import {getMonth, getDate, parseISO} from "date-fns/esm";
import {IOpenWeatherResponse} from "../../interfaces/weather.interface";
import {MOCK_WEATHER_DATA} from "../../mocks/weather.mock";
import {Store} from "@ngxs/store";
import {AddReminder, OnNewReminderAdded} from "../../store/actions/calendar.actions";
import {Color} from "@angular-material-components/color-picker";
import {MatDialogRef} from "@angular/material/dialog";
import {BaseUiService} from "../../services/base-ui.service";

@Component({
  selector: 'app-new-reminder-form',
  templateUrl: './new-reminder-form.component.html',
  styleUrls: ['./new-reminder-form.component.scss']
})
export class NewReminderFormComponent implements OnInit, OnDestroy {

  private readonly destroySubject: Subject<boolean>;

  //new reminder form controls
  private newFormControls: IReminderNewForm;
  public newForm: BaseForm<IReminderNewForm, IReminderNewForm>;

  //city control
  private cityListInitial: BehaviorSubject<ICity[]>;
  public citySearchControl: FormControl;
  public cityListBeh: BehaviorSubject<ICity[]>;

  public weatherStatus: IOpenWeatherResponse;

  constructor(
    private _fb: FormBuilder,
    private _weatherService: WeatherService,
    private _store : Store,
    private _matDialogRef : MatDialogRef<NewReminderFormComponent>,
    private _baseUi:BaseUiService
  ) {
    this.destroySubject = new Subject<boolean>();
  }

  ngOnInit(): void {

    this.newFormControls = {
      text: {val: null, validators: [Validators.required, Validators.maxLength(30)]},
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
    this.trackWeatherState();


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
        if (!val) {
          this.cityListBeh.next(this.cityListInitial.getValue());
          return;
        }
        const cityList = this.cityListInitial.getValue();
        const filteredArray = cityList.filter((res) => res.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        this.cityListBeh.next(filteredArray);
      });
  }

  //get weather on date and city select
  public trackWeatherState() {
    this.newForm.form.valueChanges
      .pipe(
        takeUntil(this.destroySubject)
      )
      .subscribe((res: IReminderNewForm) => {
        if (res.city && res.date) {
          this.weatherStatus = MOCK_WEATHER_DATA;
          const parseDate = parseISO(res.date);
          const month = getMonth(parseDate);
          const day = getDate(parseDate);


          this._weatherService.getWeather({
            day,
            month,
            id: <number>res.city,
            units: 'metric'
          })
            .subscribe(res => this.weatherStatus = res)
        }else{
          //clear weather status
          this.weatherStatus = null;
        }
      })
  }

  //add reminder
  public addReminder() {
    const formValues : IReminderNew = this.newForm.form.getRawValue();
    this._store.dispatch(new AddReminder({...formValues}))
      .pipe(
        takeUntil(this.destroySubject)
      )
      .subscribe(()=>{
        this._matDialogRef.close();
      });
  }

}
