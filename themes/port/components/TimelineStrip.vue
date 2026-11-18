<script setup>
// Horizontal timeline. items: [{ date, label, tone?: 'argo'|'op'|'warn'|'neutral', big?: bool }]
const props = defineProps({
  items: { type: Array, required: true },
  delay: { type: Number, default: 0.25 },   // first item, seconds after slide enter
  stagger: { type: Number, default: 0.18 }, // seconds between items
})
import { useSlideIn } from '../composables/useSlideIn'
const { on } = useSlideIn()
</script>

<template>
  <div class="tl" :class="{ on }" :style="{ '--n': props.items.length, '--dl': `${props.delay}s`, '--st': `${props.stagger}s`, '--tot': `${props.delay + props.stagger * props.items.length}s` }">
    <div class="axis" />
    <div v-for="(it, i) in props.items" :key="i" class="it" :class="[`t-${it.tone || 'neutral'}`, { big: it.big }]" :style="{ '--k': i }">
      <span class="dot" />
      <span class="date num">{{ it.date }}</span>
      <span class="label">{{ it.label }}</span>
      <span v-if="it.mono" class="mono">{{ it.mono }}</span>
    </div>
  </div>
</template>

<style scoped>
.tl {
  position: relative;
  display: grid;
  grid-template-columns: repeat(var(--n), minmax(0, 1fr));
  gap: 1rem;
  padding-top: 0.2rem;
}
.axis { position: absolute; left: 0.4rem; right: 0.4rem; top: 0.72rem; height: 2px; background: var(--line); transform-origin: left; transform: scaleX(0); transition: transform var(--tot) cubic-bezier(.4,0,.2,1) var(--dl); }
.on .axis { transform: scaleX(1); }
.it {
  position: relative;
  display: flex; flex-direction: column; gap: 0.25rem;
  opacity: 0; transform: translateY(6px);
  transition: all 0.5s cubic-bezier(.2,.8,.2,1);
}
.on .it { opacity: 1; transform: none; transition-delay: calc(var(--dl) + var(--k) * var(--st)); }
@media (prefers-reduced-motion: reduce) { .tl * { transition: none !important; } }
.dot { width: 0.85rem; height: 0.85rem; border-radius: 50%; background: #fff; border: 3px solid var(--mute-2); position: relative; z-index: 1; margin-bottom: 0.45rem; }
.t-argo .dot { border-color: var(--argo); }
.t-op .dot { border-color: var(--op); }
.t-warn .dot { border-color: var(--warn); }
.big .dot { background: currentColor; }
.t-op.big .dot { background: var(--op); }
.date { font-family: var(--font-mono); font-size: 0.68rem; color: var(--mute); }
.label { font-size: 0.86rem; line-height: 1.3; color: var(--ink); overflow-wrap: break-word; }
.big .label { font-weight: 600; }
.mono { font-family: var(--font-mono); font-size: 0.66rem; line-height: 1.4; color: var(--mute); }
</style>
