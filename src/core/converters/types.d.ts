export interface IConverter {
  transform<I, O>(Clazz: I, obj: O, option?: object | Function): O;
}

export abstract class AbstractConverter<Input, Output> {
  protected abstract from(input: Input): Output;
  protected abstract to(from: Input, to?: any): Output;
}
