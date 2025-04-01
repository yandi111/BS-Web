import { post } from '@/request'
import { instance } from "@/request/request";

// 首页-热门行情信息列表
export const hotList = (data = {}) => post('/ex/market/market-info/list/hot', data)

// 首页-轮播图
export const swiperList = (data = {}) => post('/ex/user/banner/list', data)

// 获取总资产
export const GetUserAllMoney = data => post(instance, '/bsex-finance/asset/total', data)

//公告详情
export const announceDetail = (data = {}) => post('/ex/user/user/announce', data)

//新闻详情、热门文章详情
export const userNewsDetail = data => post('/ex/user/news/detail', data)

// 常见问题和账户功能详情
export const helpcontentDetail = data => post('/ex/user/help/detail', data)

// 新闻中心列表
export const newsListApi = (data = {}) => post('/ex/user/news/list', data)


// 消息通知-历史消息
export const msgHistory = (data = {}) => post('/ex/user/message/history', data)

// 删除所有系统通知
export const deleteAll = (data = {}) => post('/ex/user/message/delete/all', data)

// 新通知-数量（未读）
export const unreadCount = (data = {}) => post('/ex/user/message/unread/count', data)

// 消息全部已读 
export const readAll = (data = {}) => post('/ex/user/message/read/all', data)

// 修改消息为已读 
export const updateMsgRead = (data = {}) => post('/ex/user/message/read', data)

// 用户已读公告（单条已读）
export const announcementRead = (data = {}) => post('/ex/user/user/announcement/have/read', data)

// 版本管理
export const GetVersion = data => post(instance, '/bsex-user/app/version', data)