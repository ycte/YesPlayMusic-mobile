import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDataStore = defineStore('dataStore', () => {
  const data = ref(JSON.parse(localStorage.getItem('data') || '{}'))

  return {
    data,
  }
})
