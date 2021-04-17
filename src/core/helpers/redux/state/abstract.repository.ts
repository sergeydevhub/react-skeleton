import {IStrategy, StateRepository} from "@core/helpers/redux/state";

export abstract class AbstractRepository<State extends object, P extends any = any> {
  protected readonly _context: StateRepository<State>;
  public abstract readonly defaultStrategy: IStrategy<State>;

  constructor(context: StateRepository<State>) {
    this._context = context;
  }

  public abstract create(payload: P, ...args: Array<any>): State;
  public abstract update(payload: P, key?: keyof State | keyof P | number, ...args: Array<any>): State;
  public abstract delete(id: keyof State | number, ...args: Array<any>): State;
}

