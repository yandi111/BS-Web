import request from "@/request/request";

// 获取二维码url
export const $getQrCodeUrl = function (data = {}) {
  return request.post("/ex/user/app/latest/version", data);
};
