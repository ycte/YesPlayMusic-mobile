import process from 'node:process'
import axios from 'axios'
import { router } from '@/router'
import { doLogout, getCookie } from '@/utils/auth'

let baseURL = ''
baseURL = import.meta.env.VITE_APP_NETEASE_API_URL

const service = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 15000,
})

service.interceptors.request.use((config) => {
  if (!config.params)
    config.params = {}
  if (baseURL.length) {
    if (
      baseURL[0] !== '/'
      && !process.env.IS_ELECTRON
      && getCookie('MUSIC_U') !== null
    ) {
      config.params.cookie = `MUSIC_U=${getCookie('MUSIC_U')};`
    }
  }
  else {
    console.error('You must set up the baseURL in the service\'s config')
  }

  if (config.url && !config.url.includes('/login')) {
    config.params.realIP = '211.161.244.70'
  }

  if (import.meta.env.VITE_APP_REAL_IP) {
    config.params.realIP = import.meta.env.VITE_APP_REAL_IP
  }

  // FIXME:
  const proxy = JSON.parse(localStorage.getItem('settings') || '{}').proxyConfig
  if (['HTTP', 'HTTPS'].includes(proxy.protocol)) {
    config.params.proxy = `${proxy.protocol}://${proxy.server}:${proxy.port}`
  }

  return config
})

service.interceptors.response.use(
  (response) => {
    const res = response.data
    return res
  },
  async (error) => {
    /** @type {import('axios').AxiosResponse | null} */
    let response
    let data
    if (error === 'TypeError: baseURL is undefined') {
      response = error
      data = error
      console.error('You must set up the baseURL in the service\'s config')
    }
    else if (error.response) {
      response = error.response
      data = response.data
    }

    if (
      response
      && typeof data === 'object'
      && data.code === 301
      && data.msg === '需要登录'
    ) {
      console.warn('Token has expired. Logout now!')

      // 登出帳戶
      doLogout()

      // 導向登入頁面
      router.push({ name: 'login' })
    }
  },
)

export default service
