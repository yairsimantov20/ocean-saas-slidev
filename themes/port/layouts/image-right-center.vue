<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  image: {
    type: String,
  },
  class: {
    type: String,
  },
  backgroundSize: {
    type: String,
    default: 'cover',
  },
})

const style = computed(() => {
  const base = { backgroundColor: 'transparent' }
  if (!props.image) return base
  const url = props.image.startsWith('/')
    ? import.meta.env.BASE_URL + props.image.slice(1)
    : props.image
  return {
    ...base,
    color: 'white',
    backgroundImage: `url("${url}")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: props.backgroundSize,
  }
})
</script>

<template>
  <div class="grid grid-cols-2 w-full h-full auto-rows-fr" style="background: var(--port-bg)">
    <div class="slidev-layout default flex flex-col justify-center pr-8" :class="props.class">
      <slot />
    </div>
    <div class="w-full h-full" :style="style" />
  </div>
</template>
