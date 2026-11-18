<script setup>
const props = defineProps({ title: { type: String, default: '' }, gap: { type: String, default: '0.5rem' }, row: { type: Boolean, default: false } })
</script>
<template>
  <div class="grp">
    <p v-if="props.title" class="g-t">{{ props.title }}</p>
    <div class="g-b anim-kids" :class="{ row: props.row }" :style="{ gap: props.gap }"><slot /></div>
  </div>
</template>
<style scoped>
.grp { display: flex; flex-direction: column; gap: 0.6rem; min-height: 0; }
.g-t { font-family: var(--font-mono); font-size: 0.68rem; color: var(--mute); margin: 0; }
.g-b { display: flex; flex-direction: column; align-items: flex-start; }
.g-b.row { flex-direction: row; flex-wrap: wrap; }
</style>
