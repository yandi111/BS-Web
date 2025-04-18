import { Message, MessageBox, Notification, Loading } from 'element-ui'
// 国际化配置
import i18n from "@/i18n/i18nLocale";
let loadingInstance;
const t='c2c.'
export default {
  // 消息提示
  msg(content) {
    Message.info(content)
  },
  // 错误消息
  msgError(content) {
    Message.error(content)
  },
  // 成功消息
  msgSuccess(content) {
    Message.success(content)
  },
  // 警告消息
  msgWarning(content) {
    Message.warning(content)
  },
  // 弹出提示
  alert(content) {
    MessageBox.alert(content, 	i18n.t('lang_509'))
  },
  // 错误提示
  alertError(content) {
    MessageBox.alert(content, 	i18n.t('lang_509'), { type: 'error' })
  },
  // 成功提示
  alertSuccess(content) {
    MessageBox.alert(content, 	i18n.t('lang_509'), { type: 'success' })
  },
  // 警告提示
  alertWarning(content) {
    MessageBox.alert(content, 	i18n.t('lang_509'), { type: 'warning' })
  },
  // 通知提示
  notify(content) {
    Notification.info(content)
  },
  // 错误通知
  notifyError(content) {
    Notification.error(content);
  },
  // 成功通知
  notifySuccess(content) {
    Notification.success(content)
  },
  // 警告通知
  notifyWarning(content) {
    Notification.warning(content)
  },
  // 确认窗体
  confirm(content) {
    return MessageBox.confirm(content,	i18n.t('lang_509'), {
      confirmButtonText:i18n.t('lang_1658'),
      cancelButtonText: i18n.t('lang_1989'),
      type: "warning",
    })
  },
  // 提交内容
  prompt(content) {
    return MessageBox.prompt(content,i18n.t('lang_509'), {
      confirmButtonText:i18n.t('lang_1658'),
      cancelButtonText: i18n.t('lang_1989'),
      type: "warning",
    })
  },
  // 打开遮罩层
  loading(content) {
    loadingInstance = Loading.service({
      lock: true,
      text: content,
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)",
    })
  },
  // 关闭遮罩层
  closeLoading() {
    loadingInstance && loadingInstance.close();
  }
}
