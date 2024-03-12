import CryptoJS from "crypto-js";

export const Encrypt = (data) => {
  const enc_data = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    `${process.env.NEXT_PUBLIC_SECRET_KEY}`
  ).toString();

  return enc_data;
};

export const Decrypt = (data) => {
  const de_data = CryptoJS.AES.decrypt(
    data,
    `${process.env.NEXT_PUBLIC_SECRET_KEY}`
  ).toString(CryptoJS.enc.Utf8);
  return JSON.parse(de_data);
};
