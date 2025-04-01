export const contract = [
  {
    id: 0,
    title: "获取用户合约账户资产(USER_DATA)",
    apiInterface:
      "POST  /api/ex/contract-liquidation/v1/user/contract/usdt/list",
    apiEffect: "获取用户合约资产。",
    requstText: "请求参数：无",
    requstParams: [],
    requstExampleText: "请求示例",
    requstExample: `
        {
          //您的代码
        }`,
    reponseText: "返回参数:",
    reponseParams: [
      {
        label: "accountEquity",
        type: "string",
        need: "必须",
        note: "账户权益",
      },
      {
        label: "availableDeposit",
        type: "string",
        need: "必须",
        note: "可用保证金",
      },
      {
        label: "occupyDeposit",
        type: "string",
        need: "必须",
        note: "占用保证金",
      },
      {
        label: "unrealizedProfitLoss",
        type: "string",
        need: "必须",
        note: "未实现盈亏",
      },
    ],
    reponseExampleText: "返回示例:",
    responseExample: `
          {
              "code": 1,
              "message": "成功",
              "data": {
                  "accountEquity": "1.44",
                  "availableDeposit": "1.44",
                  "occupyDeposit": "0.00",
                  "unrealizedProfitLoss": "0.00",
                  "userId": null
              },
              "success": true
           }`,
  },
  {
    id: 1,
    title: "获取登录用户的合约杠杆信息(USER_DATA)",
    apiInterface:
      "POST  /api/ex/contract-liquidation/v1/user/contract/usdt/lever-info",
    apiEffect: "获取用户合约的杠杆信息。例子 BTC/USDT 杠杆为125倍",
    requstText: "请求参数：",
    requstParams: [
      {
        label: "coinId",
        type: "number",
        need: "必须",
        note: "币种ID",
      },
    ],
    requstExampleText: "请求示例",
    requstExample: `
        {
            "coinId":1
        }`,
    reponseText: "返回参数:",
    reponseParams: [
      {
        label: "id",
        type: "number",
        need: "必须",
        note: "	杠杆id",
      },
      {
        label: "userId",
        type: "number",
        need: "必须",
        note: "用户id",
      },
      {
        label: "coinId",
        type: "string",
        need: "必须",
        note: "币种id",
      },
      {
        label: "marketId",
        type: "string",
        need: "必须",
        note: "市场id",
      },
      {
        label: "minValue",
        type: "string",
        need: "必须",
        note: "杠杆最小值",
      },
      {
        label: "maxValue",
        type: "string",
        need: "必须",
        note: "杠杆最大值",
      },
      {
        label: "defaultValue",
        type: "string",
        need: "必须",
        note: "全仓杠杆倍数",
      },
      {
        label: "positionType",
        type: "string",
        need: "必须",
        note: "仓位类型，0:全仓，1:逐仓",
      },
      {
        label: "warehouseShortPosition",
        type: "number",
        need: "非必须",
        note: "逐仓空仓杠杆倍数",
      },
      {
        label: "warehouseMuchPosition",
        type: "number",
        need: "非必须",
        note: "逐仓多仓杠杆倍数",
      },
    ],
    reponseExampleText: "返回示例:",
    responseExample: `{
  "code": 1,
  "message": "成功",
  "data": {
      "id": 258699,
      "userId": 11333,
      "coinId": 1,
      "marketId": -1,
      "minValue": 1,
      "maxValue": 125,
      "defaultValue": 125,
      "positionType": 1,
      "warehouseShortPosition": 125,
      "warehouseMuchPosition": 125
  },
  "success": true
}`,
  },
  {
    id: 2,
    title: "更新登录用户的合约杠杆信息(USER_DATA)",
    apiInterface:
      "POST  /api/ex/contract-liquidation/v1/user/contract/usdt/update-lever-info",
    apiEffect: "用户调整交易对的杠杆和仓位模式。",
    requstText: "请求参数：",
    requstParams: [
      {
        label: "coinId",
        type: "number",
        need: "必须",
        note: "币种ID",
      },
      {
        label: "positionId",
        type: "number",
        need: "非必须",
        note: "如果更新单独仓位时，传仓位ID。",
      },
      {
        label: "leverTime",
        type: "number",
        need: "必须",
        note: "杠杆倍数",
      },
      {
        label: "positionType",
        type: "number",
        need: "必须",
        note: "仓位模式，0：全仓，1：逐仓",
      },
      {
        label: "operationType",
        type: "number",
        need: "必须",
        note: "操作类型，1：调整杠杆，2：调整仓位模式",
      },
      {
        label: "warehousePositionDirection",
        type: "number",
        need: "必须",
        note: "调整逐仓杠杆，仓位方向，1：多仓，2：空仓",
      },
    ],
    requstExampleText: "请求示例",
    requstExample: `
        {
          "coinId": 1,
          "leverTime": "125",
          "positionType": 0,
          "operationType": 1
        }`,
    reponseText: "返回参数:",
    reponseParams: [
      {
        label: "code",
        type: "int",
        need: "必须",
        note: "响应代码",
      },
      {
        label: "message",
        type: "string",
        need: "必须",
        note: "响应消息",
      },
      {
        label: "data",
        type: "object",
        need: "必须",
        note: "响应数据",
      },
      {
        label: "success",
        type: "boolean",
        need: "必须",
        note: "响应状态",
      },
    ],
    reponseExampleText: "返回示例:",
    responseExample: `
    {
        "code": 1,
        "message": "成功",
        "data": null,
        "success": true
    }`,
  },
  {
    id: 3,
    title: "获取用户开仓中的合约仓位(USER_DATA)",
    apiInterface:
      "POST  /api/ex/contract-liquidation/v1/usdt/contract/user/position",
    apiEffect: "用户获取当前仓位列表。",
    requstText: "请求参数：",
    requstParams: [
      {
        label: "coinId",
        type: "number",
        need: "非必须",
        note: "币种id，不填查出全部",
      },
    ],
    requstExampleText: "请求示例",
    requstExample: `
        {
          "coinId": 1 //BTC/USDT
        }`,
    reponseText: "返回参数:",
    reponseParams: [
      {
        label: "coinId",
        type: "Integer",
        need: "必须",
        note: "币种id",
      },
      {
        label: "coinMarket",
        type: "string",
        need: "必须",
        note: "币对，例如 BTC/USDT",
      },
      {
        label: "createTime",
        type: "string",
        need: "必须",
        note: "创建时间",
      },
      {
        label: "effective",
        type: "boolean",
        need: "必须",
        note: "仓位是否有效，true为有效，false无效",
      },
      {
        label: "experienceGold",
        type: "String",
        need: "必须",
        note: "体验金（单位：USDT）",
      },
      {
        label: "experienceGoldNumber",
        type: "String",
        need: "必须",
        note: "体验金数量（单位：张数）",
      },
      {
        label: "flatAmount",
        type: "string",
        need: "必须",
        note: "可平数量",
      },
      {
        label: "id",
        type: "number",
        need: "必须",
        note: "仓位id",
      },
      {
        label: "leverTimes",
        type: "number",
        need: "必须",
        note: "杠杆倍数",
      },
      {
        label: "maintenanceMarginRatio",
        type: "string",
        need: "必须",
        note: "维持保证金率",
      },

      {
        label: "marginRatio",
        type: "string",
        need: "必须",
        note: "保证金率",
      },
      {
        label: "positionAmount",
        type: "string",
        need: "必须",
        note: "持仓数量（单位：张）",
      },
      {
        label: "positionAveragePrice",
        type: "string",
        need: "必须",
        note: "仓位均价",
      },
      {
        label: "positionDeposit",
        type: "string",
        need: "必须",
        note: "仓位保证金",
      },

      {
        label: "positionDirection",
        type: "number",
        need: "必须",
        note: "仓位方向 1:多仓，2:空仓",
      },
      {
        label: "positionType",
        type: "number",
        need: "必须",
        note: "仓位模式，0全仓，1逐仓",
      },
      {
        label: "rateReturn",
        type: "string",
        need: "必须",
        note: "收益率，客户端需要加上%符号",
      },
      {
        label: "strongPrice",
        type: "string",
        need: "必须",
        note: "强平价",
      },
      {
        label: "triggerLossPrice",
        type: "string",
        need: "必须",
        note: "止损触发价",
      },
      {
        label: "triggerProfitPrice",
        type: "string",
        need: "必须",
        note: "	止盈触发价",
      },
      {
        label: "unrealizedProfitLoss",
        type: "string",
        need: "必须",
        note: "	未实现盈亏（收益），客户端需要加上%符号",
      },
    ],
    reponseExampleText: "返回示例：",
    responseExample: `
    {
      "code": 1,
      "message": "成功",
      "data": [
          {
              "id": 5202,
              "coinId": 1,
              "leverTimes": 125,
              "positionDirection": 2,
              "positionAmount": "1",
              "flatAmount": "1",
              "positionType": 1,
              "unrealizedProfitLoss": "0.00",
              "positionDeposit": "2.23",
              "rateReturn": "0.00",
              "strongPrice": "28010.55",
              "marginRatio": "177.00",
              "positionAveragePrice": "27913.60",
              "maintenanceMarginRatio": "0.0040",
              "experienceGoldNumber": null,
              "experienceGold": null,
              "effective": true,
              "coinMarket": "BTC/USDT",
              "triggerLossPrice": "--",
              "triggerProfitPrice": "--",
              "createTime": 1696822263673
          }
      ],
      "success": true
    }`,
  },
  {
    id: 4,
    title: "获取合约标记价格(USER_DATA)",
    apiInterface:
      "POST  /api/ex/contract-liquidation/v1/usdt/contract/marked/price",
    apiEffect: "用户输入币种ID获取对应的交易对的标记价格。",
    requstText: "请求参数：",
    requstParams: [
      {
        label: "coinId",
        type: "number",
        need: "必须",
        note: "币种ID",
      },
    ],
    requstExampleText: "请求示例",
    requstExample: `
        {
          "coinId": 1 //BTC/USDT
        }`,
    reponseText: "返回参数:",
    reponseParams: [
      {
        label: "coinId",
        type: "number",
        need: "必须",
        note: "币种ID",
      },
      {
        label: "markedPrice",
        type: "number",
        need: "必须",
        note: "标记价格",
      },
    ],
    reponseExampleText: "返回示例:",
    responseExample: `
    {
      "code": 1,
      "message": "成功",
      "data": {
          "markedPrice": "27868.40",
          "coinId": 1
      },
      "success": true
    }`,
  },
  {
    id: 5,
    title: "用户调整杠杆获取可开张数(USER_DATA)",
    apiInterface:
      "POST  /api/ex/contract-liquidation/v1/contract-position-gear",
    apiEffect: "用户获取交易对杠杆最大或者最小可开张数",

    requstText: "请求参数：",
    requstParams: [
      {
        label: "coinMarket",
        type: "string",
        need: "必须",
        note: "交易对名称，大写，如：ETH/USDT",
      },
      {
        label: "maximumLeverage",
        type: "number",
        need: "必须",
        note: "要调整的杠杆倍数",
      },
    ],
    requstExampleText: "请求示例",
    requstExample: `
        {
          "coinMarket": "BTC/USDT",
          "maximumLeverage":125
        }`,
    reponseText: "返回参数:",
    reponseParams: [
      {
        label: "maxPositionAmount",
        type: "number",
        need: "必须",
        note: "最大可开张数",
      },
      {
        label: "coinMarket",
        type: "string",
        need: "必须",
        note: "交易对名称",
      },
      {
        label: "minPositionAmount",
        type: "number",
        need: "必须",
        note: "最小可开张数",
      },
      {
        label: "maximumLeverage",
        type: "number",
        need: "必须",
        note: "杠杆倍数",
      },
    ],
    reponseExampleText: "返回示例：",
    responseExample: `
    {
      "code": 1,
      "message": "成功",
      "data": {
          "minPositionAmount": 1,
          "maxPositionAmount": 1500,
          "coinMarket": "BTC/USDT",
          "maximumLeverage": 125,
      },
      "success": true
  }
    `,
  },
  {
    id: 6,
    title: "用户合约逐仓追加保证金(USER_DATA)",
    apiInterface:
      "POST  /api/ex/contract-liquidation/v1/user/contract/usdt/warehouse/adjust-margin",
    apiEffect: "用户在合约中追加逐仓保证金。",
    requstText: "请求参数：",
    requstParams: [
      {
        label: "margin",
        type: "string",
        need: "必须",
        note: "追加保证金金额",
      },
      {
        label: "positionId",
        type: "string",
        need: "必须",
        note: "逐仓仓位id",
      },
      {
        label: "operationType",
        type: "number",
        need: "必须",
        note: "1:增加保证经 ，2：减少保证金",
      },
    ],
    requstExampleText: "请求示例",
    requstExample: `
        {
          "margin": "10",
          "positionId":"5202",
          "operationType":1
        }`,
    reponseText: "返回参数:",
    reponseParams: [
      {
        label: "code",
        type: "int",
        need: "必须",
        note: "响应代码",
      },
      {
        label: "message",
        type: "string",
        need: "必须",
        note: "响应消息",
      },
      {
        label: "data",
        type: "object",
        need: "必须",
        note: "响应数据",
      },
      {
        label: "success",
        type: "boolean",
        need: "必须",
        note: "响应状态",
      },
    ],
    reponseExampleText: "返回示例:",
    responseExample: `{
        "code": 1,
        "message": "成功",
        "data": null,
        "success": true
      }`,
  },
  {
    id: 7,
    title: "用户查询合约成交明细(USER_DATA)",
    apiInterface: "POST  /api/ex/order/v1/u/usdt-contract/entrust-detail-page",
    apiEffect: "用户根据，委托单号查询一条或者多条成交单。",
    requstText: "请求参数：",
    requstParams: [
      {
        label: "pageNum",
        type: "number",
        need: "必须",
        note: "页码",
      },
      {
        label: "pageSize",
        type: "number",
        need: "必须",
        note: "每页大小",
      },
      {
        label: "entrustNo",
        type: "string",
        need: "必须",
        note: "订单号",
      },
    ],
    requstExampleText: "请求示例",
    requstExample: `
        {
          "pageNum": "1",
          "pageSize":"10",
          "entrustNo":589894356927365120
        }`,
    reponseText: "返回参数:",
    reponseParams: [
      {
        label: "pageNum",
        type: "number",
        need: "必须",
        note: "页码",
      },
      {
        label: "pageSize",
        type: "number",
        need: "必须",
        note: "每页大小",
      },
      {
        label: "entrustNo",
        type: "string",
        need: "必须",
        note: "订单号",
      },
      {
        label: "amount",
        type: "string",
        need: "必须",
        note: "成交数量",
      },
      {
        label: "entrustAmount",
        type: "Integer",
        need: "必须",
        note: "委托数量",
      },
      {
        label: "handlingFee",
        type: "string",
        need: "必须",
        note: "手续费",
      },
      {
        label: "direction",
        type: "Integer",
        need: "必须",
        note: "成交方向",
      },
      {
        label: "dealPrice",
        type: "string",
        need: "必须",
        note: "成交价格",
      },
      {
        label: "coinMarket",
        type: "string",
        need: "必须",
        note: "交易对名称",
      },
      {
        label: "createTime",
        type: "string",
        need: "必须",
        note: "创建时间",
      },
      {
        label: "positionType",
        type: "Integer",
        need: "必须",
        note: "仓位类型（0全仓，1逐仓）",
      },
      {
        label: "leverTimes",
        type: "Integer",
        need: "必须",
        note: "杠杆倍数",
      },
    ],
    reponseExampleText: "返回示例:",
    responseExample: `
     {
      "code": 1,
      "message": "success",
      "data": {
          "records": [
              {
                  "amount": "1",
                  "entrustAmount": 1,
                  "direction": 2,
                  "dealPrice": "27913.6",
                  "coinMarket": "BTC/USDT",
                  "createTime": 1696822263,
                  "entrustNo": "589894356927365120",
                  "targetEntrustNo": "0795fe05-c64e-4d4e-805f-61adf390df5b",
                  "positionType": 1,
                  "leverTimes": 125,
              }
          ],
          "total": 1,
          "size": 10,
          "current": 1,
          "orders": [],
          "searchCount": true,
          "pages": 1
      },
      "success": true
  }`,
  },
  {
    id: 8,
    title: "用户查询合约当前委托(USER_DATA)",
    apiInterface: "POST  /api/ex/order/v1/u/usdt-contract/user/entrust-list",
    apiEffect: "用户获取合约当前委托列表。",

    requstText: "请求参数：",
    requstParams: [
      {
        label: "coinMarket",
        type: "string",
        need: "非必须",
        note: "	交易对名称",
      },
      {
        label: "orderType",
        type: "number",
        need: "非必须",
        note: "	1:限价委托 2:市价委托 3:市价止盈 4:市价止损 5:计划委托",
      },
      {
        label: "type",
        type: "number",
        need: "非必须",
        note: "	1买, 2卖",
      },
      {
        label: "directType",
        type: "number",
        need: "非必须",
        note: "	方向类型 1:开多 2:平多 3:开空 4:平空",
      },
      {
        label: "startTime",
        type: "string",
        need: "非必须",
        note: "开始时间",
      },
      {
        label: "endTime",
        type: "string",
        need: "非必须",
        note: "结束时间",
      },
      {
        label: "pageNum",
        type: "number",
        need: "非必须",
        note: "页码",
      },
      {
        label: "pageSize",
        type: "number",
        need: "非必须",
        note: "页数",
      },
    ],
    requstExampleText: "请求示例",
    requstExample: `
        {
          "coinMarket:"BTC/USDT",
          "orderType":1,
          "type":1,
          "directType":1,
          "startTime":1696822263,
          "endTime":1696822263,
          "pageNum:1,
          "pageSize":10
        }`,
    reponseText: "返回参数:",
    reponseParams: [
      {
        label: "code",
        type: "number",
        need: "非必须",
        note: "响应代码",
      },
      {
        label: "message",
        type: "string",
        need: "非必须",
        note: "响应消息",
      },
      {
        label: "data",
        type: "object",
        need: "非必须",
        note: "仓响应数据",
      },
      {
        label: "records",
        type: "object []",
        need: "非必须",
        note: "响应数据集合",
      },
      {
        label: "type",
        type: "number",
        need: "必须",
        note: "委托方向：1买, 2卖",
      },
      {
        label: "status",
        type: "number",
        need: "必须",
        note: "0 待交易 1 完全成交 2 部分成交 3 撤销中 4 撤销成功",
      },
      {
        label: "directType",
        type: "number",
        need: "必须",
        note: "方向类型 1:开多 2:平多 3:开空 4:平空",
      },
      {
        label: "positionType",
        type: "number",
        need: "必须",
        note: "仓位类型：0全仓 1逐仓",
      },
      {
        label: "entrustType",
        type: "number",
        need: "必须",
        note: "委托单类型 1:限价委托 2:市价委托 3:市价止盈 4:市价止损 5:计划委托",
      },
      {
        label: "leverTimes",
        type: "number",
        need: "必须",
        note: "	杠杆倍数",
      },
      {
        label: "priceType",
        type: "number",
        need: "必须",
        note: "委托价类型：1限价开仓，2市价开仓，3限价平仓，4市价平仓，5计划限价开仓，6计划限价平仓，7计划市价开仓，8计划市价平仓",
      },
      {
        label: "averagePrice",
        type: "string",
        need: "必须",
        note: "成交均价",
      },
      {
        label: "coinMarket",
        type: "string",
        need: "必须",
        note: "交易对名称",
      },
      {
        label: "entrustNo",
        type: "string",
        need: "必须",
        note: "委托单号",
      },
      {
        label: "entrustAmount",
        type: "boolean",
        need: "必须",
        note: "委托数量",
      },
      {
        label: "triggerDirection",
        type: "string",
        need: "必须",
        note: "触发方向，0：>=，1：<=",
      },
      {
        label: "triggerPrice",
        type: "string",
        need: "必须",
        note: "触发价",
      },
      {
        label: "remainAmount",
        type: "string",
        need: "必须",
        note: "	剩余数量",
      },
      {
        label: "entrustPrice",
        type: "string",
        need: "必须",
        note: "委托价格",
      },
      {
        label: "dealAmount",
        type: "string",
        need: "必须",
        note: "成交数量",
      },
      {
        label: "createTime",
        type: "string",
        need: "必须",
        note: "创建时间",
      },
      {
        label: "profitTriggerPrice",
        type: "string",
        need: "必须",
        note: "止盈触发价格",
      },
      {
        label: "lossTriggerPrice",
        type: "string",
        need: "必须",
        note: "止损触发价格",
      },
      {
        label: "success",
        type: "boolean",
        need: "非必须",
        note: "响应状态",
      },
    ],
    reponseExampleText: "返回示例:",
    responseExample: `{
      "code": 1,
      "message": "success",
      "data": {
          "records": [
              {
                  "type": 2,
                  "status": 1,
                  "directType": 3,
                  "positionType": 1,
                  "turnover": 27913.6,
                  "entrustType": 2,
                  "closePositionsType": 0,
                  "leverTimes": 125,
                  "priceType": 2,
                  "averagePrice": "27913.6",
                  "coinMarket": "BTC/USDT",
                  "entrustNo": "589894356927365120",
                  "entrustAmount": "1",
                  "remainAmount": "0",
                  "dealAmount": "1",
                  "createTime": 1696822264,
                  "planCycleId": null,
              },
              {
                  "type": 1,
                  "status": 1,
                  "directType": 4,
                  "positionType": 1,
                  "turnover": 2953944.4,
                  "entrustType": 2,
                  "closePositionsType": 1,
                  "leverTimes": 125,
                  "priceType": 4,
                  "averagePrice": "27867.4",
                  "coinMarket": "BTC/USDT",
                  "entrustNo": "588988183952871424",
                  "entrustAmount": "106",
                  "remainAmount": "0",
                  "entrustPrice": null,
                  "dealAmount": "106",
                  "createTime": 1696606215,
                  "planCycleId": -1,
              }
          ],
          "total": 2,
          "size": 10,
          "current": 1,
          "orders": [],
          "searchCount": true,
          "pages": 1
      },
      "success": true
  }`,
  },
  {
    id: 9,
    title: "用户获取合约委托订单列表(USER_DATA)",
    apiInterface:
      "POST  /api/ex/order/v1/u/usdt-contract/user/entrust-list/history",
    apiEffect: "用户获取合约委托订单列表。",

    requstText: "请求参数：",
    requstParams: [
      {
        label: "coinMarket",
        type: "number",
        need: "非必须",
        note: "	交易对名称",
      },
      {
        label: "userId",
        type: "number",
        need: "非必须",
        note: "用户id",
      },
      {
        label: "orderType",
        type: "number",
        need: "非必须",
        note: "1:限价委托 2:市价委托 3:市价止盈 4:市价止损 5:计划委托",
      },
      {
        label: "type",
        type: "number",
        need: "非必须",
        note: "1买, 2卖",
      },
      {
        label: "directType",
        type: "number",
        need: "非必须",
        note: "方向类型 1:开多 2:平多 3:开空 4:平空",
      },
      {
        label: "startTime",
        type: "string",
        need: "非必须",
        note: "	开始时间",
      },
      {
        label: "endTime",
        type: "string",
        need: "非必须",
        note: "结束时间",
      },
      {
        label: "pageNum",
        type: "number",
        need: "非必须",
        note: "页码",
      },
      {
        label: "pageSize",
        type: "number",
        need: "非必须",
        note: "页数",
      },
    ],
    requstExampleText: "请求示例",
    requstExample: `
        {
            "coinMarket":"BTC/USDT",
            "positionDirection":1,              
            "startTime":1696822263,             
            "endTime":1696822263,              
            "pageNum:1,           
            "pageSize":10
        }`,
    reponseText: "返回参数:",
    reponseParams: [
      {
        label: "type",
        type: "Integer",
        need: "必须",
        note: "委托方向：1买, 2卖",
      },
      {
        label: "status",
        type: "Integer",
        need: "必须",
        note: "委托状态：0 待交易，1 完全成交，2 部分成交，3 撤销中，4 撤销成功",
      },
      {
        label: "directType",
        type: "Integer",
        need: "必须",
        note: "方向类型：1开多，2平多，3开空，4平空",
      },
      {
        label: "positionType",
        type: "Integer",
        need: "必须",
        note: "仓位类型：0全仓，1逐仓",
      },
      {
        label: "turnover",
        type: "BigDecima",
        need: "必须",
        note: "成交额",
      },
      {
        label: "entrustType",
        type: "Integer",
        need: "必须",
        note: "委托单类型：1限价委托，2市价委托，3市价止盈，4市价止损，5计划委托",
      },
      {
        label: "closePositionsType",
        type: "Integer",
        need: "必须",
        note: "平仓类型：0正常反向单，1系统强平，2用户手动限价平仓，3用户手动市价平仓，4系统强减，5用户市价全平",
      },
      {
        label: "leverTimes",
        type: "Integer",
        need: "必须",
        note: "	杠杆倍数",
      },
      {
        label: "priceType",
        type: "Integer",
        need: "必须",
        note: "委托价类型：1限价开仓，2市价开仓，3限价平仓，4市价平仓，5计划限价开仓，6计划限价平仓，7计划市价开仓，8计划市价平仓",
      },
      {
        label: "averagePrice",
        type: "string",
        need: "必须",
        note: "成交均价",
      },
      {
        label: "coinMarket",
        type: "string",
        need: "必须",
        note: "交易对名称",
      },
      {
        label: "entrustNo",
        type: "string",
        need: "必须",
        note: "	委托单号",
      },
      {
        label: "entrustAmount",
        type: "string",
        need: "必须",
        note: "委托数量",
      },
      {
        label: "triggerDirection",
        type: "Integer",
        need: "必须",
        note: "触发方向：0：>=，1：<=",
      },
      {
        label: "triggerPrice",
        type: "string",
        need: "必须",
        note: "触发价",
      },
      {
        label: "isExpired",
        type: "Integer",
        need: "必须",
        note: "	是否已过期：0否，1是",
      },
      {
        label: "remainAmount",
        type: "string",
        need: "必须",
        note: "剩余数量",
      },
      {
        label: "entrustPrice",
        type: "string",
        need: "必须",
        note: "委托价格",
      },
      {
        label: "dealAmount",
        type: "string",
        need: "必须",
        note: "成交数量",
      },
      {
        label: "createTime",
        type: "string",
        need: "必须",
        note: "创建时间",
      },
      {
        label: "planCycleId",
        type: "string",
        need: "必须",
        note: "跟单周期ID",
      },
      {
        label: "planCycleNum",
        type: "string",
        need: "必须",
        note: "跟单周期数",
      },
      {
        label: "dealDeposit",
        type: "string",
        need: "必须",
        note: "成交保证金",
      },
    ],
    reponseExampleText: "返回示例:",
    responseExample: `{
        "code": 1,
        "message": "success",
        "data": {
            "records": [
                {
                    "type": 2,
                    "status": 1,
                    "directType": 3,
                    "positionType": 1,
                    "turnover": 27913.6,
                    "entrustType": 2,
                    "closePositionsType": 0,
                    "leverTimes": 125,
                    "priceType": 2,
                    "averagePrice": "27913.6",
                    "coinMarket": "BTC/USDT",
                    "entrustNo": "589894356927365120",
                    "entrustAmount": "1",
                    "remainAmount": "0",
                    "dealAmount": "1",
                    "createTime": 1696822264,
                    "planCycleId": null,
                },
                {
                    "type": 1,
                    "status": 1,
                    "directType": 4,
                    "positionType": 1,
                    "turnover": 2953944.4,
                    "entrustType": 2,
                    "closePositionsType": 1,
                    "leverTimes": 125,
                    "priceType": 4,
                    "averagePrice": "27867.4",
                    "coinMarket": "BTC/USDT",
                    "entrustNo": "588988183952871424",
                    "entrustAmount": "106",
                    "remainAmount": "0",
                    "entrustPrice": null,
                    "dealAmount": "106",
                    "createTime": 1696606215,
                    "planCycleId": -1,
                }
            ],
            "total": 2,
            "size": 10,
            "current": 1,
            "orders": [],
            "searchCount": true,
            "pages": 1
        },
        "success": true
    }`,
  },
  {
    id: 10,
    title: "用户获取合约历史仓位(USER_DATA)",
    apiInterface:
      "POST  /api/ex/order/v1/u/usdt-contract/user/position/history",
    apiEffect: "获取用户历史仓位列表",
    requstText: "请求参数：",
    requstParams: [
      {
        label: "coinMarket",
        type: "string",
        need: "非必须",
        note: "交易对",
      },
      {
        label: "positionDirection",
        type: "number",
        need: "非必须",
        note: "仓位方向 1：做多，1：做空",
      },
      {
        label: "startTime",
        type: "string",
        need: "非必须",
        note: "开始时间",
      },
      {
        label: "endTime",
        type: "string",
        need: "非必须",
        note: "结束时间",
      },
      {
        label: "pageNum",
        type: "number",
        need: "非必须",
        note: "页码",
      },
      {
        label: "pageSize",
        type: "number",
        need: "非必须",
        note: "页数",
      },
    ],
    requstExampleText: "请求示例",
    requstExample: `
        {
          "coinMarket":"BTC/USDT",
          "positionDirection":1,
          "startTime":1696822263,
          "endTime":1696822263,
          "pageNum:1,
          "pageSize":10
        }`,
    reponseText: "返回参数: ",
    reponseParams: [
      {
        label: "positionId",
        type: "Integer",
        need: "必须",
        note: "仓位ID",
      },
      {
        label: "coinMarket",
        type: "string",
        need: "必须",
        note: `交易对名称，大写带 " / "`,
      },
      {
        label: "status",
        type: "Integer",
        need: "必须",
        note: "状态：1全部平仓，2部分平仓",
      },
      {
        label: "positionDirection",
        type: "Integer",
        need: "必须",
        note: "仓位方向：1做多，2做空",
      },
      {
        label: "positionType",
        type: "Integer",
        need: "必须",
        note: "仓位模式：0全仓，1逐仓",
      },
      {
        label: "leverage",
        type: "string",
        need: "必须",
        note: "杠杆数量",
      },
      {
        label: "realizedProfitLoss",
        type: "number",
        need: "必须",
        note: "已实现盈亏",
      },
      {
        label: "maxPositionAmount",
        type: "number",
        need: "必须",
        note: "最大持仓量",
      },
      {
        label: "closedAmount",
        type: "number",
        need: "必须",
        note: "已平仓量",
      },
      {
        label: "closeAveragePrice",
        type: "number",
        need: "必须",
        note: "平仓均价",
      },
      {
        label: "positionAveragePrice",
        type: "number",
        need: "必须",
        note: "开仓均价",
      },
      {
        label: "lastDealTime",
        type: "string",
        need: "必须",
        note: "最后成交时间",
      },
      {
        label: "createTime",
        type: "string",
        need: "必须",
        note: "创建时间",
      },
      {
        label: "planCycleId",
        type: "Integer",
        need: "必须",
        note: "	跟单周期ID",
      },
      {
        label: "planCycleNum",
        type: "Integer",
        need: "必须",
        note: "	跟单周期数",
      },
      {
        label: "strongClose",
        type: "Integer",
        need: "必须",
        note: "是否强平：0否，1是",
      },
    ],
    reponseExampleText: "返回示例：",
    responseExample: `{
      "code": 1,
      "message": "success",
      "data": {
          "records": [
              {
                  "positionId": 4851,
                  "coinMarket": "BTC/USDT",
                  "status": 1,
                  "positionDirection": 1,
                  "positionType": 1,
                  "leverage": 125,
                  "realizedProfitLoss": -109.29,
                  "maxPositionAmount": 108,
                  "closedAmount": 108,
                  "closeAveragePrice": 27582.6,
                  "positionAveragePrice": 27683.8,
                  "lastDealTime": "2023-10-06 20:30:38",
                  "lastDealTimeTsLong": 1696595438000,
                  "createTime": "2023-10-06 19:40:17",
                  "createTimeTsLong": 1696592417000,
                  "planCycleId": -1,
                  "planCycleNum": null,
                  "strongClose": 1
              },
              {
                  "positionId": 4843,
                  "coinMarket": "BTC/USDT",
                  "status": 1,
                  "positionDirection": 2,
                  "positionType": 1,
                  "leverage": 125,
                  "realizedProfitLoss": -107.03,
                  "maxPositionAmount": 106,
                  "closedAmount": 106,
                  "closeAveragePrice": 27867.4,
                  "positionAveragePrice": 27766.42,
                  "lastDealTime": "2023-10-06 23:30:15",
                  "lastDealTimeTsLong": 1696606215000,
                  "createTime": "2023-10-06 18:38:46",
                  "createTimeTsLong": 1696588726000,
                  "planCycleId": -1,
                  "planCycleNum": null,
                  "strongClose": 1
              }
          ],
          "total": 2,
          "size": 10,
          "current": 1,
          "orders": [],
          "searchCount": true,
          "pages": 1
      },
      "success": true
  }`,
  },
  {
    id: 11,
    title: "用户U本位合约下单(USER_DATA)",
    apiInterface: "POST  /api/ex/order/v1/u/usdt-contract/add",
    apiEffect: "用户在U本位合约下单。",
    requstText: "请求参数：",
    requstParams: [
      {
        label: "type",
        type: "number",
        need: "必须",
        note: "委托方向：1买 ，2卖",
      },
      {
        label: "orderType",
        type: "number",
        need: "必须",
        note: "委托价类型：1限价开仓，2市价开仓，3限价平仓，4市价平仓，5计划限价开仓，6计划限价平仓，7计划市价开仓，8计划市价平仓",
      },
      {
        label: "amount",
        type: "string",
        need: "必须",
        note: "委托数量（张数）",
      },
      {
        label: "price",
        type: "string",
        need: "非必须",
        note: "委托价格（市价下单时此参数不传），计划市价时，不传",
      },
      {
        label: "triggerPrice",
        type: "number",
        need: "非必须",
        note: "触发价 (计划限价下单时的触发价格)",
      },
      {
        label: "coinMarket",
        type: "string",
        need: "必须",
        note: "交易对名称，大写，有斜杠",
      },
      {
        label: "triggerProfitPrice",
        type: "string",
        need: "必须",
        note: "持有仓位时，对仓位设置止盈触发价，此时orderType传开仓方式中对应的值",
      },
      {
        label: "triggerLossPrice",
        type: "string",
        need: "必须",
        note: "持有仓位时，对仓位设置止损触发价，此时orderType传开仓方式中对应的值",
      },
      {
        label: "positionType",
        type: "number",
        need: "必须",
        note: "positionType代表仓位类型，0：全仓，1：逐仓。当平仓的时候需传该值，即当orderType=3,4,6,8时，该参数必须传值",
      },
    ],
    requstExampleText: "请求示例",
    requstExample: `
        {
            "type": 1,
            "amount": 1,
            "orderType": 2,
            "positionType": 0,
            "coinMarket": "BTC/USDT"
        }`,
    reponseText: "返回参数: ",
    reponseParams: [
      {
        label: "code",
        type: "int",
        need: "必须",
        note: "响应代码",
      },
      {
        label: "message",
        type: "string",
        need: "必须",
        note: "响应消息",
      },
      {
        label: "data",
        type: "object",
        need: "必须",
        note: "响应数据",
      },
      {
        label: "success",
        type: "boolean",
        need: "必须",
        note: "响应状态",
      },
    ],
    reponseExampleText: "返回示例：",
    responseExample: `
      {
          "code": 1,
          "message": "success",
          "data": null,
          "success": true
      }`,
  },
  {
    id: 12,
    title: "用户U本位合约撤单-支持批量(USER_DATA)",
    apiInterface: "POST  /api/ex/order/v1/u/usdt-contract/cancel/trust",
    apiEffect: "用户撤销当前委托的合约订单。",
    requstText: "请求参数：",
    requstParams: [
      {
        label: "entrustNos",
        type: "object []",
        need: "必须",
        note: "订单号数组",
      },
      {
        label: "entrustNo",
        type: "string",
        need: "必须",
        note: "委托单号",
      },
      {
        label: "orderType",
        type: "number",
        need: "必须",
        note: "1普通委托 2计划委托 3止盈止损",
      },
    ],
    requstExampleText: "请求示例",
    requstExample: `
        {
          "entrustNos": [
                {
                    "entrustNo": "590833172013977600",
                    "orderType": 1
                }
            ]
        }`,
    reponseText: "返回参数: ",
    reponseParams: [
      {
        label: "code",
        type: "int",
        need: "必须",
        note: "响应代码",
      },
      {
        label: "message",
        type: "string",
        need: "必须",
        note: "响应消息",
      },
      {
        label: "data",
        type: "object",
        need: "必须",
        note: "响应数据",
      },
      {
        label: "success",
        type: "boolean",
        need: "必须",
        note: "响应状态",
      },
    ],
    reponseExampleText: "返回示例：",
    responseExample: `
      {
          "code": 1,
          "message": "success",
          "data": null,
          "success": true
      }`,
  },
  {
    id: 13,
    title: "合约口令跟单创建",
    apiInterface: "POST  /api/ex/order/usdt-contract/trade/create",
    apiEffect: "",
    requstText: "请求参数：",
    requstParams: [
      {
        label: "coinMarket",
        type: "string",
        need: "必须",
        note: "交易对名称，大写带 /",
      },
      {
        label: "positionType",
        type: "number",
        need: "必须",
        note: "仓位类型：0全仓 1逐仓",
      },
      {
        label: "leverTimes",
        type: "number",
        need: "必须",
        note: "杠杆倍数",
      },
      {
        label: "type",
        type: "number",
        need: "必须",
        note: "委托方向：1买， 2卖",
      },
      {
        label: "priceType",
        type: "number",
        need: "必须",
        note: "委托价类型：1：限价开仓 2：市价开仓 5：计划限价开仓 7：计划市价开仓",
      },
      {
        label: "triggerPrice",
        type: "number",
        need: "必须",
        note: "触发价（计划委托必传）",
      },
      {
        label: "entrustPrice",
        type: "number",
        need: "必须",
        note: "委托价（限价必传）",
      },
      {
        label: "triggerProfitPrice",
        type: "number",
        need: "必须",
        note: "止盈触发价",
      },
      {
        label: "triggerLossPrice",
        type: "number",
        need: "必须",
        note: "止损触发价",
      },
      {
        label: "amountPrencent",
        type: "number",
        need: "必须",
        note: "委托量",
      },
      {
        label: "failureTimeMillis",
        type: "number",
        need: "必须",
        note: "失效时间戳",
      },
    ],
    requstExampleText: "请求示例",
    requstExample: `
        {
          "coinMarket": "BTC/USDT",
          "positionType": "0",
          "leverTimes": "100",
          "type": "1",
        }`,
    reponseText: "返回参数: ",
    reponseParams: [
      {
        label: "symbolKey",
        type: "string",
        need: "必须",
        note: "交易对名称，小写不带 /",
      },
      {
        label: "coinMarket",
        type: "string",
        need: "必须",
        note: "交易对名称，大写带 /",
      },
      {
        label: "positionType",
        type: "number",
        need: "必须",
        note: "仓位类型：0全仓 1逐仓",
      },
      {
        label: "leverTimes",
        type: "number",
        need: "必须",
        note: "杠杆倍数",
      },
      {
        label: "type",
        type: "number",
        need: "必须",
        note: "委托方向：1买， 2卖",
      },
      {
        label: "priceType",
        type: "number",
        need: "必须",
        note: "委托价类型：1：限价开仓 2：市价开仓 5：计划限价开仓 7：计划市价开仓",
      },
      {
        label: "triggerPrice",
        type: "number",
        need: "必须",
        note: "触发价",
      },
      {
        label: "entrustPrice",
        type: "number",
        need: "必须",
        note: "委托价",
      },
      {
        label: "triggerProfitPrice",
        type: "number",
        need: "必须",
        note: "止盈触发价",
      },
      {
        label: "triggerLossPrice",
        type: "number",
        need: "必须",
        note: "止损触发价",
      },
      {
        label: "amountPrencent",
        type: "number",
        need: "必须",
        note: "委托量",
      },
      {
        label: "tradeToken",
        type: "string",
        need: "必须",
        note: "跟单口令",
      },
      {
        label: "tradeNumber",
        type: "number",
        need: "必须",
        note: "跟单人数",
      },
      {
        label: "tokenStatus",
        type: "number",
        need: "必须",
        note: "口令状态 1：正常 2：失效",
      },
      {
        label: "failureTime",
        type: "string",
        need: "必须",
        note: "失效时间",
      },
      {
        label: "createTime",
        type: "string",
        need: "必须",
        note: "创建时间",
      },
    ],
    reponseExampleText: "返回示例：",
    responseExample: `
      {
          "code": 1,
          "message": "success",
          "data": null,
          "success": true
      }`,
  },

  {
    id: 14,
    title: "合约口令跟单详情",
    apiInterface: "POST  /api/ex/order/usdt-contract/trade/details",
    apiEffect: "",
    requstText: "请求参数：",
    requstParams: [
      {
        label: "id",
        type: "number",
        need: "必须",
        note: "合约跟单id",
      },
      {
        label: "tradeToken",
        type: "string",
        need: "必须",
        note: "跟单口令",
      },
    ],
    requstExampleText: "请求示例",
    requstExample: `
        {
          "id": "1",
          "tradeToken": "tradeToken",
        }`,
    reponseText: "返回参数: ",
    reponseParams: [
      {
        label: "symbolKey",
        type: "string",
        need: "必须",
        note: "交易对名称，小写不带 /",
      },
      {
        label: "coinMarket",
        type: "string",
        need: "必须",
        note: "交易对名称，大写带 /",
      },
      {
        label: "positionType",
        type: "number",
        need: "必须",
        note: "仓位类型：0全仓 1逐仓",
      },
      {
        label: "leverTimes",
        type: "number",
        need: "必须",
        note: "杠杆倍数",
      },
      {
        label: "type",
        type: "number",
        need: "必须",
        note: "委托方向：1买， 2卖",
      },
      {
        label: "priceType",
        type: "number",
        need: "必须",
        note: "委托价类型：1：限价开仓 2：市价开仓 5：计划限价开仓 7：计划市价开仓",
      },
      {
        label: "triggerPrice",
        type: "number",
        need: "必须",
        note: "触发价",
      },
      {
        label: "entrustPrice",
        type: "number",
        need: "必须",
        note: "委托价",
      },
      {
        label: "triggerProfitPrice",
        type: "number",
        need: "必须",
        note: "止盈触发价",
      },
      {
        label: "triggerLossPrice",
        type: "number",
        need: "必须",
        note: "止损触发价",
      },
      {
        label: "amountPrencent",
        type: "number",
        need: "必须",
        note: "委托量",
      },
      {
        label: "tradeToken",
        type: "string",
        need: "必须",
        note: "跟单口令",
      },
      {
        label: "tradeNumber",
        type: "number",
        need: "必须",
        note: "跟单人数",
      },
      {
        label: "tokenStatus",
        type: "number",
        need: "必须",
        note: "口令状态 1：正常 2：失效",
      },
      {
        label: "failureTime",
        type: "string",
        need: "必须",
        note: "失效时间",
      },
      {
        label: "createTime",
        type: "string",
        need: "必须",
        note: "创建时间",
      },
    ],
    reponseExampleText: "返回示例：",
    responseExample: `
      {
          "code": 1,
          "message": "success",
          "data": null,
          "success": true
      }`,
  },
  {
    id: 15,
    title: "合约口令跟单历史",
    apiInterface: "POST  /api/ex/order/usdt-contract/trade/history/list",
    apiEffect: "",
    requstText: "请求参数：",
    requstParams: [
      {
        label: "tradeToken",
        type: "string",
        need: "必须",
        note: "跟单口令",
      },
      {
        label: "tokenStatus",
        type: "number",
        need: "必须",
        note: "口令状态 1：正常 2：失效",
      },
      {
        label: "timeType",
        type: "number",
        need: "必须",
        note: "时间类型 1：创建时间 2：失效时间",
      },
      {
        label: "startTime",
        type: "number",
        need: "必须",
        note: "开始时间（时间戳）",
      },
      {
        label: "endTime",
        type: "number",
        need: "必须",
        note: "结束时间（时间戳）",
      },
      {
        label: "pageNum",
        type: "number",
        need: "必须",
        note: "页码数",
      },
      {
        label: "pageSize",
        type: "number",
        need: "必须",
        note: "数据条数",
      },
    ],
    requstExampleText: "请求示例",
    requstExample: `
        {
          "tokenStatus": "1",
          "timeType": "1",
          "tradeToken": "tradeToken",
        }`,
    reponseText: "返回参数: ",
    reponseParams: [
      {
        label: "symbolKey",
        type: "string",
        need: "必须",
        note: "交易对名称，小写不带 /",
      },
      {
        label: "coinMarket",
        type: "string",
        need: "必须",
        note: "交易对名称，大写带 /",
      },
      {
        label: "positionType",
        type: "number",
        need: "必须",
        note: "仓位类型：0全仓 1逐仓",
      },
      {
        label: "leverTimes",
        type: "number",
        need: "必须",
        note: "杠杆倍数",
      },
      {
        label: "type",
        type: "number",
        need: "必须",
        note: "委托方向：1买， 2卖",
      },
      {
        label: "priceType",
        type: "number",
        need: "必须",
        note: "委托价类型：1：限价开仓 2：市价开仓 5：计划限价开仓 7：计划市价开仓",
      },
      {
        label: "triggerPrice",
        type: "number",
        need: "必须",
        note: "触发价",
      },
      {
        label: "entrustPrice",
        type: "number",
        need: "必须",
        note: "委托价",
      },
      {
        label: "triggerProfitPrice",
        type: "number",
        need: "必须",
        note: "止盈触发价",
      },
      {
        label: "triggerLossPrice",
        type: "number",
        need: "必须",
        note: "止损触发价",
      },
      {
        label: "amountPrencent",
        type: "number",
        need: "必须",
        note: "委托量",
      },
      {
        label: "tradeToken",
        type: "string",
        need: "必须",
        note: "跟单口令",
      },
      {
        label: "tradeNumber",
        type: "number",
        need: "必须",
        note: "跟单人数",
      },
      {
        label: "tokenStatus",
        type: "number",
        need: "必须",
        note: "口令状态 1：正常 2：失效",
      },
      {
        label: "failureTime",
        type: "string",
        need: "必须",
        note: "失效时间",
      },
      {
        label: "createTime",
        type: "string",
        need: "必须",
        note: "创建时间",
      },
    ],
    reponseExampleText: "返回示例：",
    responseExample: `
      {
          "code": 1,
          "message": "success",
          "data": null,
          "success": true
      }`,
  },
];
export const spot = [
  {
    id: 0,
    title: "下单 (TRADE)",
    apiInterface: "POST  /api/ex/order/v1/spot/add",
    apiEffect: "发送下单。",
    requstText: "请求参数：",
    requstParams: [
      {
        label: "type",
        type: "integer",
        need: "必须",
        note: "委托方向：1买 ，2卖",
      },
      {
        label: "orderType",
        type: "integer",
        need: "必须",
        note: "下单类型：1限价，2市价",
      },
      {
        label: "coinMarket",
        type: "string",
        need: "必须",
        note: "交易对名称，大写，有斜杠",
      },
      {
        label: "amount",
        type: "string",
        need: "必须",
        note: "委托数量",
      },
      {
        label: "price",
        type: "string",
        need: "必须",
        note: "委托价格(市价时,不传)",
      },
      {
        label: "amountType",
        type: "number",
        need: "必须",
        note: "下单金额类型：1市场币，2计价币 例如下单交易对为btcusdt，若通过btc数量下单，则传1，通过usdt余额下单则传2",
      },
      {
        label: "balance",
        type: "string",
        need: "必须",
        note: "余额。当amountType为2时则必传",
      },
    ],
    requstExampleText: "请求示例",
    requstExample: `
        {
            "amount": "30",
            "type": 1,
            "orderType": 2,
            "coinMarket": "BTC/USDT",
            "amountType": 2,
            "balance": "30"//以USDT结算传
        }`,
    reponseText: "返回参数:",
    reponseParams: [
      {
        label: "code",
        type: "number",
        need: "必须",
        note: "响应代码",
      },
      {
        label: "message",
        type: "string",
        need: "必须",
        note: "响应消息",
      },
      {
        label: "data",
        type: "string",
        need: "必须",
        note: "订单号",
      },
      {
        label: "success",
        type: "boolean",
        need: "必须",
        note: "响应状态",
      },
    ],
    reponseExampleText: "返回示例:",
    responseExample: `
     {
          "code": 1,
          "message": "success",
          "data": "589435805188558848", //订单编号
          "success": true
      }`,
  },
  {
    id: 1,
    title: "撤销订单 可支持批量(TRADE)",
    apiInterface: "POST  /api/ex/order/v1/spot/cancel",
    apiEffect: "取消有效订单。",
    requstText: "请求参数：",
    requstParams: [
      {
        label: "entrustNos",
        type: "object",
        need: "必须",
        note: "委托号列表",
      },
      {
        label: "entrustNo",
        type: "string",
        need: "必须",
        note: "委托单号",
      },
    ],
    requstExampleText: "请求示例",
    requstExample: `
          {
            "entrustNos": [
              {
                "entrustNo": "589729477763338240"
              }
            ]
          }`,
    reponseText: "返回参数:",
    reponseParams: [
      {
        label: "code",
        type: "number",
        need: "必须",
        note: "响应代码",
      },
      {
        label: "message",
        type: "string",
        need: "必须",
        note: "响应消息",
      },
      {
        label: "data",
        type: "object",
        need: "必须",
        note: "响应数据",
      },
      {
        label: "success",
        type: "boolean",
        need: "必须",
        note: "响应状态",
      },
    ],
    reponseExampleText: "返回示例:",
    responseExample: `
     {
          "code": 1,
          "message": "success",
          "data": null, 
          "success": true
      }`,
  },
  {
    id: 2,
    title: "用户查询当前委托订单列表(USER_DATA)",
    apiInterface: "POST  /api/ex/order/v1/spot/entrust-list-current",
    apiEffect: "获取用户当前委托的订单列表，待成交状态。",
    requstText: "请求参数：",
    requstParams: [
      {
        label: "coinMarket",
        type: "string",
        need: "非必须",
        note: "交易对名称 大写带斜杠/",
      },
      {
        label: "type",
        type: "integer",
        need: "非必须",
        note: "方向：1买, 2卖",
      },
      {
        label: "orderType",
        type: "integer",
        need: "非必须",
        note: "下单类型：1，限价委托， 2，市价委托",
      },
    ],
    requstExampleText: "请求示例",
    requstExample: `
          {
            "coinMarket ":"BTC/USDT",
            "type": 1,
            "orderType": 1
          }`,
    reponseText: "返回参数:",
    reponseParams: [
      {
        label: "code",
        type: "number",
        need: "非必须",
        note: "响应代码",
      },
      {
        label: "message",
        type: "string",
        need: "非必须",
        note: "响应消息",
      },
      {
        label: "data",
        type: "object",
        need: "必须",
        note: "响应数据",
      },
      {
        label: "UserSpotGoodsEntrustListVO",
        type: "object",
        need: "必须",
        note: "订单信息组合",
      },
      {
        label: "id",
        type: "string",
        need: "必须",
        note: "id",
      },
      {
        label: "entrustNo",
        type: "string",
        need: "必须",
        note: "委托单号",
      },
      {
        label: "type",
        type: "integer",
        need: "必须",
        note: "委托方向：1买, 2卖",
      },
      {
        label: "orderStatus",
        type: "integer",
        need: "必须",
        note: "0 待交易 1 完全成交 2 部分成交 3 撤销中 4 撤销成功",
      },
      {
        label: "priceType",
        type: "integer",
        need: "必须",
        note: "1限价，2市价",
      },
      {
        label: "coinMarket",
        type: "string",
        need: "必须",
        note: "交易对名称",
      },
      {
        label: "amount",
        type: "string",
        need: "必须",
        note: "委托数量",
      },
      {
        label: "price",
        type: "string",
        need: "必须",
        note: "委托价格",
      },
      {
        label: "remainingNumber",
        type: "string",
        need: "必须",
        note: "剩余数量",
      },
      {
        label: "averagePrice",
        type: "string",
        need: "必须",
        note: "成交均价",
      },
      {
        label: "createTime",
        type: "number",
        need: "必须",
        note: "创建时间",
      },
      {
        label: "dealAmount",
        type: "string",
        need: "必须",
        note: "成交量",
      },
      {
        label: "turnover",
        type: "string",
        need: "必须",
        note: "成交数额",
      },
      {
        label: "success",
        type: "boolean",
        need: "非必须",
        note: "响应状态",
      },
    ],
    reponseExampleText: "返回示例:",
    responseExample: `
    {
      "code": 1,
      "message": "success",
      "data": [
        {
          "UserSpotGoodsEntrustListVO": [
            {
              "id": "589738031618527233",
              "entrustNo": "589738031618527232",
              "type": 1,
              "orderStatus": 0,
              "priceType": 1,
              "coinMarket": "BTC/USDT",
              "amount": "0.00107",
              "turnover": "0E-8",
              "remainingNumber": "0.00107000",
              "price": "27900",
              "dealAmount": "0",
              "averagePrice": "0",
              "createTime": 1696784993000
            }
          ]
        }
      ],
      "success": true
    }`,
  },
  {
    id: 3,
    title: "用户现货历史委托订单列表(USER_DATA)",
    apiInterface: "POST  /api/ex/order/v1/spot/entrust-list",
    apiEffect:
      "获取用户历史委托的订单列表，有 市价委托、限价委托中 ，完全成交、部分成交、已撤销的订单。",
    requstText: "请求参数：",
    requstParams: [
      {
        label: "pageNum",
        type: "number",
        need: "必须",
        note: "页码",
      },
      {
        label: "pageSize",
        type: "number",
        need: "必须",
        note: "每页记录数",
      },
      {
        label: "coinMarket",
        type: "string",
        need: "非必须",
        note: "交易对大写带斜杠",
      },
      {
        label: "type",
        type: "number",
        need: "非必须",
        note: "方向：1买，2卖",
      },
      {
        label: "priceType",
        type: "number",
        need: "非必须",
        note: "委托价类型，1限价委托，2市价委托",
      },
      {
        label: "status",
        type: "integer",
        need: "非必须",
        note: "委托状态；1 成交 2 部分成交 4已撤销",
      },
      {
        label: "startTime",
        type: "number",
        need: "非必须",
        note: "开始时间",
      },
      {
        label: "endTime",
        type: "number",
        need: "非必须",
        note: "结束时间",
      },
    ],
    requstExampleText: "请求示例",
    requstExample: `
          {
            "pageNum": 1,
            "pageSize": 10
          }`,
    reponseText: "返回参数:",
    reponseParams: [
      {
        label: "code",
        type: "number",
        need: "非必须",
        note: "响应代码",
      },
      {
        label: "message",
        type: "string",
        need: "非必须",
        note: "响应信息",
      },
      {
        label: "data",
        type: "object",
        need: "非必须",
        note: "响应数据",
      },
      {
        label: "SpotGoodsEntrustHistoryVO",
        type: "object",
        need: "必须",
        note: "订单信息组合",
      },
      {
        label: "id",
        type: "string",
        need: "必须",
        note: "订单编号",
      },
      {
        label: "type",
        type: "number",
        need: "必须",
        note: "委托方向：1买, 2卖",
      },
      {
        label: "coinMarket",
        type: "string",
        need: "必须",
        note: "交易对名称",
      },
      {
        label: "status",
        type: "number",
        need: "必须",
        note: "委托状态； 0 待交易 1 成交 2 部分成交 3 撤销中 4已撤销",
      },
      {
        label: "priceType",
        type: "number",
        need: "必须",
        note: "委托价类型，1限价委托，2市价委托",
      },
      {
        label: "price",
        type: "string",
        need: "必须",
        note: "委托价格",
      },
      {
        label: "averagePrice",
        type: "string",
        need: "必须",
        note: "成交均价",
      },
      {
        label: "totalTurnover",
        type: "string",
        need: "必须",
        note: "成交量",
      },
      {
        label: "turnover",
        type: "string",
        need: "必须",
        note: "委托数量",
      },
      {
        label: "entrustNo",
        type: "string",
        need: "必须",
        note: "委托单号",
      },
      {
        label: "updateTime",
        type: "number",
        need: "必须",
        note: "更新时间 随着状态变更，比如说状态为已成交，则表示成交时间",
      },
      {
        label: "dealAmount",
        type: "number",
        need: "必须",
        note: "交易额",
      },
      {
        label: "createTime",
        type: "string",
        need: "必须",
        note: "委托时间",
      },
      {
        label: "success",
        type: "boolean",
        need: "非必须",
        note: "响应状态",
      },
    ],
    reponseExampleText: "返回示例:",
    responseExample: `
    {
      "code": 1,
      "message": "success",
      "data": {
          "records": [
              {
                  "id": "589738031618527233",
                  "type": 1,
                  "coinMarket": "BTC/USDT",
                  "status": 1,
                  "priceType": 1,
                  "updateTime": 1696785813,
                  "price": "27900",
                  "averagePrice": "29853",
                  "remainAmount": "0E-8",
                  "entrustFee": "1.19412",
                  "totalTurnover": "0.001",
                  "turnover": "0.001",
                  "dealAmount": "29.853",
                  "entrustNo": "589738031618527232",
                  "createTime": 1696784993
              },
              {
                  "id": "589729477763338241",
                  "type": 1,
                  "coinMarket": "BTC/USDT",
                  "status": 4,
                  "priceType": 1,
                  "updateTime": 1696782972,
                  "price": "27890",
                  "averagePrice": "0",
                  "remainAmount": "0.00107000",
                  "entrustFee": "0",
                  "totalTurnover": "0",
                  "turnover": "0.001",
                  "dealAmount": "0",
                  "entrustNo": "589729477763338240",
                  "createTime": 1696782953
              }
          ],
          "total": 2,
          "size": 10,
          "current": 1,
          "orders": [],
          "searchCount": true,
          "pages": 1
      },
      "success": true
  }`,
  },
  {
    id: 4,
    title: "用户现货历史成交订单列表(USER_DATA)",
    apiInterface: "POST  /api/ex/order/v1/spot/entrust-detail-list",
    apiEffect: "获取用户现货成交历史，只有完成的订单。",
    requstText: "请求参数：",
    requstParams: [
      {
        label: "pageNum",
        type: "string",
        need: "必须",
        note: "页码",
      },
      {
        label: "pageSize",
        type: "string",
        need: "必须",
        note: "每页记录数",
      },
      {
        label: "coinMarket",
        type: "string",
        need: "非必须",
        note: "交易对名称",
      },
      {
        label: "type",
        type: "string",
        need: "非必须",
        note: "方向：1买，2卖",
      },
      {
        label: "priceType",
        type: "string",
        need: "非必须",
        note: "类型：1限价委托，2市价委托",
      },
      {
        label: "startTime",
        type: "number",
        need: "非必须",
        note: "开始时间",
      },
      {
        label: "endTime",
        type: "number",
        need: "非必须",
        note: "结束时间",
      },
    ],
    requstExampleText: "请求示例",
    requstExample: `
          {
            "pageNum": 1,
            "pageSize": 10
          }`,
    reponseText: "返回参数:",
    reponseParams: [
      {
        label: "code",
        type: "number",
        need: "非必须",
        note: "响应代码",
      },
      {
        label: "message",
        type: "string",
        need: "非必须",
        note: "响应信息",
      },
      {
        label: "data",
        type: "object",
        need: "非必须",
        note: "响应数据",
      },
      {
        label: "entrustNo",
        type: "string",
        need: "必须",
        note: "委托单号",
      },
      {
        label: "dealNo",
        type: "string",
        need: "必须",
        note: "成交单号",
      },
      {
        label: "type",
        type: "number",
        need: "必须",
        note: "1买，2卖",
      },
      {
        label: "coinMarket",
        type: "string",
        need: "必须",
        note: "交易对名称",
      },
      {
        label: "amount",
        type: "string",
        need: "必须",
        note: "成交数量",
      },
      {
        label: "dealAmount",
        type: "string",
        need: "必须",
        note: "成交金额",
      },
      {
        label: "dealPrice",
        type: "string",
        need: "必须",
        note: "成交均价",
      },
      {
        label: "entrustAmount",
        type: "string",
        need: "必须",
        note: "委托数量",
      },
      {
        label: "direction",
        type: "number",
        need: "必须",
        note: "成交方向：1买成交，2卖成交",
      },
      {
        label: "dealType",
        type: "number",
        need: "必须",
        note: "交易类型 1限价交易，2市价交易",
      },
      {
        label: "createTime",
        type: "number",
        need: "必须",
        note: "创建时间",
      },
      {
        label: "success",
        type: "boolean",
        need: "非必须",
        note: "响应状态",
      },
    ],
    reponseExampleText: "返回示例:",
    responseExample: `
    {
      "code": 1,
      "message": "success",
      "data": {
          "records": [
              {
                  "entrustNo": "589738031618527232",
                  "dealNo": "589741476249407489",
                  "type": 1,
                  "coinMarket": "BTC/USDT",
                  "amount": "0.001",
                  "dealAmount": "27.9",
                  "dealPrice": "27900",
                  "direction": 2,
                  "createTime": 1696785814000,
                  "entrustTime": 1696784993,
                  "dealType": 1,
                  "entrustAmount": null
              },
              {
                  "entrustNo": "589726398741549056",
                  "dealNo": "589726398879961089",
                  "type": 2,
                  "coinMarket": "BTC/USDT",
                  "amount": "0.001",
                  "dealAmount": "27.924",
                  "dealPrice": "27924.04",
                  "direction": 1,
                  "createTime": 1696782219000,
                  "entrustTime": 1696782219,
                  "dealType": 2,
                  "entrustAmount": 20
              }
          ],
          "total": 2,
          "size": 10,
          "current": 1,
          "orders": [],
          "searchCount": true,
          "pages": 1
      },
      "success": true
  }`,
  },
];

function processData() {
  const dataString = `

  `;

  const dataArray = dataString.trim().split("\n");
  const result = [];

  for (let i = 0; i < dataArray.length; i += 4) {
    const key = dataArray[i].trim();
    const type = dataArray[i + 1].trim();
    const need = dataArray[i + 2].trim();
    const note = dataArray[i + 3].trim();
    result.push({
      label: key,
      type: type,
      need: need,
      note: note,
    });
  }

  return JSON.stringify(result, null, 2);
}

// 调用方法并输出结果
// console.log(processData());
