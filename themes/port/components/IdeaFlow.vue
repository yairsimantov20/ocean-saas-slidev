<script setup>
// Many Argo integration jobs collapse into one operator. Claims stay sourced; this is the visual.
import { useSlideIn } from '../composables/useSlideIn'
const { on, live } = useSlideIn()

const jobs = [
  { label: 'per-tenant create', dx: '-15.6rem', dy: '-3.3rem', rot: '-8deg' },
  { label: 'sync and apply the chart', dx: '-17.8rem', dy: '-0.5rem', rot: '5deg' },
  { label: 'reconcile drift', dx: '-14.2rem', dy: '2.4rem', rot: '-4deg' },
  { label: 'delete and clean up', dx: '-16.8rem', dy: '4.4rem', rot: '7deg' },
  { label: 'report health and status', dx: '-13.4rem', dy: '1.1rem', rot: '-6deg' },
  { label: 'roll out chart bumps', dx: '-16.2rem', dy: '-1.9rem', rot: '4deg' },
]
</script>

<template>
  <div class="idea" :class="{ on, live }">
    <div class="scene">
      <div class="from">
        <span class="cap argo">argo cd</span>
        <span class="from-hint">per-integration jobs</span>
      </div>

      <div class="unit">
        <div class="core">
          <div class="wheel" aria-hidden="true">
            <svg viewBox="0 0 120 120">
              <circle class="track" cx="60" cy="60" r="44" />
              <g class="pulse-g">
                <circle class="pulse" cx="60" cy="16" r="3.4" />
              </g>
            </svg>
            <span class="hub">operator</span>
            <span class="at at-0">observe</span>
            <span class="at at-1">diff</span>
            <span class="at at-2">apply</span>
          </div>
        </div>

        <div class="body">
          <div class="jobs">
            <span
              v-for="(j, i) in jobs"
              :key="j.label"
              class="job"
              :style="{ '--dx': j.dx, '--dy': j.dy, '--rot': j.rot, '--t': `${0.7 + i * 0.09}s`, '--i': i }"
            >{{ j.label }}</span>
          </div>
          <pre class="cr pop" style="--t: 1.55s"><code><span class="k">kind</span>: OceanIntegration
<span class="k">spec</span>:
  <span class="k">integrationType</span>: jira
  <span class="k">orgId</span>: org_…</code></pre>
          <div class="pods" aria-hidden="true">
            <i v-for="n in 7" :key="n" class="pod" :style="{ '--t': `${1.7 + n * 0.06}s` }" />
          </div>
        </div>
      </div>
    </div>

    <p class="foot pop" style="--t: 1.85s">
      <span class="was">an Argo app for every integration</span>
      <span class="now">one operator runs them all</span>
    </p>
  </div>
</template>

