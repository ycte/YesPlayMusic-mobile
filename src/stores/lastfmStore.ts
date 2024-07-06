import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLastfmStore = defineStore('lastfmStore', () => {
  const lastfm = ref(JSON.parse(localStorage.getItem('lastfm') || '{}'))

  return {
    lastfm,
  }
})
