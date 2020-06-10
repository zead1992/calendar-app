import {Injectable} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable()
export class BaseUiService {
  constructor(
    private _matSnackBar: MatSnackBar
  ) {
  }

  public showSnackBar(option: { msg: string }) {
    this._matSnackBar.open(option.msg,null,{duration:1000});
  }

}
