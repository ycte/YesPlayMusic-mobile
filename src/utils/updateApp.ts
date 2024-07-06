import pkg from '../../package.json'
import initLocalStorage from './initLocalStorage'

function updateSetting() {
  const parsedSettings = JSON.parse(localStorage.getItem('settings'))
  const settings = {
    ...initLocalStorage.settings,
    ...parsedSettings,
  }

  if (
    settings.shortcuts.length !== initLocalStorage.settings.shortcuts.length
  ) {
    // 当新增 shortcuts 时
    const oldShortcutsId = settings.shortcuts.map(s => s.id)
    const newShortcutsId = initLocalStorage.settings.shortcuts.filter(
      s => oldShortcutsId.includes(s.id) === false,
    )
    newShortcutsId.map((id) => {
      settings.shortcuts.push(
        initLocalStorage.settings.shortcuts.find(s => s.id === id),
      )
      return 0
    })
  }

  if (localStorage.getItem('appVersion') === '"0.3.9"') {
    settings.lyricsBackground = true
  }

  localStorage.setItem('settings', JSON.stringify(settings))
}

function updateData() {
  const parsedData = JSON.parse(localStorage.getItem('data'))
  const data = {
    ...parsedData,
  }
  localStorage.setItem('data', JSON.stringify(data))
}

function updatePlayer() {
  let parsedData = JSON.parse(localStorage.getItem('player'))
  const appVersion = localStorage.getItem('appVersion')
  if (appVersion === `"0.2.5"`)
    parsedData = {} // 0.2.6版本重构了player
  const data = {
    ...parsedData,
  }
  localStorage.setItem('player', JSON.stringify(data))
}

function removeOldStuff() {
  // remove old indexedDB databases created by localforage
  indexedDB.deleteDatabase('tracks')
}

export default function () {
  updateSetting()
  updateData()
  updatePlayer()
  removeOldStuff()
  localStorage.setItem('appVersion', JSON.stringify(pkg.version))
}
