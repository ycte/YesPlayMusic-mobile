import { createI18n } from 'vue-i18n'

// 使用 import.meta.globEager 批量导入
const modules = import.meta.glob('./locales/**/*.json')

const en: Record<string, any> = {}
const cn: Record<string, any> = {}

// 遍历导入的模块
for (const path in modules) {
  const module = modules[path]
  if (path.includes('/en/')) {
    Object.assign(en, module)
  }
  else if (path.includes('/cn/')) {
    Object.assign(cn, module)
  }
}

const i18n = createI18n({
  locale: localStorage.getItem('lang') || 'zh-CN',
  messages: {
    'zh-CN': {
      ...cn,
    },
    'en': {
      ...en,
    },
  },
})

export default i18n
