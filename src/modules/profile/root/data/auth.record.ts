import { IsString } from "class-validator";

export class AuthRecord {
  @IsString()
  authToken!: string;

  constructor(record: AuthRecord) {
    Object.assign(this, record);
  }
}
