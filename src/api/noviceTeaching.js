import request from "@/request/request";

// 获取banner
export const $getBanner = function (data = {}) {
  return request.post("/ex/user/banner/list", data);
};
