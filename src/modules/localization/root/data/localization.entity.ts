import { IsString, IsIn } from "class-validator";
import { TAvailableLangs, LOCALES, TAvailableLocales } from "@core/configs/localization.config";

export class LocalizationEntity {
  @IsIn(Object.values(LOCALES))
  locale!: TAvailableLocales;

  @IsString()
  language!: TAvailableLangs;

  constructor(entity: LocalizationEntity) {
    Object.assign(this, entity)
  }
}
