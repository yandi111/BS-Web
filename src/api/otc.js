import request from "@/request/request";

// 快捷购买
export const quickBuy = function (data = {}) {
  return request.post("/order/otc/order/quick-buy", data);
};

// 快捷匹配金额限制
export function quickAstict(data) {
  return request({
    isData: true,
    url: "/order/otc/advertising/amount-quick-astrict",
    method: "post",
    data: { ...data },
  });
}

// 快捷卖币查询资产
export function queryAccount(data) {
  return request({
    isData: true,
    isdiyCode: true,
    url: "/finance/otc/user/query-account",
    method: "post",
    data: { ...data },
  });
}

// 快捷卖出
export const quickSell = function (data = {}) {
  return request.post("/order/otc/order/quick-sell", data);
};

// 提交申诉
export const appealAdd = function (data = {}) {
  return request.post("/order/otc/appeal/add", data);
};

// 取消申诉
export const appealCancel = function (data = {}) {
  return request({
    isData: true,
    url: "/order/otc/appeal/cancel",
    method: "post",
    data: { ...data },
  });
};

// 添加支付方式
export const payAdd = function (data = {}) {
  return request.post("/user/user/otc/pay/type/add", data);
};
//添加or修改支付方式-检查参数
export const checkAddParams = function (data = {}) {
  return request.post("/user/user/otc/pay/type/add-check", data);
};

// 查询支付列表
export const payList = function (data = {}) {
  return request({
    isData: true,
    url: "/user/user/otc/pay/type/list",
    method: "post",
    data: { ...data },
  });
};

// // 添加关注 or 添加拉黑
// export const relationAdd = function (data={}) {
//   return request.post('/user/user/otc/relation/add', data)
// }

// // 取消关注 or 取消拉黑
// export const relationDel = function (data={}) {
//   return request.post('/user/user/otc/relation/del', data)
// }

export const relationOper = function (data = {}) {
  return request({
    isData: true,
    url: "/user/user/otc/relation/saveOrUpdate",
    method: "post",
    data: { ...data },
  });
};

// 查询关注或拉黑列表
export const relationList = function (data = {}) {
  return request({
    isData: true,
    url: "/user/user/otc/relation/list",
    method: "post",
    data: { ...data },
  });
};

// 支付方式启用禁用
export const payDisabled = function (data = {}) {
  return request({
    isData: true,
    url: "/user/user/otc/pay/type/disabled-or-use",
    method: "post",
    data: { ...data },
  });
};

// 修改订单状态
export const orderStatus = function (data = {}) {
  return request.post("/order/otc/order/edit", data);
};

// 查询订单详情
export const getOrderStatus = function (data = {}) {
  return request.post("/order/otc/order/by-id", data);
};

// 查看商户订单统计信息
export const getMerchantInfoById = function (data = {}) {
  return request({
    isdiyCode: true,
    url: "/user/user/otc/merchant/by-user-id",
    method: "post",
    data: { ...data },
  });
};

// 获取历史聊天数据
export const getHistoryChat = function (data = {}) {
  return request({
    isdiyCode: true,
    url: "/order/otc/im/get-the-history-chat",
    method: "post",
    data: { ...data },
  });
};

// 查看商户订单统计信息
export const getMerchantInfo = function (data = {}) {
  return request({
    isdiyCode: true,
    url: "/order/otc/merchant-statistics",
    method: "post",
    data: { ...data },
  });
};

// 申请成为商户-检查商户提交资料
export const merchantAuthCheck = function (data = {}) {
  return request({
    isdiyCode: true,
    url: "/user/user/otc/merchantAuth/apply/check",
    method: "post",
    data: { ...data },
  });
};

// 已登录-发送认证验证码-多业务共用
export const sendCaptchaAuth = function (data = {}) {
  return request({
    isData: true,
    url: "/user/auth/captcha/send",
    method: "post",
    data: { ...data },
  });
};

// 商人申请认证授权
export const criteriaAuthApply = function (data = {}) {
  return request({
    isData: true,
    url: "/user/user/otc/merchant/apply-auth-criteria",
    method: "post",
    data: { ...data },
  });
};

// 商人申请认证授权
export const getUserInfoApply = function (data = {}) {
  return request({
    isData: true,
    url: "/user//info",
    method: "post",
    data: { ...data },
  });
};

// 提交申请商户信息
export const applyMerchantInfo = function (data = {}) {
  return request({
    isData: true,
    url: "/user/user/otc/merchantAuth/save-or-update",
    method: "post",
    data: { ...data },
  });
};

// 查询法币列表
export const getLegalTender = function (data = {}) {
  return request.post("/order/otc/legal-tender/list", data);
};

// 发布广告获取数量限制
export const getQuantity = function (data = {}) {
  return request({
    isData: true,
    url: "/order/otc/advertising/quantity-limit",
    method: "post",
    data: { ...data },
  });
};

// 发布广告获取数量限制
export const getAmount = function (data = {}) {
  return request({
    isData: true,
    url: "/order/otc/advertising/amount-limit",
    method: "post",
    data: { ...data },
  });
};

// 查询广告列表
export const advertisingList = function (data = {}) {
  return request({
    isData: true,
    url: "/order/otc/advertising/list",
    method: "post",
    data: { ...data },
  });
};

