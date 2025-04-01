/** 合约交易 */  

import request from '@/request/request'

// 调整杠杆获取最大可开张数
export const positionGeal = function (data={}) {
  return request({
		isData: true,
    url: '/ex/contract-liquidation/contract-position-gear',
    method: 'post',
    data: {...data},
  })
}
// 合约下单
export const usdtContract = function (data={}) {
  return request({
		isData: true,
    url: '/ex/order/usdt-contract/add',
    method: 'post',
    data: {...data},
  })
}

// 更新登录用户的合约杠杆或者仓位模式
export const updateLevelInfo = function (data={}) {
  return request({
		isData: true,
    url: '/ex/contract-liquidation/user/contract/usdt/update-lever-info',
    method: 'post',
    data: {...data},
  })
}

// 获取单个交易对信息
export const marketSybomlList = data => {
  return request({
		isData: true,
    url: '/market/symbol/query',
    method: 'post',
    data: {...data},
  })
};


// 获取持仓列表
export const positionList = data => {
  return request({
		isdiyCode: true,
    url: '/ex/contract-liquidation/usdt/contract/user/position',
    method: 'post',
    data: {...data},
  })
};

// 获取登录用户的合约杠杆信息
export const userLeverInfo = data => {
  return request({
		isdiyCode: true,
    url: '/ex/contract-liquidation/user/contract/usdt/lever-info',
    method: 'post',
    data: {...data},
  })
};

// 获取合约资产
export const userContractUsdt = data => {
  return request({
		isdiyCode: true,
    url: '/ex/contract-liquidation/user/contract/usdt/list',
    method: 'post',
    data: {...data},
  })
};





































