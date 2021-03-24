import {Action as ReduxAction } from "redux";
import * as ReduxTypes from 'ReduxTypes';

export type TActionNamingPartials = [ ReduxTypes.StatePartitions, ...Array<string> ];

export interface IAnyAction extends ReduxAction<string> {
  [key: string]: any
}

export class RootAction<Payload = any> implements IAnyAction {
  public readonly type!: string;
  public readonly payload?: Payload;

  constructor(action: RootAction<Payload>) {
    Object.assign(this, action);
  }
}
