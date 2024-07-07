<script>
import SvgIcon from '@/components/SvgIcon.vue'

export default {
  name: 'ExplicitSymbol',
  components: {
    SvgIcon,
  },
  props: {
    size: {
      type: Number,
      default: 16,
    },
  },
  data() {
    return {
      svgStyle: {},
    }
  },
  created() {
    this.svgStyle = {
      height: `${this.size}px`,
      width: `${this.size}px`,
      position: 'relative',
      left: '-1px',
    }
  },
}
</script>

<template>
  <SvgIcon icon-class="explicit" :style="svgStyle" />
</template>

<style lang="scss" scoped></style>
