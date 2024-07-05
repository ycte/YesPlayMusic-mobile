import { onMounted, onUnmounted, ref } from 'vue'

export function useMobileCheck() {
  const isMobile = ref(false)

  function checkMobile() {
    // 这里使用768px作为移动设备和非移动设备的分界点，可以根据实际需要调整
    isMobile.value = window.innerWidth < 768
  }

  onMounted(() => {
    window.addEventListener('resize', checkMobile)
    // 初始化时进行一次检查
    checkMobile()
  })

  onUnmounted(() => {
    window.removeEventListener('resize', checkMobile)
  })

  return { isMobile }
}
