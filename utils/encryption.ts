import CryptoJS from "crypto-js";

const SECRET_KEY = "your-secret-key";

export function encryptData(data: any): string {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
}

export function decryptData(encryptedData: string): any {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedData);
}
