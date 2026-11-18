<script setup>
const props = defineProps({
  by: { type: String, default: '' },
  where: { type: String, default: '' },
})
</script>

<template>
  <figure class="q">
    <blockquote class="q-t"><slot /></blockquote>
    <figcaption class="q-by"><span>{{ props.by }}</span><span v-if="props.where" class="w">{{ props.where }}</span></figcaption>
  </figure>
</template>

<style scoped>
.q { margin: 0; padding: 0.2rem 0 0.2rem 1rem; border-left: 3px solid var(--op); }
.q-t { margin: 0; font-size: 1rem; line-height: 1.4; color: var(--ink); border: none; padding: 0; background: none; font-style: normal; }
.q-t::before { content: '“'; color: var(--op); }
.q-t::after { content: '”'; color: var(--op); }
.q-by { margin-top: 0.35rem; font-family: var(--font-mono); font-size: 0.64rem; color: var(--mute); display: flex; gap: 0.6rem; }
.w { color: var(--mute-2); }
</style>
