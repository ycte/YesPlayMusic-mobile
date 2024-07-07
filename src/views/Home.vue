<script setup lang="ts">
import { onMounted, ref } from 'vue'
import CoverRow from '@/components/CoverRow.vue'
import { getRecommendPlayList } from '@/utils/playList'

const show = ref(false)
const recommendPlaylist = ref({ items: [] })
// let newReleasesAlbum = ref({ items: [] })
// let topList = ref({
//   items: [],
//   ids: [19723756, 180106, 60198, 3812895, 60131],
// })
// let recommendArtists = ref({
//   items: [],
//   indexs: [],
// })
function loadData() {
  // TODO:
  // setTimeout(() => {
  //   if (!show.value) NProgress.start();
  // }, 1000);
  getRecommendPlayList(10, false).then((items) => {
    recommendPlaylist.value.items = items
    // NProgress.done();
    show.value = true
  })
  // TODO:
  // newAlbums({
  //   area: this.settings.musicLanguage ?? 'ALL',
  //   limit: 10,
  // }).then(data => {
  //   this.newReleasesAlbum.items = data.albums;
  // });

  // const toplistOfArtistsAreaTable = {
  //   all: null,
  //   zh: 1,
  //   ea: 2,
  //   jp: 4,
  //   kr: 3,
  // };
  // toplistOfArtists(
  //   toplistOfArtistsAreaTable[this.settings.musicLanguage ?? 'all']
  // ).then(data => {
  //   let indexs = [];
  //   while (indexs.length < 6) {
  //     let tmp = ~~(Math.random() * 100);
  //     if (!indexs.includes(tmp)) indexs.push(tmp);
  //   }
  //   this.recommendArtists.indexs = indexs;
  //   this.recommendArtists.items = data.list.artists.filter((l, index) =>
  //     indexs.includes(index)
  //   );
  // });
  // toplists().then(data => {
  //   this.topList.items = data.list.filter(l =>
  //     this.topList.ids.includes(l.id)
  //   );
  // });
  // this.$refs.DailyTracksCard.loadDailyTracks();
}
onMounted(() => {
  loadData()
})
</script>

<template>
  <div class="index-row">
    <div class="title">
      {{ $t('home.recommendPlaylist') }}
      <router-link to="/explore?category=推荐歌单">
        {{
          $t('home.seeMore')
        }}
      </router-link>
    </div>
    <CoverRow type="playlist" :items="recommendPlaylist.items" sub-text="copywriter" />
  </div>
</template>