<style scoped>
.idea {
  height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.85rem;
  overflow: visible;
}
.scene {
  position: relative;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 8.6rem 1fr;
  gap: 0.8rem;
  align-items: center;
  overflow: visible;
}
.from {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  align-self: center;
  z-index: 0;
  transition: opacity 0.5s ease 1.35s;
}
.on.live .from { opacity: 0.45; }
.cap {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.02em;
}
.cap.argo { color: var(--argo); }
.from-hint {
  font-family: var(--font-mono);
  font-size: 0.58rem;
  line-height: 1.3;
  color: var(--mute);
  white-space: nowrap;
}
.unit {
  display: grid;
  grid-template-columns: 9.2rem 1fr;
  gap: 1rem 1.2rem;
  align-items: center;
  min-width: 0;
  background: #fff;
  border: 1.5px solid var(--op);
  border-radius: 22px;
  padding: 0.95rem 1.15rem 0.9rem 0.9rem;
  overflow: visible;
}
.core { display: flex; justify-content: center; }
.wheel {
  position: relative;
  width: 8.4rem;
  height: 8.4rem;
}
.wheel svg { width: 100%; height: 100%; display: block; overflow: visible; }
.track {
  fill: none;
  stroke: var(--op);
  stroke-width: 1.7;
  stroke-dasharray: 5 4;
  opacity: 0.7;
}
.pulse { fill: var(--op); }
.pulse-g { transform-origin: 60px 60px; }
.live.on .pulse-g { animation: spin 3.4s linear infinite; }
.live.on .track { animation: dash 1.2s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes dash { to { stroke-dashoffset: -18; } }
.hub {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  color: var(--op-ink);
}
.at {
  position: absolute;
  font-family: var(--font-mono);
  font-size: 0.5rem;
  color: var(--op-ink);
  letter-spacing: 0.01em;
}
.at-0 { top: -0.15rem; left: 50%; transform: translateX(-50%); }
.at-1 { bottom: 0.55rem; left: -0.15rem; }
.at-2 { bottom: 0.55rem; right: -0.15rem; }
.body { display: flex; flex-direction: column; gap: 0.55rem; min-width: 0; overflow: visible; }
.jobs { display: flex; flex-wrap: wrap; gap: 0.35rem; position: relative; z-index: 2; }
.job {
  display: inline-flex;
  align-items: center;
  font-size: 0.68rem;
  line-height: 1.2;
  padding: 0.28rem 0.55rem;
  border-radius: 999px;
  border: 1px solid var(--op);
  background: var(--op-soft);
  color: var(--op-ink);
  white-space: nowrap;
  transform-origin: center;
  transition:
    transform 0.75s cubic-bezier(.2,.8,.2,1),
    background 0.45s ease,
    border-color 0.45s ease,
    color 0.45s ease;
  transition-delay: var(--t, 0s);
  position: relative;
  z-index: 2;
}
.live:not(.on) .job {
  transform: translate(var(--dx), var(--dy)) rotate(var(--rot));
  background: var(--argo-soft);
  border-color: var(--argo);
  color: var(--argo-ink);
  transition-delay: 0s;
}
.cr {
  margin: 0;
  padding: 0.45rem 0.6rem;
  background: #f8faf9;
  border-radius: 10px;
  border: 1px solid var(--line);
  font-family: var(--font-mono);
  font-size: 0.56rem;
  line-height: 1.45;
  color: var(--ink-2);
  white-space: pre;
}
.cr .k { color: var(--op-ink); }
.pods {
  display: flex;
  align-items: center;
  gap: 0.38rem;
  padding-left: 0.1rem;
}
.pod {
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 50%;
  background: var(--op);
  opacity: 0;
  transform: scale(0.4);
  transition: opacity 0.4s ease, transform 0.4s cubic-bezier(.2,.8,.2,1);
  transition-delay: var(--t, 0s);
}
.on .pod, .idea:not(.live) .pod { opacity: 1; transform: none; }
.pod:nth-child(2n) { width: 0.44rem; height: 0.44rem; }
.on .pod:nth-child(2n), .idea:not(.live) .pod:nth-child(2n) { opacity: 0.75; }
.foot {
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.7rem 1.2rem;
  font-family: var(--font-mono);
  font-size: 0.7rem;
}
.was {
  color: var(--argo);
  text-decoration: line-through;
  text-decoration-thickness: 1px;
  opacity: 0.7;
}
.now { color: var(--op-ink); }
.pop {
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.5s cubic-bezier(.2,.8,.2,1), transform 0.5s cubic-bezier(.2,.8,.2,1);
  transition-delay: var(--t, 0s);
}
.on .pop, .idea:not(.live) .pop { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) {
  .idea *, .idea *::before { animation: none !important; transition: none !important; }
  .job { transform: none !important; background: var(--op-soft); border-color: var(--op); color: var(--op-ink); }
  .pop, .pod { opacity: 1 !important; transform: none !important; }
  .from { opacity: 0.45; }
}
</style>
