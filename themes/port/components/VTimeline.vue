<script setup>
// Vertical timeline. items: [{ date, label, tone?, blame? }]
const props = defineProps({
  items: { type: Array, required: true },
  cols: { type: Number, default: 1 },
  compact: { type: Boolean, default: false },
  delay: { type: Number, default: 0.25 },
  stagger: { type: Number, default: 0.18 },
})
import { useSlideIn } from '../composables/useSlideIn'
const { on } = useSlideIn()
const per = Math.ceil(props.items.length / props.cols)
const groups = Array.from({ length: props.cols }, (_, c) => props.items.slice(c * per, (c + 1) * per).map((it, k) => ({ ...it, _i: c * per + k })))
</script>

<template>
  <div class="vt" :class="{ compact: props.compact, on }" :style="{ gridTemplateColumns: `repeat(${props.cols}, minmax(0,1fr))` }">
    <ol v-for="(g, gi) in groups" :key="gi" class="vt-col">
      <li v-for="it in g" :key="it._i" class="vt-it" :class="`t-${it.tone || 'neutral'}`" :style="{ transitionDelay: on ? `${props.delay + it._i * props.stagger}s` : '0s' }">
        <span class="dot" />
        <div class="vt-b">
          <span class="date num">{{ it.date }}</span>
          <span class="label">{{ it.label }}</span>
          <span v-if="it.blame" class="blame">{{ it.blame }}</span>
        </div>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.vt { display: grid; gap: 2.5rem; align-items: start; }
.vt-col { list-style: none; margin: 0; padding: 0; position: relative; display: flex; flex-direction: column; gap: 1.15rem; }
.vt-col::before { content: ''; position: absolute; left: 0.39rem; top: 0.5rem; bottom: 0.5rem; width: 2px; background: var(--line); }
.compact .vt-col { gap: 0.55rem; }
.vt-it { display: grid; grid-template-columns: 0.85rem 1fr; gap: 0.85rem; align-items: start; opacity: 0; transform: translateX(-6px); transition: all 0.5s cubic-bezier(.2,.8,.2,1); position: relative; margin: 0; padding: 0; }
.vt-it::before { display: none; }
.on .vt-it { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) { .vt * { transition: none !important; } }
.dot { width: 0.85rem; height: 0.85rem; border-radius: 50%; background: #fff; border: 3px solid var(--mute-2); margin-top: 0.2rem; position: relative; z-index: 1; }
.t-argo .dot { border-color: var(--argo); }
.t-op .dot { border-color: var(--op); background: var(--op); }
.t-warn .dot { border-color: var(--warn); background: var(--warn); }
.vt-b { display: flex; flex-direction: column; gap: 0.15rem; }
.date { font-family: var(--font-mono); font-size: 0.66rem; color: var(--mute); }
.label { font-size: 0.95rem; color: var(--ink); line-height: 1.3; }
.compact .label { font-size: 0.78rem; }
.compact .date { font-size: 0.6rem; }
.blame { margin-top: 0.3rem; font-family: var(--font-mono); font-size: 0.72rem; color: var(--ink-2); background: #f3f4f6; border-left: 3px solid var(--mute-2); border-radius: 0 8px 8px 0; padding: 0.4rem 0.7rem; line-height: 1.45; }
</style>
