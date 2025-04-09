import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import register from "./module/register";
import header from "./module/header";
import login from "./module/login";
import order from "./module/order";
import contract from "./module/contract";
import spots from "./module/spots";
import setting from './module/setting';
import initList from './module/initList'
import square from "./module/square";
import userInfo from "./module/userInfo";
import basic from './module/basic'
// import kycList from "./module/kyList"
import KyList from "./module/KyList";

import socketStore from './module/socketStore'

const persistedState = createPersistedState({
 key: 'my-vuex-store',
 paths: [
  //  'register', // 需要持久化的模块
  'header',
  'basic',
  'login',
  'order',
  'contract',
  'spots',
  'setting',
  'square',
   'userInfo.token'
  // 不包括 initList 模块
 ],
});

Vue.use(Vuex);

export default new Vuex.Store({
 state: {},
 getters: {},
 mutations: {},
 actions: {},
 modules: {
  register,
  header,
  basic,
  login,
  order,
  contract,
  spots,
  setting,
  square,
  initList,
  userInfo,
  KyList,
  socketStore
 },
 // plugins: [
 //   createPersistedState({
 //     storage: sessionStorage,
 //   }),
 // ],
 plugins: [
  persistedState, // 使用持久化插件
 ],
});
