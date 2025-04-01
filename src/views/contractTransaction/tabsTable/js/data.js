import langs from "@/i18n/i18nLocale";
//参数过滤处理
export const options = {
  directType: {
    1: `${langs.t("lang_950")}`,
    2: `${langs.t("lang_958")}`,
    3: `${langs.t("lang_1934")}`,
    4: `${langs.t("lang_960")}`,
  },
  priceType: {
    1: "lang_1912",
    2: "lang_1955",
    3: "lang_925",
    4: "lang_975",
  },

  entrustType: {
    1: "lang_1040",
    2: "lang_1270",
    3: "lang_2025",
    4: "lang_2024",
    5: "lang_914",
    6: "lang_1139",
    7: "lang_1140",
  },
  orderStatus: {
    0: "lang_1827",
    1: "lang_2063",
    2: "lang_829",
    3: "lang_844",
    4: "lang_2106",
  },
  contractType: {
    1: "lang_924",
    2: "lang_925",
    3: "lang_974",
    4: "lang_975",
    5: "lang_977",
    6: "lang_978",
    7: "现货账户转入",
    8: "资金账户转入",
    9: "转出现货账户",
    10: "转出资金账户",
    11: "资金费用",
    14: "跟单账户划入",
    15: "划出跟单账户",
    17: "property.KYC等级2级",
    19: "交易奖励",
    20: "盈利奖励",
  },
  entrustTypeParams: [
    {
      label: "限价委托",
      value: 1,
      attribute: "orderType",
    },
    { label: "市价委托", value: 2 },
    { label: "市价止盈", value: 3 },
    { label: "市价止损", value: 4 },
    { label: "计划委托", value: 5 },
  ],
  positionDirectionParams: [
    {
      label: "开多",
      value: 1,
      attribute: "positionDirection",
    },
    { label: "开空", value: 2 },
  ],
  billTypeParams: [
    { label: "开多", value: 1, attribute: "type" },
    { label: "开空", value: 2 },
    { label: "平多", value: 3 },
    { label: "平空", value: 4 },
    { label: "强平平多", value: 5 },
    { label: "强平平空", value: 6 },
    { label: "现货账户转入", value: 7 },
    { label: "资金账户转入", value: 8 },
    { label: "转出现货账户", value: 9 },
    { label: "转出资金账户", value: 10 },
    { label: "资金费用", value: 11 },
    { label: "跟单账户划入", value: 14 },
    { label: "划出跟单账户", value: 15 },
    { label: "property.KYC认证赠金", value: 17 },
    { label: "交易奖励", value: 19 },
    { label: "property.盈利奖励", value: 20 },
  ],
};
export const positionData = [
  {
    positionDirection: 1, //仓位方向
    coinMarket: "BTC/USDT", //交易对
    leverTimes: "10", //杠杆倍数
    positionAmount: 23.444, //持仓数量
    marginRatio: 59, //保证金率
    positionDeposit: 5.47, //保证金
    positionType: 0, //全仓
    unrealizedProfitLoss: 1222.331, //未实现盈亏
    rateReturn: 223.34, //收益率
    strongPrice: "23.000", //预估强评价
    positionAveragePrice: 222.22,
    markedPrice: 344.22,
    entrust: "0.000", //已委托
  },
  {
    positionDirection: 2, //仓位方向
    coinMarket: "BTC/USDT", //交易对
    leverTimes: "90", //杠杆倍数
    positionAmount: 24.42, //持仓数量
    marginRatio: 28, //保证金率
    positionDeposit: 6.97, //保证金
    positionType: 1, //全仓
    unrealizedProfitLoss: -1442.331, //未实现盈亏
    rateReturn: 423.74, //收益率
    strongPrice: "0.000", //预估强评价
    positionAveragePrice: 342.22,
    markedPrice: 224.22,
    entrust: "0.000", //已委托
  },
  {
    positionDirection: 1, //仓位方向
    coinMarket: "BTC/USDT", //交易对
    leverTimes: "120", //杠杆倍数
    positionAmount: 76.64, //持仓数量
    marginRatio: 28, //保证金率
    positionDeposit: 6.97, //保证金
    positionType: 1, //全仓
    unrealizedProfitLoss: -1442.331, //未实现盈亏
    rateReturn: 423.74, //收益率
    strongPrice: "0.000", //预估强评价
    positionAveragePrice: 802.22,
    markedPrice: 620.22,
    entrust: "0.000", //已委托
  },
  {
    positionDirection: 2, //仓位方向
    coinMarket: "BTC/USDT", //交易对
    leverTimes: "50", //杠杆倍数
    positionAmount: 12.334, //持仓数量
    marginRatio: 28, //保证金率
    positionDeposit: 6.97, //保证金
    positionType: 0, //全仓
    unrealizedProfitLoss: 1442.331, //未实现盈亏
    rateReturn: 423.74, //收益率
    strongPrice: "0.000", //预估强评价
    positionAveragePrice: 852.22,
    markedPrice: 924.22,
    entrust: "0.000", //已委托
  },
  {
    positionDirection: 1, //仓位方向
    coinMarket: "BTC/USDT", //交易对
    leverTimes: "20", //杠杆倍数
    positionAmount: 2.334, //持仓数量
    marginRatio: 28, //保证金率
    positionDeposit: 6.97, //保证金
    positionType: 1, //全仓
    unrealizedProfitLoss: -1442.331, //未实现盈亏
    rateReturn: 423.74, //收益率
    strongPrice: "0.000", //预估强评价
    positionAveragePrice: 852.22,
    markedPrice: 924.22,
    entrust: "0.000", //已委托
  },
];
export const entrustingData = [
  {
    createTime: "2023-3-4 13:44:54",
    coinMarket: "BTC/USDT",
    orderType: 1,
    entrustType: 1,
    directType: 1,
    leverTimes: 10,
    entrustAmount: 1000,
    dealAmount: 300,
    entrustPrice: 2344.0,
    triggerPrice: 12.3,
    status: 1,
    profitTriggerPrice: 999,
    lossTriggerPrice: 666,
    entrustNo: Math.random() * 100,
  },
  {
    createTime: "2023-6-4 23:44:54",
    coinMarket: "BTC/USDT",
    orderType: 2,
    entrustType: 2,
    directType: 4,
    leverTimes: 30,
    entrustAmount: 1000,
    dealAmount: 300,
    entrustPrice: 2344.0,
    triggerPrice: 12.3,
    status: 2,
    profitTriggerPrice: 999,
    lossTriggerPrice: 666,
    entrustNo: Math.random() * 100,
  },
  {
    createTime: "2023-6-4 23:44:54",
    coinMarket: "BTC/USDT",
    orderType: 2,
    entrustType: 2,
    directType: 4,
    leverTimes: 30,
    entrustAmount: 1000,
    dealAmount: 300,
    entrustPrice: 2344.0,
    triggerPrice: 12.3,
    status: 2,
    profitTriggerPrice: 999,
    lossTriggerPrice: 666,
    entrustNo: Math.random() * 100,
  },
];
export const entrustedData = [
  {
    createTime: "2023-3-4 13:44:54",
    entrustNo: 4194783479,
    coinMarket: "BTC/USDT",
    entrustType: 1,
    directType: 1,
    leverTimes: 10,
    entrustAmount: 1000,
    dealAmount: 300,
    entrustPrice: 2344.0,
    status: 1,
    // profitTriggerPrice: 999,
    // lossTriggerPrice: 666,
  },
  {
    createTime: "2023-6-4 23:44:54",
    entrustNo: 9594733471,
    coinMarket: "BTC/USDT",
    entrustType: 2,
    directType: 4,
    leverTimes: 30,
    entrustAmount: 1000,
    dealAmount: 300,
    entrustPrice: 2344.0,
    status: 3,
    // profitTriggerPrice: 999,
    // lossTriggerPrice: 666,
  },
];
export const historicalPosition = [
  {
    positionId: 1234,
    createTime: "2023-3-4 13:44:54",
    coinMarket: "BTC/USDT",
    positionDirection: 1,
    positionType: 0,
    leverage: 10,
    positionAveragePrice: 2332,
    closeAveragePrice: 124.0,
    maxPositionAmount: 995,
    closedAmount: 123,
    realizedProfitLoss: 93.53,
  },
  {
    positionId: 4321,
    createTime: "2023-3-4 13:44:54",
    coinMarket: "BTC/USDT",
    positionDirection: 2,
    positionType: 1,
    leverage: 20,
    positionAveragePrice: 600,
    closeAveragePrice: 344.0,
    maxPositionAmount: 555,
    closedAmount: 333,
    realizedProfitLoss: -93.53,
  },
];
export const billData = [
  {
    createTime: "2023-3-4 13:44:54",
    coinMarket: "BTC/USDT",
    assetsType: "USDT",
    type: 1,
    closeProfitOrLoss: 2134, //收益
    amount: 343134.0, //总额
  },
  {
    createTime: "2023-3-4 13:44:54",
    coinMarket: "BTC/USDT",
    assetsType: "USDT",
    type: 3,
    closeProfitOrLoss: null, //收益
    amount: -0.3134, //总额
  },
  {
    createTime: "2023-3-4 13:44:54",
    coinMarket: "BTC/USDT",
    assetsType: "USDT",
    type: 5,
    closeProfitOrLoss: null, //收益
    amount: -0.3134, //总额
  },
  {
    createTime: "2023-3-4 13:44:54",
    coinMarket: "BTC/USDT",
    assetsType: "USDT",
    type: 8,
    closeProfitOrLoss: null, //收益
    amount: -0.3134, //总额
  },
  {
    createTime: "2023-3-4 13:44:54",
    coinMarket: "BTC/USDT",
    assetsType: "USDT",
    type: 7,
    closeProfitOrLoss: null, //收益
    amount: 19.3134, //总额
  },
  {
    createTime: "2023-3-4 13:44:54",
    coinMarket: "BTC/USDT",
    assetsType: "USDT",
    type: 4,
    closeProfitOrLoss: 123.45, //收益
    amount: 1.3134, //总额
  },
  {
    createTime: "2023-3-4 13:44:54",
    coinMarket: "BTC/USDT",
    assetsType: "USDT",
    type: 10,
    closeProfitOrLoss: 123.45, //收益
    amount: 51.34, //总额
  },
  {
    createTime: "2023-3-4 13:44:54",
    coinMarket: "BTC/USDT",
    assetsType: "USDT",
    type: 6,
    closeProfitOrLoss: 323.45, //收益
    amount: 11.64, //总额
  },
];
export const dealOverview = [
  {
    createTime: "2023-7-2 12:34:12",
    coinMarket: "BTC/USDT",
    directType: 1,
    leverTimes: 10,
    positionAveragePrice: 2300, //开仓价格
    closeAveragePrice: 433, //平仓价格
    maxPositionAmount: 1222, //最大持仓量
    closedAmount: 200, //已平仓量
    realizedProfitLoss: 0.34, //平仓盈亏
  },
  // {
  //   createTime: "2023-7-10 22:34:12",
  //   coinMarket: "BTC/USDT",
  //   directType: 3,
  //   leverTimes: 20,
  //   positionAveragePrice: 2300, //开仓价格
  //   closeAveragePrice: 433, //平仓价格
  //   maxPositionAmount: 1222, //最大持仓量
  //   closedAmount: 200, //已平仓量
  //   realizedProfitLoss: -0.34, //平仓盈亏
  // },
];
export const dealDetail = [
  {
    createTime: "2023-7-2 12:34:12",
    coinMarket: "BTC/USDT",
    directType: 1,
    leverTimes: 10,
    positionAveragePrice: 2300, //开仓价格
    closeAveragePrice: 433, //平仓价格
    maxPositionAmount: 1222, //最大持仓量
    closedAmount: 200, //已平仓量
    realizedProfitLoss: 0.34, //平仓盈亏
  },
];
