import {FormBuilder, FormControl, FormGroup, ValidatorFn} from "@angular/forms";
import {Subject} from "rxjs";
import {CompareState} from "./compare-state";

export class BaseForm<FormType, FormValuesType> {

  private keyObject = Object.keys;

  //form
  public form: FormGroup;
  //form state
  public compareState: CompareState<FormValuesType>;

  constructor(
    private _fb: FormBuilder,
    private _formControls: FormType,
    private _destroySubject: Subject<boolean>
  ) {

    //init compare state
    this.compareState = new CompareState();

    //init form
    this.createForm();

  }

  /*form key*/
  public formKey(_str: keyof FormType) {
    return _str;
  }

  /*set form shared validators*/
  public setFormSharedValidators(_validators: ValidatorFn[]) {
    _validators.forEach((_validator) => {
      this.form
        .setValidators(_validator);
    });
  }

  /*create form*/
  private createForm() {
    this.form = this._fb.group({});
    //create form controls
    this.keyObject(this._formControls)
      .forEach((_controlName: string) => {
        const currentCtl = this._formControls[_controlName];
        if (currentCtl) {
          this.form.addControl(
            _controlName,
            new FormControl(currentCtl.val,
              currentCtl.validators)
          );
        }
      });


    //set initial state
    this.compareState.setInitialState(this.form.getRawValue());

  }


}
