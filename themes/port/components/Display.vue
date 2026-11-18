<script setup>
// Oversized display text for closing / statement moments.
const props = defineProps({ size: { type: String, default: '5.6rem' } })
</script>
<template><p class="display" :style="{ fontSize: props.size }"><slot /></p></template>
<style scoped>
.display { margin: 0; font-weight: 600; letter-spacing: -0.045em; line-height: 0.95; color: var(--ink); }
</style>
