import BigNumber from "bignumber.js"

// 数字精确度
class BigNumberUtils {
 // 基础配置
 constructor({DECIMAL_PLACES = 2, ROUNDING_MODE = BigNumber.ROUND_HALF_UP} = {}) {
  this.configSettings = { DECIMAL_PLACES, ROUNDING_MODE };
  BigNumber.config(this.configSettings)
 }

 // 创建实例
 create(val) {
  return new BigNumber(val)
 }

 // 加法
 add(a, b = 0) {
  return this.create(a).plus(b).toFixed(this.configSettings.DECIMAL_PLACES).toString()
 }

 // 减法
 subtract(a, b) {
  return this.create(a).minus(b).toFixed(this.configSettings.DECIMAL_PLACES).toString()
 }

 // 乘法, type为0是string，1为number
 multiply(a, b, type) {
  const value = this.create(a).times(b).toFixed(this.configSettings.DECIMAL_PLACES)
  return value.toString()
 }

 // 除法
 divide(a, b) {
  return this.create(a).dividedBy(b).toFixed(this.configSettings.DECIMAL_PLACES).toString()
 }

 // 转成string
 toString(val) {
  return this.create(val).toString()
 }

 // 转成number
 toNumber(val) {
  return this.create(val).toNumber()
 }
}
export default BigNumberUtils;

// 数字百分位
export const NumberFormat = ({lang = 'zh-CN', style = 'decimal', val, minimumFractionDigits}) => {
 const formatter = new Intl.NumberFormat(lang, {
  style,
  minimumFractionDigits: minimumFractionDigits || val?.split('.')[1]?.length || 0
 })

 return formatter.format(val)
}