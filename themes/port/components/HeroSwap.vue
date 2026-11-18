<script setup>
// Before → after big-number swap. Plays on slide enter: before, strike, arrow, after.
import { useSlideIn, useCountUp } from '../composables/useSlideIn'
const props = defineProps({
  before: { type: String, required: true },
  after: { type: String, required: true },
})
const { on, live } = useSlideIn()
const beforeTxt = useCountUp(() => props.before, on, live, 0.1, 0.6)
</script>

<template>
  <div class="hero" :class="{ on }">
    <div class="side before">
      <span class="tag-l">argo cd</span>
      <span class="n num">{{ beforeTxt }}<i class="strike" /></span>
    </div>
    <div class="arrow">
      <svg viewBox="0 0 80 24" width="80" height="24"><path d="M2 12 H70 M60 3 L72 12 L60 21" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </div>
    <div class="side after">
      <span class="tag-l">operator</span>
      <span class="n num">{{ props.after }}</span>
    </div>
  </div>
</template>

<style scoped>
.hero { display: flex; align-items: center; justify-content: center; gap: 2.2rem; }
.side {
  display: flex; flex-direction: column; align-items: flex-start;
  opacity: 0; transform: translateY(14px);
  transition: opacity 0.55s cubic-bezier(.2,.8,.2,1), transform 0.55s cubic-bezier(.2,.8,.2,1);
}
.on .side { opacity: 1; transform: none; }
.on .before { transition-delay: 0.05s; }
.on .after { transition-delay: 1.05s; transform: none; }
.after { transform: translateY(14px) scale(0.92); }
.tag-l { font-family: var(--font-mono); font-size: 0.8rem; color: var(--mute); margin-bottom: 0.2rem; padding-left: 0.4rem; }
.n { font-size: 9.5rem; line-height: 0.95; font-weight: 600; position: relative; }
.before .n { color: var(--argo); transition: opacity 0.5s 0.75s; }
.on .before .n { opacity: 0.6; }
.after .n { color: var(--op); }
.strike {
  position: absolute; left: -2%; top: 52%;
  height: 0.05em; width: 0;
  background: var(--ink-2); border-radius: 99px;
  transform: rotate(-8deg);
  transition: width 0.45s cubic-bezier(.2,.8,.2,1);
}
.on .strike { width: 104%; transition-delay: 0.7s; }
.arrow { color: var(--mute-2); opacity: 0; transform: translateX(-10px); transition: all 0.45s cubic-bezier(.2,.8,.2,1); margin-top: 1.6rem; }
.on .arrow { opacity: 1; transform: none; transition-delay: 0.9s; }
@media (prefers-reduced-motion: reduce) { .hero * { transition: none !important; } }
</style>
