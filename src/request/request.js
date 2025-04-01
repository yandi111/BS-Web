import axios from "axios";
import { customMessage } from "@/utils/messageList/message";
import store from "@/store";
import i18n from "@/i18n/i18nLocale";

// 正常请求
const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_LOCAL_URL,
  timeout: 10000,
});

// 合约请求
const instanceHy = axios.create({
  baseURL: process.env.VUE_APP_BASE_LOCAL_HY,
  timeout: 10000,
});

// 添加请求拦截器
const requestInterceptor = (config) => {
  config.headers["x-language"] = i18n.locale;
  config.headers["x-device-id"] = "";
  config.headers["x-app-type"] = "WEB";
  config.headers["x-app-version"] = "";
  config.headers["x-device-model"] = "";
  config.headers["Content-Type"] = "application/json";

  if (store.getters.getToken)
    config.headers["x-app-token"] = store.getters.getToken;

  return config;
};

// 响应拦截器
const responseInterceptor = async (response) => {
  const code = response.data.code;
  const { showError } = response.config
  if (showError && code !== 200) {
    customMessage(2, response.data.msg);
  }
  if (code === 200) {
    return Promise.resolve(response.data);
  } else if (code === 401) {
    await store.dispatch("logOut");
    // customMessage(2, "登陆失效，请重新登陆!");
    return Promise.reject(`errorCode: ` + response.data.code);
  } else if (code === 500) {
    // 用户主动请求才抛出错误
    // customMessage(2, "服务器错误，请联系管理员!");
    return Promise.reject(`errorCode: ` + response.data.code);
  } else {
    customMessage(2, response.data.msg);
    return Promise.reject(`errorCode: ` + response.data.code);
  }
};

// 错误处理
const errorHandler = (error) => {
  return Promise.reject(error);
};

[instance, instanceHy].forEach((item) => {
  item.interceptors.request.use(
    (config) => requestInterceptor(config),
    (error) => errorHandler(error)
  );
  item.interceptors.response.use(
    (response) => responseInterceptor(response),
    (error) => errorHandler(error)
  );
});

export { instance, instanceHy };
