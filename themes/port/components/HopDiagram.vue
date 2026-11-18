<script setup>
// Control-plane path: Argo CD (10 hops) vs operator (5 hops). Custom SVG, no runtime deps.
import { useSlideIn } from '../composables/useSlideIn'
const { on } = useSlideIn()

const W = 100, H = 34, G = 20
const x = i => i * (W + G)
const fs = s => Math.min(11.5, 92 / (s.length * 0.61))

const beforeTop = ['integ-service', 'Argo API', 'Application', 'app-controller', 'repo-server', 'workloads']
const beforeBot = ['notifications', 'EventSource', 'NATS', 'Sensor', 'Kafka']
const afterTop = ['integ-service', 'operator API', 'OceanIntegration', 'reconciler', 'workloads']

const yB1 = 30, yB2 = 96, yA1 = 196, yA2 = 262
</script>

<template>
  <svg class="hops" viewBox="-4 0 880 306" :class="{ on }">
    <defs>
      <marker id="ah-argo" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 1 L9 5 L0 9 z" fill="var(--argo)" />
      </marker>
      <marker id="ah-op" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 1 L9 5 L0 9 z" fill="var(--op)" />
      </marker>
    </defs>

    <!-- BEFORE -->
    <g class="grp before">
      <text x="0" :y="yB1 - 12" class="cap pop" style="--t: 0.05s">before · argo cd</text>
      <g v-for="(n, i) in beforeTop" :key="'bt' + i" class="pop" :style="{ '--t': `${0.15 + i * 0.07}s` }">
        <rect :x="x(i)" :y="yB1" :width="W" :height="H" rx="9" class="node n-argo" />
        <text :x="x(i) + W / 2" :y="yB1 + H / 2 + 4" class="lbl" :style="{ fontSize: fs(n) + 'px' }">{{ n }}</text>
        <line v-if="i < beforeTop.length - 1" :x1="x(i) + W + 2" :y1="yB1 + H / 2" :x2="x(i + 1) - 3" :y2="yB1 + H / 2" class="edge e-argo" marker-end="url(#ah-argo)" />
      </g>
      <path :d="`M ${x(3) + W / 2} ${yB1 + H + 2} V ${yB1 + H + 16} H ${x(0) + W / 2} V ${yB2 - 3}`" class="edge e-argo pop" style="--t: 0.5s" fill="none" marker-end="url(#ah-argo)" />
      <g v-for="(n, i) in beforeBot" :key="'bb' + i" class="pop" :style="{ '--t': `${0.6 + i * 0.07}s` }">
        <rect :x="x(i)" :y="yB2" :width="W" :height="H" rx="9" class="node n-argo" :class="{ dim: n === 'Kafka' }" />
        <text :x="x(i) + W / 2" :y="yB2 + H / 2 + 4" class="lbl" :style="{ fontSize: fs(n) + 'px' }">{{ n }}</text>
        <line v-if="i < beforeBot.length - 1" :x1="x(i) + W + 2" :y1="yB2 + H / 2" :x2="x(i + 1) - 3" :y2="yB2 + H / 2" class="edge e-argo" marker-end="url(#ah-argo)" />
      </g>
      <g class="pop" style="--t: 0.9s">
        <text x="868" :y="yB1 + 44" class="count c-argo" text-anchor="end">10</text>
        <text x="868" :y="yB1 + 66" class="count-l" text-anchor="end">hops</text>
      </g>
    </g>

    <line x1="0" x2="868" y1="158" y2="158" class="divider pop" style="--t: 0.8s" />

    <!-- AFTER -->
    <g class="grp after">
      <text x="0" :y="yA1 - 12" class="cap pop" style="--t: 0.85s">after · operator</text>
      <g v-for="(n, i) in afterTop" :key="'at' + i" class="pop" :style="{ '--t': `${0.95 + i * 0.09}s` }">
        <rect :x="x(i)" :y="yA1" :width="W" :height="H" rx="9" class="node n-op" />
        <text :x="x(i) + W / 2" :y="yA1 + H / 2 + 4" class="lbl" :style="{ fontSize: fs(n) + 'px' }">{{ n }}</text>
        <line v-if="i < afterTop.length - 1" :x1="x(i) + W + 2" :y1="yA1 + H / 2" :x2="x(i + 1) - 3" :y2="yA1 + H / 2" class="edge e-op flow" marker-end="url(#ah-op)" />
      </g>
      <g class="pop" style="--t: 1.4s">
        <path :d="`M ${x(3) + W / 2} ${yA1 + H + 2} V ${yA2 - 3}`" class="edge e-op flow" fill="none" marker-end="url(#ah-op)" />
        <rect :x="x(3)" :y="yA2" :width="W" :height="H" rx="9" class="node n-op" />
        <text :x="x(3) + W / 2" :y="yA2 + H / 2 + 4" class="lbl">Kafka</text>
        <text :x="x(4) + 8" :y="yA2 + H / 2 + 4" class="aside">status, direct</text>
      </g>
      <g class="pop" style="--t: 1.55s">
        <text x="868" :y="yA1 + 44" class="count c-op" text-anchor="end">5</text>
        <text x="868" :y="yA1 + 66" class="count-l" text-anchor="end">hops</text>
      </g>
    </g>
  </svg>
</template>

<style scoped>
.hops { width: 100%; height: 100%; display: block; overflow: visible; }
.pop { opacity: 0; transform: translateY(6px); transition: opacity 0.4s cubic-bezier(.2,.8,.2,1), transform 0.4s cubic-bezier(.2,.8,.2,1); }
.on .pop { opacity: 1; transform: none; transition-delay: var(--t, 0s); }
@media (prefers-reduced-motion: reduce) { .hops * { transition: none !important; animation: none !important; } }
.cap { font-family: var(--font-mono); font-size: 11px; fill: var(--mute); }
.node { stroke-width: 1.4; }
.n-argo { fill: var(--argo-soft); stroke: var(--argo); }
.n-op { fill: var(--op-soft); stroke: var(--op); }
.lbl { font-family: var(--font-mono); font-size: 11.5px; fill: var(--ink); text-anchor: middle; }
.edge { stroke-width: 1.6; }
.e-argo { stroke: var(--argo); }
.e-op { stroke: var(--op); }
.flow { stroke-dasharray: 5 4; animation: flow 1.2s linear infinite; }
@keyframes flow { to { stroke-dashoffset: -18; } }
.count { font-size: 44px; font-weight: 600; letter-spacing: -0.03em; }
.c-argo { fill: var(--argo); }
.c-op { fill: var(--op); }
.count-l { font-family: var(--font-mono); font-size: 11px; fill: var(--mute); }
.aside { font-family: var(--font-mono); font-size: 10.5px; fill: var(--mute); }
.divider { stroke: var(--line); stroke-dasharray: 3 5; }
</style>
