<script setup>
const props = defineProps({
  title: { type: String, default: '' },
  items: { type: Array, required: true },
  tone: { type: String, default: 'op' },  // op = gained, argo = gave up
})
</script>

<template>
  <div class="sl" :class="`t-${props.tone}`">
    <p v-if="props.title" class="sl-t">{{ props.title }}</p>
    <ul>
      <li v-for="(it, i) in props.items" :key="i"><span class="ic">{{ props.tone === 'op' ? '+' : '−' }}</span><span>{{ it }}</span></li>
    </ul>
  </div>
</template>

<style scoped>
.sl { background: #fff; border: 1px solid var(--line); border-radius: 18px; padding: 1.3rem 1.5rem; }
.sl-t { font-weight: 600; font-size: 1.05rem; color: var(--ink); margin: 0 0 1rem; }
ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.75rem; }
li { display: grid; grid-template-columns: 1.2rem 1fr; gap: 0.5rem; font-size: 0.9rem; line-height: 1.3; color: var(--ink-2); margin: 0; padding: 0; }
li::before { display: none; }
.ic { width: 1.2rem; height: 1.2rem; border-radius: 6px; display: inline-flex; align-items: center; justify-content: center; font-family: var(--font-mono); font-size: 0.8rem; }
.t-op .ic { background: var(--op-soft); color: var(--op-ink); }
.t-argo .ic { background: var(--argo-soft); color: var(--argo-ink); }
</style>
