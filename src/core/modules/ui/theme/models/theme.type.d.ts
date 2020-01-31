import { IStatus } from "@core/helpers";

interface StatusConditions extends IStatus {
  isActive: boolean
}

export interface Status {
  status: StatusConditions
}

export interface Theme {
  dark: Status;
  light: Status;
}
