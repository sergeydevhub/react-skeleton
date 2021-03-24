import { RootRecord } from "@modules/app/root/data";
import { Exclude } from "class-transformer";
import { IProfile, TProfileRecord, TStatus, TRoles } from './types';

export class ProfileRecord extends RootRecord implements IProfile {
  @Exclude()
  public token!: string;

  public phone!: string;

  public email!: string;

  public nickName!: string;

  public status!: TStatus;

  public roles!: Array<TRoles>;

  constructor(record: TProfileRecord) {
    super({
      id: record.id,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt
    });

    Object.assign(this, record);
  }
}

