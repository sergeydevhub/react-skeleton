import { ConditionStatuses } from "@core/helpers";

declare module 'StoreModels' {
  export interface Localization extends ConditionStatuses {
    locale: string;
    language: string
  }
}
