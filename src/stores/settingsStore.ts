import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSettingsStore = defineStore('settingsStore', () => {
  const settings = ref(JSON.parse(localStorage.getItem('settings') || '{}'))

  return {
    settings,
  }
})
