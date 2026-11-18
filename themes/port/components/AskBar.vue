<script setup>
const props = defineProps({ label: { type: String, default: 'ask' }, path: { type: String, default: '' } })
</script>
<template>
  <div class="ask">
    <span class="a-l">{{ props.label }}</span>
    <span class="a-t"><slot /></span>
    <code v-if="props.path" class="a-p">{{ props.path }}</code>
  </div>
</template>
<style scoped>
.ask { display: flex; align-items: center; gap: 0.9rem; background: #0b0f14; color: #fff; border-radius: 14px; padding: 0.75rem 1.1rem; }
.a-l { font-family: var(--font-mono); font-size: 0.62rem; color: #0b0f14; background: var(--op); border-radius: 99px; padding: 0.1rem 0.55rem; }
.a-t { font-size: 0.95rem; color: #fff; }
.a-p { margin-left: auto; font-family: var(--font-mono); font-size: 0.74rem; color: #6ee7b7; background: rgba(255,255,255,0.06); border-radius: 8px; padding: 0.25rem 0.55rem; }
</style>
