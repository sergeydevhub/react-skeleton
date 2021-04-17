import { TOnFulfilled, TOnReject } from "@core/transport/types";
import { AxiosRequestConfig } from "axios";
import { THeaders } from "./types";
import deepmerge from "deepmerge";
import { HTTPResponseException, AuthException } from "@core/exceptions/variations";
import { HttpStatusCodes } from "@core/configs/http-statuses.config";
import Cookie from 'js-cookie';

export const onError: TOnReject = (error) => Promise.reject(error);

//Headers pipeline
export const devEnvHeadersPrepend: TOnFulfilled<
  AxiosRequestConfig
> = (config): AxiosRequestConfig => {
  const headers: Partial<THeaders> = {
    'X-Request-Timestamp': Math.floor((new Date()).getTime() / 1000),
  };

  return deepmerge(config, { headers })
};

//Headers pipeline
export const prodEnvHeadersPrepend: TOnFulfilled<
  AxiosRequestConfig
> = (config): AxiosRequestConfig => {
  const headers: Partial<THeaders> = (
    process.env.NODE_ENV?.includes('prod') && {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
      'Content-Security-Policy': "default-src 'self'",
      'Referrer-Policy': 'same-origin',
      'Permissions-Policy': "geolocation=*, fullscreen=self",
    }) || {};

  return deepmerge(config, { headers })
};

//Headers pipeline
export const authHeaderPrepend: TOnFulfilled<
  AxiosRequestConfig
> = (config): AxiosRequestConfig => {
  const token = Cookie.get('accessToken');

  if(token) {
    const headers: Partial<THeaders> = {
      'Authorization': `Bearer ${ token }`
    };

    return deepmerge(config, { headers })
  }

  return config;
};

export const paramsSetupRequestInterceptor: TOnFulfilled<
  AxiosRequestConfig
  > = (config): AxiosRequestConfig => {
  if('params' in config && 'url' in config) {
    const url: string = config.url as string;
    const urlBuilder = new URL(url);
    for(const param in config.params) {
      urlBuilder.searchParams.set(param, config.params[param])
    }

    config.url = urlBuilder.href;
  }

  return config;
};
