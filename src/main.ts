import { computed, createApp } from 'vue'
import { createPinia } from 'pinia'
import i18n from './locale'
import App from './App.vue'
import { router } from './router'
import { useBasicStore } from './stores/basicStore'
import { useSettingsStore } from '@/stores/settingsStore.ts'
import 'virtual:uno.css'
import 'virtual:svg-icons-register'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)

// FIXME: init localStorage in @/stores
const store = useBasicStore()
// eslint-disable-next-line no-console
console.log(`App init: ${computed(() => store.title).value}`)
const settings = useSettingsStore()
const lang = computed(() => settings.settings.lang)
i18n.global.locale = lang.value // change i18n locale after pinia is active
app.use(i18n)
app.mount('#app')
