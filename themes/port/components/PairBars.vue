<script setup>
// Two vertical bars with the gap labeled (e.g. Argo apps vs real integrations).
// Bar height is final from first paint; entrance uses scaleY so layout width/height never shift.
const props = defineProps({
  a: { type: Number, required: true }, aLabel: { type: String, default: '' },
  b: { type: Number, required: true }, bLabel: { type: String, default: '' },
  gapLabel: { type: String, default: '' },
})
import { useSlideIn, useCountUp } from '../composables/useSlideIn'
const { on, live } = useSlideIn()
const aTxt = useCountUp(() => props.a.toLocaleString('en-US'), on, live, 0.35, 0.9)
const bTxt = useCountUp(() => props.b.toLocaleString('en-US'), on, live, 0.5, 0.9)
const fmt = n => n.toLocaleString('en-US')
const max = Math.max(props.a, props.b)
</script>

<template>
  <div class="pair" :class="{ go: on }">
    <div class="col">
      <span class="v num argo-t"><span class="ghost" aria-hidden="true">{{ fmt(props.a) }}</span><span class="live">{{ aTxt }}</span></span>
      <div class="bar-wrap">
        <div class="bar argo" :style="{ '--h': `${props.a / max * 100}%` }">
          <div class="gap" :style="{ height: `${(props.a - props.b) / props.a * 100}%` }">
            <span v-if="props.gapLabel" class="gap-l">{{ props.gapLabel }}</span>
          </div>
        </div>
      </div>
      <span class="l">{{ props.aLabel }}</span>
    </div>
    <div class="col">
      <span class="v num"><span class="ghost" aria-hidden="true">{{ fmt(props.b) }}</span><span class="live">{{ bTxt }}</span></span>
      <div class="bar-wrap">
        <div class="bar neutral" :style="{ '--h': `${props.b / max * 100}%` }" />
      </div>
      <span class="l">{{ props.bLabel }}</span>
    </div>
  </div>
</template>

<style scoped>
.pair { display: flex; gap: 1rem; align-items: flex-end; height: 100%; }
.col { display: flex; flex-direction: column; align-items: center; gap: 0.3rem; flex: 1; height: 100%; }
.v {
  display: inline-block;
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--ink);
  position: relative;
  white-space: nowrap;
}
.v .ghost { visibility: hidden; }
.v .live { position: absolute; left: 0; top: 0; }
.argo-t { color: var(--argo); }
.bar-wrap { flex: 1; width: 100%; display: flex; align-items: flex-end; min-height: 0; }
.bar {
  width: 100%;
  height: var(--h);
  border-radius: 8px 8px 4px 4px;
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform 0.9s cubic-bezier(.2,.8,.2,1) 0.35s;
  position: relative;
  overflow: hidden;
}
.go .bar { transform: scaleY(1); }
.bar.argo { background: var(--argo); }
.bar.neutral { background: #d1d5db; transition-delay: 0.5s; }
.gap-l { opacity: 0; transition: opacity 0.3s 1.25s; }
.go .gap-l { opacity: 1; }
.gap {
  position: absolute; left: 0; right: 0; top: 0;
  background: repeating-linear-gradient(135deg, rgba(255,255,255,0.55) 0 5px, transparent 5px 10px);
  border-bottom: 2px dashed rgba(255,255,255,0.9);
  display: flex; align-items: center; justify-content: center;
}
.gap-l { font-family: var(--font-mono); font-size: 0.52rem; white-space: nowrap; color: #fff; background: rgba(17,24,39,0.55); padding: 0.05rem 0.3rem; border-radius: 99px; }
.l { font-family: var(--font-mono); font-size: 0.6rem; color: var(--mute); text-align: center; line-height: 1.25; }
@media (prefers-reduced-motion: reduce) {
  .pair * { transition: none !important; }
  .bar { transform: scaleY(1); }
}
</style>
