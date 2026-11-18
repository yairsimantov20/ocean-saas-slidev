<script setup lang="ts">
defineProps({
  tight: { type: Boolean, default: false }
})
</script>

<template>
  <p class="note" :class="{ tight }"><slot /></p>
</template>

<style scoped>
.note {
  font-size: 0.875rem;
  color: #6b7280;
  font-style: italic;
  margin-top: 1rem;
}

.note.tight {
  margin-top: -1.5rem;
}

.dark .note {
  color: #d1d5db;
}
</style>
