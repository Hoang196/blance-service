import crypto from 'crypto-js';
import config from 'config';

const encrypt = (str: string) => {
  return crypto.AES.encrypt(str, config.aesSecretKey).toString();
};

const decrypt = (hash: string) => {
  return crypto.AES.decrypt(hash, config.aesSecretKey).toString(crypto.enc.Utf8);
};

export { encrypt, decrypt };
