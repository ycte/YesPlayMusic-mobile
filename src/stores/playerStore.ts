import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePlayerStore = defineStore('playerStore', () => {
  const player = ref(JSON.parse(localStorage.getItem('player') || '{}'))

  return {
    player,
  }
})
