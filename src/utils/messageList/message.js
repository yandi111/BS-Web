import { Message } from "element-ui"; // 按需导入需要的组件
import "element-ui/lib/theme-chalk/index.css"; // 导入样式

// // 定义消息类型
// const MessageType = {
//     SUCCESS: 0,
//     WARNING: 1,
//     ERROR: 2,
// };

// 自定义消息提醒函数
export function customMessage(a, message) {
  // 根据类型选择不同的图标路径
  let iconPath;
  if (a === 0) {
    iconPath = require("@/assets/images/massage_icon/success.png"); // 成功图标
  } else if (a === 1) {
    iconPath = require("@/assets/images/massage_icon/warning.png"); // 提醒图标
  } else {
    iconPath = require("@/assets/images/massage_icon/error.png"); // 失败图标
  }

  // 显示消息
  Message({
    message: `<div style="display: flex; align-items: center;color: #F0F0F0  !important; font-size: 12px; white-space: nowrap;   
         background-color: #1C1C1C !important;
         border-radius: 4px; 
         border: none !important;
         z-index: 999999999;">
                      <img src="${iconPath}" style="width: 20px; height: 20px; margin-right: 8px; margin-top: -2px;" /> 
                      ${message}
                  </div>`,
    type: "", // 设置消息类型
    dangerouslyUseHTMLString: true, // 允许使用 HTML 字符串
    // customClass: 'custom-message-container', // 添加自定义类
    customClass: "", // 添加自定义类
    duration: 2000, // 可选：设置持续时间
  });
}
