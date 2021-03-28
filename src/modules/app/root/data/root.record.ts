import { IRecord } from "@core/helpers/redux/state";

export class RootRecord implements IRecord {
  public id!: string | number;
  public createdAt!: number;
  public updatedAt!: number;

  constructor(record: RootRecord) {
    Object.assign(this, record);
  }
}
