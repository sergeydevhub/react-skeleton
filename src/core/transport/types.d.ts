import {AxiosRequestConfig} from "axios";
import { TriggeredAction } from "@core/helpers/redux/actions";
import { FormikHelpers } from "formik";

export type TResources = 'profile' | 'users' | 'auth';

export type TEndpoint = (action: TriggeredAction, resource?: TResources) => string

export type TOnFulfilled<T> = (value: T) => T | Promise<T>;

export type TOnReject = <T = any>(error: T) => any;

export type TServerResponse<T> = {
  data: T
}

type TSort = 'ASC' | 'DESC';

export type TMeta = Record<string, any> & Partial<{
  perPage: number;
  limit: number;
  sort: TSort;
  timeout: number;
  analytics: object;
  helpers: FormikHelpers<any>
}>;

export type TParams = Record<string, boolean | string | number>;

export interface IAxiosRequestConfig<Data = any, P extends TParams = TParams>
  extends Omit<AxiosRequestConfig, 'method' |'baseURL'> { data?: Data, params?: P }

export interface IParamsRequiredConfig<P extends TParams = TParams>
  extends IAxiosRequestConfig { params: P }

