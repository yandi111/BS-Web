import { getToken } from './utils';
// import { baseWssApi } from '@/request/baseApi.js'
import socket from '@/utils/static/socket.js'
const token = getToken();

const baseWssApi = process.env.VUE_APP_BASE_LOCAL_WSURL
// export const wsUrl = `${baseWssApi}/ws/zh_cn/${token}`;
export const wsUrl = `${baseWssApi}/ws/zh_cn/${token}`;

export const baseWsUrl = process.env.VUE_APP_BASE_LOCAL_WSURL + '/ws/zh_cn'

export const sockets =new socket(wsUrl)