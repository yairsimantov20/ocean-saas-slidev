<script setup>
// Labeled row of chips (slide 7). tone: op | neutral | argo
const props = defineProps({
  label: { type: String, required: true },
  tone: { type: String, default: 'neutral' },
  tag: { type: String, default: '' },
})
</script>

<template>
  <div class="lane" :class="`t-${props.tone}`">
    <div class="lane-l">
      <span class="bar" />
      <span class="txt">{{ props.label }}</span>
      <span v-if="props.tag" class="tag">{{ props.tag }}</span>
    </div>
    <div class="chips anim-kids"><slot /></div>
  </div>
</template>

<style scoped>
.lane { display: grid; grid-template-columns: 8.2rem 1fr; gap: 1rem; align-items: center; }
.lane-l { display: flex; flex-direction: column; gap: 0.3rem; position: relative; padding-left: 0.8rem; }
.bar { position: absolute; left: 0; top: 0.15rem; bottom: 0.15rem; width: 3px; border-radius: 3px; background: var(--mute-2); }
.t-op .bar { background: var(--op); }
.t-argo .bar { background: var(--argo); }
.txt { font-size: 0.98rem; font-weight: 600; color: var(--ink); }
.tag { align-self: flex-start; font-family: var(--font-mono); font-size: 0.58rem; color: #92400e; background: var(--port-yellow); border-radius: 99px; padding: 0.05rem 0.5rem; }
.chips { display: flex; flex-wrap: wrap; gap: 0.45rem; }
</style>
