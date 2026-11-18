<script setup>
// Big-number card. tone: argo | op | warn | neutral
// `unit` renders on a fixed second line so count-up never reflows the value.
const props = defineProps({
  value: { type: String, required: true },
  unit: { type: String, default: '' },
  label: { type: String, default: '' },
  sub: { type: String, default: '' },
  tone: { type: String, default: 'neutral' },
  size: { type: String, default: 'md' },   // sm | md | lg
  flat: { type: Boolean, default: false },
  count: { type: Boolean, default: true },   // count numbers up on slide enter
  delay: { type: Number, default: 0.3 },
})
import { useSlideIn, useCountUp } from '../composables/useSlideIn'
const { on, live } = useSlideIn()
const shown = props.count ? useCountUp(() => props.value, on, live, props.delay, 1.0) : null
</script>

<template>
  <div class="stat" :class="[`t-${props.tone}`, `s-${props.size}`, { flat: props.flat }]">
    <p v-if="props.label" class="stat-l">{{ props.label }}</p>
    <p class="stat-v num">
      <span class="ghost" aria-hidden="true">{{ props.value }}</span>
      <span class="live">{{ shown ?? props.value }}</span>
    </p>
    <p v-if="props.unit" class="stat-u">{{ props.unit }}</p>
    <p v-if="props.sub" class="stat-s">{{ props.sub }}</p>
    <slot />
  </div>
</template>

<style scoped>
.stat {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 0.95rem 1.15rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
}
.stat::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 4px;
  background: var(--line);
}
.stat.flat { background: transparent; border: none; padding: 0 0 0 2px; overflow: visible; }
.stat.flat::before { display: none; }
.t-argo::before { background: var(--argo); }
.t-op::before { background: var(--op); }
.t-warn::before { background: var(--warn); }
.stat-l {
  font-family: var(--font-mono);
  font-size: 0.66rem;
  color: var(--mute);
  margin: 0 0 0.3rem;
}
.stat-v {
  font-weight: 600;
  color: var(--ink);
  margin: 0;
  line-height: 1;
  position: relative;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
}
.stat-v .ghost {
  visibility: hidden;
  display: block;
}
.stat-v .live {
  position: absolute;
  left: 0;
  top: 0;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
}
.stat-u {
  font-size: 0.85rem;
  font-weight: 500;
  line-height: 1;
  margin: 0.22rem 0 0;
  color: var(--ink-2);
}
.t-argo .stat-v, .t-argo .stat-u { color: var(--argo); }
.t-op .stat-v, .t-op .stat-u { color: var(--op); }
.t-warn .stat-v, .t-warn .stat-u { color: var(--warn); }
.s-sm .stat-v { font-size: 1.45rem; }
.s-md .stat-v { font-size: 2.3rem; }
.s-lg .stat-v { font-size: 2.75rem; }
.stat-s {
  font-size: 0.78rem;
  color: var(--mute);
  margin: 0.4rem 0 0;
  line-height: 1.3;
}
</style>
