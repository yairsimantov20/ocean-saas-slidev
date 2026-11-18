<script setup>
const props = defineProps({
  tone: { type: String, default: 'neutral' },  // op | argo | neutral | ghost
  mono: { type: Boolean, default: false },
})
</script>

<template>
  <span class="chip" :class="[`t-${props.tone}`, { mono: props.mono }]"><slot /></span>
</template>

<style scoped>
.chip {
  display: inline-flex; align-items: center; gap: 0.35rem;
  font-size: 0.8rem; line-height: 1.2;
  padding: 0.38rem 0.75rem;
  border-radius: 10px;
  background: #fff; border: 1px solid var(--line); color: var(--ink-2);
  white-space: nowrap;
}
.mono { font-family: var(--font-mono); font-size: 0.72rem; }
.t-op { background: var(--op-soft); border-color: transparent; color: var(--op-ink); }
.t-argo { background: var(--argo-soft); border-color: transparent; color: var(--argo-ink); }
.t-ghost { background: transparent; border-style: dashed; color: var(--mute); }
.t-warn { background: var(--warn-soft); border-color: transparent; color: #b91c1c; }
</style>
