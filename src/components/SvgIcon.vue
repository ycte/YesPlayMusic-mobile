<script>
export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: '',
    },
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`
    },
    svgClass() {
      if (this.className) {
        return `svg-icon ${this.className}`
      }
      else {
        return 'svg-icon'
      }
    },
  },
}
</script>

<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<style scoped>
.svg-icon {
  fill: currentColor;
}
</style>
