<script setup>
// Vertical stack inside a Stage cell.
const props = defineProps({
  gap: { type: String, default: '1rem' },
  justify: { type: String, default: 'flex-start' },
})
</script>

<template>
  <div class="col anim-kids" :style="{ gap: props.gap, justifyContent: props.justify }">
    <slot />
  </div>
</template>

<style scoped>
.col {
  display: flex;
  flex-direction: column;
  min-height: 0;
  height: 100%;
}
</style>
