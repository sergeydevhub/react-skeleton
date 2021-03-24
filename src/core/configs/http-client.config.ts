import {AxiosRequestConfig} from "axios";

export const config: AxiosRequestConfig = {
  timeout: 2000,
  responseType: 'json',
  xsrfCookieName: 'XSRF-TOKEN',
  maxRedirects: 2
};

