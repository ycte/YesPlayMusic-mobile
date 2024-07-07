<script setup>
import { ref } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'

const props = defineProps({
  size: {
    type: Number,
    default: 16,
  },
})
const svgStyle = ref({})

onCreated(() => {
  svgStyle.value = {
    height: `${props.size}px`,
    width: `${props.size}px`,
    position: 'relative',
    left: '-1px',
  }
})
</script>

<template>
  <SvgIcon icon-class="explicit" :style="svgStyle" />
</template>
