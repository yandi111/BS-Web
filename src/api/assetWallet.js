import request from '@/request/request'

// 资产钱包
//查询币种列表
export const simpleApi = function (data = {}) {
  return request.post('/ex/finance/coin/simple', data)
}

//账户资产总览
export const sumAccountApi = data => {
  return request({
    isdiyCode: true,
    url: '/ex/finance/query/sumAccount',
    method: 'post',
    data: { ...data },
  })

}

//获取合约资产
export const contractAccountApi = function (data = {}) {
  return request.post('/ex/finance/query/contract-account', data)
}

//查询网络
export const chainListApi = function (data = {}) {
  return request.post('/ex/finance/coin/chain-list', data)
}
//获取充提币配置信息
export const configureApi = function (data = {}) {
  return request.post('/ex/finance/coin/configure', data)
}
//充值查询充值地址
export const depositQueryApi = function (data = {}) {
  return request.post('/ex/finance/coinAddress/depositQuery', data)
}

//查询充币、提币记录
export const recordQueryApi = function (data = {}) {
  return request.post('/ex/finance/deposit/record/query', data)
}

//查询提币地址
export const addressQueryApi = function (data = {}) {
  return request.post('/ex/finance/withdraw/address/query', data)
}

//添加提币地址
export const addressAddApi = function (data = {}) {
  return request.post('/ex/finance/withdraw/address/add', data)
}
//提币-获取认证选项
export const withdrawCheckApi = function (data = {}) {
  return request.post('/ex/user/withdraw/check', data)
}
//提币申请
export const userWithdrawApi = function (data = {}) {
  return request.post('/ex/user/withdraw', data)
}
//删除提币
export const withdrawDelApi = function (data = {}) {
  return request.post('/ex/finance/withdraw/del', data)
}

//资产划转
export const transferApi = function (data = {}) {
  return request.post('/ex/finance/transfer', data)
}
//划转、闪兑、提币查询可用余额
export const transferBalanceApi = function (data = {}) {
  return request.post('/ex/finance/transfer/query-balance', data)
}

//查询划转记录
export const transferRecordQueryApi = function (data = {}) {
  return request.post('/ex/finance/transfer/record/query', data)
}

//查询汇率
export const rateQueryApi = function (data = {}) {
  return request.post('/ex/market/rate/query', data)
}

//闪兑
export const flashExchangeApi = function (data = {}) {
  return request.post('/ex/finance/flash/exchange', data)
}

//获取闪兑配置
export const flashConfigApi = function (data = {}) {
  return request.post('/ex/finance/flash/get-flash-config', data)
}

//闪兑记录
export const flashRecordApi = function (data = {}) {
  return request.post('/ex/finance/flash/record', data)
}

// 到账数量 手续费 
export const arrivalAccountApi = function (data = {}) {
  return request.post('/ex/finance/withdraw/get-arrival-account', data)
}

// 提币校验地址 
export const isValidAddressApi = function (data = {}) {
  return request.post('/ex/finance/withdraw/is-valid-address', data)
}

// 查询跟单账户 
export const documentaryAccount = function (data = {}) {
  return request.post('/ex/finance/query/documentary-account', data)
}

// 现货成交记录 
export const entrustDetailList = function (data = {}) {
  return request.post('/ex/order/spot/entrust-detail-list', data)
}

//返佣记录、空投记录
export const agentRecord = function (data = {}) {
  return request.post('/ex/finance/agent/record/query', data)
}
//获取闪兑手续费、汇率
export const getFee= function (data = {}) {
  return request.post('/ex/finance/flash/get-fee', data)
}

//查询冻结金额明细
export const frozenAmount= function (data = {}) {
  return request.post('/ex/finance/spot/trade/frozen-amount', data)
}

//现货历史记录
export const spotDetailList = function (data = {}) {
  return request.post('/ex/order/wallet/spot/entrust-detail-list', data)
}

//KYC剩余额度查询
export const getKycRemainByUserId = function (data = {}) {
  return request.post('/ex/user/config/kyc/get-kyc-remain-by-user-id', data)
}

// 充值提交人工审核
export const addArtificialApi = function (data = {}) {
  return request.post('/ex/finance/deposit/add-artificial', data)
}

// 当前提币额度信息
export const withdrawLimitInfo = function (data = {}) {
  return request.post('/ex/user/withdraw/limit-info', data)
}
