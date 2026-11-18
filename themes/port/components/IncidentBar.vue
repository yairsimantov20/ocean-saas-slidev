<script setup>
// Incident window bar on a time axis. Times as "HH:MM".
const props = defineProps({
  date: { type: String, default: '' },
  start: { type: String, required: true },
  end: { type: String, required: true },
  from: { type: String, default: '10:00' },  // axis start
  to: { type: String, default: '15:00' },    // axis end
  title: { type: String, default: '' },
  endMark: { type: String, default: '' },
  zone: { type: String, default: '' },
  duration: { type: String, default: '' },
})
import { useSlideIn } from '../composables/useSlideIn'
const { on } = useSlideIn()
const m = t => { const [h, mm] = t.split(':').map(Number); return h * 60 + mm }
const span = m(props.to) - m(props.from)
const left = (m(props.start) - m(props.from)) / span * 100
const width = (m(props.end) - m(props.start)) / span * 100
</script>

<template>
  <div class="inc" :class="{ go: on }">
    <div class="inc-h">
      <span class="date"><span class="pulse" />{{ props.date }}</span>
      <span v-if="props.title" class="title">{{ props.title }}</span>
    </div>
    <div class="axis">
      <div class="win" :style="{ left: left + '%', '--w': width + '%' }">
        <span v-if="props.duration" class="dur num">{{ props.duration }}</span>
      </div>
      <span class="t num" :style="{ left: left + '%' }">{{ props.start }}</span>
      <span class="t num" :style="{ left: (left + width) + '%' }">{{ props.end }}</span>
      <span v-if="props.endMark" class="mark" :style="{ left: (left + width) + '%' }">{{ props.endMark }}</span>
      <p v-if="props.zone" class="zone">{{ props.zone }}</p>
    </div>
  </div>
</template>

<style scoped>
.inc { display: flex; flex-direction: column; gap: 0.9rem; }
.inc-h { display: flex; flex-direction: column; align-items: flex-start; gap: 0.45rem; }
.pulse { width: 0.4rem; height: 0.4rem; flex: none; border-radius: 50%; background: var(--warn); box-shadow: 0 0 0 0 rgba(239,68,68,.5); animation: pulse 1.8s infinite; }
@keyframes pulse { 70% { box-shadow: 0 0 0 8px rgba(239,68,68,0); } 100% { box-shadow: 0 0 0 0 rgba(239,68,68,0); } }
.date { display: inline-flex; align-items: center; gap: 0.4rem; white-space: nowrap; font-family: var(--font-mono); font-size: 0.7rem; color: var(--warn); background: rgba(239,68,68,.08); border-radius: 99px; padding: 0.15rem 0.6rem; }
.title { font-size: 1rem; font-weight: 500; line-height: 1.3; color: var(--ink); text-wrap: balance; }
.axis { position: relative; height: 2.6rem; background: repeating-linear-gradient(90deg, #eef0f3 0 1px, transparent 1px 20%), #f6f7f9; border-radius: 10px; margin-bottom: 3.2rem; }
.win {
  position: absolute; top: 0; bottom: 0; width: 0;
  background: repeating-linear-gradient(135deg, var(--warn) 0 8px, #f87171 8px 16px);
  border-radius: 10px;
  transition: width 0.9s cubic-bezier(.2,.8,.2,1) 0.45s;
  display: flex; align-items: center; justify-content: center; overflow: hidden;
}
.go .win { width: var(--w); }
.mark, .dur { opacity: 0; transition: opacity 0.35s 1.3s; }
.go .mark, .go .dur { opacity: 1; }
@media (prefers-reduced-motion: reduce) { .inc * { transition: none !important; } }
.dur { color: #fff; font-weight: 600; font-size: 0.95rem; white-space: nowrap; }
.t { position: absolute; top: calc(100% + 0.35rem); transform: translateX(-50%); font-family: var(--font-mono); font-size: 0.72rem; color: var(--ink-2); }
.mark {
  position: absolute; top: calc(100% + 1.8rem); transform: translateX(-50%);
  font-family: var(--font-mono); font-size: 0.66rem; white-space: nowrap;
  color: var(--op-ink); background: var(--op-soft); border-radius: 99px; padding: 0.1rem 0.55rem;
}
.zone { position: absolute; left: 0; top: calc(100% + 1.95rem); font-family: var(--font-mono); font-size: 0.62rem; color: var(--mute); margin: 0; }
</style>
