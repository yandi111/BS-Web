import Cookies from 'js-cookie'
import config from '@/config'
const { COOKIE_EXPIRES } = config

export const TOKEN_KEY = 'token'
export const EXCHANGE_KEY = 'exchange'


export const setToken = (token) => {
  Cookies.set(TOKEN_KEY, token)
}

export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY, { expires: COOKIE_EXPIRES || 7 })
  if (token) return token
  else return false
}

//缓存汇率参数
export const setExchange = (exchange) => {
  localStorage.setItem(EXCHANGE_KEY,JSON.stringify(exchange))
}

export const getExchange = () => {
  const exchange = localStorage.getItem(EXCHANGE_KEY)
  return JSON.parse(exchange)

}

export const removeToken = ()=>{
  return Cookies.remove(TOKEN_KEY)
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

// 脱敏方法
export const securityPhone= (phone) => {
  const reg=/(1\d{2})(\d{4})(\d{4})/gi
  return phone.replace(reg,'$1****$3')
}

export const encryptedmailbox = (email) => {
  let _s = '';
  let new_email = ''
  if (String(email).indexOf('@') > 0) {
    const str = email.split('@')
    
    if (str[0].length > 0 && str[0].length <= 3) { //@前面多于3位
      for(let i = 1; i < str[0].length; i++) {
        _s+='*'
      }
      new_email = str[0].substr(0, 1)+ _s + '@' + str[1]
    } else { //@前面小于等于于3位
      for (let i = 0; i < str[0].length - 2; i++) {
        _s += '*'
      }
      new_email= str[0].substr(0, 2) + _s + '@' + str[1]
    }
  }
  return new_email
}

/**
 * @param {Number} num 数值
 * @returns {String} 处理后的字符串
 * @description 如果传入的数值小于10，即位数只有1位，则在前面补充0
 */
const getHandledValue = num => {
  return num < 10 ? '0' + num : num
}

/**
 * @param {Number} timeStamp 传入的时间戳
 * @param {Number} startType 要返回的时间字符串的格式类型，传入'year'则返回年开头的完整时间
 */
export const getDate = (timeStamp, startType) => {
  const d = new Date(timeStamp * 1000)
  const year = d.getFullYear()
  const month = getHandledValue(d.getMonth() + 1)
  const date = getHandledValue(d.getDate())
  const hours = getHandledValue(d.getHours())
  const minutes = getHandledValue(d.getMinutes())
  const second = getHandledValue(d.getSeconds())
  let resStr = ''
  if (startType === 'year') resStr = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + second
  else resStr = hours + ':' + minutes + ':' + second
  return resStr
}

// 生成uuid
export const getUuid = () =>  {
  var s = []
  var hexDigits = "0123456789abcdef"
  for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-"

  var uuid = s.join("");
  return uuid
}

// 支付方式转换
export const transferPay = (payType) => {
  let arr = null
  if (payType === 1) {
    arr = '银行卡'
  }

  if (payType === 2) {
    arr = '支付宝'
  }

  if (payType === 3) {
    arr = '微信'
  }

  return arr
}
//数组分割
export const getNeedArr = (array,size) => {
   const length = array.length
   if(!length || !size || size < 1){
    return []
   }
   let index = 0
   let resIndex = 0
   let result = new Array(Math.ceil(length / size))
   while(index < length){
    result[resIndex++] = array.slice(index,(index+=size))
   }
   return result
}

/*输入框防抖*/
export const antiShake = (fn, delay) => {
  let timer = null
  return function () {
    let content = this
    let args = arguments
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(content, args)
    }, delay)
  }
}

