export abstract class AbstractHandlerMiddleware<T> {
  protected next!: AbstractHandlerMiddleware<T>;
  public abstract message: string;

  public register(next: AbstractHandlerMiddleware<T>) {
    this.next = next;
    return next;
  }

  public abstract isAllowed(args: T): boolean;

  protected checkNext(args: T): boolean {
    this.message = '';

    if(!this.next) {
      return true
    }

    return this.next.isAllowed(args);
  }
}
