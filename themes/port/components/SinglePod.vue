<script setup>
// One controller pod that can only grow (scale up), next to replicas that can't exist (no scale out).
const props = defineProps({
  from: { type: String, default: '6' },
  to: { type: String, default: '10' },
  caption: { type: String, default: '' },
})
import { useSlideIn } from '../composables/useSlideIn'
const { on } = useSlideIn()
</script>

<template>
  <div class="sp" :class="{ go: on }">
    <div class="row">
      <div class="pod">
        <span class="p-name">app-controller</span>
        <span class="p-cores num">{{ props.from }} → {{ props.to }} cores</span>
      </div>
      <div class="ghost g1"><span class="x">✕</span></div>
      <div class="ghost g2"><span class="x">✕</span></div>
    </div>
    <div class="legend">
      <span class="up">↑ scale up only</span>
      <span class="out">→ no scale out</span>
    </div>
    <div v-if="props.caption" class="cap">{{ props.caption }}</div>
  </div>
</template>

<style scoped>
.sp { width: 100%; display: flex; flex-direction: column; align-items: center; gap: 0.45rem; }
.row { display: flex; align-items: flex-end; gap: 0.5rem; height: 3.6rem; }
.pod {
  display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 0.15rem;
  width: 7.4rem; height: 3.6rem; border-radius: 12px;
  background: var(--argo); color: #fff;
  transform-origin: bottom center; transform: scale(0.72);
  transition: transform 0.9s cubic-bezier(.2,.8,.2,1) 0.5s;
}
.go .pod { transform: scale(1); }
.p-name { font-family: var(--font-mono); font-size: 0.66rem; opacity: 0.9; }
.p-cores { font-size: 0.82rem; }
.ghost {
  display: flex; align-items: center; justify-content: center;
  width: 3rem; height: 2.6rem; border-radius: 10px;
  border: 1.5px dashed var(--line); color: var(--warn);
  opacity: 0; transition: opacity 0.5s ease;
}
.go .g1 { opacity: 1; transition-delay: 1.3s; }
.go .g2 { opacity: 1; transition-delay: 1.5s; }
.x { font-size: 0.9rem; }
.legend { display: flex; gap: 0.9rem; font-family: var(--font-mono); font-size: 0.62rem; }
.up { color: var(--argo-ink); }
.out { color: var(--warn); }
.cap { font-size: 0.72rem; color: var(--mute); }
@media (prefers-reduced-motion: reduce) { .pod, .ghost { transition: none !important; } }
</style>
