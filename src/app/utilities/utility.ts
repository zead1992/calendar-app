import {getDaysInMonth, getYear, startOfMonth, getDay,isWeekend} from "date-fns/esm";
import {DayState, MonthState} from "../store/states/calendar.state";

export class Utility {


  static monthStatic() {
    return {
      '0': 'January',
      '1': 'February',
      '2': 'March',
      '3': 'April',
      '4': 'May',
      '5': 'June',
      '6': 'July',
      '7': 'August',
      '8': 'September',
      '9': 'October',
      '10': 'November',
      '11': 'December'
    }
  }

  static initMonthDays(index: number): DayState[] {

    const daysCount = getDaysInMonth(new Date(getYear(new Date().getUTCFullYear()), index));
    const monthDays: DayState[] = [];
    for (let i = 1; i <= daysCount; i++) {
      monthDays.push({
        date: i,
        reminders: [],
        isWeekend:isWeekend(new Date(new Date().getUTCFullYear(),index,i))
      });
    }

    return monthDays;
  }

  static getMonthStartDay(index: number) {
    const monthStartDate: Date = startOfMonth(new Date(getYear(new Date()), index));
    const monthFirstDay: number = getDay(monthStartDate);
    return monthFirstDay;
  }


  static initMonthState(index: number): MonthState {
    return {
      index:index,
      name: this.monthStatic()[index],
      startDay: this.getMonthStartDay(index),
      day: this.initMonthDays(index)
    }
  }
}
