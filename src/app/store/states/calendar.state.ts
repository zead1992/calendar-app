//calendar state
import {Utility} from "../../utilities/utility";
import {Action, createSelector, Selector, State, StateContext} from "@ngxs/store";
import {getMonth, getDate} from "date-fns/esm";
import {
  AddReminder, EditReminder,
  NextMonth, OnEditReminder,
  OnNewReminderAdded,
  PreviousMonth, RemoveAllReminder, RemoveReminder,
  SetSelectedDayState, SetSelectedReminder
} from "../actions/calendar.actions";
import {BaseUiService} from "../../services/base-ui.service";
import {Injectable} from "@angular/core";
import {IColor, IReminderNew} from "../../interfaces/reminder.form";

export interface CalendarStateModel {
  calendar: {
    '0': MonthState,
    '1': MonthState,
    '2': MonthState,
    '3': MonthState,
    '4': MonthState,
    '5': MonthState,
    '6': MonthState,
    '7': MonthState,
    '8': MonthState,
    '9': MonthState,
    '10': MonthState,
    '11': MonthState,
  },
  selectedMonth: number;
  selectedDayState: DayState;
  selectedReminder: IReminderNew
}

export interface MonthState {
  index: number;
  name: string;
  startDay: number;
  day: DayState[];
}

export interface DayState {
  date: number;
  isWeekend: boolean;
  fullDate: Date;
  reminders: {
    id: string;
    text: string;
    date: Date;
    city: number;
    color: IColor;
  }[];
}


//initial calendar state
export const initialCalendarState: CalendarStateModel = {
  calendar: {
    '0': Utility.initMonthState(0),
    '1': Utility.initMonthState(1),
    '2': Utility.initMonthState(2),
    '3': Utility.initMonthState(3),
    '4': Utility.initMonthState(4),
    '5': Utility.initMonthState(5),
    '6': Utility.initMonthState(6),
    '7': Utility.initMonthState(7),
    '8': Utility.initMonthState(8),
    '9': Utility.initMonthState(9),
    '10': Utility.initMonthState(10),
    '11': Utility.initMonthState(11),
  },
  selectedMonth: getMonth(new Date()),
  selectedDayState: null,
  selectedReminder: null
};


//state class
@State<CalendarStateModel>({
  name: 'calendar',
  defaults: initialCalendarState
})
@Injectable()
export class CalendarState {

  constructor(
    private _baseUiService: BaseUiService
  ) {
  }

  //calendar state
  @Selector([CalendarState])
  static calendarState(state: CalendarStateModel) {
    return state;
  }

  //selected month
  @Selector([CalendarState])
  static currentMonth(state: CalendarStateModel) {
    return state.selectedMonth;
  }

  //select month state
  static getMonthState(index: number) {
    return createSelector([CalendarState], (state: CalendarStateModel) => {
      return state.calendar[index]
    });
  }

  //select prev month state
  static getPrevMonthSlice(currentMonthIndex: number) {
    return createSelector([CalendarState], (state: CalendarStateModel) => {

      let prevMonthSlice: MonthState;

      const currentMonthState: MonthState = state.calendar[currentMonthIndex];
      const prevMonthState: MonthState = state.calendar[currentMonthIndex - 1];

      if (currentMonthIndex == 0) {
        prevMonthSlice = {
          index: 11,
          name: Utility.monthStatic()["11"],
          startDay: null,
          day: []
        };

        for (let i = 0; i < currentMonthState.startDay; i++) {
          prevMonthSlice.day.push({
            date: null,
            isWeekend: false,
            reminders: [],
            fullDate: null
          })
        }

        return prevMonthSlice;
      }


      prevMonthSlice = {
        ...prevMonthState,
        day: prevMonthState.day.slice(prevMonthState.day.length - currentMonthState.startDay, prevMonthState.day.length)
      };

      return prevMonthSlice;

    });
  }

  static getNextMonthSlice(currentMonthIndex: number) {
    return createSelector([CalendarState], (state: CalendarStateModel) => {

      let nextMonthSlice: MonthState;

      if (currentMonthIndex == 11) {
        return null;
      }
      const currentMonthState: MonthState = state.calendar[currentMonthIndex];
      const nextMonthState: MonthState = state.calendar[currentMonthIndex + 1];

      nextMonthSlice = {
        ...nextMonthState,
        day: nextMonthState.day.slice(0, 42 - currentMonthState.startDay - currentMonthState.day.length)
      };


      return nextMonthSlice;

    });
  }

  //selected day sate
  @Selector([CalendarState])
  static selectedDayState(state: CalendarStateModel) {
    return state.selectedDayState;
  }

