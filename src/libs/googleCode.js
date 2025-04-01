import { authenticator } from '@otplib/preset-v11';
export function getCode(){
  const secret = 'KVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLD';
  const token = authenticator.generate(secret);
  return token
}