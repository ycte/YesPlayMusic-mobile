<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useMobileCheck } from '@/composables/resize'
import i18n from '@/locale'

const { isMobile } = useMobileCheck()
const route = useRoute()
const headerTitle = computed(() => {
  return typeof route.name !== 'symbol' && typeof route.name !== 'undefined'
    ? i18n.global.t(route.name)
    : 'YesPlayMusic'
})
</script>

<template>
  <div class="blur-header" :class="{ 'pc-header': !isMobile, 'mobile-header': isMobile }">
    {{ headerTitle }}
  </div>
</template>

<style lang="less">
  .blur-header {
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(10px);
    padding: 10px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 256;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    &.pc-header {
      height: 49px;
    }

    &.mobile-header {
      height: 46px;
    }
  }
</style>
