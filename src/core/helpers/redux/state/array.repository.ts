import { StateHelper } from "./state.helper";
import { IStrategy, ArrayStrategy } from "./transform.strategy";
import { AbstractRepository } from "./abstract.repository";

export class ArrayRepository<State extends Array<any>, Payload = State[keyof State]> extends AbstractRepository<State> {
  public readonly defaultStrategy: IStrategy<State> = new ArrayStrategy<State>();

  constructor(
    context: StateHelper<State>
  ) {
    super(context);
    this._context.setStrategy(this.defaultStrategy);
  }

  public create(payload: Payload): State {
    this._context.save(payload);
    return this._context.getState();
  }

  public update(payload: any, index: number): State {
    this._context.update(payload, index);
    return this._context.getState();
  }

  public delete(index: number): State {
    this._context.remove(index);
    return this._context.getState();
  }

  public clearAll(): object {
    return [];
  }
}