// 金额格式化
export const formatNumber =  (num) =>  {
  num += '';
  let strs = num.split('.');
  let x1 = strs[0];
  let x2 = strs.length > 1 ? '.' + strs[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2
}

// 全局滚动方法
export const scrollToTop = (x, y) => {
  let container = document.querySelector(".wrapper-view")
  if (container) {
    if (x || y) {
      container.scrollTo(x, y);
      return
    }
    container.scrollTo(0, 0)
  }
  window.scrollTo(0, 0)
}

// 格式化时间
export const formatTime = (time) => {
  return getDate(new Date(time).getTime() / 1000, 'year')
}


/**
 * ---------- ---------- ----------  以下是扩展内容可能跟前面有相似 看个人习惯使用（Tprove/2023.6.5）  ---------- ---------- ----------
 */ 
// 数字输入限制
export function changeNumberVal(val, accuracy, backVal = 0) {
  // 第一位不允许输入小数点或以0开头的数字
  if (val.startsWith('.')) return '';
  // 输入 01 转为1
  val = val.replace(/^0(\d)$/, "$1");
  
  // 只能输入数字和点
  let sanitizedInput = val.replace(/[^\d.]/g, '');

  // 出现多个点时只保留第一个
  const dotIndex = sanitizedInput.indexOf('.');
  if (dotIndex !== -1) {
    const firstDot = sanitizedInput.indexOf('.', dotIndex + 1);
    if (firstDot !== -1) {
      const beforeFirstDot = sanitizedInput.substring(0, firstDot);
      const afterFirstDot = sanitizedInput.substring(firstDot + 1);
      sanitizedInput = `${beforeFirstDot}.${afterFirstDot.replace(/\./g, '')}`.replace(/\.(?=.*\.)/g, '');
    }
  }

  // 限制小数位数为 accuracy（X） 位
	sanitizedInput = truncateDecimal(sanitizedInput, accuracy)
	
  return !sanitizedInput ? backVal : sanitizedInput;
}

// 截取小数
export function truncateDecimal(str, decimalPlaces) {
		str = String(str) 
	 // 检查字符串中是否有小数点
	    const dotIndex = str.indexOf('.');
	    if (dotIndex === -1 || decimalPlaces <= 0) {
	        return str; // 如果没有小数点或者需要的位数为0或小于0，则直接返回原字符串
	    }
	    // 截取所需的位数
	    return str.slice(0, dotIndex + 1 + decimalPlaces);
}

// 日期格式化  Tue Apr 04 2023 16:26:33 GMT+0800 (中国标准时间) 或 时间戳 转化为 2023-04-03 16:25:20 
export function parseTime(time, pattern) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    } else if (typeof time === 'string') {
      time = time.replace(new RegExp(/-/gm), '/').replace('T', ' ').replace(new RegExp(/\.[\d]{3}/gm), '');
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string} 返回的时间是多久前
 */
export function newFormatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
	return option ? parseTime(time, option) : (d.getMonth() +1 +'月' +d.getDate() +'日' +d.getHours() +'时' +d.getMinutes() +'分')
}

/**
 * @param {string} time
 * @param {string} type
 * @returns {Date}	转为时间搓
 */
export function getTime(time, type = 'getTime') {
  if (type === 'getTime') {
    return new Date(time).getTime() 
  } else {
    return new Date(new Date().toDateString())
  }
}

/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object} 合并对象（并去重）
 * 
 */ 
export function objectMerge(target, source) {
  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

/**
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

/**
 * @param {Object} json
 * @returns {Array}	加密传参
 */
export function param(json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

/**
 * @param {string} url
 * @returns {Object}	解密接收
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

/**
 * @param {Object} source
 * @returns {Object} 克隆对象（深拷贝）
 * 
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}	防抖
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}


/**
 * @param {string} str
 * @param {string} type 大|小
 * @return {string}	首字母大小
 */
export function titleCase(str,type) {
  return str.replace(/( |^)[a-z]/g, L => type == 'max' ? L.toUpperCase(): L.toLowerCase())
}

// 下划转驼峰
export function camelCase(str) {
  return str.replace(/_[a-z]/g, str1 => str1.substr(-1).toUpperCase())
}

