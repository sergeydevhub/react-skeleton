export type TConditions = 'triggered' | 'failure' | 'successful';

export class ConditionStatus {
  public readonly isTriggered: boolean = false;
  public readonly isSuccessful: boolean = false;
  public readonly isFailure: boolean = false;

  constructor(statuses: Partial<ConditionStatus>) {
    Object.assign(this, statuses)
  }
}

