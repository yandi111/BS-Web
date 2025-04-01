/**
 * 封装axios请求
 * */
import {instance} from "@/request/request";

// post请求
export const post = (request, url, data) => {
 const httpRequest = request || instance

 return httpRequest({
  method: 'post',
  url,
  data
 })
}

// get请求
export const get = (request, url, data) => {
 const httpRequest = request || instance

 return httpRequest({
  method: 'get',
  url,
  params: data
 })
}

// put请求
export const put = (request, url, data) => {
 return request({
  method: 'put',
  url,
  data
 })
}

// delete请求
export const del = (request, url) => {
 return request({
  method: 'delete',
  url
 })
}