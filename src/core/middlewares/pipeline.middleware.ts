interface IHandler<I, O> {
  process(input: I): O
}

interface IPipelineMiddleware<I, O> {
  pipe(handler: IHandler<I, O>): IPipelineMiddleware<I, O>;
  execute(input: I): O;
}

export class PipelineMiddleware<I extends any, O extends any>
  implements IPipelineMiddleware<I, O> {
  protected handlers: Array<IHandler<I, O>> = [];

  constructor(handler: IHandler<I, O>) {
    this.handlers.push(handler);
  }

  public pipe(next: IHandler<I, O>): PipelineMiddleware<I, O> {
    return new PipelineMiddleware<I, O>(next);
  }

  public execute(input: I): O {
    return this.handlers.reduce((val, handler) => handler.process(val), (input as any)) as O;
  }
}
