import {produce} from "immer";
import deepmerge from 'deepmerge';
import { IStrategy } from "./transform.strategy";

export class StateHelper<State extends object> {
  constructor(
    protected _state: State,
    protected _strategy: IStrategy<State>
  ) {}

  public save(payload: any, key?: keyof State): void {
    const newPatch = this._strategy.transform(payload, key);
    const state: State = produce(this._state, (draft: State) => {
        draft = this._merge(draft, newPatch);
    });

    this._setState(state);
  }

  public remove(key: keyof State | number): void {
    const state: State = produce(this._state, (draft: State) => {
      if(Array.isArray(draft) && draft[key]) {
        const index = key as number;
        draft.splice(index, 1);
      } else {
        delete draft[(key as keyof State)];
      }
    });

    this._setState(state);
  }

  public update(payload: any, key?: keyof State): void {
    this.save(payload, key);
  }

  public setStrategy(strategy: IStrategy<State>): void {
    this._strategy = strategy;
  }

  public getState(): Readonly<State> {
    return this._state;
  }

  private _setState(newState: State): State {
    return this._merge(this._state, newState);
  }

  private _merge(state: State, newState: State): State {
    return deepmerge(state, newState);
  }
}
