<script setup>
// Full-width row inside a Stage grid; children flow horizontally.
const props = defineProps({
  gap: { type: String, default: '0.6rem' },
  cols: { type: String, default: '' },
  align: { type: String, default: 'center' },
  padEnd: { type: String, default: '' },  // e.g. "6.5rem" to clear the footer counter
})
</script>
<template>
  <div
    class="strip anim-kids"
    :class="{ grid: !!props.cols }"
    :style="{ gap: props.gap, gridTemplateColumns: props.cols || undefined, alignItems: props.align, paddingRight: props.padEnd || undefined }"
  ><slot /></div>
</template>
<style scoped>
.strip { grid-column: 1 / -1; display: flex; flex-wrap: wrap; min-width: 0; }
.strip.grid { display: grid; }
</style>
