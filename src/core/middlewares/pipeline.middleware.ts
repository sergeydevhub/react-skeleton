interface IHandler<I, O> {
  handle(input: I): O
}

interface IPipelineMiddleware<I, O> {
  pipe(handler: IHandler<I, O>): IPipelineMiddleware<I, O>;
  execute(input: I): O;
}

export class PipelineMiddleware<Input extends any, Output extends any>
  implements IPipelineMiddleware<Input, Output> {
  protected handlers: Array<IHandler<Input, Output>> = [];

  constructor(handler: IHandler<Input, Output>) {
    this.handlers.push(handler);
  }

  public pipe(next: IHandler<Input, Output>): PipelineMiddleware<Input, Output> {
    return new PipelineMiddleware<Input, Output>(next);
  }

  public execute(input: Input): Output {
    return this.handlers.reduce((val, handler) => handler.handle(val), (input as any)) as Output;
  }
}
