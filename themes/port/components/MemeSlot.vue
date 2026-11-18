<script setup>
import { ref, computed, watch } from 'vue'

// Drop a file at public/memes/<name>.(gif|webp|png|jpg) and it renders here.
// Until then a designed placeholder shows the meme idea.
const props = defineProps({
  name: { type: String, required: true },         // e.g. "slide-1"
  caption: { type: String, default: '' },         // the meme idea
  alt: { type: String, default: 'meme' },
  height: { type: String, default: '100%' },
  fit: { type: String, default: 'contain' },
  compact: { type: Boolean, default: false },  // small slots: hide the badge
})

const exts = ['gif', 'webp', 'png', 'jpg', 'jpeg']
const idx = ref(0)
const loaded = ref(false)
const base = import.meta.env.BASE_URL || '/'
const src = computed(() => idx.value < exts.length ? `${base}memes/${props.name}.${exts[idx.value]}` : '')
watch(() => props.name, () => { idx.value = 0; loaded.value = false })

function onError() { loaded.value = false; idx.value++ }
function onLoad(e) { loaded.value = e.target.naturalWidth > 0 }
</script>

<template>
  <figure class="meme" :style="{ height: props.height }">
    <img
      v-if="src"
      v-show="loaded"
      :key="src"
      :src="src"
      :alt="props.alt"
      :style="{ objectFit: props.fit }"
      class="meme-img"
      @load="onLoad"
      @error="onError"
    />
    <div v-if="!loaded" class="meme-ph" :class="{ compact: props.compact }">
      <div v-if="!props.compact" class="meme-badge"><span class="dot" /> meme slot</div>
      <p class="meme-caption">{{ props.caption }}</p>
      <code class="meme-path">public/memes/{{ props.name }}.gif</code>
    </div>
  </figure>
</template>

<style scoped>
.meme {
  margin: 0;
  width: 100%;
  min-height: 0;
  position: relative;
  border-radius: 18px;
  overflow: hidden;
}
.meme-img {
  width: 100%;
  height: 100%;
  display: block;
  border-radius: 18px;
}
.meme-ph {
  position: absolute;
  inset: 0;
  border: 2px dashed #cbd5e1;
  border-radius: 18px;
  background:
    repeating-linear-gradient(135deg, rgba(148, 163, 184, 0.07) 0 10px, transparent 10px 20px),
    #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.55rem;
  padding: 1rem 1.2rem;
}
.compact { gap: 0.3rem; padding: 0.6rem 0.9rem; }
.compact .meme-caption { font-size: 0.74rem; }
.meme-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-mono);
  font-size: 0.62rem;
  color: var(--mute);
  background: #f1f5f9;
  border-radius: 999px;
  padding: 0.18rem 0.6rem;
}
.dot {
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  background: var(--op);
}
.meme-caption {
  font-size: 0.82rem;
  line-height: 1.35;
  color: var(--ink-2);
  margin: 0;
}
.meme-path {
  max-width: 100%;
  overflow-wrap: anywhere;
  font-family: var(--font-mono);
  font-size: 0.6rem;
  color: var(--mute-2);
  background: transparent;
  padding: 0;
}
</style>
