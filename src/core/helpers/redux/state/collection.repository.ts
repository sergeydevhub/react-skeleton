import { CollectionStrategy, IStrategy } from "./transform.strategy";
import { AbstractRepository } from "./abstract.repository";
import { StateHelper } from "./state.helper";
import { IEntity } from "./types";

export class CollectionRepository<
  State extends Record<IEntity['id'],
  IEntity> = Record<IEntity['id'], IEntity>,
  P extends State[keyof State] = State[keyof State]
> extends AbstractRepository<State, P> {
  public readonly defaultStrategy: IStrategy<State> = new CollectionStrategy<State>();

  constructor(
    context: StateHelper<State>,
  ) {
    super(context);
    this._context.setStrategy(this.defaultStrategy);
  }

  public create(payload: P): State {
    this._context.save(payload, payload.id);
    return this._context.getState()
  }

  public update(payload: Partial<IEntity>, key: keyof State): State {
    this._context.update(payload, key);
    return this._context.getState();
  }

  public delete(id: keyof State): State {
    this._context.remove(id);
    return this._context.getState();
  }
}
