<script setup>
const props = defineProps({ align: { type: String, default: 'center' } })
</script>
<template><p class="cap" :style="{ textAlign: props.align }"><slot /></p></template>
<style scoped>
.cap { font-family: var(--font-mono); font-size: 0.8rem; color: var(--mute); margin: 0; }
</style>
