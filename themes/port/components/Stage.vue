<script setup>
// Fills the remaining slide height under the title. Children are laid out by `cols`.
const props = defineProps({
  cols: { type: String, default: '1fr' },   // CSS grid-template-columns
  rows: { type: String, default: '' },      // optional grid-template-rows
  gap: { type: String, default: '1.5rem' },
  align: { type: String, default: 'stretch' },
})
</script>

<template>
  <div class="body stage-grid anim-kids" :style="{ gridTemplateColumns: props.cols, gridTemplateRows: props.rows || undefined, gap: props.gap, alignItems: props.align }">
    <slot />
  </div>
</template>

<style scoped>
.stage-grid {
  display: grid;
  min-height: 0;
}
.stage-grid > :deep(*) {
  min-width: 0;
  min-height: 0;
}
</style>
