import { getToken } from '@/libs/utils.js'
class MockSoket {
	constructor() {
		// 用于存储消息处理器
		this.messageHandlers = [];

		// 消息发送（websocket）
		this.mock = new WebSocket(`${process.env.VUE_APP_BASE_WS_CQ}/ws/zh_cn/${getToken()}`);
	}
	
	/**
	     * 获取推送数据 （取一个值就好）
	     * e {string} load=加载 get=获取
	     */
	webSocket(e) {
	    if (typeof WebSocket === "undefined") {
	        alert("您的浏览器不支持socket")
	    } else {
	        // 实例化socket
	        this.websock = new Mock();
	        // 监听socket连接
	        this.mock.onopen = this.websock.websockOpen;
	        // 监听socket错误信息
	        this.mock.onerror = this.websock.websockError;
	        // 监听socket消息
	        this.mock.onmessage = this.websock.websockMessage;
					// 连接关闭重新连接
					this.mock.onclose = this.websock.websockClose;
					try {
					    this.mock.close();
					    this.isWebsock = false;
					} catch (e) { }
	    }
	}
	
	/**
	 * 发送消息
	 * @param data                  发送的消息内容
	 * @param handler               对消息的处理函数
	 * @return {Promise<unknown>}   返回一个 Promise
	 */
	send(data, handler) {
		// 返回一个 Promise
		return new Promise((resolve, reject) => {
			// 创建消息处理器
			const messageHandler = new MessageHandler();
			messageHandler.callback = handler;
			messageHandler.resolve = resolve;
			messageHandler.reject = reject;
			messageHandler.data = data;

			// 设置超时，3s
			messageHandler.timer = setTimeout(() => {
				messageHandler.reject(new Error('timeout'));
				this.messageHandlers.splice(this.messageHandlers.indexOf(messageHandler), 1);
			}, 3000);

			// 添加到消息处理器列表
			this.messageHandlers.push(messageHandler);

			// 发送消息
			this.mock.send(data);
		})
	}
}

 class MockHelper {}

// 消息处理器
class MessageHandler {
	constructor() {
		this.callback = null;
		this.timer = null;
		this.resolve = null;
		this.reject = null;
		this.data = null;
	}

	// 处理消息
	handle(data, fused) {
		// 消息处理结果
		let result = {
			sendData: this.data,
			receiveData: data,
			handleData: null
		};

		// 熔断器
		const _fused = () => {
			// 收到熔断信号，清除定时器
			if (this.timer) {
				clearTimeout(this.timer);
				this.timer = null;
			}

			// 执行上层的熔断函数
			fused();

			// 执行 resolve
			if (this.resolve) {
				// 这里需要等待回调函数执行完毕，才能执行 resolve，这样才能拿到 handleData
				Promise.resolve().then(() => {
					this.resolve(result);
					this.resolve = null;
				});
			}
		}

		// 执行回调函数
		if (typeof this.callback === 'function') {
			try {
				result.handleData = this.callback(data, _fused);
			} catch (e) {
				this.reject(e);
				throw e;
			}
		}
	}
}

export { MockHelper }