// 存储 token
export function setToken(token) {
    localStorage.setItem('authToken', token); // 将 token 存储到 localStorage
  }
  
  // 获取 token
  export function getToken() {
    return localStorage.getItem('authToken'); // 从 localStorage 获取 token
  }
  
  // 移除 token
  export function removeToken() {
    localStorage.removeItem('authToken'); // 从 localStorage 移除 token
  }
