// src/libs/axios.js

import axios from "axios";
import { getToken } from "@/libs/uti"; // 引入获取 token 的工具函数
import router from "@/router"; // 引入路由

const $axios = axios.create({
  baseURL: process.env.VUE_APP_BASE_LOCAL_URL, // 使用环境变量
  timeout: 10000, // 请求超时设置
});

// 请求拦截器
$axios.interceptors.request.use(
  (config) => {
    const token = getToken(); // 获取 token
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // 将 token 添加到请求头
    }
    return config; // 返回配置
  },
  (error) => {
    return Promise.reject(error); // 处理请求错误
  }
);

// 响应拦截器
$axios.interceptors.response.use(
  (response) => {
    return response; // 返回响应
  },
  (error) => {
    // 处理错误，例如 token 过期
    if (error.response) {
      if (error.response.status === 401) {
        // 处理未授权，例如重定向到登录页面
        router.push({ path: "/login" });
      } else if (error.response.status === 404) {
        // 处理未找到
        console.error("请求的资源未找到");
      } else if (error.response.status === 500) {
        // 处理服务器错误
        console.error("服务器错误，请稍后再试");
      }
    }
    return Promise.reject(error); // 处理其他错误
  }
);

export default $axios; // 导出 Axios 实例