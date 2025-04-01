/** 现货交易 */  

import request from '@/request/request'

// 现货下单
export const spotGoodsPleas = data => {
  return request({
		isData: true,
    url: '/order/spot-goods/add',
    method: 'post',
    data: {...data},
  })
}


// 获取现货交易对信息
export const marketSybomlList = data => {
  return request({
		isData: true,
    url: '/market/symbol/spot/query', 
    method: 'post',
    data: {...data},
  })
};











































