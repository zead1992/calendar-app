import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngxs/store";
import {Observable, Subject} from "rxjs";
import {CalendarState, CalendarStateModel, MonthState} from "../../store/states/calendar.state";
import {getMonth} from "date-fns/esm";
import {takeUntil} from "rxjs/operators";
import {NextMonth, PreviousMonth} from "../../store/actions/calendar.actions";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnDestroy {

  private readonly destroySubject: Subject<boolean>;

  private readonly currentMonth$: Observable<number>;
  public calendarState$: Observable<CalendarStateModel>;
  public prevMonthSlice$: Observable<MonthState>;
  public currentMonthState$: Observable<MonthState>;
  public nextMonthSlice$: Observable<MonthState>;


  constructor(
    private _store: Store
  ) {
    this.destroySubject = new Subject<boolean>();
  }

  ngOnInit(): void {
    this.calendarState$ = this._store.select(CalendarState.calendarState);

    this._store.select(CalendarState.currentMonth)
      .pipe(
        takeUntil(this.destroySubject)
      )
      .subscribe((val) => {
        this.prevMonthSlice$ = this._store.select(CalendarState.getPrevMonthSlice(val));
        this.currentMonthState$ = this._store.select(CalendarState.getMonthState(val));
        this.nextMonthSlice$ = this._store.select(CalendarState.getNextMonthSlice(val));
      });


  }

  ngOnDestroy(): void {
    this.destroySubject.next(true);
  }

  //navigate to next month
  public nextMonth() {
    this._store.dispatch(new NextMonth());
  }

  //navigate tp previous month
  public prevMonth() {
    this._store.dispatch(new PreviousMonth());
  }

}
