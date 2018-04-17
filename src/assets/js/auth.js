// 该模块存放的是：token令牌的存储，获取一级删除

const userInfoKey = 'user-info'
// 登陆成功后存储token
export function saveUserInfo (userInfo) {
  window.localStorage.setItem(userInfoKey, JSON.stringify(userInfo))
}

// 退出登陆后 将token从本地存储中删除
export function removeUserInfo () {
  window.localStorage.removeItem(userInfoKey)
}

// 从本地获取token
export function getToken () {
  return JSON.parse(getUserInfo()).token
}

// 从本地获取用户信息
export function getUserInfo () {
  return window.localStorage.getItem(userInfoKey)
}