  //selected reminder
  @Selector([CalendarState])
  static selectedReminder(state : CalendarStateModel){
    return state.selectedReminder;
  }

  @Action(NextMonth)
  nextMonth({getState, patchState}: StateContext<CalendarStateModel>) {
    patchState({selectedMonth: getState().selectedMonth + 1});
  }

  @Action(PreviousMonth)
  previousMonth({getState, patchState}: StateContext<CalendarStateModel>) {
    patchState({selectedMonth: getState().selectedMonth - 1});
  }

  @Action(AddReminder)
  addReminder({getState, patchState, setState, dispatch}: StateContext<CalendarStateModel>, {payload}: AddReminder) {
    const parseDate = payload.date;
    const reminderMonth = getMonth(parseDate);
    const reminderDate = getDate(parseDate);
    const monthState: MonthState = getState().calendar[reminderMonth];
    monthState.day[reminderDate - 1].reminders.push({...payload});
    patchState({
      calendar: {
        ...getState().calendar,
        [String(reminderMonth)]: monthState
      }
    });
    dispatch(new OnNewReminderAdded());

  }

  //edit reminder
  @Action(EditReminder)
  editReminder({getState, patchState, setState, dispatch}: StateContext<CalendarStateModel>, {payload,currentReminder}: EditReminder) {
    const parseDate = payload.date;
    const reminderMonth = getMonth(parseDate);
    const reminderDate = getDate(parseDate);
    const monthState: MonthState = getState().calendar[reminderMonth];
    const currentReminderDate = getDate(currentReminder.date);
    const reminder = monthState.day[reminderDate - 1].reminders.find(val=>val.id == payload.id);
    const reminderIndex = monthState.day[reminderDate - 1].reminders.indexOf(reminder);
    //check if date changed
    if(currentReminderDate !== reminderDate){
      dispatch(new RemoveReminder(currentReminder));
      dispatch(new AddReminder(payload));
    }else{
      monthState.day[reminderDate - 1].reminders[reminderIndex] = {...payload};
      patchState({
        calendar: {
          ...getState().calendar,
          [String(reminderMonth)]: monthState
        }
      });
    }

    dispatch(new OnEditReminder());

  }

  @Action(RemoveReminder)
  removeReminder({getState,patchState}:StateContext<CalendarStateModel>,{payload}:RemoveReminder){
    const parseDate = payload.date;
    const reminderMonth = getMonth(parseDate);
    const reminderDate = getDate(parseDate);
    const monthState: MonthState = getState().calendar[reminderMonth];
    const reminder = monthState.day[reminderDate - 1].reminders.find(val=>val.id == payload.id);
    const reminderIndex = monthState.day[reminderDate - 1].reminders.indexOf(reminder);
    monthState.day[reminderDate - 1].reminders.splice(reminderIndex,1);
    patchState({
      calendar: {
        ...getState().calendar,
        [String(reminderMonth)]: monthState
      }
    });
  }

  @Action(RemoveAllReminder)
  removeAllReminder({getState,patchState}:StateContext<CalendarStateModel>,{payload}:RemoveAllReminder){
    const parseDate = payload[0].date;
    const reminderMonth = getMonth(parseDate);
    const reminderDate = getDate(parseDate);
    const monthState: MonthState = getState().calendar[reminderMonth];

    const indexes : number[] = [];
    payload.forEach((_reminder)=>{
      let reminder = monthState.day[reminderDate - 1].reminders.find(val=>val.id == _reminder.id);
      let reminderIndex = monthState.day[reminderDate - 1].reminders.indexOf(reminder);
      indexes.push(reminderIndex);
    });
    monthState.day[reminderDate - 1].reminders = monthState.day[reminderDate - 1]
      .reminders
      .filter((val,index) => indexes.indexOf(index) == -1);

    patchState({
      calendar: {
        ...getState().calendar,
        [String(reminderMonth)]: monthState
      }
    });
  }

  @Action(OnNewReminderAdded)
  onNewReminderAdded() {
    this._baseUiService.showSnackBar({msg: 'new reminder Added'});
  }

  @Action(OnEditReminder)
  onEditReminder() {
    this._baseUiService.showSnackBar({msg: 'reminder data updated'});
  }

  @Action(SetSelectedDayState)
  setSelectedDayState({patchState}: StateContext<CalendarStateModel>, {payload}: SetSelectedDayState) {
    patchState({
      selectedDayState: payload
    });
  }

  @Action(SetSelectedReminder)
  setSelectedReminder({patchState}: StateContext<CalendarStateModel>, {payload}: SetSelectedReminder) {
    patchState({
      selectedReminder: payload
    });
  }

}