// 查询广告详情
export const advertisingDetail = function (data = {}) {
  return request({
    isData: true,
    url: "/order/otc/advertising/by-id",
    method: "post",
    data: { ...data },
  });
};

// 发布广告_检查参数
export const checkAdvertising = function (data = {}) {
  return request({
    isData: true,
    url: "/order/otc/advertising/check",
    method: "post",
    data: { ...data },
  });
};

// 发布广告
export const advertisingAdd = function (data = {}) {
  return request({
    isData: true,
    url: "/order/otc/advertising/add",
    method: "post",
    data: { ...data },
  });
};

// 编辑广告
export const advertisingUpdate = function (data = {}) {
  return request({
    isData: true,
    url: "/order/otc/advertising/update",
    method: "post",
    data: { ...data },
  });
};

// 查询商户已发布的广告
export const advertisingMerchantList = function (data = {}) {
  return request({
    isData: true,
    url: "/order/otc/advertising/merchant/list",
    method: "post",
    data: { ...data },
  });
};

// 商户更新广告
export const advertisingMerchantUpdate = function (data = {}) {
  return request({
    isData: true,
    url: "/order/otc/advertising/update",
    method: "post",
    data: { ...data },
  });
};

// 商户删除广告
export const advertisingMerchantDel = function (data = {}) {
  return request({
    isData: true,
    url: "/order/otc/advertising/del",
    method: "post",
    data: { ...data },
  });
};

// 商户删除支付方式
export const delPayType = function (data = {}) {
  return request({
    isData: true,
    url: "/user/user/otc/pay/type/del",
    method: "post",
    data: { ...data },
  });
};

// 查询商户申请信息
export const getMerhantAuth = function (data = {}) {
  return request({
    isData: true,
    url: "/user/user/otc/get/merchant-auth",
    method: "post",
    data: { ...data },
  });
};

// 查询当前登录人商户审核状态
export const merchantCheck = function (data = {}) {
  return request({
    isData: true,
    url: "/user/user/otc/merchant/check",
    method: "post",
    data: { ...data },
  });
};

// 商户申请退保
export const merchantRefund = function (data = {}) {
  return request.post("/user/user/otc/merchant/refund", data);
};

// 统计被拉黑次数，以及粉丝数
export const statisticsRelation = function (data = {}) {
  return request({
    isData: true,
    url: "/user/user/otc/relation/statistics-relation",
    method: "post",
    data: { ...data },
  });
};

// c2c 交易下单
export const createOrder = function (data = {}) {
  return request({
    isData: true,
    url: "/order/otc/create-order",
    method: "post",
    data: { ...data },
  });
};

// 支付
export const payOrder = function (data = {}) {
  return request({
    isData: true,
    url: "/order/otc/pay-order",
    method: "post",
    data: { ...data },
  });
};

// 查询订单列表
export const orderList = function (data = {}) {
  return request({
    isData: true,
    url: "/order/otc/order/list",
    method: "post",
    data: { ...data },
  });
};

// 查看订单详情

export const orderDetail = function (data = {}) {
  return request({
    isData: true,
    url: "/order/otc/order/detail",
    method: "post",
    data: { ...data },
  });
};

// 取消订单
export const cancelOrder = function (data = {}) {
  return request({
    isData: true,
    url: "/order/otc/cancel-order",
    method: "post",
    data: { ...data },
  });
};

// 商家确认收款   已完成订单
export const finishOrder = function (data = {}) {
  return request({
    isData: true,
    url: "/order/otc/finish-order",
    method: "post",
    data: { ...data },
  });
};

// 发送聊天
export function sendMsg(data = {}) {
  return request({
    isData: true,
    url: "/order/otc/im/send-msg",
    method: "post",
    data: { ...data },
  });
}

// 快捷买币卖币查询
export function advertisingQuick(data) {
  return request({
    isData: true,
    url: "/order/otc/advertising/quick",
    method: "post",
    data: { ...data },
  });
}

// 商户申请解禁

export const merchantBanApply = function (data = {}) {
  return request({
    isData: true,
    url: "/user/user/otc/merchant/lift-ban-apply",
    method: "post",
    data: { ...data },
  });
};

//查询交易期限
export const deadlineGet = function (data = {}) {
  return request({
    isData: true,
    url: "/user/user/otc/deadline/get",
    method: "post",
    data: { ...data },
  });
};
//c2c进行中订单状态
export const $orderStatus = function (data = {}) {
  return request.post("/order/otc/get-progress-order", data);
};

//c2c聊天消息状态
export const $messageStatus = function (data = {}) {
  return request.post("/order/otc/im/get-read", data);
};
//c2c聊天消息已读
export const $the_message_has_been_read = function (data = {}) {
  return request.post("/order/otc/im/save-chat", data);
};

//c2c普通用户认证状态
export const authSwitchStatus = function (data = {}) {
  return request.post("/user/security/auth/switch-status", data);
};

//c2c用户实名信息
export const realNameQuery = function (data = {}) {
  return request.post("/user/auth/real/name/query", data);
};
//查询C2C等级配置
export const getOTCBuyOrSellLevel = function (data = {}) {
  return request.post("/user/user/admin/otc/order/restrict/c2c/get", data);
};
//判断是否是中国用户
export const isChina = function (data) {
  return request.post("/user/app/is-china",data);
};
