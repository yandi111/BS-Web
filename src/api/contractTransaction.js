import {instance} from "@/request/request";
import { post, get } from "@/request";

// 合约交易 标记价格
export const $getMarketPrice = function (data = {}) {
  return post(instance, "/ex/contract-liquidation/usdt/contract/marked/price", data);
};

// 合约交易 盘口
export const handicapApi = function (data = {}) {
  return post(instance, "/ex/market/depth", data);
};
// 合约交易规则
export const $tradingRules = function (data = {}) {
  return post(instance, "/ex/market/symbol/deal/rule/introduce", data);
};

// 合约交易 k线
export const getLineKApi = function (data = {}) {
  return post(instance, "/ex/market/kline/list", data);
};

// 合约交易 单个行情信息
export const marketInfoApi = function (data = {}) {
  return post(instance, "/ex/market/market-info/info", data);
};

// 合约交易 实时成交
export const marketTradesApi = function (data = {}) {
  return post(instance, "/ex/market/market-info/list/trades", data);
};

// 钱包仓位
export const positionsApi = function (data = {}) {
  return post(instance, "/ex/order/usdt-contract/user/entrust-list", data);
};

//合约-仓位
export const contractPositionsApi = function (data = {}) {
  return post(instance,
  "/ex/contract-liquidation/usdt/contract/user/position?t=" + new Date().getTime(), data
  );
};

// 当前委托
export const entrustListApi = function (data = {}) {
  return post(instance, "/ex/order/usdt-contract/user/entrust-list", data);
};
// 历史委托
export const historyApi = function (data = {}) {
  return post(instance,
   "/ex/order/usdt-contract/user/entrust-list/history",
    data
  );
};

// 历史仓位
export const positionHistoryApi = function (data = {}) {
  return post(instance, "/ex/order/usdt-contract/user/position/history", data);
};

// 合约账单
export const billHistoryApi = function (data = {}) {
  return post(instance, "/ex/order/usdt-contract/user/bill/history", data);
};

// 合约订单成交记录
export const entrustDetailRecordApi = function (data = {}) {
  return post(instance,
   "/ex/order/usdt-contract/entrust-detail-record-page",
    data
  );
};

//交易对列表
export const symbolListApi = function (data = {}) {
  return post(instance, "/ex/market/symbol/list", data);
};

// 合约撤单（支持批量）
export const cancelTrustApi = function (data = {}) {
  return post(instance, "/ex/order/usdt-contract/cancel/trust", data);
};

// 设置/更新 止盈止损
export const editProfitLossApi = function (data = {}) {
  return post(instance, "/ex/order/usdt-contract/edit/profit-loss", data);
};

// 委托明细
export const entrustDetialApi = function (data = {}) {
  return post(instance, "/ex/order/usdt-contract/user/entrust/detial", data);
};

// 仓位成交明细
export const positionDetailApi = function (data = {}) {
  return post(instance, "/ex/order/usdt-contract/user/position/detial", data);
};

// 交易对搜收藏列表
export const $coinTypeCollectionList = function (data = {}) {
  // return post(instance, "/ex/market/market-info/list/favorite", data);
};

// 合约列表
export const $contractList = function (data = {}) {
  return post(instance, "/ex/market/market-info/usdt-coin-future/list", data);
};

// 汇率/倒计时
export const $countDown = function (data = {}) {
  return post(instance, "/ex/market/funding-rate/info", data);
};

