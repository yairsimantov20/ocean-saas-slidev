<script setup>
// Stacks public/memes/<name>-b over <name>-a. After the slide's content enters,
// image b fades in so a delayed panel can replay on every visit.
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import { useSlideIn } from '../composables/useSlideIn'

const props = defineProps({
  name: { type: String, required: true },         // e.g. "slide-3" → slide-3-a.png / slide-3-b.png
  caption: { type: String, default: '' },
  alt: { type: String, default: 'meme' },
  height: { type: String, default: '100%' },
  fit: { type: String, default: 'contain' },
  delay: { type: [Number, String], default: 1.3 },  // seconds after content enters
})

const { on, live } = useSlideIn()
const revealed = ref(false)
const base = import.meta.env.BASE_URL || '/'
const srcA = computed(() => `${base}memes/${props.name}-a.png`)
const srcB = computed(() => `${base}memes/${props.name}-b.png`)
let timer

watch([on, live], ([isOn, isLive]) => {
  clearTimeout(timer)
  if (!isLive) {
    revealed.value = true
    return
  }
  if (!isOn) {
    revealed.value = false
    return
  }
  timer = setTimeout(() => { revealed.value = true }, Number(props.delay) * 1000)
}, { immediate: true })

onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <figure class="meme" :style="{ height: props.height }">
    <img
      class="meme-img"
      :src="srcA"
      :alt="props.alt"
      :style="{ objectFit: props.fit }"
    />
    <img
      class="meme-img meme-reveal"
      :class="{ on: revealed }"
      :src="srcB"
      alt=""
      :style="{ objectFit: props.fit }"
    />
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
.meme-reveal {
  position: absolute;
  inset: 0;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.6s ease;
}
.meme-reveal.on {
  opacity: 1;
}
@media (prefers-reduced-motion: reduce) {
  .meme-reveal { transition: none; opacity: 1; }
}
</style>
