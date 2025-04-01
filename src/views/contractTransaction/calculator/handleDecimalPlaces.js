/**
 * 
 * @param {*} num 小数位数
 * @param {*} price 需要处理的数据
 * @returns 
 */
export default function (num, price) {
  let zero = "";
  for (let i = 1; i <= num; i++) {
    zero += "0";
  }
  let base = 1 + zero;
  let res = Math.round(price * base * 1) / base + "";
  if (res.includes(".")) {
    let arr = res.split(".");
    if (arr[1].length < num) {
      let value = num - arr[1].length;
      let z = "";
      for (let i = 1; i <= value; i++) {
        z += "0";
      }
      return `${res}${z}`;
    } else {
      return res;
    }
  } else {
    return `${res}.${zero}`;
  }
}
