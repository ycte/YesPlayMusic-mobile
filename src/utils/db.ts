import type { AxiosResponse } from 'axios'
import axios from 'axios'
import Dexie from 'dexie'
import { useSettingsStore } from '@/stores/settingsStore'
// import pkg from "../../package.json";

const db = new Dexie('yesplaymusic')

db.version(4).stores({
  trackDetail: '&id, updateTime',
  lyric: '&id, updateTime',
  album: '&id, updateTime',
})

db.version(3)
  .stores({
    trackSources: '&id, createTime',
  })
  .upgrade(tx =>
    tx
      .table('trackSources')
      .toCollection()
      .modify(
        track => !track.createTime && (track.createTime = new Date().getTime()),
      ),
  )

db.version(1).stores({
  trackSources: '&id',
})

let tracksCacheBytes = 0

async function deleteExcessCache() {
  const settingsStore = useSettingsStore()
  if (
    settingsStore.settings.value.cacheLimit === false
    || tracksCacheBytes < settingsStore.settings.value.cacheLimit * 1024 ** 2
  ) {
    return
  }
  try {
    const delCache = await db.trackSources.orderBy('createTime').first()
    await db.trackSources.delete(delCache.id)
    tracksCacheBytes -= delCache.source.byteLength
    // eslint-disable-next-line no-console
    console.debug(
      `[debug][db.js] deleteExcessCacheSucces, track: ${delCache.name}, size: ${delCache.source.byteLength}, cacheSize:${tracksCacheBytes}`,
    )
    deleteExcessCache()
  }
  catch (error) {
    // eslint-disable-next-line no-console
    console.debug('[debug][db.js] deleteExcessCacheFailed', error)
  }
}

export function cacheTrackSource(trackInfo: { name: any, ar: { name: any }[], artists: { name: any }[], al: { picUrl: any }, id: any }, url: string, bitRate: number, from = 'netease') {

  // const name = trackInfo.name
  // const artist
  //   = (trackInfo.ar && trackInfo.ar[0]?.name)
  //   || (trackInfo.artists && trackInfo.artists[0]?.name)
  //   || 'Unknown'
  // let cover = trackInfo.al.picUrl
  // if (cover.slice(0, 5) !== 'https') {
  //   cover = `https${cover.slice(4)}`
  // }
  // axios.get(`${cover}?param=512y512`)
  // axios.get(`${cover}?param=224y224`)
  // axios.get(`${cover}?param=1024y1024`)
  // return axios
  //   .get(url, {
  //     responseType: 'arraybuffer',
  //   })
  //   .then((response) => {
  //     db.trackSources.put({
  //       id: trackInfo.id,
  //       source: response.data,
  //       bitRate,
  //       from,
  //       name,
  //       artist,
  //       createTime: new Date().getTime(),
  //     })
  //     console.debug(`[debug][db.js] cached track 👉 ${name} by ${artist}`)
  //     tracksCacheBytes += response.data.byteLength
  //     deleteExcessCache()
  //     return { trackID: trackInfo.id, source: response.data, bitRate }
  //   })
}

export function getTrackSource(id: any) {
  return db.trackSources.get(Number(id)).then((track) => {
    if (!track)
      return null
    // eslint-disable-next-line no-console
    console.debug(
      `[debug][db.js] get track from cache 👉 ${track.name} by ${track.artist}`,
    )
    return track
  })
}

export function cacheTrackDetail(track: { id: any }, privileges: any) {
  db.trackDetail.put({
    id: track.id,
    detail: track,
    privileges,
    updateTime: new Date().getTime(),
  })
}

export function getTrackDetailFromCache(ids: string[]) {
  return db.trackDetail
    .filter((track) => {
      return ids.includes(String(track.id))
    })
    .toArray()
    .then((tracks) => {
      const result = { songs: [], privileges: [] }
      ids.map((id) => {
        const one = tracks.find(t => String(t.id) === id)
        result.songs.push(one?.detail)
        result.privileges.push(one?.privileges)
      })
      if (result.songs.includes(undefined)) {
        return undefined
      }
      return result
    })
}

export function cacheLyric(id: any, lyrics: AxiosResponse<any, any>) {
  db.lyric.put({
    id,
    lyrics,
    updateTime: new Date().getTime(),
  })
}

export function getLyricFromCache(id: any) {
  return db.lyric.get(Number(id)).then((result) => {
    if (!result)
      return undefined
    return result.lyrics
  })
}

export function cacheAlbum(id: any, album: AxiosResponse<any, any>) {
  db.album.put({
    id: Number(id),
    album,
    updateTime: new Date().getTime(),
  })
}

export function getAlbumFromCache(id: any) {
  return db.album.get(Number(id)).then((result) => {
    if (!result)
      return undefined
    return result.album
  })
}

export function countDBSize() {
  const trackSizes = []
  return db.trackSources
    .each((track) => {
      trackSizes.push(track.source.byteLength)
    })
    .then(() => {
      const res = {
        bytes: trackSizes.reduce((s1, s2) => s1 + s2, 0),
        length: trackSizes.length,
      }
      tracksCacheBytes = res.bytes
      console.debug(
        `[debug][db.js] load tracksCacheBytes: ${tracksCacheBytes}`,
      )
      return res
    })
}

export function clearDB() {
  return new Promise((resolve) => {
    db.tables.forEach((table) => {
      table.clear()
    })
    resolve()
  })
}
