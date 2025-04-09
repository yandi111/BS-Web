/**
 * 现货 webscoket
 * */

let self = {}
let ws
let heartbeat
let store
let reconnectAttempts = 1
const queue = []
let onRealtimeCallback
let nowTime = new Date().getTime()
//ws掉线时间,用于记录当掉线后，下次连接上后的时间差大于4分钟时，通知页面需要请求历史K线
let dropTime

/**交易页面推送**/
const Signin = 'signin'

//行情
const MarketKline_Topic = 'market.kline'

//保存/删除当前的订阅
const duplicate = (data) => {
    //保存
    if (data.cmd === "SUBSCRIBE" || data.signin) {
        let index = -1
        queue.forEach((item, _index) => {
            if (Object.entries(item).toString() === Object.entries(data).toString()) {
                index = _index
            }
        })
        if (index == -1) {
            data.signin ? queue.unshift(data) : queue.push(data)
        }
    } else {
        //删除
        queue.forEach((item, index) => {
            if (data.cmd === "UNSUBSCRIBE") {
                if (item.sub && item.sub.toUpperCase() == data.unsub.toUpperCase()) {
                    queue.splice(index, 1)
                }
            } else if (data.signout) {
                if (item.signin) {
                    queue.splice(index, 1)
                }
            }
        })
    }
}

//处理订阅返回数据
const resDataProcess = (data) => {
    switch (data.key) {
        case MarketKline_Topic:
            store.state.socketStore.quotesMarket = data.data
            break;
    }

}

const send = (data) => {
    switch (ws.readyState) {
        case WebSocket.CONNECTING:
            duplicate(data)
            break
        case WebSocket.OPEN:
            duplicate(data)
            ws.send(JSON.stringify(data))
            break
        case WebSocket.CLOSING:
        case WebSocket.CLOSED:
            break
        default:
            break
    }
}

self.init = (localStore) => {
    store = localStore
    self.store = localStore

    ws = new WebSocket(process.env.VUE_APP_BASE_WS_TY + '/websocket')
    ws.onopen = () => {
        if (dropTime) {
            let curTime = new Date().getTime()
            if ((curTime - dropTime) >= 1000 * 60 * 4) {
                console.log("More than 4 minutes, notify the page to request the historical K-line")
                // 通知K线页面，用户ws断开连接后再次连接时获取历史K线数据
                // store.commit('coinModuleCoinWebSocket', true)
            } else {
                console.log("Less than 4 minutes, do not request historical K-line")
                // 通知K线页面，用户ws断开连接后再次连接时获取历史K线数据
                // store.commit('coinModuleCoinWebSocketHqchart', true)
            }
            dropTime = undefined
        }

        if (!heartbeat) {
            ws.send('ping')
        }
        //发送心跳,避免断开连接
        heartbeat = setInterval(() => {
            ws.send('ping')
        }, 20000)

        //当断开连接重新连接后重新订阅
        reconnectAttempts = 1
        if (queue.length > 0) {
            queue.forEach(item => {
                if (item.cmd === "SUBSCRIBE" || item.signin) {
                    send(item)
                }
            })
        }
    }

    ws.onclose = () => {
        //  console.log(`websocket closed. Code: ${JSON.stringify(code)}`)
        clearInterval(heartbeat)

        if (!dropTime) {
            //记录第一次掉线时间，用于判断下次链接后是否请求历史K线
            dropTime = new Date().getTime()
            console.log("Record the offline time：" + new Date())
        }
        //   console.log('websocket closed. Reconnect after 3s ...')
        const reconnectSocket = () => {
            // 无网络时，延迟重连
            // 应用在后台时，延迟重连
            if (queue.length === 0 || !(window.navigator || {}).onLine || (window.document || {}).hidden) {
                setTimeout(reconnectSocket, Math.min(1000 * 2 ** reconnectAttempts, 50000))
                return
            }
            setTimeout(function () {
                if (ws) {
                    ws.close()
                }
                self.init(store)
            }, Math.min(1000 * 2 ** reconnectAttempts, 30000))
            reconnectAttempts++
        }
        reconnectSocket()
    }

    ws.onerror = () => {
        //  console.log(`websocket error happened. Error: ${JSON.stringify(error)}`)
        clearInterval(heartbeat)
    }

    //获取订阅消息
    ws.onmessage = (message) => {
        if (message.data === 'ping') return ws.send('pong')
        // 回应服务端
        if (message.data === 'pong') return

        if (typeof message.data === 'string') {
            try {
                let data = JSON.parse(message.data)
                resDataProcess(data)
            } catch (e) {

            }

        }

    }
}

//订阅
self.subscribe = (params) => send(params)

//取消订阅
self.unsubscribe = (params) => send(params)

//K线订阅
self.setRealtimeCallback = (callback) => {
    onRealtimeCallback = callback
}

self.signIn = () => send({
    signin: JSON.stringify({token: localStorage.getItem('token')})
})

self.signOut = () => send({
    signout: {}
})


export default self



