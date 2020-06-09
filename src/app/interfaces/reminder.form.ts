import {ValidatorFn} from "@angular/forms";

export interface IFormVal<ValType> {
  val: ValType;
  validators?: ValidatorFn[];
}

export type IReminderNewForm = {
  text: IFormVal<string> | string;
  date:IFormVal<Date> | Date;
  city:IFormVal<number> | number;
  color:IFormVal<string> | string;
}
