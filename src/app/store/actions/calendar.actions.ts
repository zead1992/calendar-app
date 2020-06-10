import {IReminderNew, IReminderNewForm} from "../../interfaces/reminder.form";

export class AddReminder {
  static readonly type = '[Reminder API] add new reminder';

  constructor(public payload :IReminderNew) {
  }
}

//on new reminder added
export class OnNewReminderAdded {
  static readonly type ='[Reminder Added] on success';
  constructor() {
  }
}


export class EditReminder {
  static readonly type = '[Reminder API] edit reminder';

  constructor() {
  }
}

//
export class RemoveReminder {
  static readonly type = '[Reminder API] remove reminder';

  constructor() {
  }
}

export class RemoveAllReminder {
  static readonly type = '[Reminder API] remove all reminders';

  constructor() {
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


