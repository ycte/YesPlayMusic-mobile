import Cookies from 'js-cookie'
import { logout } from '@/api/auth'
import { useDataStore } from '@/stores/dataStore'

export function setCookies(string: string) {
  const cookies = string.split(';;')
  cookies.map((cookie) => {
    document.cookie = cookie
    const cookieKeyValue = cookie.split(';')[0].split('=')
    localStorage.setItem(`cookie-${cookieKeyValue[0]}`, cookieKeyValue[1])
    return cookieKeyValue
  })
}

export function getCookie(key: string) {
  return Cookies.get(key) ?? localStorage.getItem(`cookie-${key}`)
}

export function removeCookie(key: string) {
  Cookies.remove(key)
  localStorage.removeItem(`cookie-${key}`)
}

// MUSIC_U 只有在账户登录的情况下才有
export function isLoggedIn() {
  return getCookie('MUSIC_U') !== undefined
}

// 账号登录
export function isAccountLoggedIn() {
  const dataStore = useDataStore()
  return (
    getCookie('MUSIC_U') !== undefined
    && dataStore.data.value.loginMode === 'account'
  )
}

// 用户名搜索（用户数据为只读）
export function isUsernameLoggedIn() {
  const dataStore = useDataStore()
  return dataStore.data.value.loginMode === 'username'
}

// 账户登录或者用户名搜索都判断为登录，宽松检查
export function isLooseLoggedIn() {
  return isAccountLoggedIn() || isUsernameLoggedIn()
}

export function doLogout() {
  logout()
  removeCookie('MUSIC_U')
  removeCookie('__csrf')
  // FIXME:
  // // 更新状态仓库中的用户信息
  // store.commit('updateData', { key: 'user', value: {} })
  // // 更新状态仓库中的登录状态
  // store.commit('updateData', { key: 'loginMode', value: null })
  // // 更新状态仓库中的喜欢列表
  // store.commit('updateData', { key: 'likedSongPlaylistID', value: undefined })
}