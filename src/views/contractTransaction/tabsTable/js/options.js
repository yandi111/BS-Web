// import langs from "@/i18n/i18n";
// const obj = {
//   cn: "240",
//   tw: "240",
//   en: "310",
//   th: "430",
// };
// let w = obj[langs.locale];

export const first = [
  {
    direction: true,
    prop: "$direction",
    label: "contract.方向丨杠杆",
    width: "",
    minWidth: "140",
    content: [
      { id: 0, type: "text" },
      {
        id: 1,
        type: "edit",
        buttonClick: (e) => {
          window.changeLeverage(e);
        },
      },
    ],
  },
  {
    text: true,
    prop: "coinMarket",
    label: "contract.合约",
    width: "",
    minWidth: "90",
  },
  {
    text: true,
    prop: "positionAveragePrice",
    label: "contract.开仓价格",
    width: "",
    minWidth: "100",
  },
  {
    text: true,
    prop: "markedPrice",
    label: "contract.标记价格",
    width: "",
    minWidth: "90",
  },
  {
    unit: true,
    prop: "$positionAmount",
    label: "contract.持仓量",
    width: "",
    minWidth: "90",
  },
  {
    text: true,
    prop: "$marginRatio",
    label: "contract.保证金率",
    width: "",
    minWidth: "110",
  },
  {
    leverage: true,
    prop: "positionDeposit",
    label: "contract.保证金",
    content: [
      { name: "positionDeposit", type: "text" },
      {
        name: "$positionType",
        type: "edit",
        buttonClick: (e) => {
          window.setMargin(e);
        },
      },
    ],
    width: "",
    minWidth: "100",
  },
  {
    profitLoss: true,
    prop: "$unrealizedProfitLoss",
    label: "contract.未实现盈亏",
    content: [
      { type: "text", name: "$unrealizedProfitLoss" },
      {
        type: "text",
        name: "rateReturn",
        buttonClick: (e) => {
          window.shareThisOrder(e);
        },
      },
    ],
    width: "",
    minWidth: "110",
  },
  {
    text: true,
    prop: "strongPrice",
    label: "contract.预估强平价",
    width: "",
    minWidth: "100",

    icon: true,
  },
  {
    isOperation: true,
    label: "contract.操作",
    width: "",
    minWidth: '240',
    operation: [
      {
        type: "text",
        label: "contract.平仓",
        buttonClick: (e) => {
          window.closeAposition(e);
        },
        isShow: () => {
          return true;
        },
      },
      {
        type: "text",
        label: "contract.闪电平仓",
        buttonClick: (e) => {
          window.closeApositionQuickly(e);
        },
        isShow: () => {
          return true;
        },
      },
      {
        type: "setProfitStopLoss",
        label: "contract.止盈丨止损",
        buttonClick: (e) => {
          window.setProfitStopLoss(e);
        },
        isShow: () => {
          return true;
        },
      },
    ],
  },
];
export const second = [
  {
    checkbox: true,
    prop: "createTime",
    label: "contract.时间",
    content: [
      { type: "checkbox", name: "checkbox" },
      { type: "text", name: "createTime" },
    ],
    width: "",
    minWidth: "160",
  },
  {
    contractType: true,
    prop: "coinMarket",
    label: "contract.合约",
    content: [
      { type: "text", name: "coinMarket" },
      { type: "tag", name: "$positionType", value: "positionType" },
    ],
    width: "",
    minWidth: "150",
  },
  {
    text: true,
    prop: "$entrustType",
    label: "contract.类型",
    width: ``,
    minWidth: "100",
  },
  {
    e_direction: true,
    prop: "$directions",
    label: "contract.方向丨杠杆",
    content: [
      { id: 0, type: "text", name: "$direction" },
      { id: 0, type: "text", name: "$leverTimes" },
    ],
    width: ``,
    minWidth: "140",
  },
  {
    text: true,
    prop: "$entrustAmount",
    label: "contract.委托数量丨成交数量",
    width: "",
    minWidth: "130",
  },
  {
    text: true,
    prop: "$entrustPrice",
    label: "contract.委托价格",
    width: "",
    minWidth: "70",
  },
  {
    text: true,
    prop: "$triggerPrice",
    label: "contract.触发价",
    width: ``,
    minWidth: "100",
  },
  {
    text: true,
    prop: "$orderStatus",
    label: "contract.订单状态",
    width: "",
    minWidth: "80",
  },
  { 
    profitLossText:true,
    // text: true,
    prop: "$price",
    label: "contract.止盈丨止损",
    width: "",
    minWidth: "100",
  },
  {
    isOperation: true,
    label: "contract.操作",
    width: "",
    minWidth: "240",

    operation: [
      {
        type: "check",
        label: "contract.查看",
        buttonClick: (e) => {
          window.viewProfitStopLoss(e);
        },
        isShow: () => {
          return true;
        },
      },
      {
        type: "undo",
        label: "contract.撤销委托",
        buttonClick: (e) => {
          window.undoEntrusted(e);
        },
        isShow: () => {
          return true;
        },
      },
    ],
  },
];
export const third = [
  {
    text: true,
    prop: "$createTime",
    label: "contract.时间",
    width: "",
    minWidth: "160",
  },
  {
    contractType: true,
    prop: "coinMarket",
    label: "contract.合约",
    content: [
      { type: "text", name: "coinMarket" },
      { type: "tag", name: "$positionType", value: "positionType" },
    ],
    width: "",
    minWidth: "160",
  },
  {
    text: true,
    prop: "$entrustType",
    label: "contract.类型",
    width: "",
    minWidth: "110",
  },
  {
    e_direction: true,
    prop: "$directions",
    label: "contract.方向丨杠杆",
    content: [
      { id: 0, type: "text", name: "$direction" },
      { id: 0, type: "text", name: "$leverTimes" },
    ],
    width: "",
    minWidth: "150",
  },
  {
    text: true,
    prop: "$entrustAmount",
    label: "contract.委托数量丨成交数量",
    width: "",
    minWidth: "130",
  },
  {
    text: true,
    prop: "entrustPrice",
    label: "contract.委托价格",
    width: "",
    minWidth: "120",
  },
  {
    text: true,
    prop: "$orderStatus",
    label: "contract.订单状态",
    width: "",
    minWidth: "100",
  },

  {
    isOperation: true,
    label: "contract.操作",
    width: "",
    minWidth: "120",
    operation: [
      {
        type: "text",
        label: "contract.委托明细",
        buttonClick: (e) => {
          window.entrustDetail(e);
        },
        isShow: () => {
          return true;
        },
      },
    ],
  },
];

