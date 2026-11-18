<script setup lang="ts">
import { useSlideIn } from '../composables/useSlideIn'
const { on, live } = useSlideIn()
</script>

<template>
  <div class="slidev-layout stage anim" :class="{ on, live }">
    <p v-if="$frontmatter.kicker" class="stage-kicker" aria-hidden="true">{{ $frontmatter.kicker }}</p>
    <slot />
  </div>
</template>

<style>
.slidev-layout.stage {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 2.1rem 3rem 3.1rem;
  background: var(--port-bg);
}

.stage-kicker {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--mute);
  letter-spacing: 0.02em;
  margin: 0 0 0.55rem;
  /* placeholder only: the visible kicker is drawn by global-top.vue so it stays static between slides */
  visibility: hidden;
}

.slidev-layout.stage h1 {
  font-size: 2.05rem;
  line-height: 1.15;
  font-weight: 600;
  letter-spacing: -0.025em;
  color: var(--ink);
  margin: 0;
  max-width: 46rem;
}

.slidev-layout.stage > .body {
  flex: 1;
  min-height: 0;
  margin-top: 1.4rem;
  position: relative;
}

/* Title lives inside the stage body (e.g. slide 03), so keep only a tight gap under the kicker. */
.slidev-layout.stage.fill-meme > .body {
  margin-top: 0.55rem;
}

/* ==============================================
   Auto entrance (replays on every visit)
   Kicker + title first, then each child of a grid / column / strip / chip row,
   staggered by its position. Classes come from the deck components.
   ============================================== */

@keyframes st-rise {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: none; }
}

.stage.anim.live:not(.on) > .stage-kicker,
.stage.anim.live:not(.on) > h1,
.stage.anim.live:not(.on) .anim-kids > *,
.stage.anim.live:not(.on) table tbody tr {
  opacity: 0;
}

.stage.anim.live.on > .stage-kicker { animation: st-rise 0.5s cubic-bezier(.2,.8,.2,1) both; }
.stage.anim.live.on > h1 { animation: st-rise 0.55s cubic-bezier(.2,.8,.2,1) 0.06s both; }
.stage.anim.live.on .anim-kids > * {
  animation: st-rise 0.55s cubic-bezier(.2,.8,.2,1) both;
  animation-delay: calc(0.18s + var(--i, 0) * 0.16s);
}
.stage.anim.live.on table tbody tr {
  animation: st-rise 0.5s cubic-bezier(.2,.8,.2,1) both;
  animation-delay: calc(0.2s + var(--i, 0) * 0.14s);
}

.anim-kids > :nth-child(1), table tbody tr:nth-child(1) { --i: 0; }
.anim-kids > :nth-child(2), table tbody tr:nth-child(2) { --i: 1; }
.anim-kids > :nth-child(3), table tbody tr:nth-child(3) { --i: 2; }
.anim-kids > :nth-child(4), table tbody tr:nth-child(4) { --i: 3; }
.anim-kids > :nth-child(5), table tbody tr:nth-child(5) { --i: 4; }
.anim-kids > :nth-child(6), table tbody tr:nth-child(6) { --i: 5; }
.anim-kids > :nth-child(7) { --i: 6; }
.anim-kids > :nth-child(8) { --i: 7; }
.anim-kids > :nth-child(n+9) { --i: 8; }

@media (prefers-reduced-motion: reduce) {
  .stage.anim *,
  .stage.anim > * {
    animation: none !important;
    transition: none !important;
  }
}
</style>
