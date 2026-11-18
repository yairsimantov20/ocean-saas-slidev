<script setup>
const props = defineProps({
  meta: { type: String, default: '' },
})
</script>

<template>
  <div class="gb">
    <span class="gb-meta">{{ props.meta }}</span>
    <span class="gb-t"><slot /></span>
  </div>
</template>

<style scoped>
.gb { display: flex; flex-direction: column; gap: 0.25rem; font-family: var(--font-mono); background: #f3f4f6; border-radius: 10px; padding: 0.55rem 0.8rem; border-left: 3px solid var(--mute-2); }
.gb-meta { font-size: 0.6rem; color: var(--mute-2); }
.gb-t { font-size: 0.74rem; color: var(--ink-2); line-height: 1.4; }
</style>
