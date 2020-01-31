//export type Override<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;
declare type Override<T, U> = Omit<T, keyof U> & U;

//type NoInfer<T> = T
//type NoInfer<T> = T & {}
//type NoInfer<T> = T & {[K in keyof T]: T[K]};
declare type NoInfer<T> = [T][T extends any ? 0 : never];

declare type Assign = <T, U>(target: T, source: U) => T & U;
