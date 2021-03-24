import {TOnFulfilled, TOnReject} from "@core/transport/types";
import {AxiosResponse} from "axios";
import { isObject } from 'class-validator';
import { KeyConverter } from "@core/converters";

export const processKey: TOnFulfilled<AxiosResponse> = (
  response: AxiosResponse
): AxiosResponse => {
  if(isObject(response?.data)) {
    const converter = new KeyConverter();
    response.data = converter.from(response.data);
  }

  return response;
};

export const dataUnpackResponseInterceptor: TOnFulfilled<AxiosResponse> = (
  response: AxiosResponse
): AxiosResponse => {
  response.data = response?.data?.data;
  return response
};

export const onError: TOnReject = error => Promise.reject(error);
