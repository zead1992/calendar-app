import {IReminderNew} from "../../interfaces/reminder.form";
import {DayState} from "../states/calendar.state";

export class AddReminder {
  static readonly type = '[Reminder API] add new reminder';

  constructor(public payload: IReminderNew) {
  }
}

//on new reminder added
export class OnNewReminderAdded {
  static readonly type = '[Reminder Added] on success';

  constructor() {
  }
}


export class EditReminder {
  static readonly type = '[Reminder API] edit reminder';

  constructor(public payload: IReminderNew,public currentReminder : IReminderNew) {
  }
}

export class OnEditReminder {
  static readonly type = '[Reminder Added] on success';

  constructor() {
  }
}

//
export class RemoveReminder {
  static readonly type = '[Reminder API] remove reminder';

  constructor(public payload : IReminderNew) {
  }
}

export class RemoveAllReminder {
  static readonly type = '[Reminder API] remove all reminders';

  constructor(public payload : IReminderNew[]) {
  }
}

//calendar navigation
export class NextMonth {
  static readonly type = '[Calendar Nav] next month';

  constructor() {
  }
}

export class PreviousMonth {
  static readonly type = '[Calendar Nav] previous month';

  constructor() {
  }
}

export class SetSelectedDayState {
  static readonly type = '[Calendar State] set day state';

  constructor(public payload: DayState) {
  }
}

export class SetSelectedReminder {
  static readonly type = '[Calendar State] set reminder';

  constructor(public payload: IReminderNew) {
  }
}