export const fourth = [
  {
    text: true,
    prop: "createTime",
    label: "contract.开仓时间",
    width: "",
    minWidth: "160",
  },
  {
    contractType: true,
    prop: "coinMarket",
    label: "contract.合约",
    content: [
      { type: "text", name: "coinMarket" },
      { type: "tag", name: "$positionType", value: "positionType" },
    ],
    width: "",
    minWidth: "150",
  },
  {
    direction: true,
    prop: "$direction",
    label: "contract.方向丨杠杆",
    content: [{ id: 0, type: "text" }],
    width: "",
    minWidth: "130",
  },
  {
    text: true,
    prop: "positionAveragePrice",
    label: "contract.开仓价格",
    width: "",
    minWidth: "110",
  },
  {
    text: true,
    prop: "closeAveragePrice",
    label: "contract.平仓价格",
    width: "",
    minWidth: "90",
  },
  {
    text: true,
    prop: "maxPositionAmount",
    label: "contract.最大持仓量",
    width: "",
    minWidth: "110",
  },
  {
    text: true,
    prop: "closedAmount",
    label: "contract.已平仓量",
    width: "",
    minWidth: "120",
  },
  {
    profitLoss: true,
    prop: "realizedProfitLoss",
    label: "contract.已实现盈亏",
    content: [{ type: "text", name: "$realizedProfitLoss" }],
    width: "",
    minWidth: "100",
    plExplanation:true, //盈亏解释
  },
  {
    text: true,
    prop: "strongClose",
    label: "contract.状态",
    width: "",
    minWidth: "120",
  },
  {
    text: true,
    prop: "lastDealTime",
    label: "contract.平仓时间",
    width: "",
    minWidth: "160",
  },
  {
    isOperation: true,
    label: "contract.操作",
    width: "",
    minWidth: "120",
    operation: [
      {
        type: "text",
        label: "contract.成交明细",
        buttonClick: (e) => {
          window.dealDetail(e);
        },
        isShow: () => {
          return true;
        },
      },
    ],
  },
];
export const five = [
  {
    text: true,
    prop: "createTime",
    label: "contract.时间",
    width: "",
    minWidth: "160",
  },
  {
    text: true,
    prop: "coinMarket",
    label: "contract.合约",
    width: "",
    minWidth: "140",
  },
  {
    text: true,
    prop: "assetsType",
    label: "contract.资产种类",
    width: "",
    minWidth: "140",
  },
  {
    text: true,
    prop: "$type",
    label: "contract.类型",
    width: "",
    minWidth: "140",
  },
  {
    text: true,
    prop: "$closeProfitOrLoss",
    label: "contract.收益",
    width: "",
    minWidth: "100",
  },
  {
    text: true,
    prop: "$fee",
    label: "contract.手续费",
    width: "",
    minWidth: "160",
  },
  // {
  //   text: true,
  //   prop: "$amount",
  //   label: "contract.label_allAmount",
  //   width: "",
  //   minWidth: `${300 * p}`,
  // },
];