// 用户功能状态
export const getUserStatus = function (data = {}) {
  return post(instance, "/user/function/status", data);
  // return request({
  //   isData: true,
  //   url: "/user/function/status",
  //   method: "post",
  //   data: { ...data },
  // });
};
// 调整杠杆最大可开
export const $positionGear = function (data = {}) {
  return post(instance, "/ex/contract-liquidation/contract-position-gear", data);
};
// 合约下单/平仓
export const $unwind = function (data = {}) {
  return post(instance, "/ex/order/usdt-contract/add", data);
};
// 一键平仓
export const $unwindAll = function (data = {}) {
  return post(instance, "/ex/order/usdt-contract/close-all-position", data);
};
// 单个交易对信息
export const $getSymbolInfo = function (data = {}) {
  return post(instance, "/ex/market/symbol/query", data);
};
// 调整杠杆倍数
export const $setleverage = function (data = {}) {
  return post(instance,
   "/ex/contract-liquidation/user/contract/usdt/update-lever-info",
    data
  );
};
//计算器杠杆信息
export const $getLevergeonCal = function (data = {}) {
  return post(instance,
   "/ex/order/usdt-contract/maintain-margin-rate",
    data
  );
};
// 交易对杠杆信息查询
export const gearinfoApi = function (data = {}) {
  return post(instance,
   "/ex/order/usdt-contract/market/symbol/gearinfo/query",
    data
  );
};
// 获取合约可用余额
export const $availableBalance = function (data = {}) {
  return post(instance, "/finance/transfer/query-balance", data);
};
// 资金费率列表
export const fundingRateList = function (data = {}) {
  return post(instance, "/ex/market/funding-rate/list", data);
};

// 资金费率历史
export const fundingRateHistory = function (data = {}) {
  return post(instance, "/ex/market/funding-rate/history", data);
};
// 资金费率图表
export const fundingRateChart = function (data = {}) {
  return post(instance, "/ex/market/funding-rate/chart", data);
};
//逐仓追加保证金
export const $adjustMargin = function (data = {}) {
  return post(instance,
   "/ex/contract-liquidation/user/contract/usdt/warehouse/adjust-margin",
    data
  );
};
//查询币种详情
export const coinInfo = function (data = {}) {
  return post(instance, "/ex/finance/query/coin-info/by-coinId", data);
};

//止盈止损明细
export const profitLossDetial = function (data = {}) {
  return post(instance, "/ex/order/usdt-contract/user/profit-loss/detial", data);
};

//深度图
export const depthMapApi = function (data = {}) {
  return post(instance, "/ex/market/depth/map", data);
};
//获取登录用户的合约杠杆信息
export const $getLeverInfo = function (data = {}) {
  return post(instance,
   "/ex/contract-liquidation/user/contract/usdt/lever-info",
    data
  );
};

//APP端查询交易对杠杆信息
export const appSymbolList = function (data = {}) {
  return post(instance, "/ex/order/usdt-contract/symbol-list", data);
};

//交易规则-合约交易对详情
export const symbolDetail = function (data = {}) {
  return post(instance, "/ex/market/symbol/contract/query", data);
};

//交易规则-合约交易对详情
export const  $getEveryMarketpPrice = function (data = {}) {
  return post(instance, "/ex/contract-liquidation/usdt/contract/marked/price", data);
};
//合约口令创建
export const  $setContractPass = function (data = {}) {
  return post(instance, "/ex/order/usdt-contract/trade/create", data);
};
//历史口令
export const  $getHistoryList = function (data = {}) {
  return post(instance, "/ex/order/usdt-contract/trade/history/list", data);
};

//仓位盈亏信息
export const  profitLossInfo = function (data = {}) {
  return post(instance, "/ex/order/usdt-contract/user/position/profit-loss-info", data);
};

//根据仓位查询止盈止损
export const  profitLossByPosition = function (data = {}) {
  return post(instance, "/ex/order/usdt-contract/info/profit-loss-by-position", data);
};

//根据ID查询止盈止损
export const  profitLossById = function (data = {}) {
  return post(instance, "/ex/order/usdt-contract/info/profit-loss-by-id", data);
};

//设置/更新 单个止盈止损
export const editSingleProfitLoss = function (data = {}) {
  return post(instance, "/ex/order/usdt-contract/edit/single-profit-loss", data);
};

//预估止盈止损盈亏
export const estimateProfitLoss = function (data = {}) {
  return post(instance, "/ex/order/usdt-contract/estimate/profit-loss", data);
};

//获取资金费率提示文本
export const getTextConfiguration = function (data = {}) {
  return post(instance, "/ex/user/textConfiguration/get", data);
};

//暂停交易通知
export const getStopNotify = function (data = {}) {
  return post(instance, "/ex/user/get/stop-notify", data);
};

//获取奖励信息
export const getSubsidyInfo = function (data = {}) {
  return post(instance, "/ex/order/subsidy/info", data);
};

// 获取行情历史数据
export const GetQuotesHistory = (data) => get(instance, '/bsex-market/history', data)