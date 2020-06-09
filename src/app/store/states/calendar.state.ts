//calendar state
import {Utility} from "../../utilities/utility";
import {createSelector, Selector, State} from "@ngxs/store";
import {Observable} from "rxjs";

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
  }
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
  reminders: {
    text: string;
    date: Date;
    city: string;
    color: string;
    weather: string;
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
};


//state class
@State<CalendarStateModel>({
  name: 'calendar',
  defaults: initialCalendarState
})
export class CalendarState {

  @Selector([CalendarState])
  static calendarState(state: CalendarStateModel) {
    return state;
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

      if (currentMonthIndex == 0) {
        return null;
      }
      const currentMonthState: MonthState = state.calendar[currentMonthIndex];
      const prevMonthState: MonthState = state.calendar[currentMonthIndex - 1];

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

      if (currentMonthIndex == 0) {
        return null;
      }
      const currentMonthState: MonthState = state.calendar[currentMonthIndex];
      const nextMonthState: MonthState = state.calendar[currentMonthIndex + 1];

      nextMonthSlice = {
        ...nextMonthState,
        day: nextMonthState.day.slice(0, 35 - currentMonthState.startDay - currentMonthState.day.length)
      };

      console.log(nextMonthSlice);

      return nextMonthSlice;

    });
  }

}

