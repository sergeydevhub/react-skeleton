import { RootEntity, RootRecord } from '@modules/app/root/data';
import {
  TStatus,
  TRoles,
  IProfile,
  TProfileEntity
} from './types';
import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  IsInt,
  Length,
  Min,
  MinLength,
  IsOptional,
  IsIn,
} from "class-validator";
import {createSelector} from "reselect";
import * as ReduxTypes from "ReduxTypes";

export const availableRoles: Array<TRoles> = ['user', 'guest', 'premium_user'];

export class ProfileEntity extends RootRecord implements IProfile {
  @IsPhoneNumber('UA')
  @IsOptional()
  public phone?: string;

  @IsString()
  @IsOptional()
  public firstName?: string;

  @IsString()
  @IsOptional()
  public lastName?: string;

  @IsEmail()
  @IsOptional()
  public email?: string;

  @IsString()
  @Length(3, 12)
  public nickName!: string;

  @Min(18)
  @IsInt()
  @IsOptional()
  public age?: number;

  @IsIn(availableRoles)
  public roles!: Array<TRoles>;

  @MinLength(13)
  @IsInt()
  public createdAt!: number;

  @MinLength(13)
  @IsInt()
  public updatedAt!: number;

  @IsString()
  public photoURL: string = `${process.env.STATIC_CONTENT}/default_avatar.png`;

  public status?: TStatus;

  constructor(entity: TProfileEntity) {
    super({
      id: entity.id,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt
    });

    Object.assign(this, entity);
  }
}

const getStatus = createSelector(
  (state: ReduxTypes.RootState) => state.profile,
  (profile) => profile.status
);

export const selectors = {
  getStatus
};
