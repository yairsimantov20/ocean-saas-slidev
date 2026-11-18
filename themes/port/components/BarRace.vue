<script setup>
// Animated before/after horizontal bars. Each row is scaled to its own "before".
import { useSlideIn } from '../composables/useSlideIn'
const props = defineProps({
  rows: { type: Array, required: true },   // [{ label, before, after, unit, note }]
})
const { on } = useSlideIn()
const pct = (v, max) => `${Math.max(2, (v / max) * 100)}%`
</script>

<template>
  <div class="race" :class="{ go: on }">
    <div v-for="(r, i) in props.rows" :key="i" class="row" :style="{ '--d': `${i * 0.25}s` }">
      <div class="row-h">
        <span class="lbl">{{ r.label }}</span>
        <span v-if="r.note" class="note">{{ r.note }}</span>
      </div>
      <div class="track">
        <div class="bar argo" :style="{ '--w': pct(r.before, r.before) }"><span class="v in num">{{ r.before }}{{ r.unit }}</span></div>
      </div>
      <div class="track">
        <div class="bar op" :style="{ '--w': pct(r.after, r.before) }" />
        <span class="v out num" :style="{ '--x': pct(r.after, r.before) }">{{ r.after }}{{ r.unit }}</span>
      </div>
    </div>
    <div class="legend">
      <span><i class="sw argo" /> argo cd</span>
      <span><i class="sw op" /> operator</span>
    </div>
  </div>
</template>

<style scoped>
.race { display: flex; flex-direction: column; gap: 1.15rem; }
.row { display: flex; flex-direction: column; gap: 0.35rem; }
.row-h { display: flex; align-items: baseline; gap: 0.6rem; }
.lbl { font-size: 0.95rem; color: var(--ink); font-weight: 500; }
.note { font-family: var(--font-mono); font-size: 0.66rem; color: var(--mute); }
.track { position: relative; height: 1.85rem; background: #f1f3f5; border-radius: 8px; }
.bar {
  position: absolute; left: 0; top: 0; bottom: 0;
  width: 0;
  border-radius: 8px;
  display: flex; align-items: center; justify-content: flex-end;
  transition: width 0.9s cubic-bezier(.2,.8,.2,1);
  transition-delay: calc(0.3s + var(--d));
}
.go .bar { width: var(--w); }
.v.in { opacity: 0; transition: opacity 0.3s; transition-delay: calc(0.9s + var(--d)); }
.go .v.in { opacity: 1; }
.go .bar:not(.op) { }
@media (prefers-reduced-motion: reduce) { .race * { transition: none !important; } }
.bar.argo { background: var(--argo); }
.bar.op { background: var(--op); transition-delay: calc(0.65s + var(--d)); }
.v { font-size: 0.9rem; font-weight: 600; color: #fff; padding: 0 0.6rem; white-space: nowrap; }
.v.out {
  position: absolute; top: 50%; transform: translateY(-50%);
  left: calc(var(--x) + 0.15rem);
  color: var(--op-ink);
  opacity: 0; transition: opacity 0.35s; transition-delay: calc(1.2s + var(--d));
}
.go .v.out { opacity: 1; }
.legend { opacity: 0; transition: opacity 0.4s 0.3s; }
.go .legend { opacity: 1; }
.legend { display: flex; gap: 1.2rem; font-family: var(--font-mono); font-size: 0.68rem; color: var(--mute); margin-top: 0.1rem; }
.legend span { display: inline-flex; align-items: center; gap: 0.4rem; }
.sw { width: 0.7rem; height: 0.7rem; border-radius: 3px; display: inline-block; }
.sw.argo { background: var(--argo); }
.sw.op { background: var(--op); }
</style>
