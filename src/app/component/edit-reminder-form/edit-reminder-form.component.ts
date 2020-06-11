import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {IReminderEditForm, IReminderNew, IReminderNewForm} from "../../interfaces/reminder.form";
import {BaseForm} from "../../utilities/base-form";
import {ICity} from "../../interfaces/city.interface";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {IOpenWeatherResponse} from "../../interfaces/weather.interface";
import {WeatherService} from "../../services/weather.service";
import {Store} from "@ngxs/store";
import {MatDialogRef} from "@angular/material/dialog";
import {BaseUiService} from "../../services/base-ui.service";
import {CalendarState} from "../../store/states/calendar.state";
import {debounceTime, distinctUntilChanged, takeUntil, tap} from "rxjs/operators";
import {CITY_LIST} from "../../static/city.list";
import {MOCK_WEATHER_DATA} from "../../mocks/weather.mock";
import {getDate, getMonth, parseISO} from "date-fns/esm";
import {EditReminder} from "../../store/actions/calendar.actions";

@Component({
  selector: 'app-edit-reminder-form',
  templateUrl: './edit-reminder-form.component.html',
  styleUrls: ['./edit-reminder-form.component.scss']
})
export class EditReminderFormComponent implements OnInit, OnDestroy {

  private readonly destroySubject: Subject<boolean>;

  //reminder
  public reminder$: Observable<IReminderNew>;

  //edit form
  private editFormControls: IReminderEditForm;
  public editForm: BaseForm<IReminderEditForm, IReminderEditForm>;

  //city control
  private cityListInitial: BehaviorSubject<ICity[]>;
  public citySearchControl: FormControl;
  public cityListBeh: BehaviorSubject<ICity[]>;

  public weatherStatus: IOpenWeatherResponse;

  constructor(
    private _fb: FormBuilder,
    private _weatherService: WeatherService,
    private _store: Store,
    private _matDialogRef: MatDialogRef<EditReminderFormComponent>,
    private _baseUi: BaseUiService
  ) {
    this.destroySubject = new Subject<boolean>();

  }

  ngOnInit(): void {
    this.reminder$ = this._store.select(CalendarState.selectedReminder)
      .pipe(
        tap((reminder) => {
          this.editFormControls = {
            id: {val: reminder.id, validators: []},
            text: {val: reminder.text, validators: [Validators.required, Validators.maxLength(30)]},
            date: {val: reminder.date, validators: [Validators.required]},
            city: {val: reminder.city, validators: [Validators.required]},
            color: {val: reminder.color, validators: [Validators.required]}
          };

          //init form
          this.editForm = new BaseForm<IReminderEditForm, IReminderEditForm>
          (this._fb, this.editFormControls, this.destroySubject);


          //city search
          this.cityListInitial = new BehaviorSubject<ICity[]>(CITY_LIST);
          this.citySearchControl = new FormControl();
          this.cityListBeh = new BehaviorSubject<ICity[]>(CITY_LIST);

          this.trackCitySearch();
          this.trackWeatherState();

        })
      );




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
    this.editForm.form.valueChanges
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

  public editReminder(_currentReminder : IReminderNew) {
    const formValues : IReminderNew = this.editForm.form.getRawValue();
    this._store.dispatch(new EditReminder({...formValues},_currentReminder))
      .pipe(
        takeUntil(this.destroySubject)
      )
      .subscribe(()=>{
        this._matDialogRef.close();
      });
  }

}
