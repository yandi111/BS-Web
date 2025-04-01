import ZHCN from "./translations/zh-CN";
import EN from "./translations/en";
import TW from "./translations/zh-TW";
import TH from "./translations/th";
import element_cn from "element-ui/lib/locale/lang/zh-CN";
import element_tw from "element-ui/lib/locale/lang/zh-TW";
import element_en from "element-ui/lib/locale/lang/en";
import element_th from "element-ui/lib/locale/lang/th";
export const messages = {
  'zh-CN': {
    ...ZHCN,
    ...element_cn
  },
  en: {
    ...EN,
    ...element_en
  },
  'zh-TW': {
    ...TW,
    ...element_tw
  },
  th: {
    ...TH,
    ...element_th
  }
}