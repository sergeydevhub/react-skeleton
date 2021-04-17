export abstract class AbstractHandlerMiddleware<T> {
  protected _next!: AbstractHandlerMiddleware<T>;
  public abstract message: string;

  public register(next: AbstractHandlerMiddleware<T>) {
    this._next = next;
    return next;
  }

  public abstract isAllowed(args: T): boolean;

  protected _checkNext(args: T): boolean {
    this.message = '';

    if(!this._next) {
      return true
    }

    return this._next.isAllowed(args);
  }
}
