import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const getCookie = (): string => {
  return cookies.get("accessToken");
};

export const getCookieRefresh = (): string => {
  return cookies.get("refresh-token");
};

export const setCookie = (value: string, options = {}) => {
  return cookies.set("accessToken", value, { path: "/", ...options });
};

export const setCookieRefresh = (value: string, options = {}) => {
  return cookies.set("refresh-token", value, { path: "/", ...options });
};

export const removeCookie = () => {
  return cookies.remove("accessToken", { path: "/" });
};

export const removeCookieRefresh = () => {
  return cookies.remove("refresh-token", { path: "/" });
};
