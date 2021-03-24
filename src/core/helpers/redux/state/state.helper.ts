import {produce} from "immer";
import deepmerge from 'deepmerge';
import { IStrategy } from "./transform.strategy";

export class StateHelper<State extends object> {
  constructor(
    protected _state: State,
    protected _strategy: IStrategy<State>
  ) {}

  public save(payload: any, key?: keyof State): void {
    const newState = this._strategy.transform(payload, key);
    produce(this._state, (draft: State) => {
        draft = this.merge(draft, newState);
        this.setState(draft);
    });
  }

  public remove(key: keyof State | number): void {
    produce(this._state, (draft: State) => {
      if(Array.isArray(draft) && draft[key]) {
        const index = key as number;
        draft.splice(index, 1);
      } else {
        delete draft[(key as keyof State)];
      }

      this.setState(draft);
    });
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

  private setState(newState: State): State {
    return this.merge(this._state, newState);
  }

  private merge(state: State, newState: State): State {
    return deepmerge(state, newState);
  }
}
