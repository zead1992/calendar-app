import { Component, OnInit } from '@angular/core';
import {Store} from "@ngxs/store";
import {Observable} from "rxjs";
import {CalendarState, DayState} from "../../store/states/calendar.state";
import {IReminderNew} from "../../interfaces/reminder.form";
import orderBy from "lodash-es/orderBy";
import {CITY_LIST} from "../../static/city.list";

@Component({
  selector: 'app-reminders-dialog',
  templateUrl: './reminders-dialog.component.html',
  styleUrls: ['./reminders-dialog.component.scss']
})
export class RemindersDialogComponent implements OnInit {

  public panelClosed : boolean = true;

  public dayState$ : Observable<DayState>;

  constructor(
    private _store : Store
  ) { }

  ngOnInit(): void {
   this.dayState$ = this._store.select(CalendarState.selectedDayState);
  }

  public orderReminderByDate(reminders)  : IReminderNew[]{
    const ordered = orderBy(reminders,['date']);
    return ordered;
  }

  //get city name
  public getCityName(cityId) : string{
    const cityList  = CITY_LIST;
    const city = cityList.find(val => val.id == cityId);

    return city.name

  }

}
