import Cookies from "js-cookie";
import { Decrypt, Encrypt } from "./EncryptDecrypt";

export const GetAllCookie = () => {
  return Cookies.get();
};

export const GetCookie = (key) => {
  const cookie_data = Cookies.get(key);
  const decrypt = Decrypt(cookie_data);
  return decrypt;
};

export const SetCookie = (
  key,
  value,
  expirationTime = null,
  minutes = null,
  days = null
) => {
  const encryptValue = Encrypt(value);
  Cookies.set(key, encryptValue);
};

export const RemoveCookie = (key) => {
  Cookies.remove(key);
};

export const ClearCookie = (key) => {
  Cookies.ClearCookie();
};
