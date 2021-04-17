import deepmerge from 'deepmerge';
import { getBaseURL } from "@core/utils";
import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios';
import { TOnFulfilled, TOnReject, TResources } from "./types";
import { config } from "@core/configs/http-client.config";
import { IAxiosRequestConfig, TParams, IParamsRequiredConfig } from "./types";

type InterceptorTuple<T> = [TOnFulfilled<T>, TOnReject];

export abstract class AbstractHttpClient {
  public readonly baseURL: string = AbstractHttpClient.prepareBaseURL();

  protected readonly _requestInterceptors: Set<InterceptorTuple<AxiosRequestConfig>>;
  protected readonly _responseInterceptors: Set<InterceptorTuple<AxiosResponse>>;

  protected readonly _axiosRef: AxiosInstance;

  protected _config: IAxiosRequestConfig = config;

  protected constructor(
    _config: IAxiosRequestConfig = {}
  ) {
    this._mergeConfigs(_config);
    this._axiosRef = axios.create(this._config);

    this._requestInterceptors = new Set();
    this._responseInterceptors = new Set();
  }

  public prepareRequestURL(url: string): string {
    return `${this.baseURL}/${url}`;
  }

  public static prepareBaseURL(): string {
    const url: string = getBaseURL();
    return new URL(url).origin
  }

  protected _mergeConfigs(config: IAxiosRequestConfig): IAxiosRequestConfig {
    return deepmerge(this._config, config);
  }

  protected _request<Data = any, Params extends TParams = TParams>(
    config: IAxiosRequestConfig<Data, Params>
  ): Promise<AxiosResponse<unknown>> {
    const mergedConfig = this._mergeConfigs(config);
    return this._axiosRef.request(mergedConfig)
  }

  protected _registerInterceptors(): void {
    this._requestInterceptors.forEach((
      [onSuccess, onError]: InterceptorTuple<AxiosRequestConfig>
    ) => this._axiosRef.interceptors.request.use(onSuccess, onError));

    this._responseInterceptors.forEach((
      [onSuccess, onError]: InterceptorTuple<AxiosResponse>
    ) => this._axiosRef.interceptors.response.use(onSuccess, onError))
  }

  protected abstract get<P extends TParams>(url: string, config?: IParamsRequiredConfig<P>): Promise<AxiosResponse<unknown>>;

  protected abstract post<DTO extends object, P extends TParams>(url: string, data?: DTO, config?: IParamsRequiredConfig<P>): Promise<AxiosResponse<unknown>>;

  protected abstract patch<DTO extends object, P extends TParams>(url: string, data?: DTO, config?: IParamsRequiredConfig<P>): Promise<AxiosResponse<unknown>>;

  protected abstract delete<P extends TParams>(url: string, config?: IParamsRequiredConfig<P>): Promise<AxiosResponse<unknown>>;

  protected abstract put<DTO extends object, P extends TParams>(url: string, data?: DTO, config?: IParamsRequiredConfig<P>): Promise<AxiosResponse<unknown>>;
}

