import {BehaviorSubject} from "rxjs";
import isEqual from "lodash-es/isEqual";


export class CompareState<StateType> {

  private readonly initialStateBeh: BehaviorSubject<StateType>;
  private readonly currentStateBeh: BehaviorSubject<StateType>;

  constructor() {
    this.initialStateBeh = new BehaviorSubject<StateType>(null);
    this.currentStateBeh = new BehaviorSubject<StateType>(null);
  }

  /*set initial state*/
  public setInitialState(_obj: StateType) {
    this.initialStateBeh.next(_obj);
  }

  /*set current state*/
  public setCurrentState(_obj: StateType) {
    this.currentStateBeh.next(_obj);
  }

  /*state match*/
  public stateMatch(): boolean {

    return isEqual(this.initialStateBeh.getValue(), this.currentStateBeh.getValue());
  }


}
