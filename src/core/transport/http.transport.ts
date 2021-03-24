import { AbstractHttpTransport } from "./abstract-http.transport";
import { AxiosResponse } from "axios";
import { dataUnpackResponseInterceptor, processKey, onError as onResponseError } from './response.interceptor';
import {
  devEnvHeadersPrepend,
  authHeaderPrepend,
  prodEnvHeadersPrepend,
  paramsSetupRequestInterceptor,
  onError as onRequestError
} from './request.interceptor';
import {
  IAxiosRequestConfig,
  TParams,
  IParamsRequiredConfig
} from "./types";

export class HttpClient extends AbstractHttpTransport {
  protected static _instance: HttpClient | null;

  protected constructor(
    config: IAxiosRequestConfig
  ) {
    super(config);

    this._requestInterceptors.add([devEnvHeadersPrepend, onRequestError]);
    this._requestInterceptors.add([authHeaderPrepend, onRequestError]);
    this._requestInterceptors.add([prodEnvHeadersPrepend, onRequestError]);
    this._requestInterceptors.add([paramsSetupRequestInterceptor, onRequestError]);

    this._responseInterceptors.add([dataUnpackResponseInterceptor, onResponseError]);
    this._responseInterceptors.add([processKey, onResponseError]);

    this.registerInterceptors();
  }

  public static getInstance(
    config: IAxiosRequestConfig = {}
  ): HttpClient {
    if(!(this._instance && this._instance instanceof HttpClient)) {
      this._instance = new HttpClient(config);
    }

    return this._instance as HttpClient;
  }

  public static unset(): void {
    HttpClient._instance = null;
  }

  public get<P extends TParams>(url: string, config: IParamsRequiredConfig<P>): Promise<AxiosResponse<unknown>> {
    const requestURL = this.prepareRequestURL(url);
    return this._axiosRef.get<unknown>(requestURL, config);
  }


  public post<DTO extends object, P extends TParams>(
    url: string,
    data?: DTO,
    config?: IParamsRequiredConfig<P>
  ): Promise<AxiosResponse<unknown>> {
    const requestURL = this.prepareRequestURL(url);
    return this._axiosRef.post<unknown>(requestURL, data)
  }


  public put<DTO extends object, P extends TParams>(
    url: string,
    data?: DTO,
    config?: IParamsRequiredConfig<P>
  ): Promise<AxiosResponse<unknown>> {
    const requestURL = this.prepareRequestURL(url);
    return this._axiosRef.put<unknown>(requestURL, data, config);
  }

  public delete<P extends TParams>(
    url: string,
    config?: IParamsRequiredConfig<P>
  ): Promise<AxiosResponse<unknown>> {
    const requestURL = this.prepareRequestURL(url);
    return this._axiosRef.delete<unknown>(requestURL);
  }

  public patch<DTO extends object, P extends TParams>(
    url: string,
    data?: DTO,
    config?: IParamsRequiredConfig<P>
  ): Promise<AxiosResponse<unknown>> {
    const requestURL = this.prepareRequestURL(url);
    return this._axiosRef.patch<unknown>(requestURL);
  }
}
