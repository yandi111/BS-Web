
/**
 * 合约API
 * */
import { instance, instanceHy } from "@/request/request";
import { post, get } from "@/request";

// 新增合约
export const AddContract = (data) => {
    return post(instanceHy, `/contractEntrust/add`, data)
}

// 合约列表 // 
export const GetContractList = (data) => {
    return get(instanceHy, `/contractEntrust/list`, data)
}

// 合约更新
// export const UpdateContract = (data) => get(instance, `/contractEntrust/update`, data)

// // 合约更新列表
// export const UpdateContractList = data => get(instance, `/contractEntrust/update`, data)

// 合约类型列表
// export const GetAllCancellations = data => post(instance, `/contractEntrust/allCancellations`, data)
// 获取持仓列表  历史委托
// export const GetDepotList = data => get(instance, `/contractEntrust/update`, data)


export const GetDepotList = data => {
    return post(instanceHy, `/contractEntrust/update`, data)
}
export const UpdateContract = data => {
    return post(instanceHy, `/contractEntrust/update`, data)
}
export const UpdateContractList = data => {
    return post(instanceHy, `/contractEntrust/update`, data)
}

// // 获取历史仓位列表
export const GetHistoricalPosition = data => {
    return get(instanceHy, `/contractDepot/list`, data)
}

// 更新持仓
export const UpdateDepot = data => {
    return post(instanceHy, `/contractDepot/update`, data)
}

// 关闭持仓
export const HandleDepot = data => {
    return post(instanceHy, `/contractDepot/closeDepot`, data)
}

// 关闭所有持仓
export const HandleAllDepot = data => {
    return post(instanceHy, `/contractDepot/allCloseDepot`, data)
}

// export const GetAllCancellations = data => post(instance, `/contractEntrust/allCancellations`, data)

export const GetAllCancellations = data => {
    return post(instanceHy, `/contractEntrust/allCancellations`, data)
}

// 第一次点击持仓
export const GetClickBackHand = data => {
    return post(instanceHy, `/contractDepot/oneClickBackhand`, data)
}

// 资金余额
export const GetFundBalance = data => {
    return post(instance, `/bsex-finance/asset/coin/list`, data)
}
// 提币结果
export const GetWithdrawal = data => {
    return post(instance, `/bsex-finance/withdrawal/coin/list`, data)
}
// 划转
export const GetTransferDone = data => {
    return post(instance, `/bsex-finance/asset/main/record/page`, data)
}
// 划转提交
export const SubmitTransferDone = data => {
    return post(instance, `/bsex-finance/asset/transfer`, data)
}

// 获取合约钱包列表

export const GetWalletList = data => {
    return get(instanceHy, `/UserContractWallet/list`, data)
}

// 获取合约母币列表
export const GetContractLists = data => {
    return get(instance, `/contract/list`, data)
}

// 获取App母币列表
export const GetAppContractList = data => {
    return get(instance, `/bsex-market/contract/list`, data)
}

// 获取合约钱包记录 // 资金流水
export const GetWalletRecordList = data => get(instanceHy, `/UserContractWalletRecord/list`, data)



// 创建token
export const TokenCreate = data => {
    return post(instance, `/bsex-user/login/token/create`, data)
}

// 获取国家地区列表
export const GetCountryList = data => get(instance, `/bsex-user/country/list`, data)

// 杠杆
export const setLeverFn = (contractId) => {
    return get(instance, `/bsex-market/contract/detail/${contractId}`)
}


// 获取 资金账户 总资产
export const GetFundTotal = data => {
    return get(instance, `/bsex-finance/asset/main/total`, data)
}


export const onCancelOrderFn = data => {
    return post(instanceHy, `/contractDepot/cancelProfitLoss`, data)
}


