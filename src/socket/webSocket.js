
let Socket = ''
let setIntervalWesocketPush = null
let url = ''
let reconnectionNum = 0 // 重连次数
const limitReconnectionNum = 5 // 最大重连次数
// 建立连接
export function createSocket(urls) {
    url = urls
    if (!Socket) {
        // console.log('建立websocket连接')
        clearInterval(setIntervalWesocketPush)
        Socket = new WebSocket(urls)
        Socket.onopen = onopenWS
        Socket.onmessage = im_msg
        Socket.onerror = onerrorWS
        Socket.onclose = oncloseWS
    } else {
        clearInterval(setIntervalWesocketPush)
        // console.log('websocket已连接')
        onopenWS()
    }
}
// 打开WS之后发送心跳
export function onopenWS() {
    clearInterval(setIntervalWesocketPush)
    // console.log('已连接')
    sendPing() // 发送心跳
}
// 连接失败重连
export function onerrorWS() {
    // console.log('连接失败')
    clearInterval(setIntervalWesocketPush)
    Socket.close()
    Socket = ''
    // createSocket(url) // 重连
}
// WS数据接收统一处理
export function im_msg(e) {
    if (e.data != 'invalid protocol') {
        window.dispatchEvent(new CustomEvent('im_msg', {
            detail: JSON.parse(e.data)
        }))
    }

}
/** 发送数据 */
export function sendWSPush(obj) {
    if (Socket !== null && Socket.readyState === 3) {
        Socket.close()
        createSocket(url) // 重连
    } else if (Socket.readyState === 1) {
        Socket.send(JSON.stringify(obj))
    } else if (Socket.readyState === 0) {
        setTimeout(() => {
            Socket.send(JSON.stringify(obj))
        }, 3000)
    }
}
/** 关闭WS */
export function oncloseWS() {
    let i = 0
    clearInterval(setIntervalWesocketPush)
    // console.log('websocket已断开')
    setIntervalWesocketPush = setInterval(() => {
        reconnectionNum++
        // console.log('重连中', reconnectionNum)
        Socket = ''
        if (reconnectionNum > limitReconnectionNum) {
            Socket = ''
            clearInterval(setIntervalWesocketPush)
            reconnectionNum = 0
        } else {
            createSocket(url) // 重连
        }
    }, 5000)
}
/** 发送心跳 */
export function sendPing() {
    Socket.send('ping')
  
    setIntervalWesocketPush = setInterval(() => {
       
        Socket.send('ping')
    }, 5000)
}

