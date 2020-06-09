import {Component, Input, OnInit} from '@angular/core';
import {Store} from "@ngxs/store";
import {Observable} from "rxjs";
import {CalendarState, CalendarStateModel, MonthState} from "../../store/states/calendar.state";
import {getMonth} from "date-fns/esm";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  private currentMonth: number;

  public calendarState$: Observable<CalendarStateModel>;

  public prevMonthSlice$: Observable<MonthState>;
  public currentMonthState$: Observable<MonthState>;
  public nextMonthSlice$: Observable<MonthState>;


  constructor(
    private _store: Store
  ) {
    this.currentMonth = getMonth(new Date(2020,4));
  }

  ngOnInit(): void {
    this.calendarState$ = this._store.select(CalendarState.calendarState);

    this.prevMonthSlice$ = this._store.select(CalendarState.getPrevMonthSlice(this.currentMonth));
    this.currentMonthState$ = this._store.select(CalendarState.getMonthState(this.currentMonth));
    this.nextMonthSlice$ = this._store.select(CalendarState.getNextMonthSlice(this.currentMonth));


  }

}
