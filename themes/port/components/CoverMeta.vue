<script setup>
// Speaker / event line with the Port logo, for the cover.
const props = defineProps({
  name: { type: String, default: '' },
  role: { type: String, default: '' },
  event: { type: String, default: '' },
  thanks: { type: String, default: '' },
})
</script>
<template>
  <div class="cm">
    <PortLogo size="2.1rem" />
    <div class="cm-t">
      <span class="who">{{ props.name }}<span v-if="props.role" class="role"> · {{ props.role }}</span></span>
      <span class="ev">{{ props.event }}</span>
      <span v-if="props.thanks" class="th">with thanks to {{ props.thanks }}</span>
    </div>
  </div>
</template>
<style scoped>
.cm { display: flex; align-items: center; gap: 0.9rem; }
.cm-t { display: flex; flex-direction: column; gap: 0.15rem; padding-left: 0.9rem; border-left: 1px solid var(--line); }
.who { font-size: 1rem; color: var(--ink); font-weight: 500; }
.role { color: var(--mute); font-weight: 400; }
/* thanks line: quiet, below the event */
.th { font-size: 0.78rem; color: var(--mute); margin-top: 0.2rem; }
.ev { font-family: var(--font-mono); font-size: 0.72rem; color: var(--mute); }
</style>
