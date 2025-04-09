import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";

//现货
import coinSocket from '@/socket/webSocket1'

import {thousandth, formatNumberWithCommas} from "./utils/thousandth";
import {removeTrailingZeros} from "./utils/thousandth";
import {
    formatTimestamp,
    toTwoDecimals,
    dataInitialization,
    formatPrice,
    formatAmount,
    thousandthPrice
} from "./utils/thousandth";
import {copyContent} from "./utils/thousandth";
import {formatInit} from "./utils/formateTimeStamp";
import {logOut} from "./utils/logOut";
// formatTimeInit
import {formatTimeInit} from "./utils/formateTimeStamp";
import {customMessage} from "./utils/messageList/message";

import {formatTimesYMDHMS, formatTimesYMD} from "./utils/formateTimeStamp";

import "./assets/style/common.scss";
import "./assets/style/global.scss";
import "./assets/style/theme.css";
//轮播
import VueAwesomeSwiper from "vue-awesome-swiper";

// 引入svg图标组件
import "@/assets/icons/index.js";
import "./assets/font/iconfont.css";

//自适应配置
import "./utils/flexible";

// localStorage封装方法
import storage from "./libs/commonStorage.js";

//组件
import showMsg from "@/components/showMsg/showMsg.js";
import myEmpty from "@/components/my-empty";
import myInput from "@/components/my-input";
import myButton from "@/components/my-button";
import myAlert from "@/components/my-alert/index.js";


import tipsPlugin from "./views/components/tips-plugin";
import tipsfillPlugin from "./views/components/tipsfill-plugin";
// 一键复制
import VueClipBoard from "vue-clipboard2";

// 国际化配置
import i18n from "./i18n/i18nLocale";

// rsa加密
import {getEncryptCode} from "@/libs/encrypt.js";

import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

Vue.prototype.$hljs = hljs;

// import "default-passive-events";

// 常用工具
import {
    formatNumber,
    scrollToTop,
    formatTime,
    newFormatTime,
    getTime,
    parseTime,
} from "@/libs/utils.js";

// 弹窗and缓存
import {cache, modal} from "@/libs/index.js";

Vue.prototype.$cache = cache;
Vue.prototype.$modal = modal;
Vue.prototype.$socket = coinSocket

// =全局注册组件
import useComp from "@/components/useComp.js";

Vue.component("myEmpty", myEmpty);
Vue.component("myInput", myInput);
Vue.component("myButton", myButton);

Vue.prototype.$EventBus = new Vue();
// 公用存储
Vue.prototype.$storage = storage;
// 加密
Vue.prototype.$getEncryptCode = getEncryptCode;
// 格式化金额
Vue.prototype.$formatNumber = formatNumber;
// 滚动到页面顶部
Vue.prototype.$scrollToTop = scrollToTop;
// Vue.prototype.$webSockets = sockets;
// 格式化时间
Vue.prototype.$formatTime = formatTime;
// 时间工具
Vue.prototype.parseTime = parseTime;
Vue.prototype.getTime = getTime;
Vue.prototype.newFormatTime = newFormatTime;

Vue.prototype.$showMsg = showMsg;
Vue.prototype.$myAlert = myAlert;

Vue.prototype.$thousandth = thousandth;
Vue.prototype.$removeTrailingZeros = removeTrailingZeros;
Vue.prototype.$formatTimestamp = formatTimestamp;
Vue.prototype.$formatTimeInit = formatTimeInit;
Vue.prototype.$toTwoDecimals = toTwoDecimals;
Vue.prototype.$formatTimesYMDHMS = formatTimesYMDHMS;
Vue.prototype.$formatNumberWithCommas = formatNumberWithCommas;
Vue.prototype.$customMessage = customMessage;
Vue.prototype.$dataInitialization = dataInitialization;
Vue.prototype.$copyContent = copyContent;
Vue.prototype.$formatTimesYMD = formatTimesYMD;
Vue.prototype.$formatInit = formatInit;
Vue.prototype.$logOut = logOut;
Vue.prototype.$formatPrice = formatPrice;
Vue.prototype.$formatAmount = formatAmount;
Vue.prototype.$thousandthPrice = thousandthPrice;

//初始化币币ws
coinSocket.init(store)

import loadingDirective from "./utils/loadingDirective";

Vue.directive('loads', loadingDirective); // 注册自定义指令
Vue.directive("highlight", function (el) {
    let blocks = el.querySelectorAll("pre code");
    blocks.forEach((block) => {
        hljs.highlightBlock(block);
    });
});

Vue.use(ElementUI, {
    i18n: (key, value) => {
        return i18n.t(key, value);
    },
});
Vue.use(VueClipBoard);
Vue.use(tipsPlugin);
Vue.use(tipsfillPlugin);
Vue.use(useComp);
// Vue.use(element)
Vue.use(VueAwesomeSwiper);

Vue.config.productionTip = false;

Vue.filter("translate", function (value) {
    if (value === 0 || value === "0") {
        return 0;
    } else {
        return i18n.t(value);
    }
});

new Vue({
    router,
    store,
    i18n,
    render: (h) => h(App),
}).$mount("#app");
