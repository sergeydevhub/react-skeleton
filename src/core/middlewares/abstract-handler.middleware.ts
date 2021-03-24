export abstract class AbstractHandlerMiddleware {
  protected next!: AbstractHandlerMiddleware;
  public abstract message: string;

  public register(next: AbstractHandlerMiddleware) {
    this.next = next;
    return next;
  }

  public abstract isAllowed(...args: Array<any>): boolean;

  protected checkNext<T extends Array<any>>(...args: T): boolean {
    this.message = '';

    if(this.next === null) {
      return true
    }

    return this.next.isAllowed(args);
  }
}
