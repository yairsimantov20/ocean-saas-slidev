<script setup>
const coverSrc = `${import.meta.env.BASE_URL}cover-sunset.png`
</script>

<template>
  <!-- Ocean sunset band pinned to the bottom of the slide. Static: visible from the first frame. -->
  <div class="sunset" aria-hidden="true">
    <img :src="coverSrc" alt="" />
  </div>
</template>

<style>
/* Pull cover content up so it sits above the sunset band. */
.slidev-layout.cover:has(.sunset) { justify-content: flex-start; padding-top: 3rem; }
.slidev-layout.cover:has(.sunset) > *:not(.sunset) { position: relative; z-index: 1; }
</style>

<style scoped>
.sunset { position: absolute; left: 0; right: 0; bottom: 0; z-index: 0; pointer-events: none; }
.sunset img { display: block; width: 100%; height: auto; }
</style>