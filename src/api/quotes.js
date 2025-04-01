import { post } from '@/request'
import { instance } from "@/request/request";

// 行情 U本位合约行情列表
export const GetQuotesApi = data => post(instance, '/bsex-market/contract-u/pc', data)

// 批量添加自选
export const HandleSymbol = data => post(instance, '/bsex-market/contract/collect/symbol', data)

// 批量删除自选
export const delSymbol = data => post(instance, '/bsex-market/contract/batch-collect/symbol', data)

// 汇率查询
export function rateQuery(data) {
  return request({
    isData: true,
    url: '/market/rate/query',
    method: 'post',
    data: { ...data },
  })
}