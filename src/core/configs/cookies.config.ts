import { CookieAttributes } from 'js-cookie';

export const config: CookieAttributes = {
  domain: process.env.HOSTNAME,
  expires: 7,
  secure: true,
  sameSite: 'lax'
};
