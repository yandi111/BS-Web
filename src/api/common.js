import { getToken } from "@/libs/utils.js";
import {instance} from "@/request/request";
import {post} from "@/request";

// 获取认证选项
/**
 * 
 *  5-绑定邮箱；
    6-绑定手机号；
    7-更新邮箱；
    8-更新手机号；
    9-更新谷歌验证器；
    12-设置资金密码 ；
    13-删除受信任设备；
    14-设置防钓鱼码；
    16-创建apikey验证码；
    17-查看apikey详情验证码；
    18-修改apikey验证码；
    19-删除apikey验证码；
    20-添加提币地址验证码；
    21-删除提币地址验证码；
 */

export const authItem = data => post(instance, '/ex/user/token/auth/item', data)

// 四者认证获取认证项（资金密码+手机+邮箱+谷歌）
export const authItemStong = (data) => {
  return instance({
    isData: true,
    url: "/user/auth/get/strong/auth/item",
    method: "post",
    data: { ...data },
  });
};

// 绑定或更新手机号或邮箱发送验证码
export const captchaSend = (data) => {
  return instance({
    isData: true,
    url: "/user/update/phone/email/captcha/send",
    method: "post",
    data: { ...data },
  });
};

// 通用短信验证码发送
/**
 * 
 * 4-修改密码验证码；
  5-绑定邮箱验证码；
  6-绑定手机号验证码；
  7-更新邮箱验证码；
  8-更新手机号验证码；
  9-更新谷歌验证器验证码；
  10-更新资金密码验证码；
  11-确认修改谷歌验证器验证码 ；
  12-设置资金密码验证码 ；
  13-删除受信任设备验证码；
  14-设置防钓鱼码验证码；
  15-开启谷歌认证验证码；
 */
export const commonSendCaptcha = data => post(instance, "/ex/user/auth/captcha/send", data);

//上传文件
export const uploadFile = function (data = {}) {
  return instance.post("/ex/user/file/upload-file/uploadToAmazonS3", data);
};
//获取文件签名
export const getFileURLSign = function (data = {}) {
  return instance({
    isData: true,
    url: "/user/file/upload-file/url-sign",
    method: "post",
    data: { ...data },
    headers: {
      token: getToken(),
    },
  });
};

// 四者认证认证检查
export const checkAuthStrong = (data = {}) => {
  return instance({
    isData: true,
    url: "/user/auth/strong/auth",
    method: "post",
    data: { ...data },
  });
};

// banner图
export const bannerList = (data = {}) => {
  return instance({
    isData: true,
    isdiyCode: true,
    url: "/user/banner/list",
    method: "post",
    data: { ...data },
  });
};

//全局--交易对禁用状态
export const $getAllSymbolStatus = function (data = {}) {
  return instance.post("/ex/order/usdt-contract/symbol-status", data);
};

// 发送验证码
export const onSendCode = data => instance.post('/bsex-user/send/verifyCode', data)