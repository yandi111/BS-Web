import { JSEncrypt } from 'jsencrypt'

export const getEncryptCode = (password) => {
  // new 一个对象
  const encrypt = new JSEncrypt()
  // 后台公钥
  const PUBLIC_KEY = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAllX1cTgJ9JHyX75Mc703W6Q+OyEa3b6QSR8GNYHp7IWEBJoB0HBDyStDBgkxRKTMLfBXWDanwBTSrlzatyDbnhCczFcvXQOTYv/j0+lkHAfPF0+uex5jdGN7SjhI5RtiJXrR6al2bhUzyp2DVZFznwrpZkjrlNpXveaibtqtMUkNtRftaPdAubMLO6ENIMIA7SZULj4+rtpqlebHx5eEQMF1TMpLDqb7ibawwmADNYOhviv1RBCk7qMbrjgkz/d5vIiawwpqzFG/03MUQiYUzK8CtSAbHuwVIYB6EU406viLp4dSV2cLD3jAOFdcKBYyJdrH4Sb+USbjD3d/GfvXlQIDAQAB'
  encrypt.setPublicKey(PUBLIC_KEY)
  let data = encrypt.encrypt(password)
  return data
}