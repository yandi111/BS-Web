/* 现货交易 */
import request from "@/request/request";
import { get, post } from "@/request";
import { instance } from "@/request/request";

// 获取用户现货资产
export const GetUserSpotAssets = (data) =>
  post(instance, "/bsex-spot/spotWallet/getSpotWalletDto", data);

// 获取用户现货总资产
export const GetUserSpotAllAssets = () =>
  get(instance, "/bsex-spot/asset/getAsset");

// 当前委托
export const GetUserNewsDelegation = (data) =>
  post(instance, "/bsex-spot/order/getOrder", data);

// 下单
export const HandleOrder = (data) =>
  post(instance, "/bsex-spot/order/openOrder", data);

// 获取现货交易对
export const GetTradingPairs = (data) =>
  get(instance, "/bsex-spot/spot/getSpotList", data);

// 获取买卖盘
export const GetMarketPlate = (data) =>
  post(instance, "/bsex-spot/market/plate", data);

// 获取k线历史数据
export const GetHistory = (data) =>
  get(instance, "/bsex-spot/kline/getKline", data);

// 现货-交易对 取消或收藏
export const $onCollection = (data = {}) => {
  return request.post("/ex/market/market-info/favorite", data);
};

// 现货-币种详情
export const $coinTypeDetail = (data = {}) => {
  return request.post("/finance/query/coin-info/by-coinId", data);
};

//现货-资产
export const $sumAccountApi = (data) => {
  return request({
    isdiyCode: true,
    url: "/ex/finance/query/sumAccount",
    method: "post",
    data: { ...data },
  });
};

// 上币申请
export const $financeCoinApply = (data = {}) => {
  return request.post("/finance/coin/apply", data);
};

// 上币申请历史记录
export const $coinApplyList = (data = {}) => {
  return request.post("/finance/coin/apply-list", data);
};

// 上币申请历史记录详情
export const $coinApplyDetail = (data = {}) => {
  return request.post("/finance/coin/apply-detail", data);
};
