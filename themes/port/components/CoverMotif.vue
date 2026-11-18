<script setup>
// Cover motif: 10 Argo-orange hops collapse into 5 operator-green hops. Draws itself on mount.
import { useSlideIn } from '../composables/useSlideIn'
const { on, live } = useSlideIn()
const before = Array.from({ length: 10 }, (_, i) => 20 + i * 34)
const after = Array.from({ length: 5 }, (_, i) => 520 + i * 68)
</script>
<template>
  <svg class="motif" :class="{ on, live }" viewBox="0 0 820 40" aria-hidden="true">
    <defs>
      <linearGradient id="motif-g" gradientUnits="userSpaceOnUse" x1="20" x2="792" y1="20" y2="20">
        <stop offset="0" style="stop-color: var(--argo)" />
        <stop offset="0.45" style="stop-color: var(--argo)" />
        <stop offset="0.6" style="stop-color: var(--op)" />
        <stop offset="1" style="stop-color: var(--op)" />
      </linearGradient>
    </defs>
    <line class="wire" x1="20" y1="20" x2="792" y2="20" stroke="url(#motif-g)" />
    <circle v-for="(x, i) in before" :key="'b' + i" class="hop argo" :cx="x" cy="20" r="5" :style="{ animationDelay: `${0.5 + i * 0.05}s` }" />
    <circle v-for="(x, i) in after" :key="'a' + i" class="hop op" :cx="x" cy="20" r="9" :style="{ animationDelay: `${1.1 + i * 0.09}s` }" />
  </svg>
</template>
<style scoped>
.motif { width: 100%; max-width: 40rem; display: block; overflow: visible; }
.wire { stroke-width: 2; opacity: 0.55; stroke-dasharray: 800; }
.live:not(.on) .wire { stroke-dashoffset: 800; }
.live.on .wire { animation: draw 1.2s cubic-bezier(.2,.8,.2,1) 0.35s both; }
.hop { transform-box: fill-box; transform-origin: center; }
.live:not(.on) .hop { opacity: 0; }
.live.on .hop { animation: pop 0.45s cubic-bezier(.3,1.6,.5,1) both; }
@media (prefers-reduced-motion: reduce) { .motif * { animation: none !important; opacity: 1 !important; stroke-dashoffset: 0 !important; } }
.argo { fill: var(--port-bg); stroke: var(--argo); stroke-width: 2.4; }
.op { fill: var(--op); }
@keyframes draw { from { stroke-dashoffset: 800; } to { stroke-dashoffset: 0; } }
@keyframes pop { from { opacity: 0; transform: scale(0.2); } to { opacity: 1; transform: scale(1); } }
</style>
