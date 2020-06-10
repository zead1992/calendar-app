import {ValidatorFn} from "@angular/forms";

export interface IFormVal<ValType> {
  val: ValType;
  validators?: ValidatorFn[];
}

export type IReminderNewForm = {
  text: IFormVal<string> | string;
  date: IFormVal<Date> | Date;
  city: IFormVal<number> | number;
  color: IFormVal<IColor> | IColor;
}

export type IReminderNew = {
  id: string;
  text: string;
  date: Date;
  city: number;
  color: IColor;
}

//edit form
export type IReminderEditForm = {
  id: IFormVal<string> | string
} & IReminderNewForm;

//color type
export type IColor = {
  a: number
  b: number
  g: number
  hex: string
  r: number
  rgba: string
  roundA: number
}
