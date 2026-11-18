<script setup>
// White card with a small label. span: make it cover the full grid row.
const props = defineProps({
  label: { type: String, default: '' },
  tone: { type: String, default: 'neutral' },
  span: { type: Boolean, default: false },
  pad: { type: String, default: '1rem 1.15rem' },
})
</script>
<template>
  <section class="panel" :class="[`t-${props.tone}`, { span: props.span }]" :style="{ padding: props.pad }">
    <p v-if="props.label" class="p-l"><span class="d" />{{ props.label }}</p>
    <div class="p-b"><slot /></div>
  </section>
</template>
<style scoped>
.panel { background: var(--card); border: 1px solid var(--line); border-radius: 18px; display: flex; flex-direction: column; min-height: 0; }
.span { grid-column: 1 / -1; }
.p-l { display: flex; align-items: center; gap: 0.45rem; font-family: var(--font-mono); font-size: 0.68rem; color: var(--mute); margin: 0 0 0.7rem; }
.d { width: 0.45rem; height: 0.45rem; border-radius: 50%; background: var(--mute-2); }
.t-argo .d { background: var(--argo); }
.t-op .d { background: var(--op); }
.t-warn .d { background: var(--warn); }
.p-b { flex: 1; min-height: 0; display: flex; flex-direction: column; gap: 0.8rem; }
.p-b > :deep(.stage-grid) { flex: 1; }
</style>
