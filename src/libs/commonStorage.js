/**
 * window.localStorage 浏览器永久缓存
 * @method set 设置永久缓存
 * @method get 获取永久缓存
 * @method remove 移除永久缓存
 * @method clear 移除全部永久缓存
 */

export default {
  // 设置永久缓存
	setLocal(key, val) {
		window.localStorage.setItem(key, (typeof val === 'string' || 'number' || 'boolean' || 'symbol') ? val : JSON.stringify(val))
	},

	// 获取永久缓存
	getLocal(key) {
		let json = window.localStorage.getItem(key)
		return (typeof val === 'string' || 'number' || 'boolean' || 'symbol') ? json : JSON.parse(json)
	},

	// 移除永久缓存
	removeLocal(key) {
		window.localStorage.removeItem(key)
	},

	// 移除全部永久缓存
	clearLocal() {
		window.localStorage.clear()
	}
}