declare module 'Utils' {
  //export type Override<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;
  export type Override<T, U> = Omit<T, keyof U> & U;

//type NoInfer<T> = T
//type NoInfer<T> = T & {}
//type NoInfer<T> = T & {[K in keyof T]: T[K]};
  export type NoInfer<T> = [T][T extends any ? 0 : never];

  export type Assign = <T, U>(target: T, source: U) => T & U;

  export type ExtractValue<T extends object> = T[keyof T];

  export type Optional<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>

  export type ClassConstructor<T extends any> = {
    new (...args: Array<any>): T
  }
}
