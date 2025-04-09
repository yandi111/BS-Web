import Vue from "vue";
import VueRouter from "vue-router";
import userRoutes from "./user.js";
import store from "@/store";
import walletRoutes from "./wallet.js";
import NoticeRoutes from "./notice.js";
import PostRoutes from "./post.js";
import informationRoutes from "./information";
import contractRulesRoutes from "./contractRules.js";
import squareRoutes from "./square";
import layoutRoutes from './layout.js';
// import { whiteList } from "../libs/routeWhitelist.js";
import { getToken } from "@/libs/utils.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    redirect: "home",
  },
  {
    path: '/download',
    name: 'download',
    component: () => import('@/views/download/index.vue')
  },
  // 首页主要模块
  {
    name: "",
    redirect: "home",
    component: () => import("@/views/layout/index.vue"),
    children: [
      // 首页
      {
        path: "home",
        name: "home",
        component: () => import("@/views/home/index.vue"),
        meta: {
          title: "首页 | UBEX",
          header: true,
          footer: true
        },
      },
      // 登录
      {
        name: "login",
        path: "login",
        component: () => import("@/views/login/index.vue"),
        meta: {
          title: "登录",
        },
      },
      // mobileRebate
      {
        name: "mobileRebate",
        path: "mobileRebate",
        component: () => import("@/views/mobileRebate/index.vue"),
        meta: {
          title: "mobileRebate",
        },
      },
      // 忘记密码
      {
        name: "forget",
        path: "forget",
        component: () => import("@/views/forgetPwd/index.vue"),
      },
      // 注册
      {
        name: "register",
        path: "register",
        component: () => import("@/views/register/index.vue"),
        meta: {
          title: "注册",
        },
      },

      // 行情
      {
        name: "quotes",
        path: "quotes",
        component: () => import("@/views/quotes/index.vue"),
        meta: {
          title: "行情",
        },
      },
      // C2C | 快捷买币
      {
        name: "C2C",
        path: "/layout/c2c",
        redirect: "/layout/c2c/buyCoin",
        component: () => import("@/views/layout/tradeLayout.vue"),
        children: [
          // 快捷
          {
            name: "buyCoin",
            path: "buyCoin",
            component: () => import("@/views/c2c/buyCoin/index.vue"),
          },
          // c2c交易（自选取）
          {
            path: "tradeToc",
            name: "tradeToc",
            component: () => import("@/views/c2c/tradeToc/index.vue"),
          },
          // 大宗交易
          {
            path: "tradeLarge",
            name: "tradeLarge",
            component: () => import("@/views/c2c/tradeLarge/index.vue"),
          },
          // c2c交易指南
          {
            path: "tradeGuide",
            name: "tradeGuide",
            component: () => import("@/views/c2c/tradeGuide/index.vue"),
          },
          // 订单
          {
            path: "tradeOrder",
            name: "tradeOrder",
            component: () => import("@/views/c2c/tradeOrder/index.vue"),
          },
          // 我的委托单
          {
            path: "tradeTrust",
            name: "tradeTrust",
            component: () => import("@/views/c2c/tradeTrust/index.vue"),
          },
          // 个人中心
          {
            path: "userCenter",
            name: "userCenter",
            component: () => import("@/views/c2c/userCenter/index.vue"),
            meta: {
              title: "个人中心",
            },
          },
          // 商家计划
          {
            path: "merchantPlan",
            name: "merchantPlan",
            component: () => import("@/views/c2c/merchantPlan/index.vue"),
          },
        ],
      },
      // 合约交易
      {
        name: "contractTransaction",
        path: "contractTransaction",
        component: () => import("@/views/contractTransaction/index.vue"),
        meta: {
          // title: `${langs.t("routes.contractTransaction")}`,
          title: "合约交易 | UBEX",
          footer: false,
          header: true
        },
      },
      {
        name: "passHistory",
        path: "/passHistory",
        component: () => import("@/views/contractTransaction/contractPassword/passHistory.vue"),
        meta: {
          title: "历史口令 | UBEX",
        },
      },
      //现货交易
      {
        name: "spotTrading",
        path: "spotTrading",
        component: () => import("@/views/spotTrading/index.vue"),
        meta: {
          title: "现货交易 | UBEX",
        },
      },
      //现货买卖盘
      {
        name: "orderlist",
        path: "orderlist",
        component: () => import("@/views/spotTrading/orderlist/index.vue"),
        meta: {
          title: "买卖盘 | UBEX",
        },
      },
      {
        name: "dealDetail",
        path: "contractTransaction/dealDetail",
        component: () => import("@/views/contractTransaction/dealDetail.vue"),
      },
      // APP下载
      {
        name: "downApp",
        path: "downApp",
        component: () => import("../views/downApp/index.vue"),
        meta: {
          title: "App 下载",
          keepAlive: false,
        },
      },
      //API交易
      {
        path: "apiTrading",
        name: "apiTrading",
        component: () => import("@/views/apiTrading/index.vue"),
        meta: {
          title: "api交易",
          keepAlive: false,
          login: true
        },
      },
      // 新手教程
      {
        name: "userStudy",
        path: "userStudy",
        component: () => import("@/views/userStudy/index.vue"),
      },
      //上币申请
      {
        name: "financeCoinApply",
        path: "/financeCoinApply",
        component: () => import("@/views/userInfo/financeCoinApply/index.vue"),
      },
      {
        name: "basicInformation",
        path: "/basicInformation",
        component: () => import("@/views/userInfo/financeCoinApply/basicInformation/basicInformation.vue"),
      },
      //我的邀请
      // {
      //   name: "rebatePage",
      //   path: "/rebatePage",
      //   component: () => import("@/views/userInfo/rebate/index.vue"),
      // },
      {
        path: "/helpSearch",
        name: "helpSearch",
        component: () =>
          import("@/views/userInfo/helpCenter/components/helpSearch.vue"),
      },
      {
        name: "announcementCenter",
        path: "/announcementCenter",
        component: () =>
          import("@/views/userInfo/announcementCenter/index.vue"),
        meta: {
          title: "公告中心",
        },
      },
      // 公告详情
      {
        path: "/postDetail",
        name: "postDetail",
        component: () => import("@/views/notice/postDetail/index.vue"),
      },
      //帮助中心
      {
        name: "helpCenterPage",
        path: "/helpCenterPage",
        component: () => import("@/views/userInfo/helpCenter/index.vue"),
        meta: {
          title: "帮助中心",
          keepAlive: false,
        },
      },
      {
        path: "/helpCenterPage/guide",
        component: () => import("@/views/userInfo/helpCenter/guide.vue"),
        meta: {
          title: "问题引导",
          keepAlive: true,
        },
      },
      //帮助中心详情
      {
        path: "/helpDetail",
        name: "helpDetail",
        component: () =>
          import("@/views/userInfo/helpCenter/components/helpDetail.vue"),
      },
      //新闻详情
      {
        path: "/newsDetail",
        name: "newsDetail",
        component: () =>
          import("../views/userInfo/helpCenter/components/newsDetail.vue"),
      },
      //详情
      {
        path: "/detail",
        name: "detail",
        component: () =>
          import("../views/userInfo/helpCenter/components/searchDetail.vue"),
      },
      {
        name: "forcedLiquidation",
        path: "/forcedLiquidation",
        component: () => import("../views/file/forcedLiquidation.vue"),
        meta: {
          title: "关于强平",
        },
      },
      {
        name: "calculatorInstructions",
        path: "/calculatorInstructions",
        component: () => import("../views/file/calculatorInstructions.vue"),
        meta: {
          title: "计算器说明",
        },
      },
      {
        name: "validatorGuide",
        path: "/validatorGuide",
        component: () => import("../views/file/validatorGuide.vue"),
        meta: {
          title: "验证器指南",
        },
      },
      {
        name: "testFlightGuide",
        path: "/testFlightGuide",
        component: () => import("../views/file/testFlightGuide.vue"),
        meta: {
          title: "下载TestFlight指南",
        },
      },
      {
        name: "appdownLoadGuide",
        path: "/appdownLoadGuide",
        component: () => import("../views/file/appdownLoadGuide.vue"),
        meta: {
          title: "下载app指南",
        },
      },

      {
        path: "/aboutUs",
        component: () => import("@/views/aboutUs/index.vue"),
        meta: {
          title: "关于我们",
          keepAlive: false,
        },
      },

      // 路由模块
      ...userRoutes,
    ],
  },
  //api 文档
  {
    path: "/apiDocument",
    component: () => import("@/views/apiDocuments/index.vue"),
    meta: {
      title: "api文档",
      keepAlive: false,
    },
  },
  ...walletRoutes,
  ...NoticeRoutes,
  ...PostRoutes,
  ...informationRoutes,
  ...contractRulesRoutes,
  ...squareRoutes,
  ...layoutRoutes,
];
// 自动生成一个path，和name同名
routes.forEach((route) => {
  route.path = route.path || "/" + (route.name || "");
});

