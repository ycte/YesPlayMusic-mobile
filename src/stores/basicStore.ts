import { defineStore } from 'pinia'
import { ref } from 'vue'
import pkg from '../../package.json'
import { usePlayerStore } from './playerStore'
import initLocalStorage from '@/utils/initLocalStorage'
import updateApp from '@/utils/updateApp'

if (localStorage.getItem('appVersion') === null) {
  localStorage.setItem('settings', JSON.stringify(initLocalStorage.settings))
  localStorage.setItem('data', JSON.stringify(initLocalStorage.data))
  localStorage.setItem('appVersion', pkg.version)
}

updateApp()

export const useBasicStore = defineStore('basicStore', () => {
  const showLyrics = ref(false)
  const enableScrolling = ref(true)
  const title = ref('YesPlayMusic')
  const liked = ref({
    songs: [],
    songsWithDetails: [], // 只有前12首
    playlists: [],
    albums: [],
    artists: [],
    mvs: [],
    cloudDisk: [],
    playHistory: {
      weekData: [],
      allData: [],
    },
  })
  const contextMenu = ref({
    clickObjectID: 0,
    showMenu: false,
  })
  const toast = ref({
    show: false,
    text: '',
    timer: null,
  })
  const modals = ref({
    addTrackToPlaylistModal: {
      show: false,
      selectedTrackID: 0,
    },
    newPlaylistModal: {
      show: false,
      afterCreateAddTrackID: 0,
    },
  })
  const dailyTracks = ref([])
  const player = usePlayerStore()
  const lastfm = ref(JSON.parse(localStorage.getItem('lastfm') || '{}'))
  function updateLikedXXX(name: keyof typeof liked.value, data: any) {
    liked.value[name] = data
    if (name === 'songs') {
      // FIXME:
      player.player.value.sendSelfToIpcMain()
    }
  }

  return {
    showLyrics,
    enableScrolling,
    title,
    liked,
    contextMenu,
    toast,
    modals,
    dailyTracks,
    lastfm,
    updateLikedXXX,
  }
})
