<script setup lang="ts">
import { useMobileCheck } from '@/composables/resize'

const { isMobile } = useMobileCheck()
</script>

<template>
  <div class="blur-header" :class="{ 'pc-header': !isMobile, 'mobile-header': isMobile }">
    Header
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
