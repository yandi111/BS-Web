
const crypto = require('crypto-js')
export  function hmacSHA256(key, data) {
  
  return crypto.HmacSHA256(key,data);
}