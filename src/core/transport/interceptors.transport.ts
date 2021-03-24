import { OnFulfilled, OnReject } from "@core/transport/types";
import { THeaders } from "@core/configs/headers.config";
import {AxiosRequestConfig, AxiosResponse} from "axios";
import deepmerge from "deepmerge";

export const headersPrependRequestInterceptor: OnFulfilled<
  AxiosRequestConfig
  > = (config): AxiosRequestConfig => {
  const headers: THeaders = process.env.NODE_ENV?.includes(
    'prod'
  ) ? {
    'X-XSS-Protection': '1; mode=block',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN',
    'X-Request-Timestamp': Math.floor((new Date()).getTime() / 1000),
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'Content-Security-Policy': "default-src 'self'",
    'Referrer-Policy': 'same-origin',
    'Permissions-Policy': "geolocation=*, fullscreen=self",
  } : {};

  return deepmerge(config, { headers })
};


export const dataUnpackResponseInterceptor: OnFulfilled<AxiosResponse> = (
  response: AxiosResponse
): AxiosResponse => {
  response.data = response?.data?.data;
  return response
};

export const onError: OnReject = error => Promise.reject(error);
