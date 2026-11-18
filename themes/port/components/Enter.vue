<script setup>
// Fade + rise on slide enter (replays on every visit). `delay` in seconds.
import { useSlideIn } from '../composables/useSlideIn'
const props = defineProps({ delay: { type: [Number, String], default: 0 } })
const { on, live } = useSlideIn()
</script>
<template>
  <div class="enter" :class="{ on, live }" :style="{ animationDelay: `${props.delay}s` }"><slot /></div>
</template>
<style scoped>
.enter.live:not(.on) { opacity: 0; }
.enter.live.on { animation: enter-rise 0.7s cubic-bezier(.2,.8,.2,1) both; }
@keyframes enter-rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) { .enter { animation: none !important; opacity: 1 !important; } }
</style>
