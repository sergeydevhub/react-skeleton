import { TLoginDTO } from "./types";
import { TResources } from "@core/transport";
import { IsEmail, IsHash, Contains } from "class-validator";

export class LoginDTO implements TLoginDTO {
  @IsEmail()
  public email!: string;

  @IsHash('sha256')
  public password!: string;
}
