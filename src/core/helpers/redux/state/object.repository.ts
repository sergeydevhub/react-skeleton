import {AbstractRepository} from "./abstract.repository";
import {CollectionStrategy, DefaultStrategy, IStrategy} from "./transform.strategy";
import {StateHelper} from "@core/helpers/redux/state/state.helper";

export class ObjectRepository<State extends object> extends AbstractRepository<State, any> {
  public readonly defaultStrategy: IStrategy<State> = new DefaultStrategy();

  constructor(
    context: StateHelper<State>,
  ) {
    super(context);
    this._context.setStrategy(this.defaultStrategy);
  }

  public create(payload: State): State {
    this._context.save(payload);
    return this._context.getState()
  }

  public update(payload: Partial<State>): State
  public update(payload: Partial<State[keyof State]> | Partial<State>, key?: keyof State): State {
    if(!key) {
      this._context.update(payload);
    } else {
      const collectionStrategy = new CollectionStrategy<State>();
      this._context.setStrategy(collectionStrategy);
      this._context.update(payload, key);
      this._context.setStrategy(this.defaultStrategy);
    }

    return this._context.getState();
  }

  public delete(key: keyof State): State | object {
    this._context.remove(key);
    return this._context.getState();
  }
}
