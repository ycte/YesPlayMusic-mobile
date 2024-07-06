import { defineStore } from 'pinia'
import { ref } from 'vue'
import pkg from '../../package.json'
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
  const lastfm = ref(JSON.parse(localStorage.getItem('lastfm') || '{}'))
  const player = ref(JSON.parse(localStorage.getItem('player') || '{}'))
  const settings = ref(JSON.parse(localStorage.getItem('settings') || '{}'))
  const data = ref(JSON.parse(localStorage.getItem('data') || '{}'))

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
    player,
    settings,
    data,
  }
})
