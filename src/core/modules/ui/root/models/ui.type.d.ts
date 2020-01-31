import { ConditionStatuses } from "@core/helpers";
import { Notifications } from "../../notifications";
import { Theme } from "../../theme/models";

declare module 'StoreModels' {
  export interface UI {
    notifications: Notifications
    theme: Theme
  }
}
