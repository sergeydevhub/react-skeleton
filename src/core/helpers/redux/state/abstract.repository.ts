import {IStrategy, StateHelper} from "@core/helpers/redux/state";

export abstract class AbstractRepository<State extends object, P extends any = any> {
  protected readonly _context: StateHelper<State>;
  public abstract readonly defaultStrategy: IStrategy<State>;

  constructor(context: StateHelper<State>) {
    this._context = context;
  }

  public abstract create(payload: P, ...args: Array<any>): State;
  public abstract update(payload: P, key?: keyof State | keyof P | number, ...args: Array<any>): State;
  public abstract delete(id: keyof State | number): State | object;
  public abstract clearAll(): object;
}

