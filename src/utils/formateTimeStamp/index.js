// 计算出时间戳的具体数据：比如将85400转化为 n天n时n分n秒
export function formateTimeStamp (timeStamp) {
  var day;
  var hour;
  var min;
  var seconds;

  day = parseInt(timeStamp / (24 * 60 * 60)) // 计算整数天数
  var afterDay = timeStamp - day * 24 * 60 * 60 // 取得算出天数后剩余的秒数
  hour = parseInt(afterDay / (60 * 60)) // 计算整数小时数
  var afterHour = timeStamp - day * 24 * 60 * 60 - hour * 60 * 60 // 取得算出小时数后剩余的秒数
  min = parseInt(afterHour / 60) // 计算整数分
  seconds = parseInt(timeStamp - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60) // 取得算出分后剩余的秒数

  if (day < 10) {
    day = '0' + day;
  }

  if (hour < 10) {
    hour = '0' + hour
  };

  if (min < 10) {
    min = '0' + min;
  }

  if (seconds < 10) {
    seconds = '0' + seconds;
  }

  const restStamp = {
    day: day,
    hour: hour,
    min: min,
    seconds: seconds
  }
  return restStamp
}
export function formatTimesYMDHMS(timestamp) {
  // 创建一个 Date 对象
  const date = new Date(timestamp);

  // 获取各个部分
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，所以加1
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  // 格式化为 YYYY-MM-DD HH:mm:ss
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function formatTimesYMD(timestamp) {
  // 创建一个 Date 对象
  const date = new Date(timestamp);

  // 获取各个部分
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，所以加1
  const day = String(date.getDate()).padStart(2, '0');

  // 格式化为 YYYY-MM-DD
  return `${year}-${month}-${day}`;
}

export function formatInit(timestamp) {
  // 将时间戳的整数部分转换为毫秒
  const milliseconds = Math.floor(timestamp) * 1000 + (timestamp % 1) * 1000;

  // 创建 Date 对象
  const date = new Date(milliseconds);

  // 获取各个部分
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从 0 开始，所以加 1
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  // 格式化为 "YYYY-MM-DD HH:mm:ss"
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


export function formatTimeInit(timestamp) {
  // 非空校验
  if (timestamp === null || timestamp === undefined) {
      console.error('时间戳不能为空');
      return null; // 或者返回一个默认值
  }

  // 确保时间戳是数字
  if (typeof timestamp !== 'number' || isNaN(timestamp)) {
      console.error('时间戳必须是有效的数字');
      return null; // 或者返回一个默认值
  }

  // 创建 Date 对象
  const date = new Date(timestamp);

  // 检查日期是否有效
  if (isNaN(date.getTime())) {
      console.error('无效的时间戳');
      return null; // 或者返回一个默认值
  }

  // 获取各个部分
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从 0 开始，所以加 1
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  // 格式化为 "YYYY-MM-DD HH:mm:ss"
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}