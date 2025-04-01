import {instance} from "@/request/request";
import { post, get } from "@/request";

// 用户注册校验
export const onVerifyRegister = (data) => post(instance, '/bsex-user/verify', data)

// 用户注册
export const onRegister = (data) => post(instance, '/bsex-user/register', data)

// 用户注册校验
export const onRegisterCheck = data => post(instance, '/bsex-user/register/check', data)

// 用户登录
export const login = (data) => post(instance, '/ex/user/login', data)

// 重置密码,检查手机号或邮箱
export const checkAccount = (data = {}) => post(instance, '/ex/user/find/password/token', data)

// 重置密码,发送验证码
export const sendNoauthCaptcha = (data = {}) => post(instance, '/ex/user/send/no/auth/captcha', data)

// 找回密码-认证检查
export const passwordCheck = (data = {}) => post(instance, '/ex/user/find/password/check', data)

// 重置密码, 修改
export const resetPwd = (data = {}) => post(instance, '/ex/user/find/password/reset', data)

export const getBSEX = data => post(instance, '/BSEX', data)

// 校验邮箱是否存在
export const checkEmail = data => post(instance, '/bsex-user/bind/email/check', data)

// 绑定邮箱
export const bindEmail = data => post(instance, '/bsex-user/bind/email', data)

// 获取token
export const onLoginToken = data => get(instance, '/bsex-user/login/token', data)

export const onLoginRecord = data => post(instance, '/bsex-user/login/record', data)

// passwordCheck
export const onPasswordCheck = data => post(instance, '/bsex-user/forget/password/check', data)
export const forgetPassword = data => post(instance, '/bsex-user/forget/password', data)