//添加以下代码
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to?.meta?.title || 'UBEX'

  // 不需要主题色的页面
  const isNeedTheme = ['c2c', 'wallet', 'quotes', 'home', 'notice', 'user'].includes(to.path)

  if (!isNeedTheme) {
    document.documentElement.dataset.theme = "light";
  } else {
    store.commit("setTheme", store.state.setting.theme);
  }

  // 移动端自动前往下载页
  const { userAgent } = navigator;
  if (/Android/i.test(userAgent) || /iPhone/i.test(userAgent)) {
    if (to.name !== 'download') return next('/download')
    if (to.name === 'download') return next()
  }

  if (getToken()) {
    next();
  } else {
    // 当退出登录，用一个专门的 mutation 来清除或重置状态。
    if (!getToken()) {
      // 需要清空的vuex模块值
      const clearVuexData = ["contract", "spots"];
      Object.keys(store.state).forEach((key) => {
        if (clearVuexData.includes(key)) {
          store.commit("clearContract");
          store.commit("clearSpots");
        }
      });
    }
    next();
  }
});

router.afterEach(() => {
  // 找到当前容器，滚动到顶部
  let container = document.querySelector(".wrapper-view");
  if (container) container.scrollTo(0, 0)

  window.scrollTo(0, 0);
});

export default router;
