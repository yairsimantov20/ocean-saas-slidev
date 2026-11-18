<script setup>
// Static page frame: the kicker (header) and the slide counter (footer) live outside the slide
// transition, so they stay put on a page change and only their text cross-fades.
// The counter and color dots stay on every slide; only the current page number animates. the kicker comes from the slide's `kicker` frontmatter.
import { computed } from 'vue'
import { useNav } from '@slidev/client'

const { currentPage, total, currentSlideRoute } = useNav()
const fm = computed(() => currentSlideRoute.value?.meta?.slide?.frontmatter || {})
const pad = n => String(n).padStart(2, '0')
</script>

<template>
  <div class="frame">
    <Transition name="frame-swap" mode="out-in">
      <p v-if="fm.kicker" :key="'k' + currentPage" class="frame-kicker">{{ fm.kicker }}</p>
    </Transition>
    <footer class="deck-foot" :class="{ light: fm.footer === 'light' }">
      <span class="num">
        <span :key="currentPage" class="cur">{{ pad(currentPage) }}</span>
        <i>/</i>
        <span>{{ pad(total) }}</span>
      </span>
      <ColorDots inline />
    </footer>
  </div>
</template>

<style scoped>
.frame { position: absolute; inset: 0; pointer-events: none; z-index: 5; }
/* same spot as the stage layout's (hidden) kicker placeholder */
.frame-kicker {
  position: absolute; top: 2.1rem; left: 3rem; margin: 0;
  font-family: var(--font-mono); font-size: 0.72rem; color: var(--mute); letter-spacing: 0.02em;
}
.deck-foot {
  position: absolute; right: 2rem; bottom: 1.5rem;
  display: flex; justify-content: flex-end; align-items: center; gap: 0.9rem;
  line-height: 0.625rem;
  font-family: var(--font-mono); font-size: 0.6rem; color: var(--mute-2);
}
i { font-style: normal; color: #d1d5db; margin: 0 0.3rem; }
/* `footer: light` in frontmatter, for slides with a dark band at the bottom */
.deck-foot.light { color: rgba(255,255,255,.85); }
.deck-foot.light i { color: rgba(255,255,255,.5); }
.num { display: inline-flex; align-items: baseline; font-variant-numeric: tabular-nums; }
/* only the current number moves: it is re-keyed on every page and rises in once, no leave step */
.cur { display: inline-block; min-width: 1.3em; text-align: right; animation: num-in 0.35s cubic-bezier(.2,.8,.2,1) both; }
@keyframes num-in { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }

/* text swaps in step with the page: out with the old content, in with the new */
.frame-swap-leave-active { transition: opacity 0.3s ease; }
.frame-swap-enter-active { transition: opacity 0.4s ease 0.35s; }
.frame-swap-enter-from, .frame-swap-leave-to { opacity: 0; }
@media (prefers-reduced-motion: reduce) {
  .cur { animation: none; }
  .frame-swap-enter-active, .frame-swap-leave-active { transition: opacity 0.15s ease; }
}
</style>
