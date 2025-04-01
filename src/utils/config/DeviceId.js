export function getDeviceId() {
    // 尝试从 localStorage 获取设备 ID
    let deviceId = localStorage.getItem('deviceId');
    
    // 如果设备 ID 不存在，则生成一个新的设备 ID
    if (!deviceId) {
        const timestamp = Date.now().toString(36); // 将时间戳转换为基36字符串
        const randomPart = Math.random().toString(36).substring(2, 10); // 生成随机字符串
        deviceId = `${timestamp}-${randomPart}`; // 组合时间戳和随机字符串
        localStorage.setItem('deviceId', deviceId); // 存储到 localStorage
    }
    
    return deviceId; // 返回设备 ID
}

// // 使用示例
// const deviceId = getOrCreateDeviceId();
// console.log(deviceId); // 输出设备 ID