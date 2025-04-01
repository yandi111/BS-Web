/*
 * @Description: 域名统一管理 根据当前 url 匹配不同环境
 * @Author: Mr. LI
 * @Date: 2023-08-1 18.05
 * @LastEditors: Mr. LI
 * @LastEditTime: 2023-08-1 18.05
 */
// 定义各环境的API和WebSocket服务器地址
const base = [
  { api: "http://172.16.1.250", wssApi: "ws://172.16.1.250" }, // 开发环境
  { api: "https://api.bitfam.org", wssApi: "wss://api.bitfam.org" }, // 预发布环境
  { api: "https://api.musk-ex.com", wssApi: "wss://api.musk-ex.components" }, // 生产环境
  { api: "https://api.mktx.cc", wssApi: "wss://api.mktx.cc" }, // 新生产环境（暂时不用)
  { api: "https://api-virtual.musk-ex.com", wssApi: "wss://api-virtual.musk-ex.components" }, // 模拟盘
];

// 获取当前页面的URL的主机名部分
const currentUrl = new URL(window.location).hostname;

// 初始化索引，默认为0，代表开发环境
let index = 1;

// 判断当前环境，如果不是开发环境，则需要找到与当前页面URL匹配的API服务器地址
if (process.env.NODE_ENV !== "development") {
  // 在base数组中找到与当前页面URL主机名后两部分匹配的项的索引
  index = base.findIndex((item) => {
    // 获取API地址的主机名
    let apiHost = new URL(item?.api)?.hostname;

    // 获取主机名的后两部分（例如，对于"api.bitfam.org"，获取"bitfam.org"）
    let currentUrlBase = currentUrl.split(".").slice(-2).join(".");
    let apiHostBase = apiHost.split(".").slice(-2).join(".");

    // 如果当前页面URL主机名的后两部分与API主机名的后两部分相同，则返回true
    return currentUrlBase === apiHostBase;
  });
}

// 导出选中环境的API和WebSocket服务器地址
export const baseApi = base[index]?.api;
export const baseWssApi = base[index]?.wssApi;
