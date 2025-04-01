import Vue from "vue";
import locale from "element-ui/lib/locale";
import VueI18n from "vue-i18n";
import { messages } from "./messages";

Vue.use(VueI18n);



const i18n = new VueI18n({
  locale: localStorage.lang || navigator.language || "cn", //初始未选择默认 cn 中文
  messages,
  silentTranslationWarn: true,
});

locale.i18n((key, value) => i18n.t(key, value)); //兼容element

export default i18n;
