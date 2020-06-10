import {ValidatorFn} from "@angular/forms";
import {Color} from "@angular-material-components/color-picker";

export interface IFormVal<ValType> {
  val: ValType;
  validators?: ValidatorFn[];
}

export type IReminderNewForm = {
  text: IFormVal<string> | string;
  date:IFormVal<Date> | Date;
  city:IFormVal<number> | number;
  color:IFormVal<Color> | Color;
}
