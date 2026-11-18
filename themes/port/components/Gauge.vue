<script setup>
// Semi-circle gauge, fills to `value` percent.
const props = defineProps({
  value: { type: Number, required: true },
  label: { type: String, default: '' },
  tone: { type: String, default: 'argo' },
})
import { useSlideIn, useCountUp } from '../composables/useSlideIn'
const { on, live } = useSlideIn()
const vTxt = useCountUp(() => String(props.value), on, live, 0.4, 1.0)
const len = Math.PI * 80
</script>

<template>
  <div class="gauge" :class="[`t-${props.tone}`, { go: on }]">
    <svg viewBox="0 0 200 112" class="g-svg">
      <path d="M20 100 A80 80 0 0 1 180 100" fill="none" stroke="#eef0f3" stroke-width="16" stroke-linecap="round" />
      <path class="fill" d="M20 100 A80 80 0 0 1 180 100" fill="none" stroke-width="16" stroke-linecap="round"
        :style="{ strokeDasharray: len, '--off': len * (1 - props.value / 100), '--len': len }" />
    </svg>
    <div class="g-v num">{{ vTxt }}%</div>
    <div v-if="props.label" class="g-l">{{ props.label }}</div>
  </div>
</template>

<style scoped>
.gauge { position: relative; width: 100%; max-width: 13rem; margin: 0 auto; text-align: center; }
.g-svg { width: 100%; display: block; }
.fill { stroke-dashoffset: var(--len); transition: stroke-dashoffset 1s cubic-bezier(.2,.8,.2,1) 0.4s; }
@media (prefers-reduced-motion: reduce) { .fill { transition: none !important; } }
.go .fill { stroke-dashoffset: var(--off); }
.t-argo .fill { stroke: var(--argo); }
.t-op .fill { stroke: var(--op); }
.t-warn .fill { stroke: var(--warn); }
.g-v { position: absolute; left: 0; right: 0; top: 46%; font-size: 2rem; font-weight: 600; color: var(--ink); }
.t-argo .g-v { color: var(--argo); }
.g-l { font-family: var(--font-mono); font-size: 0.62rem; color: var(--mute); margin-top: 0.2rem; }
</style>
