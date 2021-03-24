import { IsInt, IsString } from 'class-validator';
// import { } from 'class-transformer';
import { IEntity } from "@core/helpers/redux/state";

export class RootEntity implements IEntity {
  @IsString()
  @IsInt()
  public id!: string | number;

  constructor(id: IEntity['id']) {
    this.id = id;
  }
}
