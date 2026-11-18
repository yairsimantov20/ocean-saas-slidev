<script setup>
// Inline highlight inside titles. tone: op | argo | warn
const props = defineProps({ tone: { type: String, default: 'op' } })
</script>
<template><span class="hl" :class="`t-${props.tone}`"><slot /></span></template>
<style scoped>
.hl { white-space: nowrap; }
.t-op { color: var(--op); }
.t-argo { color: var(--argo); }
.t-warn { color: var(--warn); }
</style>
